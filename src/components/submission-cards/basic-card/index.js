import React from 'react';
import StatusIndicator from "../../status-indicator/statusindicator";
import DeleteSubmissionConfirm from './deletesubmissionconfirm';
import {formatDate} from "../../../actions/utils";


export default class CardSubmission extends React.Component {
    render() {
        const status = this.props.status;
        const publication = this.props.publication;
        const title = this.props.title;
        const id = this.props.id;
        const submissionDate = formatDate(this.props.submissionDate);
        return (
            <div className="card">
                <StatusIndicator status={status}/>
                <ul className="card__list">
                    <li className='publication'>{publication}</li>
                    <li className='title'>{title}</li>
                </ul>

                <div className="submission__basic__info">
                    <ul className="card__list">
                        <li>Status: {status}</li>
                        <li>Submitted: <time>{submissionDate}</time></li>
                    </ul>
                </div>
                <div className="submission__delete__wrapper">
                    <DeleteSubmissionConfirm  title={title} id={id}/>
                </div>
            </div>
        )
    }
}
