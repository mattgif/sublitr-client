import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import SubmissionList from "./submissionlist";
import './tabsubmissions.css';

export default function TabSubmissions(props) {
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

TabSubmissions.defaultProps = {
    filterValues: {
        submissionFilter: "all"
    },
    submissions: [
        {
            title: 'Demo title 1',
            author: 'Rea Roos',
            submitted: '2018-01-01',
            publication: 'Journal 1',
            status: 'pending',
            url: '#',
            reviewerInfo: {
                decision: 'pending',
                recommendation: 'none',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 2',
            author: 'Kylie Keegan',
            submitted: '2018-01-01',
            publication: 'Journal 1',
            status: 'declined',
            url: '#',
            reviewerInfo: {
                decision: 'declined',
                recommendation: 'decline',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 3',
            author: 'Emanuel Eisenstein',
            submitted: '2018-01-01',
            publication: 'Magazine 1',
            status: 'declined',
            url: '#',
            reviewerInfo: {
                decision: 'declined',
                recommendation: 'consider',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 4',
            author: 'Emanuel Eisenstein',
            submitted: '2018-01-01',
            publication: 'Journal 2',
            status: 'accepted',
            url: '#',
            reviewerInfo: {
                decision: 'accepted',
                recommendation: 'accept',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 5',
            author: 'Donna Delapaz',
            submitted: '2018-01-01',
            publication: 'Magazine 1',
            status: 'revise',
            url: '#',
            reviewerInfo: {
                decision: 'revise',
                recommendation: 'revise',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title ',
            author: 'Ashanti Ables',
            submitted: '2018-01-01',
            publication: 'Magazine 2',
            status: 'pending',
            url: '#',
            reviewerInfo: {
                decision: 'pending',
                recommendation: 'underReview',
                lastAction: '2018-01-01'
            }
        },
    ]
};