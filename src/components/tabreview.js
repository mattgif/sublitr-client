import React from 'react';
import {connect} from 'react-redux';
import './tab.css';
import CardReview from "./cardreview";

export class TabReview extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recommendationFilter: "all",
            decisionFilter: "all",
            publicationFilter: "all"
        }
    };
    // options for publications, recommendation status, and decision status are defined in state
    // so they can be customized by user
    pubOptions = this.props.publications.map((pub, index) => {
        return (<option key={index} value={pub.name}>{pub.name}</option>)
    });

    recOptions = this.props.statusLists.recommendation.map((status, index) => {
        return <option key={index} value={status.short}>{status.long}</option>
    });

    decOptions = this.props.statusLists.decision.map((status, index) => {
        return <option key={index} value={status.short}>{status.long}</option>
    });

    updateFilter = e => {this.setState({[e.target.id]: e.target.value})};

    matchesField = (targetField, filterValue) => {
        return targetField === filterValue || filterValue === "all"
    };

    filteredSubmissions = (submissionList, state) => submissionList.filter(submission => {
        return this.matchesField(submission.publication, state.publicationFilter) &&
            this.matchesField(submission.reviewerInfo.decision, state.decisionFilter) &&
            this.matchesField(submission.reviewerInfo.recommendation, state.recommendationFilter)
    });

    formattedSubmissions = submissionList => submissionList.map((submission, index) => {
        return (
            <li key={index}>
                <CardReview
                    publication={submission.publication}
                    status={submission.reviewerInfo.decision}
                    recommendation={submission.reviewerInfo.recommendation}
                    author={submission.author}
                    title={submission.title}
                    submissionDate={submission.submitted}
                    lastAction={submission.reviewerInfo.lastAction}
                    url={submission.url}/>
            </li>
    )});

    render() {
        return (
            <section className={this.props.hidden ? "tab hidden" : "tab"}>
                <h2>Review submissions</h2>

                <div>
                    <div>
                        <label htmlFor="decisionFilter">Final decision</label>
                        <select className="filter" name="decisionFilter" id="decisionFilter"
                                value={this.state.decisionFilter}
                                onChange={e => this.updateFilter(e)}
                        >
                            <option value="all">All submissions</option>
                            {this.decOptions}
                        </select>
                    </div>

                    <div>
                        <p><label htmlFor="recommendationFilter">Reviewer recommendation</label></p>
                        <select className="filter"
                                name="recommendationFilter"
                                id="recommendationFilter"
                                value={this.state.recommendationFilter}
                                onChange={e => this.updateFilter(e)}
                        >
                            <option value="all">All submissions</option>
                            {this.recOptions}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="publicationFilter">Publication</label>
                        <select className="filter"
                                name="publicationFilter"
                                id="publicationFilter"
                                value={this.state.publicationFilter}
                                onChange={e => this.updateFilter(e)}
                        >
                            <option value="all">All publications</option>
                            {this.pubOptions}
                        </select>
                    </div>
                </div>

                <ul className="submissionList">
                    {this.formattedSubmissions(this.filteredSubmissions(this.props.submissions, this.state))}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    publications: state.sublitr.publications,
    filterValues: state.sublitr.filterValues,
    statusLists: state.sublitr.statusLists,
    submissions: state.sublitr.submissions
});

export default connect(mapStateToProps)(TabReview);