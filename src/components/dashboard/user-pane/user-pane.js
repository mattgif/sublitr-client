import React from 'react';
import UserTable from "./usertable";
import {seedUsers} from "../../../actions/utils";
import { Icon } from 'semantic-ui-react';

export default class UserPanel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userFilter: "all",
            userSearch: '',
        }
    };

    updateFilter = e => {this.setState({userFilter: e.target.value})};

    updateSearch = e => {this.setState({userSearch: e.target.value})};

    hiddenStyle = {
        display: 'none'
    };

    render() {
        const {userSearch, userFilter} = this.state;
        return (
            <section className={this.props.hidden ? "pane hidden" : "pane"}>
                <h2>Users</h2>
                <button style={this.hiddenStyle} onClick={() => seedUsers()}>Seed users</button>
                <label htmlFor="userFilter">User roles</label>
                <select className="filter"
                        name="userFilter"
                        id="userFilter"
                        value={userFilter}
                        onChange={e => this.updateFilter(e)}>
                    <option value="all">All users</option>
                    <option value="editor">Editors</option>
                    <option value="non">Non-editors</option>
                </select>
                <div className="search__filter__wrapper">
                    <input placeholder='Search by name or email' className="search__filter" type='text' value={userSearch} onChange={e => this.updateSearch(e)}/>
                    <Icon name="search"/>
                </div>

                <UserTable filter={userFilter} search={userSearch}/>
            </section>
        )
    }
}