import React from 'react';
import PageHeader from "./pageheader";
import TabList from "./tablist";
import TabContent from "./tabcontent";

export default function Dashboard(props) {
    let name;
    if (props.user) {
        name = props.user.first + ' ' + props.user.last;
    }
    return (
        <div>
            <PageHeader title={name}/>
            <TabList active={props.active}/>
            <TabContent active={props.active}/>
        </div>
    )
}

Dashboard.defaultProps = {
    active: 'submissions'
};