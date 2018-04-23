import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Search } from 'semantic-ui-react';
import PublicationForm from "../../forms/publication-form/publication-form";
import {togglePublicationForm} from "../../../actions";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";
import {fetchPublications} from "../../../actions/publications";
import PublicationCard from "../../cards/publication-card";

export class PublicationPane extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filter: 'all',
            isLoading: false,
            value: '',
            results: []
        }
    };

    componentDidMount() {
        if (!this.props.loading && Object.keys(this.props.publications).length === 0) {
            return this.props.dispatch(fetchPublications())
        }
    }

    resetSearch = () => this.setState({ isLoading: false, filter: 'all', value: '', results: []});

    handleResultSelect = (e, { result }) => this.setState({ value: result.title, filter: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetSearch();

            const isMatch = result => result.text.includes(this.state.value);

            this.setState({
                isLoading: false,
                results: this.props.publicationOptions.filter(isMatch)
            })
        }, 300)

    };

    render () {
        const {showForm, dispatch, loading, publications } = this.props;
        const { isLoading, value, results, filter } = this.state
        let publicationForm, contentSection;
        let newPublicationButton = <Button primary onClick={() => dispatch(togglePublicationForm())}><Icon name="plus"/> Add Publication</Button>;
        if (showForm) {
            publicationForm = <PublicationForm/>;
            newPublicationButton = <Button onClick={() => dispatch(togglePublicationForm())}><Icon name="cancel"/> Cancel</Button>;
        }

        if (loading) {
            contentSection = <section className="submission__loading"><CubicLoadingSpinner text='Retrieving publications...' prefix='publications'/></section>
        } else if (Object.keys(publications).length === 0) {
            contentSection = <section>Error communicating with the server</section>
        } else {
            let publicationCards;
            if (filter !== 'all' ) {
                const pub = publications[filter];
                publicationCards = <li key={pub.abbr}><PublicationCard publication={pub}/></li>
            } else {
                publicationCards = Object.keys(publications).map(abbr => {
                    return (
                        <li key={abbr}><PublicationCard publication={publications[abbr]}/></li>
                    )
                });
            }
            contentSection =
                <section>
                    <Search loading={isLoading}
                            onSearchChange={this.handleSearchChange}
                            results={results}
                            value={value}
                            onResultSelect={this.handleResultSelect}
                    />
                    <ul className="publication submissionList">
                        {publicationCards}
                    </ul>
                </section>
        }
        return (
            <main className={this.props.hidden ? "pane hidden" : "pane"}>
                <header className="pane__header">
                    <h2 className="pane__header__title">Manage publications</h2>
                    {newPublicationButton}
                </header>

                <section className="publication__add__form__wrapper">
                    {publicationForm}
                </section>
                {contentSection}
            </main>
        )
    }
}

const mapStateToProps = state => ({
    message: state.sublitr.message,
    showForm: state.sublitr.showNewPublicationForm,
    loading: state.publications.loading,
    publications: state.publications.publications,
    publicationOptions: state.publications.publicationsOptions()
});

export default connect(mapStateToProps)(PublicationPane)