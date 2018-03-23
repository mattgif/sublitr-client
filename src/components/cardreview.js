import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../actions";

import CollapsableCard from "./collapsablecard";
import StatusIndicator from "./statusindicator";

import './card.css';

export class ReviewCard extends CollapsableCard {
    // CollapsableCard for Reviewer pane
    handleStatusChange = (e, statusType) => {
        this.props.dispatch(
            updateStatus(statusType, e.target.value, this.props.submission.id)
        )
    };

    render() {
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
                                onChange={e => this.handleStatusChange(e, 'decision')}>
                            {statusOptions('decision')}
                        </select>
                    </dd>
                    <dt>Recommendation:</dt>
                    <dd>
                        <select value={this.props.submission.reviewerInfo.recommendation}
                                onClick={e => e.stopPropagation()}
                                onChange={e => this.handleStatusChange(e, 'recommendation')}
                        >
                            {statusOptions('recommendation')}
                        </select>
                    </dd>

                    <dt>Last action:</dt>
                    <dd><time>{this.props.submission.reviewerInfo.lastAction}</time></dd>

                    <dt onClick={e => e.stopPropagation()}>
                        <Link to={`/submission/${this.props.submission.id}`}>View submission</Link>
                    </dt>
                </dl>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    statusLists: state.sublitr.statusLists,
});

export default connect(mapStateToProps)(ReviewCard)