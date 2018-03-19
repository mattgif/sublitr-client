import React from 'react';
import PageHeader from "./pageheader";
import MaterialInput from "./materialinput";
import {Field, reduxForm, focus} from 'redux-form';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {nonEmpty, required} from "../validators";

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
        const uploadedFiles = this.state.uploadedFiles;
        let allValid = true;
        acceptedFiles.forEach(file => {
            if (!this.validFileType(file)) {
                allValid = false;
            }
        });
        if (allValid) {
            uploadedFiles.push(acceptedFiles);
            this.setState({uploadedFiles, fileError: false})
        } else {
            this.setState({fileError: "Invalid file type"})
        }
    }

    validFileType(file) {
        const allowedTypes = this.props.allowedFileTypes;
        return allowedTypes.includes(file.type)
    }

    onSubmit(values) {
        const {publication, title, cover} = values;
        const submission = {publication, title, cover};
        Object.assign({}, submission, {
            files: this.state.uploadedFiles
        })
        // TODO: async submission
    }

    render() {
        const pubOptions = this.props.publications.map((pub, index) => {
            return (<option key={index} value={pub.name}>{pub.name}</option>)
        });

        let fileError;
        if (this.state.fileError) {
            fileError = <div className="input__error">{this.state.fileError}</div>
        }

        let filePreviews;
        if (this.state.uploadedFiles) {
            filePreviews = this.state.uploadedFiles.map((file, index) => {return (<li key={index}>{file[0].name}</li>)})
        }

        return (
            <main>
                <PageHeader/>
                <form>
                    <div className="form__error"></div>
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
                            <option></option>
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
                        <Dropzone onDrop={files => this.onDrop(files)}>
                            <div>Drop your file here, or click to select files to upload.</div>
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
    allowedFileTypes: state.sublitr.allowedFileTypes
});

SubmissionForm = connect(mapStateToProps)(SubmissionForm);

export default reduxForm({
    form: 'submission'
})(SubmissionForm)