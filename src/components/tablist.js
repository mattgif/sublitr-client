import React from 'react';
import './tablist.css'

export default function TabList(props) {
    return(
        <nav className="tabList">
            <ul>
                <li className={(props.active === "submissions") ? "active" : ''}>Submissions</li>
                <li className={(props.active === "review") ? "active" : ''}>Review</li>
                <li className={(props.active === "users") ? "active" : ''}>Users</li>
            </ul>
        </nav>
    )
}

TabList.defaultProps = {
    active: 'submissions'
};