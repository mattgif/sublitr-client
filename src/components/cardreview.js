import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../actions";

import CollapsableCard from "./collapsablecard";
import StatusIndicator from "./statusindicator";

import './card.css';

export class ReviewCard extends CollapsableCard {
    // CollapsableCard for Reviewer pane

    handleItemClick = e => {
        // for clickable items like status selectors that shouldn't collapse card
        e.stopPropagation();
    };

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
                <div>
                    <div className='publication'><p>{this.props.submission.publication}</p></div>
                    <div className='title'><p>{this.props.submission.title}</p></div>
                    <div className='author'><p>{this.props.submission.author}</p></div>
                </div>
                <div className={this.state.expanded ? "additional" : "hidden additional"}>
                    <div>
                        <p>Decision:</p>
                        <select value={this.props.submission.reviewerInfo.decision}
                                onClick={e => this.handleItemClick(e)}
                                onChange={e => this.handleStatusChange(e, 'decision')}
                        >
                            {statusOptions('decision')}
                        </select>
                    </div>
                    <div>
                        <p>Recommendation:</p>
                        <select value={this.props.submission.reviewerInfo.recommendation}
                                onClick={e => this.handleItemClick(e)}
                                onChange={e => this.handleStatusChange(e, 'recommendation')}
                        >
                            {statusOptions('recommendation')}
                        </select>
                    </div>

                    <p>Last action: <time>{this.props.submission.reviewerInfo.lastAction}</time></p>

                    <Link to={this.props.submission.url}>View submission</Link>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
    submission: state.sublitr.submissionsByID[ownProps.submissionID],
    submissionsByID: state.sublitr.submissionsByID
});

export default connect(mapStateToProps)(ReviewCard)