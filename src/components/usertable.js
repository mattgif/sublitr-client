import React from 'react';

import UserRow from './userrow'

export default function UserTable(props) {
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
                {props.users.map((user, index) => {
                    return(<UserRow key={index} user={user}/>)
                })}
            </tbody>
        </table>
    )
}

UserTable.defaultProps = {
    users: []
};