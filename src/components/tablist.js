import React from 'react';
import {connect} from 'react-redux';
import './tablist.css';
import {changeTab} from "../actions";

export function TabList(props) {
    const onClick = (tab) => (
        props.dispatch(changeTab(tab))
    );

    return(
        <nav className="tabList">
            <ul>
                <li className={(props.active === "submissions") ? "active" : ''} onClick={e => onClick("submissions")}>Submissions</li>
                <li className={(props.active === "review") ? "active" : ''} onClick={e => onClick("review")}>Review</li>
                <li className={(props.active === "users") ? "active" : ''} onClick={e => onClick("users")}>Users</li>
            </ul>
        </nav>
    )
}

TabList.defaultProps = {
    active: 'submissions'
};

export default connect()(TabList);