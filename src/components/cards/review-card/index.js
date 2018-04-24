import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {updateStatus} from "../../../actions/submissions";

import { Message, Icon } from 'semantic-ui-react';
import StatusIndicator from "../../status-indicator/statusindicator";

import '../card.css';
import {formatDate} from "../../../actions/utils";
import ConfirmableDropdown from "../../confirmable-dropdown";
import {CommentList} from "../../comments/comment-list";

export class ReviewCard extends React.Component {
    // CollapsableCard for Reviewer pane
    // shows/dismisses messages on status update, expands to show additional info
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            expanded: false,
            showComments: false
        };

        this.handleDecisionChange = this.handleDecisionChange.bind(this);
        this.handleRecommendationChange = this.handleRecommendationChange.bind(this);
        this.handleDismissMessage = this.handleDismissMessage.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments = () => {
        this.setState({ showComments: !this.state.showComments})
    };

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
        const { expanded, showComments } = this.state;
        const { publication, title, author, submitted, id } = this.props.submission;
        const {pubImage} = this.props;
        const { lastAction, decision, recommendation, comments } = this.props.submission.reviewerInfo;
        const lastActionDate = formatDate(lastAction);
        const submittedDate = formatDate(submitted);

        let message;
        if (this.state.message) {
            message = <Message positive header={this.state.message} onDismiss={this.handleDismissMessage}/>
        }

        let commentCounter;
        if (comments.length) {
            commentCounter = <li className="comment__counter" onClick={() => this.toggleComments()}>{comments.length} <Icon name="comments"/></li>
        }

        let commentList;
        if (showComments) {
            commentList = <CommentList comments={comments} submissionId={id} />
        }

        return (
            <div className="card review">
                <StatusIndicator className="indicator" status={decision}/>
                <section>
                    <ul>
                        <li className='title'>{title}</li>
                        <li className='author'>{author}</li>
                        <li className='date'><time dateTime={submitted}>{submittedDate}</time></li>
                    </ul>
                    <div className='publication__wrapper'>
                        <div className='image'><img src={pubImage} alt={`${publication} logo`}/></div>
                        <ul className="publication">
                            <li className='publication'>{publication}</li>
                            <li className='status'>Decision: {decision}</li>
                            <li className='last-action'>Last reviewer action: <time dateTime={lastAction}>{lastActionDate}</time></li>
                            {commentCounter}
                            {commentList}
                        </ul>

                    </div>
                </section>
                <Link className="view-submission-button" to={`/submission/${id}`}>View submission</Link>
                <div className={expanded ? "additional reviewer visible" : "hidden additional reviewer"}>
                    {message}
                    <dl className="status__info">
                        <p className="status__info__note">Use dropdowns to change status</p>
                        <dt>Decision (visible to submitter):</dt>
                        <ConfirmableDropdown id='newDecision'
                                             disabled={!!this.props.updating}
                                             confirmText='Send final decision'
                                             warning={<p className="caution">The submitter WILL see a new status</p>}
                                             onConfirm={this.handleDecisionChange}
                                             options={this.props.statusLists.decision}
                                             value={decision}

                        />
                        <dt>Recommendation:</dt>
                        <ConfirmableDropdown id='newRecommendation'
                                             disabled={!!this.props.updating}
                                             confirmText='Update recommendation'
                                             warning={<p>The submitter will NOT see this change</p>}
                                             onConfirm={this.handleRecommendationChange}
                                             options={this.props.statusLists.recommendation}
                                             value={recommendation}
                        />
                    </dl>
                </div>
                <button className="expand" onClick={() => this.toggleExpand()}>{expanded ? 'Cancel' : 'Edit'}</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
    updating: state.submissions.updating[ownProps.submission.id],
    pubImage: state.publications.publications[ownProps.submission.publication]
        ? state.publications.publications[ownProps.submission.publication].image
        : 'https://s3.amazonaws.com/sublitr-images/logo.svg'
});

export default connect(mapStateToProps)(ReviewCard)