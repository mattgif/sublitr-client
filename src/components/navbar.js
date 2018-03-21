import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css'
import {logout} from "../actions";
import Login from './login';

export function Navbar(props) {
    return (
        <nav className="navbar">
            <Link to='#'/>
            { props.user ? <button onClick={() => props.dispatch(logout())}>Logout</button>:<Login/> }
        </nav>
    )
}

const mapStateToProps = state => ({
    user: state.sublitr.user
});
export default connect(mapStateToProps)(Navbar)
