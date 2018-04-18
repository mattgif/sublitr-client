import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import TabList from "./tabs/tablist";
import TabReview from "./review-pane/index";
import TabUsers from "./user-pane/user-pane";
import TabSubmissions from "./submission-pane/submission-pane";

import './dashboard.css';

export function Dashboard(props) {
    let name;
    if (props.user) {
        name = props.user.firstName + ' ' + props.user.lastName;
    }

    if (props.user.admin || props.user.editor) {
        return (
            <div className="dashboard">
                <header className="dashboard__header">
                    <h1>{name}</h1>
                </header>
                <TabList active={props.active}/>
                <Switch>
                    <Route exact path='/dashboard/review' component={TabReview}/>
                    <Route exact path='/dashboard/users' component={TabUsers}/>
                    <Route path='/' component={TabSubmissions}/>
                </Switch>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h1>My dashboard</h1>
            </header>
            <TabSubmissions/>
        </div>
    )

}

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.match.params.activeTab || 'submissions',
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Dashboard);