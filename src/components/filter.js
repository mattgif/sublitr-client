import React from 'react';

export default function Filter(props) {
    const options = props.options;
    let optionList;
    if (options) {
        optionList = options.map((option, index) => {
            <option key={index} value={option.value}>{option.label}</option>
        });
    }

    return (
        <select name={props.name} id={props.name}>
            {optionList}
        </select>
    )
}