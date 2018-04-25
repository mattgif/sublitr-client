import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {formatDate} from "../../../actions/utils";
import '../expandable-table.css'
import ConfirmableDropdown from "../../confirmable-dropdown";
import {updateStatus} from "../../../actions/submissions";
import { Message, Icon } from 'semantic-ui-react';
import {CommentList} from "../../comments/comment-list";

export class ReviewRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            expanded: false,
            showStatusSelector: false
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
        const {submission, publications} = this.props;
        if (!submission) return <tbody><tr/></tbody>;
        const updating = this.props.updating[submission.id];
        const {decision, recommendation, lastAction, comments} = submission.reviewerInfo;
        const {expanded} = this.state;
        const publication = publications[submission.publication];
        const image = publications[publication] ? publications[publication].image : 'https://s3.amazonaws.com/sublitr-images/logo.svg';
        const formatRecommendation = {
            none: 'Not reviewed',
            underReview: 'Under review',
            accept: 'Accept',
            revise: 'Revise & Resubmit',
            consider: 'Consider',
            decline: 'Decline'
        };

        let message;
        if (this.state.message) {
            message = <Message positive header={this.state.message} onDismiss={this.handleDismissMessage}/>
        }

        let commentCounter;
        if (comments.length) {
            commentCounter = <div><Icon name="comments"/>{comments.length} {`comment${comments.length === 1 ? '' : 's'}`}</div>
        }

        let commentList = <CommentList comments={comments} submissionId={submission.id} />;
        return (
            <tbody>
            <tr onClick={() => this.setState({expanded: !expanded})} className={`bottom ${expanded ? 'dotted' : ''}`}>
                <td className="image"><div className="image"><img src={image} alt={publication.title + " logo"}/></div></td>
                <td className="publication">{publication.title}</td>
                <td className="author">{submission.author}</td>
                <td className="title">{submission.title}</td>
                <td className="recommendation">{formatRecommendation[recommendation]}</td>
                <td className="view" onClick={e => e.stopPropagation()}>
                    <Link className="view-submission-button" to={`/submission/${submission.id}`}>View submission</Link>
                </td>
            </tr>
            <tr className={expanded ? 'expanded bottom' : ''}><td colSpan={6} className={expanded ? 'expanded' : 'collapsed'}>
                {message}
                <div>
                    <dl>
                        <p className="status__info__note">Use dropdowns to change status</p>
                        <dt>Decision (visible to submitter):</dt>
                        <ConfirmableDropdown id='newDecision'
                                             disabled={!!updating}
                                             confirmText='Send final decision'
                                             warning={<p className="caution">The submitter WILL see a new status</p>}
                                             onConfirm={this.handleDecisionChange}
                                             options={this.props.statusLists.decision}
                                             value={decision}

                        />
                        <dt>Recommendation:</dt>
                        <ConfirmableDropdown id='newRecommendation'
                                             disabled={!!updating}
                                             confirmText='Update recommendation'
                                             warning={<p>The submitter will NOT see this change</p>}
                                             onConfirm={this.handleRecommendationChange}
                                             options={this.props.statusLists.recommendation}
                                             value={recommendation}
                        />
                        <p className="date">Submitted {formatDate(submission.submitted).toLowerCase()}</p>
                        <p>Last updated {formatDate(lastAction).toLowerCase()}</p>
                    </dl>
                    <div className="comments">
                        {commentCounter}
                        {commentList}
                    </div>
                </div>
            </td></tr>
            </tbody>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
    updating: state.submissions.updating,
    publications: state.publications.publications,
    submissions: state.submissions.submissionData,
});

export default connect(mapStateToProps)(ReviewRow);