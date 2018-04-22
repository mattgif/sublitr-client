import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './tablist.css';

export function TabList(props) {
    const {admin, editor} = props;
    let reviewTab, userTab, publicationTab;

    if (admin || editor) {
        reviewTab =
            <li className="tabList__item">
                <Link className="tabList__link" to={'/dashboard/review'}>Review</Link>
            </li>;
    }

    if (admin) {
        userTab =
            <li className="tabList__item">
                <Link className="tabList__link" to={'/dashboard/users'}>Users</Link>
            </li>;

        publicationTab =
            <li className="tabList__item">
                <Link className="tabList__link" to={'/dashboard/publications'}>Publications</Link>
            </li>;
    }

    return(
        <nav className="tabList">
            <ul className="tabList__list">
                <li className="tabList__item">
                    <Link className="tabList__link" to={'/dashboard/submissions'}>Submissions</Link>
                </li>
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