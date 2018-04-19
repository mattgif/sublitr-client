import React from 'react';
import Input from "../form-elements/semantic-form-field";
import {Field, reduxForm} from 'redux-form';
import { Dropdown, Form, TextArea } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {nonEmpty, required} from "../../../validators";
import './submission-form.css';
import {createSubmission} from "../../../actions/submissions";

export class SubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverLetter: '',
            uploadedFiles: [],
            fileError: false
        };

        this.handleCoverLetterEntry = this.handleCoverLetterEntry.bind(this)
    }

    handleCoverLetterEntry(e) {
        this.setState({coverLetter:e.target.value})
    }

    onDrop(acceptedFiles) {
        let allValid = true;
        acceptedFiles.forEach(file => {
            if (!this.validFileType(file)) {
                allValid = false;
            }
        });
        if (allValid) {
            this.setState({uploadedFiles:acceptedFiles, fileError: false})
        } else {
            this.setState({fileError: "Invalid file type"})
        }
    }

    validFileType(file) {
        const allowedTypes = this.props.allowedFileTypes;
        return allowedTypes.includes(file.type)
    }

    onSubmit(values) {
        const data = new FormData();
        data.append('publication', values.publication);
        data.append('title', values.title);
        if (values.cover) {
            data.append('coverLetter', values.cover);
        }
        if (this.state.uploadedFiles.length) {
            // file has been attached & validated
            data.append('doc', this.state.uploadedFiles[0]);
            this.props.dispatch(createSubmission(data));
        } else {
            this.setState({fileError: 'Looks like you forgot to attach a file'})
        }
    }

    render() {
        const DropDownFormField = props => (
            <Form.Field>
                <Dropdown selection search
                          {...props.input}
                          value={props.input.value}
                          onChange={(param, data) => props.input.onChange(data.value)}
                          placeholder={props.label}
                          options={props.options}
                          error={props.error}
                />
            </Form.Field>
        );

        let fileError;
        if (this.state.fileError) {
            fileError = <p className="tip">{this.state.fileError}</p>
        }

        let filePreviews;
        if (this.state.uploadedFiles) {
            filePreviews = this.state.uploadedFiles.map((file, index) => {return (<li key={index}>{file.name}</li>)})
        }

        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                // TODO: redirect to submission
                <div className="message message__success">
                    Successfully submitted!
                </div>
            )
        }

        let errorMessage;
        if (this.props.submitSucceeded) {
            errorMessage = (
                <div className="message message__error">
                    {this.props.error}
                </div>
            )
        }
        return (
            <main className="submission__form">
                <div className="submission__form wrapper">
                    <header className="submission__form">
                        <h1>New submission</h1>
                    </header>
                    <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <div className="form__message">
                            {successMessage}
                            {errorMessage}
                        </div>
                        <fieldset>
                            <legend>Submission Info</legend>
                            <Field
                                name="title"
                                placeholder="Submission title"
                                type="text"
                                component={Input}
                                validate={[required, nonEmpty]}
                                id="title__input"
                            />
                            <label htmlFor="publication">Submit to which publication?</label>
                            <Field
                                name="publication"
                                label="Publication"
                                component={DropDownFormField}
                                validate={[required]}
                                options={this.props.publications}
                                id="publication__dropdown"
                            >
                            </Field>
                        </fieldset>
                        <fieldset>
                            <legend>Cover letter</legend>
                            <TextArea name="cover" autoHeight
                                      placeholder='Write a short cover letter to the editors of the publication.'
                                      style={{ minHeight: 100, width: '100%' }}
                                      value={this.state.coverLetter}
                                      onChange={this.handleCoverLetterEntry} />
                        </fieldset>
                        <fieldset>
                            <legend>Upload document</legend>
                            <p className={this.state.uploadedFiles.length > 0 ? 'hidden' : 'visible'}>Documents must be in PDF format</p>
                            <section className={this.state.uploadedFiles.length > 0 ? 'hidden dropzone' : 'dropzone visible'}>
                                {fileError}
                                <Dropzone onDrop={files => this.onDrop(files)}
                                          multiple={false}
                                >
                                    <div>Drop your file here, or click to select file to upload.</div>
                                </Dropzone>
                            </section>
                            <section className={this.state.uploadedFiles.length > 0 ? 'uploaded__files visible' : 'uploaded__files hidden'}>
                                <h4>Uploaded file:</h4>
                                <ul>
                                    {filePreviews}
                                </ul>
                            </section>

                        </fieldset>
                        <section className="submission__form buttons">
                            <button className="cancel" onClick={() => this.props.history.goBack()}>Cancel</button>
                            <button className="primary" type="submit">Submit</button>
                        </section>
                    </form>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    publications: state.sublitr.publications,
    allowedFileTypes: state.sublitr.allowedFileTypes
});

SubmissionForm = connect(mapStateToProps)(SubmissionForm);

export default reduxForm({
    form: 'submission'
})(SubmissionForm)