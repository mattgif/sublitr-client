import React from 'react';
import './mobilemenutoggle.css';


export default function MobileMenuToggle(props) {
    return(
        <div className="sidebar__toggle">
            <input type="checkbox" checked={props.checked} onChange={() => props.onChange()}/>
            <span/>
            <span/>
            <span/>
        </div>
    )
}

