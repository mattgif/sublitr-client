import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../actions/submissions";

import CollapsableCard from "./collapsablecard";
import StatusIndicator from "./statusindicator";

import './card.css';

export class ReviewCard extends CollapsableCard {
    // CollapsableCard for Reviewer pane
    handleStatusChange = (e, statusType) => {
        // triggered by changing drop down values - changes recommendation or decision+status
        this.props.dispatch(
            updateStatus(statusType, e.target.value, this.props.submission.id)
        )
    };

    render() {
        const lastActionDate = new Date(this.props.submission.reviewerInfo.lastAction).toUTCString();
        const submittedDate = new Date(this.props.submission.submitted).toUTCString();
        const statusOptions = statusType => this.props.statusLists[statusType].map((opt, index) => {
            return(<option key={index} value={opt.short}>{opt.long}</option>)
        });

        return (
            <div className="card" onClick={this.handleClick.bind(this)}>
                <StatusIndicator status={this.props.submission.reviewerInfo.decision}/>
                <ul className="card__list">
                    <li className='publication'>{this.props.submission.publication}</li>
                    <li className='title'>{this.props.submission.title}</li>
                    <li className='author'>{this.props.submission.author}</li>
                </ul>
                <dl className={this.state.expanded ? "additional" : "hidden additional"}>
                    <dt>Decision:</dt>
                    <dd>
                        <select value={this.props.submission.reviewerInfo.decision}
                                onClick={e => e.stopPropagation()}
                                onChange={e => this.handleStatusChange(e, 'decision')}
                                disabled={!!this.props.updating}>
                            {statusOptions('decision')}
                        </select>
                    </dd>
                    <dt>Recommendation:</dt>
                    <dd>
                        <select value={this.props.submission.reviewerInfo.recommendation}
                                onClick={e => e.stopPropagation()}
                                onChange={e => this.handleStatusChange(e, 'recommendation')}
                                disabled={!!this.props.updating}
                        >
                            {statusOptions('recommendation')}
                        </select>
                    </dd>

                    <dt>Submitted:</dt>
                    <dd><time dateTime={this.props.submission.submitted}>{submittedDate}</time></dd>

                    <dt>Last action:</dt>
                    <dd><time dateTime={this.props.submission.reviewerInfo.lastAction}>{lastActionDate}</time></dd>

                    <dt onClick={e => e.stopPropagation()}>
                        <Link to={`/submission/${this.props.submission.id}`}>View submission</Link>
                    </dt>
                </dl>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
    updating: state.submissions.updating[ownProps.submission.id]
});

export default connect(mapStateToProps)(ReviewCard)