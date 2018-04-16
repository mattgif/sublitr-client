import React from 'react';
import StatusIndicator from "./statusindicator";
import CollapsableCard from "./collapsablecard";
import DeleteSubmissionConfirm from './deletesubmissionconfirm';
import {formatDate} from "../actions/utils";


export default class CardSubmission extends CollapsableCard {
    render() {
        const status = this.props.status;
        const publication = this.props.publication;
        const title = this.props.title;
        const id = this.props.id;
        const submissionDate = formatDate(this.props.submissionDate);
        return (
            <div className="card" onClick={this.handleClick.bind(this)}>
                <StatusIndicator status={status}/>
                <ul className="card__list">
                    <li className='publication'>{publication}</li>
                    <li className='title'>{title}</li>
                </ul>

                <div className={this.state.expanded ? "additional" : "hidden additional"}>
                    <ul className="card__list">
                        <li>Status: {status}</li>
                        <li>Submitted: <time>{submissionDate}</time></li>
                    </ul>
                    <DeleteSubmissionConfirm title={title} id={id}/>
                </div>
            </div>
        )
    }
}
