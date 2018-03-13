import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css'

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <Link to='#'/>
            <button>Log in</button>
        </nav>
    )
}