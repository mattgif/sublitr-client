import React from 'react';
import { Button, Message, Dropdown } from 'semantic-ui-react';
import {connect} from 'react-redux';
import '../submission-form/submission-form.css'
import {showDashboardMessage} from "../../../actions";
import {updatePublication} from "../../../actions/publications";

export class EditPublicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEditors: [],
            editors: {...this.props.editors},
            clear: false,
            changed: false,
            dropDownValue: [],
            searchQuery: null,
            userOptions: this.props.users.map(user => {
                return {
                    key: user.id,
                    text:`${user.firstName} ${user.lastName} (${user.email})`,
                    value: user.id
                }
            }),
            userHash: this.props.users.reduce((accumulator, user) => {
            // hash users array for quick lookup
            accumulator[user.id] = {
                name: `${user.firstName} ${user.lastName}`,
                id: user.id,
                email: user.email
            };
            return accumulator;
        }, {})
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.addEditors = this.addEditors.bind(this);
    }

    handleCancel() {this.props.cancel()}

    removeEditor(id) {
        const currentEditors = Object.assign({}, this.state.editors);
        delete currentEditors[id];
        this.setState({editors: currentEditors, changed: true})
    }

    addEditors(e, {value}) {
        const newEditor = this.state.userHash[value];
        this.setState({changed: true, dropDownValue: value, editors: {...this.state.editors, [value]: newEditor}})
    }

    handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery});

    onSubmit(e, values) {
        e.preventDefault();
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
        const localEditorList = this.state.editors; // editors in component state
        const { dropDownValue, userOptions } = this.state;
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
                if (!Object.keys(localEditorList).includes(editor)) {
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
            <form>
                {errorMessage}
                <h3>{this.props.title}</h3>

                <h4>Editors</h4>

                <ul>
                    {editorItems}
                </ul>

                <h4>Add editors</h4>
                <Dropdown
                    selection
                    search
                    options={userOptions}
                    value={dropDownValue}
                    placeholder='Add Users'
                    onChange={this.addEditors}
                    onSearchChange={this.handleSearchChange}
                />
                <Button.Group style={hideButtons}>
                    <Button type="button" onClick={() => this.handleCancel()}>Cancel</Button>
                    <Button.Or/>
                    <Button primary onClick={(e, values) => this.onSubmit(e, values)} type="submit" positive loading={this.props.submitting}>Confirm</Button>
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
    users: state.users.users
});

export default connect(mapStateToProps)(EditPublicationForm);
