import React from 'react';
import {connect} from 'react-redux';
import CardReview from "../../submission-cards/review-card/index";
import {fetchSubmissions} from "../../../actions/submissions";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";
import { Dropdown } from 'semantic-ui-react';

export class TabReview extends React.Component {
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

    matchesField = (targetField, filterValue) => {
        return targetField === filterValue || filterValue === "all"
    };

    filteredSubmissions = (submissionList, state) => Object.keys(submissionList).reduce((hash, key) => {
        const submission = submissionList[key];
        if (this.matchesField(submission.publication, state.publicationFilter) &&
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
        let submissionList;
        if (this.props.loading) {
            submissionList = <CubicLoadingSpinner/>
        } else {
            submissionList =  <ul className="submissionList">
                {this.formattedSubmissions(this.filteredSubmissions(this.props.submissions, this.state))}
            </ul>
        }

        const decisionOptions = [{text: 'Any decision', value: 'all'}, ...this.props.statusLists.decision];
        const recOptions = [{text: 'Any recommendation', value: 'all'}, ...this.props.statusLists.recommendation]
        const pubOptions = [{text: 'Any publication', value: 'all'}, ...this.props.publications];
        return (
            <section className={this.props.hidden ? "pane hidden" : "pane"}>
                <h2>Review submissions</h2>
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
                                      onChange={(e, data) => this.updateFilter(data)}
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
    publications: state.sublitr.publications,
    filterValues: state.sublitr.filterValues,
    statusLists: state.sublitr.statusLists,
    submissions: state.submissions.submissionData,
    loading: state.submissions.loading
});

export default connect(mapStateToProps)(TabReview);

