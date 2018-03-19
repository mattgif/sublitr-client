import React from 'react';
import StatusIndicator from "./statusindicator";
import CollapsableCard from "./collapsablecard";
import DeleteSubmissionConfirm from './deletesubmissionconfirm';


export default class CardSubmission extends CollapsableCard {
    render() {
        const status = this.props.status;
        const publication = this.props.publication;
        const title = this.props.title;
        const id = this.props.id;
        const submissionDate = this.props.submissionDate;
        return (
            <div className="card" onClick={this.handleClick.bind(this)}>
                <StatusIndicator status={status}/>
                <div>
                    <div className='publication'><p>{publication}</p></div>
                    <div className='title'><p>{title}</p></div>
                </div>

                <div className={this.state.expanded ? "additional" : "hidden additional"}>
                    <ul>
                        <li>Status: {status}</li>
                        <li>Submitted: <time>{submissionDate}</time></li>
                    </ul>
                    <DeleteSubmissionConfirm title={title} id={id}/>
                </div>
            </div>
        )
    }
}
