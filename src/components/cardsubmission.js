import React from 'react';
import './card.css';
import StatusIndicator from "./statusindicator";

export default function CardSubmission(props) {
    return (
        <div className="card">
            <StatusIndicator status={props.status}/>
            <div>
                <div className='publication'><p>{props.publication}</p></div>
                <div className='title'><p>{props.title}</p></div>
            </div>

            <div className="additional">
                <ul>
                    <li>Status: {props.status}</li>
                    <li>Submitted: <time>{props.submissionDate}</time></li>
                </ul>
                <button className="delete">Delete</button>
            </div>
        </div>
    )
}
