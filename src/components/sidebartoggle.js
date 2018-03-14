import React from 'react';
import {connect} from 'react-redux';
import {toggleSidebar} from "../actions";
import './sidebartoggle.css';


export function SidebarToggle(props) {
    return(
        <div className="sidebar__toggle">
            <input type="checkbox" checked={props.checked} onChange={e => props.dispatch(toggleSidebar())}/>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

const mapStateToProps = state => ({
    checked: state.showSidebar
});

export default connect(mapStateToProps)(SidebarToggle)
