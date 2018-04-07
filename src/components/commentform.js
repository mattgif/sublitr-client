import React from 'react';
import './commentform.css';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {addComment} from "../actions";

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comment: ''}
    }

    handleChange = e => {
        this.setState({comment:e.target.value})
    };

    handleSubmit(values) {
        const text = values['newComment'];
        const id = this.props.submissionID;
        const comment = {text};
        this.props.dispatch(addComment(comment, id));
    }

    render () {
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
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser,
});

CommentForm = connect(mapStateToProps)(CommentForm);

export default reduxForm({
    form: 'comment'
})(CommentForm)