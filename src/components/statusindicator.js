import React from 'react';
import './statusindicator.css';

export default function StatusIndicator(props) {
    const statusClass = `circle ${props.status}`;
    return <div className={statusClass}></div>
}