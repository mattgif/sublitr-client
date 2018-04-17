import React from 'react';
import CommentForm from '../comment-form';
import CommentList from '../comment-list';

export default function CommentSection(props) {
    return (
        <section>
            <CommentForm submissionID={props.submissionId}/>
            <CommentList submissionId={props.submissionId}/>
        </section>
    )
};