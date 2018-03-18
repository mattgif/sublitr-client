import React from 'react';
import {connect} from 'react-redux';
import {toggleEditor, openModal, deleteUser} from "../actions";
import DeleteUserConfirm from "./deleteuserconfirm";



export function UserTable(props) {
    const editorFilter = ( (props.filter !== "all") && (props.filter === "editor"));
    const users = props.filter === "all" ? props.users : props.users.filter(user =>
        user.editor === editorFilter
    );

    const deleteClick = user => {
        props.dispatch(openModal({
                modalType:"confirm",
                label: `Delete ${user.first} ${user.last}?`,
                confirmMessage: 'Delete user',
                confirmAction: () => deleteUser(user.email)
            }
        ))
    };

    let userRows = users.map((user, index) => {
        return(
            <tr key={index}>
                <td>{user.last}</td>
                <td>{user.first}</td>
                <td>{user.email}</td>
                <td><input type="checkbox"
                           name="editor"
                           checked={user.editor}
                           onChange={() => props.dispatch(toggleEditor(user.email))}/></td>
                <td>
                    <DeleteUserConfirm user={user}/>
                </td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Last</th>
                    <th>First</th>
                    <th>Email</th>
                    <th>Editor</th>
                </tr>
            </thead>
            <tbody>
                {userRows}
            </tbody>
        </table>
    )
}

UserTable.defaultProps = {
    filter: "all"
};

const mapStateToProps = state => ({
    users: state.sublitr.users
});

export default connect(mapStateToProps)(UserTable)

