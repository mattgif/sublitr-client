import React from 'react';
import { connect } from 'react-redux';
import {toggleEditor} from "../actions";

export function UserRow(props) {
    const editorClick = () => {
        props.dispatch(toggleEditor(props.user.email))
    };
    let checked = props.user.editor;

    return (
        <tr>
            <td>{props.user.last}</td>
            <td>{props.user.first}</td>
            <td>{props.user.email}</td>
            <td><input type="checkbox" name="editor" checked={checked} onChange={() => editorClick()}/></td>
            <td><button className="delete">Delete user?</button></td>
        </tr>
    )
}

UserRow.defaultProps = {
    user: {
        first: '',
        last: '',
        email: '',
        editor: false
    }
};

export default connect()(UserRow);