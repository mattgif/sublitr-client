import React from 'react';


export default function MaterialInput(props) {
    const fieldType = props.fieldType ? props.fieldType : "text";

    return (
        <div>
            <label htmlFor={props.field}>{props.label}</label>
            <input type={fieldType} name={props.field} id={props.field}/>
        </div>
    )
}

