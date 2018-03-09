import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import StatusUpdater from '../components/statusupdater';

export default function SubmissionCard(props) {
    if (props.editor) {
        if (props.expanded) {
            return (
                <Router>
                    <div>
                        <div className={props.status ? props.status.decision : ''}></div>
                        <div className='submissioncard__publication'><p>{props.submissionInfo.publication}</p></div>
                        <div className='submissioncard__title'><p>{props.submissionInfo.title}</p></div>
                        <div className='submissioncard__author'><p>{props.submissionInfo.author}</p></div>
                        <StatusUpdater options={[
                            {value: 'pending', label: 'No decision'},
                            {value: 'revise', label: 'R&R'},
                            {value: 'accepted', label: 'Accepted'},
                            {value: 'declined', label: 'Declined'}
                            ]}
                            selected={props.status.decision}/>
                        <StatusUpdater options={[
                            {value: 'none', label: 'Not Reviewed'},
                            {value: 'underReview', label: 'Under Review'},
                            {value: 'accept', label: 'Accept'},
                            {value: 'revise', label: 'Revise & Resubmit'},
                            {value: 'maybe', label: 'Maybe'},
                            {value: 'decline', label: 'Decline'}
                            ]}
                        />
                        <ul>
                            <li>Status: {props.status.userLongName}</li>
                            <li>Submitted: <time>{props.status.submitted}</time></li>
                            <li>Last action: <time>{props.status.lastAction}</time></li>
                        </ul>
                        <Link to={props.submissionInfo.reviewLink}>View submission</Link>
                    </div>
                </Router>
            )
        }
        return (
            <div>
                <div className={props.status ? props.status.decision : ''}></div>
                <div className='submissioncard__publication'><p>{props.submissionInfo.publication}</p></div>
                <div className='submissioncard__title'><p>{props.submissionInfo.title}</p></div>
                <div className='submissioncard__author'><p>{props.submissionInfo.author}</p></div>
            </div>
        )

    }

    if (props.expanded) {
        return (
            <div>
                <div className={props.status ? props.status.decision : ''}></div>
                <div className='submissioncard__publication'><p>{props.submissionInfo.publication}</p></div>
                <div className='submissioncard__title'><p>{props.submissionInfo.title}</p></div>
                <ul>
                    <li>Status: {props.status.userLongName}</li>
                    <li>Submitted: <time>{props.status.submitted}</time></li>
                    <li>Last action: <time>{props.status.lastAction}</time></li>
                </ul>
                <button className="delete">Delete submission?</button>
            </div>
        )
    }
    return (
        <div>
            <div className={props.status ? props.status.decision : ''}></div>
            <div className='submissioncard__publication'><p>{props.submissionInfo.publication}</p></div>
            <div className='submissioncard__title'><p>{props.submissionInfo.title}</p></div>
        </div>
    )
}

SubmissionCard.defaultProps = {
    submissionInfo: {},
    status: {}
};