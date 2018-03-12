import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function Navbar(props) {
    return (
        <nav>
            <Router>
                <Link to='#'/>
            </Router>
            <button>Log in</button>
        </nav>
    )
}