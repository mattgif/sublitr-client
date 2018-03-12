import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import SubmissionList from "./submissionlist";

export default function TabSubmissions(props) {
    return(
        <Router>
            <section>
                <h2>My submissions</h2>

                <Link to='#'>+ New submission</Link>

                <label htmlFor="submissionFilter">Status</label>
                <select className="filter" name="submissionFilter" id="submissionFilter" value={props.filterValues.submissionFilter}>
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

TabSubmissions.defaultProps = {
    filterValues: {
        submissionFilter: "all"
    }
};