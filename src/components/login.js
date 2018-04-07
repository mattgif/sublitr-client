import React from 'react';
import {Modal, Message} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import MaterialInput from "./materialinput";
import {emailFormat, required} from "../validators";
import {login} from "../actions/auth";

class Login extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {
        let loginError;
        if (this.props.error) {
            loginError = <Message error header={this.props.error} />
        }
        return (
            <Modal trigger={<button>Log in</button>} size="tiny">
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    {loginError}
                    <form
                        className="login__form"
                        onSubmit={this.props.handleSubmit(values =>
                            this.onSubmit(values)
                        )}
                    >
                        <Field
                            label='Email'
                            type='email'
                            name='email'
                            component={MaterialInput}
                            validate={[required, emailFormat]}
                        />
                        <Field
                            label='Password'
                            name='password'
                            type='password'
                            component={MaterialInput}
                            validate={[required]}
                        />
                        <button disabled={this.props.pristine || this.props.loading}>Log in</button>
                    </form>
                </Modal.Content>
            </Modal>

        )
    }
}

export default reduxForm({
    form: 'login'
})(Login);
