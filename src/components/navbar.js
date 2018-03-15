import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css'
import {openModal} from "../actions";

export function Navbar(props) {
    return (
        <nav className="navbar">
            <Link to='#'/>
            <button onClick={() => props.dispatch(openModal('login'))}>Log in</button>
        </nav>
    )
}

export default connect()(Navbar)
