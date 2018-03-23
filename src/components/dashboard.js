import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import PageHeader from "./pageheader";
import TabList from "./tablist";
import TabReview from "./tabreview";
import TabUsers from "./tabusers";
import TabSubmissions from "./tabsubmissions";

export function Dashboard(props) {
    let name;
    if (props.user) {
        name = props.user.first + ' ' + props.user.last;
    }
    return (
        <div>
            <PageHeader title={name}/>
            <TabList active={props.active}/>
            <Switch>
                <Route exact path='/dashboard/review' component={TabReview}/>
                <Route exact path='/dashboard/users' component={TabUsers}/>
                <Route path='/' component={TabSubmissions}/>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.match.params.activeTab || 'submissions',
    user: state.sublitr.user
});

export default connect(mapStateToProps)(Dashboard);