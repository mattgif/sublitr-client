import React from 'react';
import './commentform.css';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createComment} from "../../../actions/submissions";
import { Button, TextArea } from 'semantic-ui-react';

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comment: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({comment:e.target.value})
    };

    handleSubmit() {
        if (this.state.comment) {
            const comment = this.state.comment;
            const submissionId = this.props.submissionID;
            this.setState({comment: ''});
            return this.props.dispatch(createComment(submissionId, comment));
        }
    }

    render () {
        return (
            <form className="comments__form"
                  onSubmit={this.props.handleSubmit(values =>
                      this.handleSubmit(values)
                  )}>
                <TextArea name="newComment" autoHeight style={{ minHeight: 100, width: '100%' }} value={this.state.comment} onChange={this.handleChange} />
                <Button content='Add Comment' loading={this.props.submitting} labelPosition='left' icon='edit' primary />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser,
    submitting: state.submissions.commenting
});

CommentForm = connect(mapStateToProps)(CommentForm);

export default reduxForm({
    form: 'comment'
})(CommentForm)