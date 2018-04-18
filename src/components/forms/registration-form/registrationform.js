import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Input from "../form-elements/semantic-form-field";
import {required, length, nonEmpty, matches, emailFormat} from '../../../validators';
import {createUser} from "../../../actions/users";
import {login} from "../../../actions/auth";
import './registration-form.css';

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
            <form className='registration-form' onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
                <div className="form__error"/>
                <Field
                    name="firstName"
                    type="text"
                    component={Input}
                    placeholder="First name"
                    validate={[required, nonEmpty]}/>
                <Field
                    name="lastName"
                    type="text"
                    component={Input}
                    placeholder="Last name"
                    validate={[required, nonEmpty]}/>
                <Field
                    name="email"
                    type="email"
                    component={Input}
                    placeholder="Email"
                    validate={[required, nonEmpty, emailFormat]}/>
                <Field
                    name="password"
                    type="password"
                    component={Input}
                    placeholder="Password"
                    validate={[required, passwordLength, nonEmpty]}/>
                <Field
                    name="passwordConfirm"
                    type="password"
                    component={Input}
                    placeholder="Confirm password"
                    validate={[required, nonEmpty, passwordMatch]}
                />
                <div className="submit__wrapper">
                    <button className="submit__button" type="submit" disabled={this.props.pristine || this.props.submitting}>Join</button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration'
})(RegistrationForm);