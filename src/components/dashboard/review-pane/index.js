import React from 'react';
import {connect} from 'react-redux';
import CardReview from "../../cards/review-card/index";
import {fetchSubmissions} from "../../../actions/submissions";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";
import { Dropdown, Icon } from 'semantic-ui-react';

export class ReviewPane extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recommendationFilter: "all",
            decisionFilter: "all",
            publicationFilter: "all",
        }
    };

    componentDidMount() {
        this.props.dispatch(fetchSubmissions())
    }

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
        console.log('filter:', state.publicationFilter);
        console.log('submission.publication', submission.publication);
        if (Object.keys(submission).includes('reviewerInfo') &&
            this.matchesField(submission.publication, state.publicationFilter) &&
            this.matchesField(submission.reviewerInfo.decision, state.decisionFilter) &&
            this.matchesField(submission.reviewerInfo.recommendation, state.recommendationFilter)) {
            hash[key] = submission;
        }
        return hash;
    }, {});

    formattedSubmissions = submissionList => Object.keys(submissionList).map(key => {
        const submission = submissionList[key];
        return (
            <li key={submission.id}>
                <CardReview submission={submission}/>
            </li>
        )});

    render() {
        const filteredSubmissions = this.filteredSubmissions(this.props.submissions, this.state);
        let submissionList;
        if (this.props.loading) {
            submissionList = <CubicLoadingSpinner/>
        } else if (!Object.keys(filteredSubmissions).length) {
            submissionList = <div className="Not found"><h2>No submissions found for review</h2></div>
        } else {
            submissionList = <ul className="submissionList">{this.formattedSubmissions(filteredSubmissions)}</ul>
        }

        const decisionOptions = [{text: 'Any decision', value: 'all', key: 'all'}, ...this.props.statusLists.decision];
        const recOptions = [{text: 'Any recommendation', value: 'all', key: 'all'}, ...this.props.statusLists.recommendation];

        const pubOptions = [{text: 'Any publication', value: 'all', key: 'all'}, ...this.props.publications];
        return (
            <section className={this.props.hidden ? "pane hidden" : "pane"}>
                <h2>Review submissions</h2>
                <p>Select 'edit' to quickly update a submission's recommendation or status, or select 'view submission' for all editor options, including adding comments</p>
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

