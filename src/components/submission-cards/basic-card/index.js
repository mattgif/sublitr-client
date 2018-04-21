import React from 'react';
import StatusIndicator from "../../status-indicator/statusindicator";
import DeleteSubmissionConfirm from './deletesubmissionconfirm';
import {formatDate} from "../../../actions/utils";
import './basic-card.css';


export default class CardSubmission extends React.Component {
    render() {
        const status = this.props.status;
        const publication = this.props.publication;
        const title = this.props.title;
        const id = this.props.id;
        const submissionDate = formatDate(this.props.submissionDate);
        return (
            <div className="card__basic">
                <StatusIndicator status={status}/>
                <section>
                    <ul>
                        <li className='title'>{title}</li>
                        <li className='submitted'>Submitted <time>{submissionDate}</time></li>
                        <li className='publication'>{publication}</li>
                        <li>Status: {status}</li>
                    </ul>
                    <DeleteSubmissionConfirm className="delete__wrapper" title={title} id={id}/>
                </section>
            </div>
        )
    }
}
