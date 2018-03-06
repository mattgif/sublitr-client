import React from 'react';

export default function RegistrationForm(props) {
    return (
        <form>
            {props.description}
            <button type="submit">Submit</button>
        </form>
    );
}