import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import Login from '../modals/login';
import {clearAuth} from "../../actions/auth";
import {clearAuthToken} from "../../localstorage";
import { Icon } from 'semantic-ui-react'

export function Navbar(props) {
    const logOut = () => {
        props.dispatch(clearAuth());
        clearAuthToken();
    };

    let shadow = '';
    if (props.user) {
        // add drop shadow when not showing landing
        shadow = ' navbar__shadow'
    }
    return (
        <nav className={"navbar" + shadow}>
            <Link className="navbar__brand" to='/'><Icon name="strikethrough"/> <span
                className="navbar__brand__outer">sub</span><span
                className="navbar__brand__inner">lit</span><span
                className="navbar__brand__outer">r</span>
            </Link>
            { props.user ? <button onClick={() => logOut()}>Logout</button>:<Login/> }
        </nav>
    )
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar)
