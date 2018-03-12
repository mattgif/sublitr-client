import React from 'react';
import SubmissionCard from "./submissioncard";

export default function SubmissionList(props) {
    if (props.submissions) {
        return (
            <ul>
                {props.submissions.map((card, index) => {
                    return(<li key={index}><SubmissionCard submission={card} editor={props.editor}/></li>);
                })}
            </ul>
        )
    }
    return (
        <div className='error'>
            <p>No submissions found.</p>
        </div>
    )
}

SubmissionList.defaultProps = {
    editor: false
}