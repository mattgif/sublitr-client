import React from 'react';
import { Icon } from 'semantic-ui-react';
import './statusindicator.css';

export default function StatusIndicator(props) {
    const {status} = props;
    const statusShape = {
        declined: 'circle',
        accepted: 'ribbon',
        revise: 'pointer',
        pending: 'circle'
    };
    let content;
    if (status === 'pending') {
        content = <Icon name='hourglass full'/>
    } else if (status === 'declined') {
        content = <Icon name='x'/>
    }
    const statusClass = `indicator ${statusShape[status]} ${status}`;
    return <div className={statusClass}>{content}</div>
}