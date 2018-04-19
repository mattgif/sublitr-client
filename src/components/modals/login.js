import React from 'react';
import {Modal, Message} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from "../forms/form-elements/semantic-form-field";
import {emailFormat, required} from "../../validators";
import {login} from "../../actions/auth";
import CircleSpinner from '../loading-animations/circle-loading-spinner';
import './login-modal.css';
import loginImage from './eule.svg'

class Login extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password, true));
    }

    render() {
        let loginError;
        let shake = '';
        if (this.props.error) {
            loginError = <Message error content={this.props.error} />
            shake = ' login__modal__has__error'
        }

        let loadingSpinner;
        if (this.props.loggingIn) {
            loadingSpinner = <CircleSpinner className="login__modal__loading-spinner"/>
        }
        return (
            <Modal className={"login__modal" + shake} trigger={<button>Log in</button>} closeIcon size="tiny">
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <section className="login__modal__error">{loginError}</section>
                    <section className="login__modal__main">
                        <form
                            className="login__form"
                            onSubmit={this.props.handleSubmit(values =>
                                this.onSubmit(values)
                            )}
                        >
                            <Field
                                placeholder='Email'
                                type='email'
                                name='email'
                                component={Input}
                                validate={[required, emailFormat]}
                            />
                            <Field
                                placeholder='Password'
                                name='password'
                                type='password'
                                component={Input}
                                validate={[required]}
                            />
                            <div className="login__modal__button__wrapper">
                                {loadingSpinner}
                                <button id="login__modal__login__button" disabled={this.props.pristine || this.props.loading}>Log in</button>
                            </div>

                        </form>
                        <div className="login__image"><img src={loginImage} alt="owl"/></div>
                    </section>
                </Modal.Content>
            </Modal>

        )
    }
}

const mapStateToProps = state => ({
    loggingIn: (state.auth.loading && state.auth.modalOpen)
});

Login = connect(mapStateToProps)(Login);

export default reduxForm({
    form: 'login'
})(Login);
