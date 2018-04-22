import React from 'react';
import Input from "../form-elements/semantic-form-field";
import {Field, reduxForm } from 'redux-form';
import { TextArea, Button, Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {isPDF, nonEmpty, required} from "../../../validators";
import {createSubmission} from "../../../actions/submissions";
import FileInput from "../form-elements/file-upload";
import ReduxValidatedDropdown from "../form-elements/redux-validated-dropdown";
import './submission-form.css'
import CustomFileButton from "../form-elements/custom-file-button";
import {showDashboardMessage, toggleSubmissionForm} from "../../../actions";

export class SubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverLetter: '',
            uploadedFile: null,
            fileError: false
        };

        this.handleCoverLetterEntry = this.handleCoverLetterEntry.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCustomFileButtonClick = this.handleCustomFileButtonClick.bind(this);
    }

    handleCoverLetterEntry(e) { this.setState({coverLetter:e.target.value}) }

    handleUpload(e) { this.setState({ uploadedFile: e.target.files[0]}); }

    handleCustomFileButtonClick() {document.getElementById('doc').click();}

    handleCancel() {
        return this.props.dispatch(toggleSubmissionForm())
    }

    onSubmit(values) {
        const data = new FormData();
        data.append('publication', this.props.publications[values.publication]);
        data.append('title', values.title);
        data.append('doc', this.state.uploadedFile);
        if (this.state.coverLetter) {
            data.append('coverLetter', this.state.coverLetter);
        }
        return this.props
            .dispatch(createSubmission(data))
            .then(() => this.props.dispatch(showDashboardMessage({
                header: 'Successfully submitted!',
                text: 'Good luck!',
                error: false,
                positive: true
            })))
            .then(() => this.props.dispatch(toggleSubmissionForm()));
    }

    render() {
        let errorMessage;
        if (this.props.submitFailed) {
            errorMessage = (
                <Message negative><Message.Header>Submission error</Message.Header><p>{this.props.error}</p></Message>
            )
        }

        return (
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <header className="submission__form">
                    <h3>New submission</h3>
                </header>
                {errorMessage}
                <fieldset>
                    <legend>Submission Info</legend>
                    <Field name="title" placeholder="Submission title" type="text" component={Input} validate={[required, nonEmpty]} id="title__input" />
                    <label htmlFor="publication">Submit to which publication?</label>
                    <Field name="publication" options={this.props.pubOptions} component={ReduxValidatedDropdown} validate={[required, nonEmpty]} id="pub_select" />
                </fieldset>
                <fieldset>
                    <legend>Cover letter</legend>
                    <TextArea autoHeight placeholder='Write a short cover letter to the editors of the publication.' style={{ minHeight: 100, width: '100%' }} value={this.state.coverLetter} onChange={this.handleCoverLetterEntry} />
                </fieldset>
                <fieldset>
                    <legend>Upload document</legend>
                    <p className={this.state.uploadedFile ? 'hidden' : 'visible'}>Documents must be in PDF format</p>
                    <Field name="doc" type="file" id="doc" onChange={this.handleUpload} component={FileInput} validate={[isPDF]}/>
                    <CustomFileButton className="custom__file__button" fileName={this.state.uploadedFile ? this.state.uploadedFile.name : undefined} click={() => this.handleCustomFileButtonClick()}/>
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
    publications: state.publications.publications,
    pubOptions: state.publications.publicationsOptions()
});

SubmissionForm = connect(mapStateToProps)(SubmissionForm);

export default reduxForm({
    form: 'submission'
})(SubmissionForm)