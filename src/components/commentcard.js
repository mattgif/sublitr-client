import React from 'react'
import './commentcard.css';

export default function CommentCard(props) {
    const {text, name, date} = props.comment;

    return (
        <li className="comments__card">
            <div className="comments__body">
                {text}
            </div>
            <div className="comments__footer">
                <div className="comments__name">{name}</div>
                <div className="comments__date">{date}</div>
            </div>
        </li>
    )
}