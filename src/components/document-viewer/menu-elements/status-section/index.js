import React from 'react';
import { Menu, Message } from 'semantic-ui-react';
import {formatDate} from "../../../../actions/utils";
import {connect} from 'react-redux';
import StatusIndicator from "../../../status-indicator/statusindicator";
import {updateStatus} from "../../../../actions/submissions";
import ConfirmableDropdown from "../../../confirmable-dropdown";

export class StatusSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined
        };
        this.handleDecisionChange = this.handleDecisionChange.bind(this);
        this.handleRecommendationChange = this.handleRecommendationChange.bind(this);
        this.handleDismissMessage = this.handleDismissMessage.bind(this);
    }

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
            <Menu.Item name='status' className='status'>
                <Menu.Header>
                    <h2>Status</h2>
                    <StatusIndicator status={this.props.submission.reviewerInfo.decision}/>
                </Menu.Header>
                {message}
                <section>
                    <h4>Decision:</h4>
                    <ConfirmableDropdown id='newDecision'
                                         disabled={!!this.props.updating}
                                         confirmText='Send final decision'
                                         warning={<p className="caution">The submitter WILL see a new status</p>}
                                         onConfirm={this.handleDecisionChange}
                                         options={this.props.statusLists.decision}
                                         value={this.props.submission.reviewerInfo.decision}

                    />
                </section>
                <section>
                    <h4>Recommendation:</h4>
                    <ConfirmableDropdown id='newRecommendation'
                                         disabled={!!this.props.updating}
                                         confirmText='Update recommendation'
                                         warning={<p>The submitter will NOT see this change</p>}
                                         onConfirm={this.handleRecommendationChange}
                                         options={this.props.statusLists.recommendation}
                                         value={this.props.submission.reviewerInfo.recommendation}
                    />
                </section>

                <ul className="dates">
                    <li><span className="date__label">Submitted</span><time dateTime={this.props.submission.submitted}>{submittedDate}</time></li>
                    <li><span className="date__label">Last reviewer action</span> <time dateTime={this.props.submission.reviewerInfo.lastAction}>{lastActionDate}</time></li>
                </ul>
            </Menu.Item>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
    updating: state.submissions.updating[ownProps.submission.id]
});

export default connect(mapStateToProps)(StatusSection)