import React from 'react';
import './commentsform.css';

export default function CommentForm(props) {
    return(
        <form className="comments__form">
            <h4>Comment:</h4>
            <textarea name="newComment" id="newComment"></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}