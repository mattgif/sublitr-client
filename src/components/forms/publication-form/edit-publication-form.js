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
            newEditors: [],
            editors: {...this.props.editors},
            clear: false,
            actuallySubmit: false, //redux form bug submitting on change - this is a workaround,
            changed: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.setEditors = this.setEditors.bind(this);
    }

   handleCancel() {this.props.cancel()}

   removeEditor(id) {
        const currentEditors = Object.assign({}, this.state.editors);
        delete currentEditors[id];
        this.setState({editors: currentEditors, changed: true})
   }

    setEditors(idArray) {
        const newEditors = idArray.map(id => this.props.userHash[id]);
        this.setState({changed: true, editors: {...this.state.editors, ...newEditors}})
    }

    onSubmit(values) {
        if (!this.state.actuallySubmit) return;
        const editors = Object.assign({}, this.state.editors);
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
            })
    }

    render() {
        const globalEditors = this.props.editors; // editors in reducer
        let errorMessage;
        if (this.props.submitFailed) {
            errorMessage = (
                <Message negative><Message.Header>Submission error</Message.Header><p>{this.props.error}</p></Message>
            )
        }

        let editorItems;
        if (globalEditors) {
            editorItems = Object.keys(globalEditors).map(editor => {
                let style = {};
                if (!Object.keys(this.state.editors).includes(editor)) {
                    style = {textDecoration: 'line-through'}
                }
                return (
                <li key={editor}>
                    <span style={style}>{globalEditors[editor].email}</span>  <button onClick={() => this.removeEditor(editor)} className="remove">remove</button>
                </li>
            )});
        }

        let hideButtons;
        if (!this.state.changed) {
            hideButtons = {display: 'none'}
        }

        return (
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {errorMessage}
                <h3>{this.props.title}</h3>

                <h4>Editors</h4>
                <ul>
                    {editorItems}
                </ul>
                <h4>Add editors</h4>
                <UserSelector onChange={this.setEditors}/>
                <Button.Group style={hideButtons}>
                    <Button type="button" onClick={() => this.handleCancel()}>Cancel</Button>
                    <Button.Or/>
                    <Button primary onClick={() => this.setState({actuallySubmit: true})} type="submit" positive loading={this.props.submitting}>Confirm</Button>
                </Button.Group>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    error: state.publications.error,
    loading: state.publications.loading,
    publications: state.publications.publications,
    editors: state.publications.publications[ownProps.title].editors,
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