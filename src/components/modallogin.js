import React from 'react';
import MaterialInput from "./materialinput";

export default function ModalLogin(props) {
    return (
        <form>
            <h2>Log in</h2>
            <MaterialInput field={"emailLogin"} fieldType={"email"} label={"Email"}/>
            <MaterialInput field={"passwordLogin"} fieldType={"password"} label={"Password"}/>
            <button type="submit">Log in</button>
        </form>

    )
}