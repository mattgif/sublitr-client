import React from 'react';
import MaterialInput from "./materialinput";

export default function ModalContent(props) {
    const inputs = !props.inputs ? '' : props.inputs.map((input, index) => {
        return <MaterialInput key={index} fieldType={input.fieldType} field={input.field} label={input.label}/>
    });

    const buttons = props.buttons.map((button, index) => {
        return <button key={index} className={button.class}>{button.label}</button>
    });

    return (
        <div className="modal__content">
            <button className="modal__close" onClick={()=> close()}>X</button>
            <h2>{props.title}</h2>
            {inputs ? <form>{inputs}</form> : ''}
            {buttons}
        </div>
    )
}