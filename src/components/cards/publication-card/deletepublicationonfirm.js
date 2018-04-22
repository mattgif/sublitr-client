import React from 'react';
import {connect} from 'react-redux';
import {Confirm} from 'semantic-ui-react';
import {deletePublication} from "../../../actions/publications";

class DeletePublicationConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    };

    show = (e) => {this.setState({ open: true });};

    handleConfirm = () => {
        this.props.dispatch(deletePublication(this.props.title, this.props.id));
        this.setState({ open: false });
    };

    handleCancel = () => this.setState({ open: false });

    render() {
        const {title} = this.props;
        return (
            <div>
                <button className={this.props.className} onClick={(e) => this.show(e)}>Delete</button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={`Delete ${title}?`}
                    confirmButton='Delete publication'
                    size='tiny'
                />
            </div>
        )
    }
}

export default connect()(DeletePublicationConfirm)