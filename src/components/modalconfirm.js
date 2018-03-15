import React from 'react';

export default function ModalConfirm(props) {
    return (
        <div>
            {props.buttons.forEach((button, index) => {
                return <button key={index} className={button.class}>{button.label}</button>
            })}
        </div>
    )
}