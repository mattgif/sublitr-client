import React from 'react';

export default function InfoSection(props) {
    return (
        <section>
            <h3>{props.sectionTitle}</h3>
            <div className="body">{props.body}</div>
        </section>
    )
}