import React from 'react';

export default function PageHeader(props) {
    const subtitle = props.subtitle ? <h3>{props.subtitle}</h3> : ''
    return (
        <header>
            <h1>{props.title}</h1>
            {subtitle}
        </header>
    );
};