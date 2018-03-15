import React from 'react'
import './commentcard.css';

export default function CommentCard(props) {
    const comment = props.comment;
    return (
        <li className="comments__card">
            <div className="comments__body">
                {comment.text}
            </div>
            <div className="comments__footer">
                <div className="comments__name">{comment.name}</div>
                <div className="comments__date">{comment.date}</div>
            </div>
        </li>
    )
}