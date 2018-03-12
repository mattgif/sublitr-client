import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import StatusUpdater from '../components/statusupdater';
import './submissioncard.css';

export default function SubmissionCard(props) {
    if (props.editor) {
        const expanded = (reviewerInfo) => {
            return (
                <div className="additional">
                    <div>
                        <p>Decision:</p>
                        <StatusUpdater type="decision" selected={reviewerInfo.decision}/>
                    </div>
                    <div>
                        <p>Recommendation:</p>
                        <StatusUpdater type="recommendation" selected={reviewerInfo.recommendation}/>
                    </div>

                    <li>Last action: <time>{reviewerInfo.lastAction}</time></li>

                    <Link to={props.submission.url}>View submission</Link>
                </div>
            )
        };
        const statusClass = `circle ${props.submission.reviewerInfo.decision}`;
        return (
            <Router>
                <div className={props.expanded ? "card expanded" : "card"}>
                    <div className={statusClass}></div>
                    <div>
                        <div className='publication'><p>{props.submission.publication}</p></div>
                        <div className='title'><p>{props.submission.title}</p></div>
                        <div className='author'><p>{props.submission.author}</p></div>
                    </div>
                    {props.expanded ? expanded(props.submission.reviewerInfo) : ''}
                </div>
            </Router>
        )
    }

    const expanded = () => {
        return (
            <div className="additional">
                <ul>
                    <li>Status: {props.submission.status}</li>
                    <li>Submitted: <time>{props.submission.submitted}</time></li>
                </ul>
                <button className="delete">Delete</button>
            </div>
        )
    };
    const statusClass = `circle ${props.submission.status}`;
    return (
        <div className={props.expanded ? "card expanded" : "card"}>
            <div className={statusClass}></div>
            <div>
                <div className='publication'><p>{props.submission.publication}</p></div>
                <div className='title'><p>{props.submission.title}</p></div>
            </div>
            {props.expanded ? expanded() : ''}
        </div>
    )
}

SubmissionCard.defaultProps = {
    submission: {
        title: '',
        author: '',
        submitted: '',
        publication: '',
        status: '',
        url: '',
        reviewerInfo: {
            decision: '',
            recommendation: '',
            lastAction: ''
        }
    },
};