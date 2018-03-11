import React from 'react';

export default function ModalWrapper(props) {
    return (
        <div>
            <div className="modal__overlay"></div>
            <div className="modal__content">
                <button className="modal__close">X</button>
                <h2>Login</h2>
            </div>
        </div>
    )
}