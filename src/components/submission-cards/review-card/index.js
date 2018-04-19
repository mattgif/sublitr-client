import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../../../actions/submissions";

import { Dropdown, Icon, Button } from 'semantic-ui-react';
import StatusIndicator from "../../status-indicator/statusindicator";

import '../card.css';
import {formatDate} from "../../../actions/utils";

export class ReviewCard extends React.Component {
    // CollapsableCard for Reviewer pane
    constructor(props) {
        super(props);
        this.state = {
            decision: this.props.submission.reviewerInfo.decision,
            recommendation: this.props.submission.reviewerInfo.recommendation,
            newDecision: false,
            newRecommendation: false,
            expanded: false
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded});
    };

    handleStatusChange = (changedField) => {
        // triggered by confirm buttons after changing dropdown
        this.props.dispatch(
            updateStatus(changedField, this.state[changedField], this.props.submission.id)
        );
        const needsUpdate = changedField === 'decision' ? 'newDecision' : 'newRecommendation';
        this.setState({[needsUpdate]: false})
    };

    cancelStatusChange (canceledField) {
        // keep the card from collapsing
        console.log('canceledField', canceledField);
        const needsUpdate = canceledField === 'decision' ? 'newDecision' : 'newRecommendation';
        this.setState({
            [canceledField]: this.props.submission.reviewerInfo[canceledField],
            [needsUpdate]: false
        })
    }

    showConfirm = (data) => {
        // sets component state for status type to proposed change, and sets flags it as new so confirm renders
        const updatedField = data.id === 'newDecision' ? 'decision' : 'recommendation';
        this.setState({
            [updatedField]: data.value,
            [data.id]: true})
    };

    render() {
        const lastActionDate = formatDate(this.props.submission.reviewerInfo.lastAction);
        const submittedDate = formatDate(this.props.submission.submitted);

        let confirmFinalDecision;
        if (this.state.newDecision) {
            confirmFinalDecision =
                <div className="confirm">
                    <Button.Group>
                        <Button onClick={() => this.cancelStatusChange('decision')}>Cancel</Button>
                        <Button.Or/>
                        <Button positive onClick={() => this.handleStatusChange('decision')}>Send final decision</Button>
                    </Button.Group>
                    <p className="caution">The submitter WILL see a new status</p>
                </div>
        }

        let confirmNewRecommendation;
        if (this.state.newRecommendation) {
            confirmNewRecommendation =
                <div className="confirm">
                    <Button.Group>
                        <Button onClick={() => this.cancelStatusChange('recommendation')}>Cancel</Button>
                        <Button.Or/>
                        <Button positive onClick={() => this.handleStatusChange('recommendation')}>Update recommendation</Button>
                    </Button.Group>
                    <p>The submitter will NOT see this change</p>
                </div>
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
                    <dl className="status__info">
                        <h3>Current status:</h3>
                        <p className="status__info__note">Use dropdowns to change status</p>
                        <dt>Decision (visible to submitter):</dt>
                        <dd className="status__updater__wrapper">
                            <div>
                                <Dropdown className="status__updater"
                                          options={this.props.statusLists.decision}
                                          value={this.state.decision}
                                          id='newDecision'
                                          disabled={!!this.props.updating}
                                          onChange={(e, data) => this.showConfirm(data)}
                                          selection
                                />
                            </div>
                            {confirmFinalDecision}
                        </dd>
                        <dt>Recommendation:</dt>
                        <dd className="status__updater__wrapper">
                            <div>
                                <Dropdown className="status__updater"
                                          options={this.props.statusLists.recommendation}
                                          value={this.state.recommendation}
                                          id='newRecommendation'
                                          disabled={!!this.props.updating}
                                          onChange={(e, data) => this.showConfirm(data)}
                                          selection
                                />
                            </div>
                            {confirmNewRecommendation}
                        </dd>
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