import React from 'react';

export default function PageHeader(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <h2>{props.subtitle ? props.subtitle : ''}</h2>
        </header>
    );
};