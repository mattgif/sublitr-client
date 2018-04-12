import React from 'react';
import PageHeader from "./pageheader";
import MaterialInput from "./materialinput";
import {Field, reduxForm, SubmissionError} from 'redux-form';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {nonEmpty, required} from "../validators";
import {API_BASE_URL} from "../config";

export class SubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverLetter: "Write a short cover letter to the editors of the publication.",
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
        data.append('doc', this.state.uploadedFiles[0]);
        return fetch(`${API_BASE_URL}/submissions`, {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Bearer ${this.props.authToken}`
            }
        })
            .then(res => {
                if (!(res.status === 201)) {
                    if (res.headers.has('content-type') &&
                        res.headers.get('content-type').startsWith('application/json')
                    ) {
                        // it's a JSON error with a custom message
                        return res.json().then(Promise.reject)
                    }
                    // it's an express error
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
            })
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    )
                }
            })
    }

    render() {
        const pubOptions = this.props.publications.map((pub, index) => {
            return (<option key={index} value={pub.title}>{pub.title}</option>)
        });

        let fileError;
        if (this.state.fileError) {
            fileError = <div className="input__error">{this.state.fileError}</div>
        }

        let filePreviews;
        if (this.state.uploadedFiles) {
            filePreviews = this.state.uploadedFiles.map((file, index) => {return (<li key={index}>{file.name}</li>)})
        }

        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
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
            <main>
                <PageHeader/>
                <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <div className="form__message">
                        {successMessage}
                        {errorMessage}
                    </div>
                    <fieldset>
                        <legend>Submission Info</legend>
                        <Field
                            name="title"
                            label="Submission title"
                            type="text"
                            component={MaterialInput}
                            validate={[required, nonEmpty]}
                        />
                        <label htmlFor="publication">Submit to which publication?</label>
                        <Field
                            name="publication"
                            component="select"
                            validate={[required]}
                        >
                            <option/>
                            {pubOptions}
                        </Field>
                    </fieldset>
                    <fieldset>
                        <legend>Cover letter</legend>
                        <textarea name="cover" value={this.state.coverLetter} onChange={this.handleCoverLetterEntry}/>
                    </fieldset>
                    <fieldset>
                        <legend>Upload document(s)</legend>
                        {fileError}
                        <p className="tip">Documents must be in .pdf, .doc, or .docx formats.</p>
                        <Dropzone onDrop={files => this.onDrop(files)} multiple={false}>
                            <div>Drop your file here, or click to select file to upload.</div>
                        </Dropzone>
                        <div>
                            <h4>Uploaded files:</h4>
                            <ul>
                                {filePreviews}
                            </ul>
                        </div>

                    </fieldset>
                    <button type="submit">Submit?</button>
                </form>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    publications: state.sublitr.publications,
    allowedFileTypes: state.sublitr.allowedFileTypes,
    authToken: state.auth.authToken
});

SubmissionForm = connect(mapStateToProps)(SubmissionForm);

export default reduxForm({
    form: 'submission'
})(SubmissionForm)