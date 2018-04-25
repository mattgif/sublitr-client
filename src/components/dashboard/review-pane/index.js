import React from 'react';
import {connect} from 'react-redux';
import {fetchSubmissions} from "../../../actions/submissions";
import { Dropdown, Icon } from 'semantic-ui-react';
import ReviewTable from "./review-table";

export class ReviewPane extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recommendation: "all",
            decision: "all",
            publication: "all",
            search: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    };

    componentDidMount() {
        this.props.dispatch(fetchSubmissions())
    }

    updateSearch = e => this.setState({ search: e.target.value });

    updateFilter = data => {
        this.setState({[data.id]: data.value})};

    updatePublicationFilter = data => {
        // Dropdown needs sanitized values, so we need to use a re-hashed dic
        let value = data.value;
        if (value !== 'all') {
            value = this.props.publicationsAbbrHash[data.value].title;
        }
        this.setState({publication: value})
    };


    render() {
        const {search, recommendation, decision, publication} = this.state;
        const { statusLists, publications } = this.props;


        const decisionOptions = [{text: 'Any decision', value: 'all', key: 'all'}, ...statusLists.decision];
        const recOptions = [{text: 'Any recommendation', value: 'all', key: 'all'}, ...statusLists.recommendation];

        const pubOptions = [{text: 'Any publication', value: 'all', key: 'all'}, ...publications];
        return (
            <section className={this.props.hidden ? "pane hidden" : "pane"}>
                <h2>Review submissions</h2>
                <p>You can update the recommendation or status, or view comments for a submission from this screen. Just select a submission to view expanded info!</p>
                <div className="filter__section">
                    <h4>Filter by:</h4>
                    <ul className="filter__list">
                        <li>
                            <Dropdown className="filter"
                                      name="decisionFilter"
                                      id="decision"
                                      placeholder="Final decision"
                                      options={decisionOptions}
                                      onChange={(e, data) => this.updateFilter(data)}
                            />
                        </li>
                        <li>
                            <Dropdown className="filter"
                                      name="recommendationFilter"
                                      id="recommendation"
                                      placeholder="Reviewer recommendation"
                                      options={recOptions}
                                      onChange={(e, data) => this.updateFilter(data)}
                            />
                        </li>
                        <li>
                            <Dropdown className="filter"
                                      name="publicationFilter"
                                      id="publicationFilter"
                                      placeholder="Publication"
                                      options={pubOptions}
                                      onChange={(e, data) => this.updatePublicationFilter(data)}
                            />
                        </li>
                    </ul>
                    <div className="search__filter__wrapper">
                        <input placeholder='Search by title or author' className="search__filter" type='text' value={search} onChange={e => this.updateSearch(e)}/>
                        <Icon name="search"/>
                    </div>
                </div>
                <ReviewTable searchTerm={search}
                             filters={{
                                 recommendation: recommendation,
                                 decision: decision,
                                 publication: publication}}/>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    publications: state.publications.publicationsOptions(),
    publicationsAbbrHash: state.publications.publicationsAbbrHash(),
    filterValues: state.sublitr.filterValues,
    statusLists: state.sublitr.statusLists,
    submissions: state.submissions.submissionData,
    loading: state.submissions.loading,
    editorId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(ReviewPane);

