import React from 'react';
import {Modal, Form, Message} from 'semantic-ui-react';
import {connect} from 'react-redux';

class Login extends React.Component {
    render() {
        let loginError;
        if (this.props.error) {
            loginError = <Message error header='Invalid email or password' />
        }
        return (
            <Modal trigger={<button>Log in</button>}>
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    {loginError}
                    <Form>
                        <Form.Input label='Email' type='email' name='email' placeholder='user@example.com'/>
                        <Form.Input label='Password' name='email' type='password'/>
                        <button type='submit'>Log in</button>
                    </Form>
                </Modal.Content>
            </Modal>

        )
    }
}

const mapStateToProps = state => ({
    user: state.sublitr.user
});

export default connect(mapStateToProps)(Login)
