import React from 'react';

export default function TabHeader(props) {
    return(
        <div>
            <h2>{props.title}</h2>
            {props.secondary}
            {props.filters}
        </div>
    )
}