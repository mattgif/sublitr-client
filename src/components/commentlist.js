import React from 'react';
import CommentCard from "./commentcard";
import './commentlist.css'

export default function CommentList(props) {
    const comments = props.comments.map(comment => {
       return <CommentCard comment={comment}/>
    });
    return (
        <ul className="comments__list">
            {comments}
        </ul>
    )
}