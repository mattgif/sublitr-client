import React from 'react';
import StatusIndicator from "../../status-indicator/statusindicator";
import DeleteSubmissionConfirm from './deletesubmissionconfirm';
import {formatDate} from "../../../actions/utils";
import './basic-card.css';


export default class CardSubmission extends React.Component {
    render() {
        const { pubImage, status, publication, title, id, submissionDate } = this.props;
        const date = formatDate(submissionDate);
        return (
            <div className="card__basic">
                <StatusIndicator status={status}/>
                <section>
                    <ul>
                        <li className='title'>{title}</li>
                        <li className='submitted'>Submitted <time>{date}</time></li>
                    </ul>
                    <div className='publication__wrapper'>
                        <ul>
                            <li className='publication'>{publication}</li>
                            <li className='status__item'>Status: {status}</li>
                        </ul>
                        <div className='image'><img src={pubImage} alt={`${publication} logo`}/></div>
                    </div>
                    <DeleteSubmissionConfirm className="delete__wrapper" title={title} id={id}/>
                </section>
            </div>
        )
    }
}
