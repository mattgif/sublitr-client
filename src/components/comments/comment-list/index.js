import React from 'react';
import {connect} from 'react-redux';
import CommentCard from "../comment-card";
import './comment-list.css'

export class CommentList extends React.Component {
    render() {
        if (!this.props.comments) {
            return <ul/>
        }
        const sortedComments = this.props.comments.sort(function(a,b){
            // sort newest to oldest
            return new Date(b.date) - new Date(a.date)
        });
        const commentCards = sortedComments.map(comment => {
            // returns array of comments cards (which are <li> elements)
            return <CommentCard key={comment._id} comment={comment} submissionId={this.props.submissionId}/>
        });

        return (
            <ul className="comment__list">
                {commentCards}
            </ul>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    comments: state.submissions.submissionData[ownProps.submissionId].reviewerInfo.comments || null
});

export default connect(mapStateToProps)(CommentList);