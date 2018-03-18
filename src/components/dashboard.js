import React from 'react';
import {connect} from 'react-redux';
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
            <TabReview hidden={props.active !== 'review'}/>
            <TabUsers hidden={props.active !== 'users'}/>
            <TabSubmissions hidden={props.active !== 'submissions'}/>
        </div>
    )
}

const mapStateToProps = state => ({
    active: state.sublitr.dashboard.activeTab,
    user: state.sublitr.user
});

export default connect(mapStateToProps)(Dashboard);