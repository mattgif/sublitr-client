import React from 'react';
import {connect} from 'react-redux';
import {fetchUserList} from "../actions";
import DeleteUserConfirm from "./deleteuserconfirm";
import {editUserInfo} from "../actions/users";

export class UserTable extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchUserList());
    }

    constructor(props) {
        super(props);
        this.state = {
            sortParams: {
                key: 'last',
                reverse: false
            }
        };
        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    sortBy(usersArray, sortParams) {
        let arrayCopy = usersArray.slice();
        if (sortParams.reverse) {
            return arrayCopy.sort(this.compareBy(sortParams.key)).reverse();
        }
        return arrayCopy.sort(this.compareBy(sortParams.key));
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

    updateSort(key) {
        if (this.state.sortParams.key === key) {
            this.setState({sortParams: {key: key, reverse: !this.state.sortParams.reverse}})
        } else {
            this.setState({sortParams: {key: key, reverse: false}})
        }
    }

    render() {
        if (!this.props.users) {
            return <h4>No user data found</h4>
        }
        const userRows = this.formattedUserRows(
            this.filterUsers(
                this.sortBy(this.props.users, this.state.sortParams),
                this.props.filter)
        );

        return (
            <table>
                <thead>
                <tr>
                    <th onClick={() => this.updateSort('last')}>Last</th>
                    <th onClick={() => this.updateSort('first')}>First</th>
                    <th onClick={() => this.updateSort('email')}>Email</th>
                    <th onClick={() => this.updateSort('editor')}>Editor</th>
                </tr>
                </thead>
                <tbody>
                {userRows}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    users: state.sublitr.users
});

export default connect(mapStateToProps)(UserTable)

