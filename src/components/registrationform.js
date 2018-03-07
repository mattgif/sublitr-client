import React from 'react';
import MaterialInput from "./materialinput";

export default function RegistrationForm(props) {
    return (
        <form>
            {props.description}
            <MaterialInput label="First Name" field="firstName"/>
            <MaterialInput label="Last Name" field="lastName"/>
            <MaterialInput type="email" label="Email" field="email"/>
            <MaterialInput type="password" label="Password" field="password"/>
            <MaterialInput type="password" label="Retype password to confirm" field="confirmPassword"/>
            <button type="submit">Join</button>
        </form>
    );
}