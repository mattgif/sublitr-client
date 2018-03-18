import React from 'react';
import {connect} from 'react-redux';
import UserTable from "./usertable";

export class TabUsers extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userFilter: "all"
        }
    };

    updateFilter = e => {this.setState({userFilter: e.target.value})};

    render() {
        return (
            <section className={this.props.hidden ? "tab hidden" : "tab"}>
                <h2>Users</h2>

                <label htmlFor="userFilter">User roles</label>
                <select className="filter"
                        name="userFilter"
                        id="userFilter"
                        value={this.state.userFilter}
                        onChange={e => this.updateFilter(e)}>
                    <option value="all">All users</option>
                    <option value="editor">Editors</option>
                    <option value="non">Non-editors</option>
                </select>

                <UserTable filter={this.state.userFilter}/>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    users: state.sublitr.users
});

export default connect(mapStateToProps)(TabUsers)