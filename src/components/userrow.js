import React from 'react';

export default function UserRow(props) {
    return (
        <tr>
            <td>{props.user.last}</td>
            <td>{props.user.first}</td>
            <td>{props.user.username}</td>
            <td><input type="checkbox" name="editor" checked={props.user.editor}/></td>
        </tr>
    )
}

UserRow.defaultProps = {
    user: {
        first: 'First',
        last: 'Last',
        username: 'username',
        editor: false
    }
};