import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import SubmissionList from "./submissionlist";
import UserTable from "./usertable";

export default function TabContent(props) {
    const pubOptions = props.publications.map(pub => {
        return (<option value={pub.abbr}>{pub.name}</option>)
    });

    if (props.active === 'review') {
        return (
            <Router>
                <section>
                    <h2>Review submissions</h2>

                    <label htmlFor="decisionFilter">Final decision</label>
                    <select className="filter" name="decisionFilter" id="decisionFilter">
                        <option value="all" selected>All submissions</option>
                        <option value="pending">No decision</option>
                        <option value="revise">Revise &amp; Resubmit</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>

                    <label htmlFor="recommendationFilter">Reviewer recommendation</label>
                    <select className="filter" name="recommendationFilter" id="recommendationFilter" multiple>
                        <option value="all" selected>All</option>
                        <option value="none">Not reviewed</option>
                        <option value="underReview">Under review</option>
                        <option value="accept">Recommend Accept</option>
                        <option value="revise">Recommend R&amp;R</option>
                        <option value="consider">Consider</option>
                        <option value="decline">Recommend Decline</option>
                    </select>

                    <label htmlFor="publicationFilter">Publication</label>
                    <select className="filter" name="publcationFilter" id="publicationFilter">
                        <option value="all" selected>All publications</option>
                        {pubOptions}
                    </select>
                    <SubmissionList/>
                </section>
            </Router>
        )
    } else if (props.active === 'users') {
        return (
            <Router>
                <section>
                    <h2>Users</h2>
                    <Link to='#'>+ New submission</Link>
                    <label htmlFor="userFilter">User roles</label>
                    <select className="filter" name="userFilter" id="userFilter">
                        <option value="all" selected>All users</option>
                        <option value="editors">Editors</option>
                        <option value="regular">Non-editors</option>
                    </select>
                    <UserTable/>
                </section>
            </Router>
        )
    } else {
        return (
            <Router>
                <section>
                    <h2>My submissions</h2>
                    <Link to='#'>+ New submission</Link>
                    <label htmlFor="submissionFilter">Status</label>
                    <select className="filter" name="submissionFilter" id="submissionFilter">
                        <option value="all">All submissions</option>
                        <option value="pending">Pending review</option>
                        <option value="revise">Revise &amp; Resubmit</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>
                    <SubmissionList/>
                </section>
            </Router>
        )
    }
}

TabContent.defaultProps = {
    publications: [
        {name: 'Journal 1', abbr: 'J1'},
        {name: 'Journal 2', abbr: 'J2'},
        {name: 'Magazine 1', abbr: 'M1'},
        {name: 'Magazine 2', abbr: 'M2'}
    ]
};