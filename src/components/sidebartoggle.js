import React from 'react';
import {connect} from 'react-redux';
import './sidebartoggle.css';


export function SidebarToggle(props) {
    return(
        <div className="sidebar__toggle">
            <input type="checkbox" checked={props.checked}/>
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
