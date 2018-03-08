import React from 'react';

export default function StatusUpdater(props) {
    return (
        <select value={props.selected}>
            {props.options.map(opt => {
                return(<option key={opt.value} value={opt.value}>{opt.label}</option>)
            })}
        </select>
    )
}

StatusUpdater.defaultProps = {
    options: [],
};