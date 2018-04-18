import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../../../actions/submissions";

import { Dropdown, Icon } from 'semantic-ui-react';
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

    handleStatusChange = (e, changedField) => {
        // triggered by confirm buttons after changing dropdown
        e.stopPropagation();
        // keep the card from collapsing
        this.props.dispatch(
            updateStatus(changedField, this.state[changedField], this.props.submission.id)
        );
        const needsUpdate = changedField === 'decision' ? 'newDecision' : 'newRecommendation';
        this.setState({[needsUpdate]: false})
    };

    cancelStatusChange (e, canceledField) {
        e.stopPropagation();
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
                    <button onClick={e => this.cancelStatusChange(e, 'decision')}>Cancel</button>
                    <button onClick={e => this.handleStatusChange(e, 'decision')}>Send final decision</button>
                    <p>The submitter WILL see a new status</p>
                </div>
        }

        let confirmNewRecommendation;
        if (this.state.newRecommendation) {
            confirmNewRecommendation =
                <div className="confirm">
                    <button onClick={e => this.cancelStatusChange(e, 'recommendation')}>Cancel</button>
                    <button onClick={e => this.handleStatusChange(e, 'recommendation')}>Update recommendation</button>
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
                <Link className="view-submission-button" to={`/submission/${this.props.submission.id}`}>View submission</Link>
                <dl className={this.state.expanded ? "additional" : "hidden additional"}>
                    <dt>Decision:</dt>
                    <dd>
                        <Dropdown className="status__updater"
                                  options={this.props.statusLists.decision}
                                  value={this.state.decision}
                                  id='newDecision'
                                  disabled={!!this.props.updating}
                                  onChange={(e, data) => this.showConfirm(data)}
                                  selection
                        />
                        {confirmFinalDecision}

                    </dd>
                    <dt>Recommendation:</dt>
                    <dd>
                        <Dropdown className="status__updater"
                                  options={this.props.statusLists.recommendation}
                                  value={this.state.recommendation}
                                  id='newRecommendation'
                                  disabled={!!this.props.updating}
                                  onChange={(e, data) => this.showConfirm(data)}
                                  selection
                        />
                        {confirmNewRecommendation}
                    </dd>

                    <dt>Submitted:</dt>
                    <dd><time dateTime={this.props.submission.submitted}>{submittedDate}</time></dd>

                    <dt>Last action:</dt>
                    <dd><time dateTime={this.props.submission.reviewerInfo.lastAction}>{lastActionDate}</time></dd>
                </dl>
                <div className="expand">
                    <button onClick={() => this.toggleExpand()}>
                        <Icon size={'big'} name={this.state.expanded ? 'compress' : 'expand'}/>
                    </button>
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