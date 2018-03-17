import React from 'react';
import {connect} from 'react-redux';

import UserRow from './userrow'

export function UserTable(props) {
    const editorFilter = ( (props.filter !== "all") && (props.filter === "editor"));
    const users = props.filter === "all" ? props.users : props.users.filter(user =>
        user.editor === editorFilter
    );

    return (
        <table>
            <thead>
                <tr>
                    <th>Last</th>
                    <th>First</th>
                    <th>Username</th>
                    <th>Editor</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return(<UserRow key={index} user={user}/>)
                })}
            </tbody>
        </table>
    )
}

UserTable.defaultProps = {
    filter: "all"
};

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps)(UserTable)

