import React from 'react';

export default function StatusUpdater(props) {
    const options = props.statusLists[props.type];
    return (
        <select value={props.selected}>
            {options.map((opt, index) => {
                return(<option key={index} value={opt.short}>{opt.long}</option>)
            })}
        </select>
    )
}

StatusUpdater.defaultProps = {
    type: 'decision',
    statusLists: {
        decision: [
            {
                short: 'pending',
                long: 'No decision'
            },
            {
                short: 'revise',
                long: 'Revise & resubmit'
            },
            {
                short: 'accepted',
                long: 'Accepted'
            },
            {
                short: 'declined',
                long: 'Declined'
            }
        ],
        recommendation: [
            {
                short: 'none',
                long: 'Not reviewed'
            },
            {
                short: 'underReview',
                long: 'Under review'
            },
            {
                short: 'accept',
                long: 'Accept'
            },
            {
                short: 'revise',
                long: 'Revise & Resubmit'
            },
            {
                short: 'consider',
                long: 'Consider'
            },
            {
                short: 'decline',
                long: 'Decline'
            }
        ]
    }
};