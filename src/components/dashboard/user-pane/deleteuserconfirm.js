import React from 'react';
import {connect} from 'react-redux';
import {Confirm} from 'semantic-ui-react';
import {deleteUser} from "../../../actions/users";

class DeleteUserConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    };

    show = () => this.setState({ open: true });
    handleConfirm = () => {
        this.props.dispatch(deleteUser(this.props.user.id));
        this.setState({ open: false });
    };
    handleCancel = () => this.setState({ open: false });

    render() {
        return (
            <div className="user__delete__wrapper">
                <button className="user__delete" onClick={() => this.show()}>Delete</button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={`Delete ${this.props.user.firstName} ${this.props.user.lastName}?`}
                    confirmButton='Delete user'
                    size='tiny'
                />
            </div>
        )
    }
}

export default connect()(DeleteUserConfirm)