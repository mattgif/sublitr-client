import React from 'react';
import UserTable from "./usertable";
import {seedUsers} from "../actions/utils";

export default class TabUsers extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userFilter: "all"
        }
    };

    updateFilter = e => {this.setState({userFilter: e.target.value})};

    hiddenStyle = {
        display: 'none'
    };

    render() {
        return (
            <section className={this.props.hidden ? "tab hidden" : "tab"}>
                <h2>Users</h2>
                <button style={this.hiddenStyle} onClick={() => seedUsers()}>Seed users</button>
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