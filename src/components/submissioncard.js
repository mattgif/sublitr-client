import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import StatusUpdater from '../components/statusupdater';

export default function SubmissionCard(props) {
    if (props.editor) {
        if (props.expanded) {
            return (
                <Router>
                    <div>
                        <div className={props.submission.reviewerInfo.decision}></div>
                        <div className='submissioncard__publication'><p>{props.submission.publication}</p></div>
                        <div className='submissioncard__title'><p>{props.submission.title}</p></div>
                        <div className='submissioncard__author'><p>{props.submission.author}</p></div>
                        <StatusUpdater type="decision" selected={props.submission.reviewerInfo.decision}/>
                        <StatusUpdater type="recommendation" selected={props.submission.reviewerInfo.recommendation}/>
                        <ul>
                            <li>Decision: {props.submission.reviewerInfo.decision}</li>
                            <li>Submitted: <time>{props.submission.submitted}</time></li>
                            <li>Last action: <time>{props.submission.reviewerInfo.lastAction}</time></li>
                        </ul>
                        <Link to={props.submission.url}>View submission</Link>
                    </div>
                </Router>
            )
        }
        return (
            <div>
                <div className={props.submission.reviewerInfo.decision}></div>
                <div className='submissioncard__publication'><p>{props.submission.publication}</p></div>
                <div className='submissioncard__title'><p>{props.submission.title}</p></div>
                <div className='submissioncard__author'><p>{props.submission.author}</p></div>
            </div>
        )

    }

    if (props.expanded) {
        return (
            <div>
                <div className={props.submission.status}></div>
                <div className='submissioncard__publication'><p>{props.submission.publication}</p></div>
                <div className='submissioncard__title'><p>{props.submission.title}</p></div>
                <ul>
                    <li>Status: {props.submission.status}</li>
                    <li>Submitted: <time>{props.submission.submitted}</time></li>
                </ul>
                <button className="delete">Delete submission?</button>
            </div>
        )
    }
    return (
        <div>
            <div className={props.submission.status}></div>
            <div className='submissioncard__publication'><p>{props.submission.publication}</p></div>
            <div className='submissioncard__title'><p>{props.submission.title}</p></div>
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