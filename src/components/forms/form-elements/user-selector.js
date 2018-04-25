import React from 'react';
import { connect } from 'react-redux';
import { Dropdown} from 'semantic-ui-react';
import {fetchUserList} from "../../../actions/users";

export class UserSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            searchQuery: null,
            value: [],
            userOptions: this.props.users.map(user => {
                return {
                    key: user.id,
                    text:`${user.firstName} ${user.lastName} (${user.email})`,
                    value: user.id
                }
            })
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleChange = (e, {value}) => {
        this.props.onChange(value);
        this.setState({value})
    };
    handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery});

    render() {
        const {isFetching, value, userOptions} = this.state;

        return <Dropdown
            selection
            multiple
            search
            options={userOptions}
            value={value}
            placeholder='Add Users'
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            disabled={isFetching}
            loading={isFetching}
        />
    }
}

const mapStateToProps = state => ({
    users: state.users.users
});

export default connect(mapStateToProps)(UserSelector)