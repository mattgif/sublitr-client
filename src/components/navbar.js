import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css'
import {openModal, logout} from "../actions";

export function Navbar(props) {
    return (
        <nav className="navbar">
            <Link to='#'/>
            {!props.user ?
                <button onClick={() => props.dispatch(openModal('login'))}>Log in</button> :
                <button onClick={() => props.dispatch(logout())}>Logout</button>
            }
        </nav>
    )
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(Navbar)
