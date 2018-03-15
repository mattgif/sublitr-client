import React from 'react';
import {connect} from 'react-redux';
import UserTable from "./usertable";

export function TabUsers(props) {
    const tabClass = props.hidden ? "tab hidden" : "tab"
    return(
        <section className={tabClass}>
            <h2>Users</h2>

            <label htmlFor="userFilter">User roles</label>
            <select className="filter" name="userFilter" id="userFilter" value={props.filterValues.userFilter}>
                <option value="all">All users</option>
                <option value="editors">Editors</option>
                <option value="regular">Non-editors</option>
            </select>

            <UserTable users={props.users}/>
        </section>
    )
}

const mapStateToProps = state => ({
    filterValues: state.filterValues,
    users: state.users
});

export default connect(mapStateToProps)(TabUsers)