import React from 'react';

export default function Filter(props) {
    let options = props.options;
    if (options) {
        options = options.map((option, index) => {
            return(<option key={index} value={option.value}>{option.label}</option>);
        });
    }

    return (
        <select name={props.name} id={props.name}>
            {options}
        </select>
    )
}