import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './tablist.css';

export function TabList(props) {
    const {admin, editor, active} = props;
    let reviewTab, userTab, publicationTab;

    const tabItem = (link, text, name) => {
        let isActive = '';
        if (active === name) {
            isActive = 'active'
        }
        return (
            <li className={`tabList__item ${isActive}`}>
                <Link className='tabList__link' to={link}>{text}</Link>
            </li>
        )
    };

    if (admin || editor) { reviewTab = tabItem('/dashboard/review', 'Review', 'review'); }

    if (admin) {
        userTab = tabItem('/dashboard/users', 'Users', 'users');
        publicationTab = tabItem('/dashboard/publications', 'Publications', 'publications');
    }

    return(
        <nav className="tabList">
            <ul className="tabList__list">
                {tabItem('/dashboard/submissions', 'Submissions', 'submissions')}
                {reviewTab}
                {userTab}
                {publicationTab}
            </ul>
        </nav>
    )
}

TabList.defaultProps = {
    active: 'submissions'
};

export default connect()(TabList);