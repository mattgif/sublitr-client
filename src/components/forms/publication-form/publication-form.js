import React from 'react';
import Input from "../form-elements/semantic-form-field";
import {Field, reduxForm } from 'redux-form';
import { Button, Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {nonEmpty, required} from "../../../validators";
import FileInput from "../form-elements/file-upload";
import '../submission-form/submission-form.css'
import CustomFileButton from "../form-elements/custom-file-button";
import {showDashboardMessage, togglePublicationForm} from "../../../actions";
import UserSelector from "../form-elements/user-selector";
import {createPublication} from "../../../actions/publications";
import './publication-form.css';

export class PublicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            fileError: false,
            editors: []
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCustomFileButtonClick = this.handleCustomFileButtonClick.bind(this);
        this.setEditors = this.setEditors.bind(this);
    }

    handleUpload(e) { this.setState({ image: e.target.files[0]}); }

    handleCustomFileButtonClick() {document.getElementById('image').click();}

    handleCancel() {return this.props.dispatch(togglePublicationForm())}

    setEditors(idArray) {
        const editors = idArray.map(id => this.props.userHash[id]);
        return this.setState({editors})
    }

    onSubmit(values) {
        const data = new FormData();
        data.append('editors', JSON.stringify(this.state.editors));
        data.append('title', values.title);
        data.append('image', this.state.image);

        return this.props.dispatch(createPublication(data))
            .then(() => {
                this.props.dispatch(showDashboardMessage({
                    header: 'Successfully added publication',
                    text: values.title,
                    error: false,
                    positive: true
                }));
                this.props.dispatch(togglePublicationForm());
            })
    }

    render() {
        let errorMessage;
        if (this.props.submitFailed) {
            errorMessage = (
                <Message negative><Message.Header>Submission error</Message.Header><p>{this.props.error}</p></Message>
            )
        }

        return (
            <form className="publication__form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <header className="publication__form__header">
                    <h3>Add a publication</h3>
                </header>
                {errorMessage}
                <fieldset>
                    <Field name="title" placeholder="Publication title" type="text" component={Input} validate={[required, nonEmpty]} id="title__input" />
                    <label htmlFor="image">Add an image (optional)</label>
                    <Field name="image" type="file" id="image" onChange={this.handleUpload} component={FileInput} validate={[]}/>
                    <CustomFileButton className="custom__file__button" fileName={this.state.image ? this.state.image.name : undefined} click={() => this.handleCustomFileButtonClick()}/>
                </fieldset>
                <fieldset>
                    <h4>Add editors (editors will be able to view and update submissions to this journal)</h4>
                    <UserSelector onChange={this.setEditors}/>
                </fieldset>
                <section className="submission__form buttons">
                    <Button type="button" onClick={() => this.handleCancel()} disabled={this.props.submitting}>Cancel</Button>
                    <Button primary type="submit" disabled={this.props.pristine} loading={this.props.submitting}>Submit</Button>
                </section>
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

PublicationForm = connect(mapStateToProps)(PublicationForm);

export default reduxForm({
    form: 'publication'
})(PublicationForm)