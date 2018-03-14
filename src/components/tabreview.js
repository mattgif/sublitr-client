import React from 'react';
import {connect} from 'react-redux';
import './tab.css';
import CardReview from "./cardreview";

export function TabReview(props) {
    const pubOptions = props.publications.map((pub, index) => {
        return (<option key={index} value={pub.abbr}>{pub.name}</option>)
    });

    return(
        <section className="tab">
            <h2>Review submissions</h2>

            <div>
                <div>
                    <label htmlFor="decisionFilter">Final decision</label>
                    <select className="filter" name="decisionFilter" id="decisionFilter" value={props.filterValues.decisionFilter}>
                        <option value="all">All submissions</option>
                        {props.statusLists.decision.map((status, index) => {
                            return <option key={index} value={status.short}>{status.long}</option>
                        })}
                    </select>
                </div>

                <div>
                    <p><label htmlFor="recommendationFilter">Reviewer recommendation</label></p>
                    <select className="filter" name="recommendationFilter" id="recommendationFilter"
                            value={props.filterValues.recommendationFilter} multiple>
                        {props.statusLists.recommendation.map((status, index) => {
                            return <option key={index} value={status.short}>{status.long}</option>
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="publicationFilter">Publication</label>
                    <select className="filter" name="publcationFilter" id="publicationFilter"
                            value={props.filterValues.userFilter}>
                        <option value="all">All publications</option>
                        {pubOptions}
                    </select>
                </div>
            </div>

            <ul className="submissionList">
                {props.submissions.map((submission, index) => {
                    return(<li key={index}><CardReview
                        publication={submission.publication}
                        status={submission.reviewerInfo.decision}
                        recommendation={submission.reviewerInfo.recommendation}
                        author={submission.author}
                        title={submission.title}
                        submissionDate={submission.submitted}
                        lastAction={submission.reviewerInfo.lastAction}
                        url={submission.url}
                    /></li>);
                })}
            </ul>
        </section>
    )
}

const mapStateToProps = state => ({
    publications: state.publications,
    filterValues: state.filterValues,
    statusLists: state.statusLists,
    submissions: state.submissions
});

export default connect(mapStateToProps)(TabReview);