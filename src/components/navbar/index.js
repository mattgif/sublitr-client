import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import Login from '../modals/login';
import {clearAuth} from "../../actions/auth";
import {clearAuthToken} from "../../localstorage";
import owlLogo from '../../static/images/logo_purp.svg'
import {clearSubmissions} from "../../actions/submissions";
import MobileMenuToggle from "./mobilemenutoggle";
import {clearAppState, toggleDocViewerSidebar} from "../../actions";

export function Navbar(props) {
    const logOut = () => {
        props.dispatch(clearAuth());
        props.dispatch(clearSubmissions());
        props.dispatch(clearAppState());
        clearAuthToken();
    };

    function toggleVisibility() {
        props.dispatch(toggleDocViewerSidebar())
    }

    let shadow = '';
    if (props.user) {
        // add drop shadow when not showing landing
        shadow = ' navbar__shadow'
    }

    let menuButton = undefined;
    if (props.displayMenuButton) {
        menuButton = <MobileMenuToggle checked={props.menuOpen} onChange={toggleVisibility}/>
    }

    return (
        <nav className={"navbar" + shadow}>
            <div className="navbar__inner">
                {menuButton}
                <Link className={`navbar__brand ${props.displayMenuButton ? 'shift' : ''}`} to='/'><span
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
    user: state.auth.currentUser,
    displayMenuButton: state.sublitr.displayMenuButton,
    menuOpen: state.sublitr.showSidebar
});

export default connect(mapStateToProps)(Navbar)
