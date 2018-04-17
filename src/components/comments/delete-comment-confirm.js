import React from 'react';
import {connect} from 'react-redux';
import {Confirm} from 'semantic-ui-react';
import {deleteComment} from "../../actions/submissions";

class DeleteCommentConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    };

    show = () => this.setState({ open: true });
    handleConfirm = () => {
        this.props.dispatch(deleteComment(this.props.submissionId, this.props.commentId));

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
                    content={`Delete this comment?`}
                    confirmButton='Delete comment'
                    size='tiny'
                />
            </div>
        )
    }
}

export default connect()(DeleteCommentConfirm)