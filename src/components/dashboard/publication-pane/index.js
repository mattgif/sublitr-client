import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import PublicationForm from "../../forms/publication-form/new-publication-form";
import {togglePublicationForm} from "../../../actions";
import {fetchPublications} from "../../../actions/publications";
import PublicationTable from "./publication-table";

export class PublicationPane extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filter: 'all',
            searchTerm: ''
        }
    };

    componentDidMount() {
        if (!this.props.loading && Object.keys(this.props.publications).length === 0) {
            return this.props.dispatch(fetchPublications())
        }
    }

    updateSearch = e => this.setState({ searchTerm: e.target.value });


    render () {
        const {showForm, dispatch } = this.props;
        const { searchTerm } = this.state
        let publicationForm;
        let newPublicationButton = <Button primary onClick={() => dispatch(togglePublicationForm())}><Icon name="plus"/> Add Publication</Button>;
        if (showForm) {
            publicationForm = <PublicationForm/>;
            newPublicationButton = <Button onClick={() => dispatch(togglePublicationForm())}><Icon name="cancel"/> Cancel</Button>;
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
                <p>You can add or remove editors from a publication by clicking on the publication and expanding the row.</p>
                <div className="search__filter__wrapper">
                    <input placeholder='Search by title' className="search__filter" type='text' value={searchTerm} onChange={e => this.updateSearch(e)}/>
                    <Icon name="search"/>
                </div>
                <PublicationTable searchTerm={searchTerm}/>
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