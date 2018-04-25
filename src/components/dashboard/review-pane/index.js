import React from 'react';
import {connect} from 'react-redux';
import CardReview from "../../cards/review-card/index";
import {fetchSubmissions} from "../../../actions/submissions";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";
import { Dropdown, Icon } from 'semantic-ui-react';
import ReviewTable from "./review-table";

export class ReviewPane extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recommendationFilter: "all",
            decisionFilter: "all",
            publicationFilter: "all",
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
        this.setState({publicationFilter: value})
    };

    matchesField = (targetField, filterValue) => {
        return targetField === filterValue || filterValue === "all"
    };

    filteredSubmissions = (submissionList, state) => Object.keys(submissionList).reduce((hash, key) => {
        const submission = submissionList[key];
        let matches = true;
        if (this.state.search) {
            const string = `${submission.title} ${submission.author}`.toLowerCase();
            matches = string.includes(this.state.search.toLowerCase())
        }

        if (Object.keys(submission).includes('reviewerInfo') &&
            matches &&
            this.matchesField(submission.publication, state.publicationFilter) &&
            this.matchesField(submission.reviewerInfo.decision, state.decisionFilter) &&
            this.matchesField(submission.reviewerInfo.recommendation, state.recommendationFilter)) {
            hash[key] = submission;
        }
        return hash;
    }, {});

    render() {
        const search = this.state.search;
        const { submissions, loading, statusLists, publications } = this.props;
        const filteredSubmissions = this.filteredSubmissions(submissions, this.state);
        const pendingDecisionCount = Object.keys(filteredSubmissions).filter(submission => filteredSubmissions[submission].reviewerInfo.decision === 'pending').length;
        const pendingDecisionCounter = <div><Icon name="hourglass empty"/> {`${pendingDecisionCount} matching submission${pendingDecisionCount > 1 ? 's' : ''} pending decision`}</div>;

        let submissionList;
        if (loading) {
            submissionList = <CubicLoadingSpinner/>
        } else if (!Object.keys(filteredSubmissions).length) {
            submissionList = <div className="Not found"><h2>No submissions found for review</h2></div>
        } else {
            submissionList = <ReviewTable searchTerm={this.state.search} filters={{recommendation: this.state.recommendationFilter, decision: this.state.decisionFilter, publication: this.state.publicationFilter}}/>
        }

        const decisionOptions = [{text: 'Any decision', value: 'all', key: 'all'}, ...statusLists.decision];
        const recOptions = [{text: 'Any recommendation', value: 'all', key: 'all'}, ...statusLists.recommendation];

        const pubOptions = [{text: 'Any publication', value: 'all', key: 'all'}, ...publications];
        return (
            <section className={this.props.hidden ? "pane hidden" : "pane"}>
                <h2>Review submissions</h2>
                <p>You can expand a submission in the table by selecting it to update the recommendation or status, or view comments.</p>
                <div className="filter__section">
                    <h4>Filter by:</h4>
                    <ul className="filter__list">
                        <li>
                            <Dropdown className="filter"
                                      name="decisionFilter"
                                      id="decisionFilter"
                                      placeholder="Final decision"
                                      options={decisionOptions}
                                      onChange={(e, data) => this.updateFilter(data)}
                            />
                        </li>
                        <li>
                            <Dropdown className="filter"
                                      name="recommendationFilter"
                                      id="recommendationFilter"
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
                    {pendingDecisionCounter}
                    <div className="search__filter__wrapper">
                        <input placeholder='Search by title or author' className="search__filter" type='text' value={search} onChange={e => this.updateSearch(e)}/>
                        <Icon name="search"/>
                    </div>
                </div>
                {submissionList}
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

