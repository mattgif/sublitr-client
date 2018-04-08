import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import Login from './login';
import {clearAuth} from "../actions/auth";
import {clearAuthToken} from "../localstorage";

export function Navbar(props) {
    const logOut = () => {
        props.dispatch(clearAuth());
        clearAuthToken();
    };

    return (
        <nav className="navbar">
            <Link to='#'/>
            { props.user ? <button onClick={() => logOut()}>Logout</button>:<Login/> }
        </nav>
    )
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar)
