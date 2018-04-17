import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import TabList from "./tablist";
import TabReview from "./review-pane/index";
import TabUsers from "./user-pane/tabusers";
import TabSubmissions from "./submission-pane/tabsubmissions";

export function Dashboard(props) {
    let name;
    if (props.user) {
        name = props.user.firstName + ' ' + props.user.lastName;
    }

    if (props.user.admin || props.user.editor) {
        return (
            <div>
                <header>
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
        <div>
            <TabSubmissions/>
        </div>
    )

}

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.match.params.activeTab || 'submissions',
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Dashboard);