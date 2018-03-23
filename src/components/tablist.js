import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './tablist.css';

export function TabList(props) {
    return(
        <nav className="tabList">
            <ul className="tabList__list">
                <li className={(props.active === "submissions") ? "active tabList__item" : 'tabList__item'} >
                    <Link className="tabList__link" to={'/dashboard/submissions'}>Submissions</Link>
                </li>
                <li className={(props.active === "review") ? "active tabList__item" : 'tabList__item'} >
                    <Link className="tabList__link"to={'/dashboard/review'}>Review</Link>
                </li>
                <li className={(props.active === "users") ? "active tabList__item" : 'tabList__item'} >
                    <Link className="tabList__link" to={'/dashboard/users'}>Users</Link>
                </li>
            </ul>
        </nav>
    )
}

TabList.defaultProps = {
    active: 'submissions'
};

export default connect()(TabList);