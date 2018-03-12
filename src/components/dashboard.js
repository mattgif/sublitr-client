import React from 'react';
import PageHeader from "./pageheader";
import TabList from "./tablist";
import TabReview from "./tabreview";
import TabUsers from "./tabusers";
import TabSubmissions from "./tabsubmissions";

export default function Dashboard(props) {
    let name;
    if (props.user) {
        name = props.user.first + ' ' + props.user.last;
    }
    const activeTab = (active) => {
        if (active === 'review') return <TabReview/>;
        if (active === 'users') return <TabUsers/>;
        return <TabSubmissions/>;
    };

    return (
        <div>
            <PageHeader title={name}/>
            <TabList active={props.active}/>
            {activeTab(props.active)}
        </div>
    )
}

Dashboard.defaultProps = {
    active: 'submissions'
};