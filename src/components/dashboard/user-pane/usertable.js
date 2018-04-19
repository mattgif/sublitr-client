import React from 'react';
import {connect} from 'react-redux';
import {fetchUserList, userSortBy} from "../../../actions/users";
import DeleteUserConfirm from "./deleteuserconfirm";
import {editUserInfo} from "../../../actions/users";
import { Table, Checkbox, Icon } from 'semantic-ui-react';

export class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {label:'Last', key: 'lastName'},
                {label:'First', key:'firstName'},
                {label:'Email', key:'email'},
                {label:'Editor', key:'editor'}
            ],
        };
        this.sortTable = this.sortTable.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchUserList());
    }

    sortTable(key) {
        this.props.dispatch(userSortBy(key));
    }

    filterUsers(usersArray, filterValue) {
        if (filterValue === 'all') {
            return usersArray
        }
        return usersArray.filter(user => user.editor === (filterValue === 'editor'));
    }

    toggleEditor = (id, isEditor) => {
        this.props.dispatch(editUserInfo({
            id,
            editor: !isEditor
        }))
    };

    formattedHeaders = (sortBy, reverse) => this.state.headers.map(header => {
        let sortIcon = ' ';
        if (header.key === sortBy) {
            sortIcon = reverse ? <Icon name="caret up"/> : <Icon name="caret down"/>;
        }
        return <Table.HeaderCell key={header.key}
                                 onClick={() => this.sortTable(header.key)}>
            {header.label} {sortIcon}
            </Table.HeaderCell>
    });

    formattedUserRows(usersArray) {
        return usersArray.map(user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell collapsing>
                        <label className="editor__toggle__label" htmlFor={user.id + '__editor__toggle'}>
                            Editor:
                        </label>
                        <Checkbox toggle
                                  checked={user.editor}
                                  id={user.id + '__editor__toggle'}
                                  onChange={() => this.toggleEditor(user.id, user.editor)}
                        />
                    </Table.Cell>
                    <Table.Cell><DeleteUserConfirm user={user}/></Table.Cell>
                </Table.Row>
            )
        });
    }

    render() {
        if (!this.props.users) {
            return <h4>No user data found</h4>
        }
        const userRows = this.filterUsers(this.props.users, this.props.filter);
        const tableData = this.formattedUserRows(userRows);

        return (
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        {this.formattedHeaders(this.props.sortBy, this.props.reverse)}
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tableData}
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.users,
    sortBy: state.users.sortBy,
    reverse: state.users.reverse
});

export default connect(mapStateToProps)(UserTable)

