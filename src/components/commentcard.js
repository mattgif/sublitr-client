import React from 'react'
import {connect} from 'react-redux';

import './commentcard.css';

export function CommentCard(props) {
    const {text, name, date, authorID} = props.comment;

    let deleteButton;
    if (authorID === props.userID) {
        deleteButton = (
            <div>
                <button>Delete</button>
            </div>
        )
    }    

    return (
        <li className="comments__card">
            <div className="comments__body">
                {text}
            </div>
            <div className="comments__footer">
                <div className="comments__name">{name}</div>
                <div className="comments__date">{date}</div>
            </div>
            {deleteButton}
        </li>
    )
}

const mapStateToProps = state => ({
    userID: state.auth.currentUser.id
});

export default connect(mapStateToProps)(CommentCard)