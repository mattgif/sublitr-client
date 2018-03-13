import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SubmissionList from "./submissionlist";
import './tabsubmissions.css';

export function TabSubmissions(props) {
    return(
        <Router>
            <section className="tabSubmissions">
                <h2>My submissions</h2>

                <Link to='#'>+ New submission</Link>

                <div>
                    <label htmlFor="submissionFilter">Status</label>
                    <select className="filter" name="submissionFilter" id="submissionFilter" value={props.filterValues.submissionFilter}>
                        <option value="all">All submissions</option>
                        <option value="pending">Pending review</option>
                        <option value="revise">Revise &amp; Resubmit</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>
                </div>

                <SubmissionList submissions={props.submissions}/>
            </section>
        </Router>
    )
}

const mapStateToProps = state => ({
    publications: state.publications,
    filterValues: state.filterValues,
    submissions: state.submissions
});

export default connect(mapStateToProps)(TabSubmissions)