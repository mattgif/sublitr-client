import React from 'react'
import {connect} from 'react-redux';
import DeleteCommentConfirm from './delete-comment-confirm';
import CircleLoadingSpinner from '../../loading-animations/circle-loading-spinner/index';
import './commentcard.css';
import {formatDate} from "../../../actions/utils";
import SimpleAvatar from "../../simple-avatar";


export function CommentCard(props) {
    const {text, firstName, lastName, date, authorID} = props.comment;
    const name = `${firstName} ${lastName}`;
    const formattedDate = formatDate(date);

    let deleteButton;
    if (authorID === props.userID) {
        if (props.deleting) {
            deleteButton = <CircleLoadingSpinner/>
        } else {
            deleteButton = (
                <DeleteCommentConfirm submissionId={props.submissionId} commentId={props.comment._id}/>
            )
        }
    }

    return (
        <li className="comments__card">
            <section className="commenter__avatar"><SimpleAvatar name={name}/></section>
            <div>
                <section className="comments__name__date">
                    <div className="comments__name">{name}</div>
                    <div className="comments__date">{formattedDate}</div>
                </section>
                <section className="comments__body">
                    {text}
                </section>
                {deleteButton}
            </div>
        </li>
    )
}

const mapStateToProps = (state, ownProps) => ({
    userID: state.auth.currentUser.id,
    deleting: state.submissions.deletingComment[ownProps.commentId] ? state.submissions.deletingComment[ownProps.commentId] : null
});

export default connect(mapStateToProps)(CommentCard)