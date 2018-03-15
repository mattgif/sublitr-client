import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './tab.css';
import CardSubmission from "./cardsubmission";

export function TabSubmissions(props) {
    const tabClass = props.hidden ? "tab hidden" : "tab";
    return(
        <section className={tabClass}>
            <h2>My submissions</h2>

            <Link to='/submit'>+ New submission</Link>

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

            <ul className="submissionList">
                {props.submissions.map((submission, index) => {
                    return(<li key={index}><CardSubmission
                        status={submission.status}
                        publication={submission.publication}
                        title={submission.title}
                        submissionDate={submission.submitted}
                    /></li>);
                })}
            </ul>
        </section>
    )
}

const mapStateToProps = state => ({
    publications: state.publications,
    filterValues: state.filterValues,
    submissions: state.submissions
});

export default connect(mapStateToProps)(TabSubmissions)