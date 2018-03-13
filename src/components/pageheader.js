import React from 'react';

export default function PageHeader(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <h3>{props.subtitle ? props.subtitle : ''}</h3>
        </header>
    );
};