import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import TabList from "./tabs/tablist";
import ReviewPane from "./review-pane/index";
import UserPane from "./user-pane/user-pane";
import SubmissionsPane from "./submission-pane/submission-pane";
import PublicationPane from "./publication-pane"

import './dashboard.css';
import {clearDashboardMessage} from "../../actions";

export function Dashboard(props) {
    const {firstName, lastName, admin, editor} = props.user;
    let message, reviewPane, userPane, publicationPane;
    const name = `${firstName} ${lastName}`;

    const handleMessageDismiss = () => { props.dispatch(clearDashboardMessage()) };

    if (props.message) {
        message = <Message style={{margin: '0 15px'}} error={props.message.error} onDismiss={handleMessageDismiss} positive={props.message.positive}><Message.Header>{props.message.header}</Message.Header>{props.message.text}</Message>
    }

    if (admin || editor) {
        reviewPane = <Route exact path='/dashboard/review' component={ReviewPane}/>
    }

    if (admin) {
        userPane = <Route exact path='/dashboard/users' component={UserPane}/>;
        publicationPane = <Route exact path='/dashboard/publications' component={PublicationPane}/>
    }

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h1>{name}</h1>
                {message}
            </header>
            <TabList active={props.active} admin={admin} editor={editor}/>
            <Switch>
                {reviewPane}
                {userPane}
                {publicationPane}
                <Route path='/' component={SubmissionsPane}/>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.match.params.activeTab || 'submissions',
    user: state.auth.currentUser,
    message: state.sublitr.dashboardMessage
});

export default connect(mapStateToProps)(Dashboard);