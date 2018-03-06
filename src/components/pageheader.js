import React from 'react';

export default function PageHeader(props) {
    const subtitle = props.subtitle;
    if (subtitle) {
        return (
            <header>
                <h1>{props.title}</h1>
                <h2>{subtitle}</h2>
            </header>
        );
    }
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
};