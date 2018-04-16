import React from 'react';
import './commentform.css';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {createComment} from "../actions/submissions";
import CircleLoadingSpinner from "./circle-loading-spinner"

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comment: ''}
    }

    handleChange = e => {
        this.setState({comment:e.target.value})
    };

    handleSubmit(values) {
        const comment = values['newComment'];
        const submissionId = this.props.submissionID;
        this.props.dispatch(createComment(submissionId, comment));
    }

    render () {
        let loading;
        if (this.props.submitting) {
            loading = <CircleLoadingSpinner/>
        }
        return (
            <form className="comments__form"
                  onSubmit={this.props.handleSubmit(values =>
                      this.handleSubmit(values)
                  )}>
                <h4>Comment:</h4>
                <Field
                    name="newComment"
                    className="newComment"
                    value={this.state.comment}
                    onChange={e => this.handleChange(e)}
                    placeholder="Add a new comment"
                    component={'textarea'}
                />
                {loading}
                <button disabled={this.props.submitting} type="submit">Submit</button>
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