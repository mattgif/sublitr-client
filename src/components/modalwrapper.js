import React from 'react';
import {connect} from 'react-redux';
import ModalLogin from "./modallogin";
import {closeModal} from "../actions";
import './modal.css'


export function ModalWrapper(props) {
    return (
        <div className={(props.show ? 'modal__wrapper' : 'modal__wrapper hidden')} aria-hidden={!props.show}>
            <div className="modal__overlay"></div>
            <div className="modal__content">
                <button onClick={() => props.dispatch(closeModal())}>close</button>
                {<ModalLogin/>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    show: state.modal.show,
    type: state.modal.type
});

export default connect(mapStateToProps)(ModalWrapper)