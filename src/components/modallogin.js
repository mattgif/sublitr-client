import React from 'react';
import MaterialInput from "./materialinput";

export default function ModalLogin(props) {
    return (
        <form>
            <MaterialInput/>
            <MaterialInput/>
            <button type="submit">Login</button>
        </form>
    )
}