import React from 'react';
import UserTable from "./usertable";

export default function TabUsers(props) {
    return(
        <section>
            <h2>Users</h2>

            <label htmlFor="userFilter">User roles</label>
            <select className="filter" name="userFilter" id="userFilter" value={props.filterValues.userFilter}>
                <option value="all">All users</option>
                <option value="editors">Editors</option>
                <option value="regular">Non-editors</option>
            </select>

            <UserTable/>
        </section>
    )
}

TabUsers.defaultProps = {
    filterValues: {
        userFilter: "all"
    },
    users: [
        {first: "Abe", last: "Abrams", email: "aabrams@example.com", editor: false},
        {first: "Betty", last: "Brown", email: "bbrown@example.com", editor: true},
        {first: "Charlie", last: "Chaplin", email: "cchaps@example.com", editor: true},
        {first: "Debbie", last: "Douglas", email: "ddougs@example.com", editor: false},
    ]
};