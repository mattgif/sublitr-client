import React from 'react';
import {Field, reduxForm} from 'redux-form';
import MaterialInput from "./materialinput";
import {required, length, nonEmpty, matches, emailFormat} from '../validators';
import {createUser} from "../actions/users";
import {login} from "../actions/auth";
const passwordLength = length({min: 8, max: 72});
const passwordMatch = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {email, password, firstName, lastName} = values;
        const user = {email, password, firstName, lastName};
        this.props.dispatch(createUser(user))
            .then(() => this.props.dispatch(login(email, password)))
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
                <div className="form__error"/>
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