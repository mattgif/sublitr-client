import React from 'react';
import {Field, reduxForm} from 'redux-form';
import MaterialInput from "./materialinput";
import {required, length, nonEmpty, matches, emailFormat} from '../validators';
const passwordLength = length({min: 10, max: 72});
const passwordMatch = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {email, password, firstName, lastName} = values;
        const user = {email, password, firstName, lastName};
        // TODO: async user registration
    }
    render() {
        return (
            <form method="POST">
                <div className="form__error"></div>
                <Field
                    name="firstName"
                    type="text"
                    component={MaterialInput}
                    label="First name"
                    validate={[required, nonEmpty]}/>
                <Field
                    name="lastName"
                    type="text"
                    component={MaterialInput}
                    label="Last name"
                    validate={[required, nonEmpty]}/>
                <Field
                    name="email"
                    type="email"
                    component={MaterialInput}
                    label="Email"
                    validate={[required, nonEmpty, emailFormat]}/>
                <Field
                    name="password"
                    type="password"
                    component={MaterialInput}
                    label="Password"
                    validate={[required, passwordLength, nonEmpty]}/>
                <Field
                    name="passwordConfirm"
                    type="password"
                    component={MaterialInput}
                    label="Confirm password"
                    validate={[required, nonEmpty, passwordMatch]}
                />
                <button type="submit" disabled={this.props.pristine || this.props.submitting}>Join</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration'
})(RegistrationForm);