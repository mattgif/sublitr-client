import React from 'react';
import {connect} from 'react-redux';
import {Confirm} from 'semantic-ui-react';
import {deleteUser} from "../actions";

class DeleteUserConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    };

    id = this.props.user.id;

    show = () => this.setState({ open: true });
    handleConfirm = () => {
        this.props.dispatch(deleteUser(this.id));
        this.setState({ open: false });
    };
    handleCancel = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <button onClick={() => this.show()}>Delete</button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={`Delete ${this.props.user.first} ${this.props.user.last}?`}
                    confirmButton='Delete user'
                    size='tiny'
                />
            </div>
        )
    }
}

export default connect()(DeleteUserConfirm)