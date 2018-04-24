import React from 'react';
import {reduxForm } from 'redux-form';
import { Button, Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import '../submission-form/submission-form.css'
import {showDashboardMessage} from "../../../actions";
import UserSelector from "../form-elements/user-selector";
import {updatePublication} from "../../../actions/publications";

export class EditPublicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEditors: this.props.editors || {},
            newEditors: []
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.setEditors = this.setEditors.bind(this);
    }

   handleCancel() {this.props.cancel()}

   removeEditor(id) {
        const currentEditors = Object.assign({}, this.state.currentEditors);
        delete currentEditors[id];
        this.setState({currentEditors})
   }

    setEditors(idArray) {
        const newEditors = idArray.map(id => this.props.userHash[id]);
        return this.setState({newEditors})
    }

    onSubmit(values) {
        const editors = Object.assign({}, this.state.currentEditors);
        this.state.newEditors.forEach(e => {editors[e.id] = e});
        let data = {'editors':editors};
        data = JSON.stringify(data);
        return this.props.dispatch(updatePublication(data, this.props.id))
            .then(() => {
                this.props.dispatch(showDashboardMessage({
                    header: `Successfully edited ${this.props.title}`,
                    text: values.title,
                    error: false,
                    positive: true
                }));
                this.handleCancel();
            })
    }

    render() {
        const currentEditors = this.state.currentEditors;
        let errorMessage;
        if (this.props.submitFailed) {
            errorMessage = (
                <Message negative><Message.Header>Submission error</Message.Header><p>{this.props.error}</p></Message>
            )
        }

        let editorItems;
        if (currentEditors) {
            editorItems = Object.keys(currentEditors).map(editor => { return (
                <li key={editor}>
                    {currentEditors[editor].email}  <button onClick={() => this.removeEditor(editor)} className="remove">remove</button>
                </li>
            )});
        }

        return (
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {errorMessage}
                <h3>{this.props.title}</h3>

                <h4>Current editors</h4>
                <ul>
                    {editorItems}
                </ul>
                <h4>Add editors</h4>
                <UserSelector onChange={this.setEditors}/>
                <Button.Group>
                    <Button type="button" onClick={() => this.handleCancel()}>Cancel</Button>
                    <Button.Or/>
                    <Button primary type="submit" positive loading={this.props.submitting}>Confirm</Button>
                </Button.Group>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    error: state.publications.error,
    loading: state.publications.loading,
    publications: state.publications.publications,
    pubOptions: state.publications.publicationsOptions(),
    userHash: state.users.users.reduce((accumulator, user) => {
        // hash users array for quick lookup
        accumulator[user.id] = {
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
            email: user.email
        };
        return accumulator;
    }, {})
});

EditPublicationForm = connect(mapStateToProps)(EditPublicationForm);

export default reduxForm({
    form: 'editPublication'
})(EditPublicationForm)