import React from 'react';
import {connect} from 'react-redux';
import {fetchUserList} from "../actions";
import DeleteUserConfirm from "./deleteuserconfirm";
import {editUserInfo} from "../actions/users";
import SortableTable from "./sortableTable";

export class UserTable extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchUserList());
    }

    filterUsers(usersArray, filterValue) {
        if (filterValue === 'all') {
            return usersArray
        }
        return usersArray.filter(user => user.editor === (filterValue === 'editor'));
    }

    toggleEditor(id, isEditor) {
        this.props.dispatch(editUserInfo({
            id,
            editor: !isEditor
        }))
    }

    formattedUserRows(usersArray) {
        return usersArray.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td><input type="checkbox"
                               name="editor"
                               checked={user.editor}
                               onChange={() => this.toggleEditor(user.id, user.editor)}/></td>
                    <td>
                        <DeleteUserConfirm user={user}/>
                    </td>
                </tr>
            )
        });
    }

    render() {
        if (!this.props.users) {
            return <h4>No user data found</h4>
        }
        const userRows = this.formattedUserRows(
            this.filterUsers(this.props.users, this.props.filter)
        );

        return (
            <SortableTable headers={['Last','First','Email','Editor']} tableId='userTable'>
                {userRows}
            </SortableTable>
        )
    }
}

const mapStateToProps = state => ({
    users: state.sublitr.users
});

export default connect(mapStateToProps)(UserTable)

