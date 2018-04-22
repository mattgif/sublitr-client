import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../../../actions/submissions";

import { Message, Icon } from 'semantic-ui-react';
import StatusIndicator from "../../status-indicator/statusindicator";

import '../card.css';
import {formatDate} from "../../../actions/utils";
import ConfirmableDropdown from "../../confirmable-dropdown";

export class ReviewCard extends React.Component {
    // CollapsableCard for Reviewer pane
    // shows/dismisses messages on status update, expands to show additional info
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            expanded: false
        };

        this.handleDecisionChange = this.handleDecisionChange.bind(this);
        this.handleRecommendationChange = this.handleRecommendationChange.bind(this);
        this.handleDismissMessage = this.handleDismissMessage.bind(this);
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded});
    };

    handleDecisionChange(newDecision) {
        return this.props.dispatch(updateStatus('decision', newDecision, this.props.submission.id))
            .then(this.setState({message: 'Decision sent'}))
    }

    handleRecommendationChange(newRec) {
        return this.props.dispatch(updateStatus('recommendation', newRec, this.props.submission.id))
            .then(this.setState({message: 'Recommendation updated'}))
    }

    handleDismissMessage() {
        this.setState({message: undefined})
    }

    render() {
        const lastActionDate = formatDate(this.props.submission.reviewerInfo.lastAction);
        const submittedDate = formatDate(this.props.submission.submitted);

        let message;
        if (this.state.message) {
            message = <Message positive header={this.state.message} onDismiss={this.handleDismissMessage}/>
        }

        return (
            <div className="card">
                <StatusIndicator status={this.props.submission.reviewerInfo.decision}/>
                <ul className="card__list">
                    <li className='publication'>{this.props.submission.publication}</li>
                    <li className='title'>{this.props.submission.title}</li>
                    <li className='author'>{this.props.submission.author}</li>
                </ul>
                <div className="expand">
                    <Link className="view-submission-button" to={`/submission/${this.props.submission.id}`}>View submission</Link>
                    <button onClick={() => this.toggleExpand()}>
                        <Icon size={'big'} name={this.state.expanded ? 'compress' : 'expand'}/>
                    </button>
                </div>
                <div className={this.state.expanded ? "additional reviewer visible" : "hidden additional reviewer"}>
                    {message}
                    <dl className="status__info">
                        <h3>Current status:</h3>
                        <p className="status__info__note">Use dropdowns to change status</p>
                        <dt>Decision (visible to submitter):</dt>
                        <ConfirmableDropdown id='newDecision'
                                             disabled={!!this.props.updating}
                                             confirmText='Send final decision'
                                             warning={<p className="caution">The submitter WILL see a new status</p>}
                                             onConfirm={this.handleDecisionChange}
                                             options={this.props.statusLists.decision}
                                             value={this.props.submission.reviewerInfo.decision}

                        />
                        <dt>Recommendation:</dt>
                        <ConfirmableDropdown id='newRecommendation'
                                             disabled={!!this.props.updating}
                                             confirmText='Update recommendation'
                                             warning={<p>The submitter will NOT see this change</p>}
                                             onConfirm={this.handleRecommendationChange}
                                             options={this.props.statusLists.recommendation}
                                             value={this.props.submission.reviewerInfo.recommendation}
                        />
                    </dl>
                    <dl className="basic__info">
                        <h3>Submission info:</h3>
                        <dt>Submitted:</dt>
                        <dd><time dateTime={this.props.submission.submitted}>{submittedDate}</time></dd>

                        <dt>Last action:</dt>
                        <dd><time dateTime={this.props.submission.reviewerInfo.lastAction}>{lastActionDate}</time></dd>
                    </dl>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
    updating: state.submissions.updating[ownProps.submission.id]
});

export default connect(mapStateToProps)(ReviewCard)