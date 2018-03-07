import React from 'react';

export default function TabList(props) {
    const tabs = props.tabs;
    const tabList = tabs.map((tab, index) => <li key={index}>{tab}</li>);

    return(
        <nav>
            <ul>
                {tabList}
            </ul>
        </nav>
    )
}