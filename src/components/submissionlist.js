import React from 'react';

export default function SubmissionList(props) {
    if (props.submissions) {
        return (
            <ul>
                {props.submissions.map((card, index) => {
                    return(<li key={index}>{card}</li>);
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