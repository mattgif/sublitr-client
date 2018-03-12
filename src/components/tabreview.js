import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import SubmissionList from "./submissionlist";

export default function TabReview(props) {
    const pubOptions = props.publications.map((pub, index) => {
        return (<option key={index} value={pub.abbr}>{pub.name}</option>)
    });

    return(
        <Router>
            <section>
                <h2>Review submissions</h2>

                <label htmlFor="decisionFilter">Final decision</label>
                <select className="filter" name="decisionFilter" id="decisionFilter" value={props.filterValues.decisionFilter}>
                    <option value="all">All submissions</option>
                    <option value="pending">No decision</option>
                    <option value="revise">Revise &amp; Resubmit</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                </select>

                <label htmlFor="recommendationFilter">Reviewer recommendation</label>
                <select className="filter" name="recommendationFilter" id="recommendationFilter"
                        value={props.filterValues.recommendationFilter} multiple>
                    <option value="all">All</option>
                    <option value="none">Not reviewed</option>
                    <option value="underReview">Under review</option>
                    <option value="accept">Accept</option>
                    <option value="revise">R&amp;R</option>
                    <option value="consider">Consider</option>
                    <option value="decline">Decline</option>
                </select>

                <label htmlFor="publicationFilter">Publication</label>
                <select className="filter" name="publcationFilter" id="publicationFilter"
                        value={props.filterValues.userFilter}>
                    <option value="all">All publications</option>
                    {pubOptions}
                </select>
                <SubmissionList/>
            </section>
        </Router>
    )
}

TabReview.defaultProps = {
    publications: [
        {name: 'Journal 1', abbr: 'J1'},
        {name: 'Journal 2', abbr: 'J2'},
        {name: 'Magazine 1', abbr: 'M1'},
        {name: 'Magazine 2', abbr: 'M2'}
    ],
    filterValues: {
        recommendationFilter: ["all"],
        publicationFilter: "all",
        decisionFilter: "all"
    }
};