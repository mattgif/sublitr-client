import React from 'react';
import {connect} from 'react-redux';
import {Confirm, Icon} from 'semantic-ui-react';
import {deleteSubmission} from "../../../actions/submissions";

class DeleteSubmissionConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    };

    id = this.props.id;

    show = (e) => {
        //stopProp to keep card from toggling collapse state
        e.stopPropagation();
        this.setState({ open: true });
    };

    handleConfirm = () => {
        this.props.dispatch(deleteSubmission(this.id));
        this.setState({ open: false });
    };

    handleCancel = () => this.setState({ open: false });

    render() {
        const title = this.props.title;
        return (
            <div className={this.props.className}>
                <button onClick={(e) => this.show(e)}><Icon name='trash outline'/> Delete</button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={`Delete ${title}?`}
                    confirmButton='Delete submission'
                    size='tiny'
                />
            </div>
        )
    }
}

export default connect()(DeleteSubmissionConfirm)