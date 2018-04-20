import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import Login from '../modals/login';
import {clearAuth} from "../../actions/auth";
import {clearAuthToken} from "../../localstorage";
import owlLogo from '../../static/images/logo.svg'
import {clearSubmissions} from "../../actions/submissions";

export function Navbar(props) {
    const logOut = () => {
        props.dispatch(clearAuth());
        props.dispatch(clearSubmissions());
        clearAuthToken();
    };

    let shadow = '';
    if (props.user) {
        // add drop shadow when not showing landing
        shadow = ' navbar__shadow'
    }
    return (
        <nav className={"navbar" + shadow}>
            <div className="navbar__inner">
                <Link className="navbar__brand" to='/'><span
                    className="navbar__brand__outer">sub</span><span
                    className="navbar__brand__inner">lit</span><span
                    className="navbar__brand__outer">r</span>
                    <img id="navbar__logo" src={owlLogo} alt="sublitr owl logo"/>
                </Link>
                { props.user ? <button onClick={() => logOut()}>Logout</button>:<Login/> }
            </div>

        </nav>
    )
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar)
