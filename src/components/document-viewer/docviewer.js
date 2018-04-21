import React from 'react';
import CubicLoadingSpinner from '../loading-animations/cubic-loading-spinner/index'
import {connect} from 'react-redux';
import './docviewer.css';
import PushableLeftSidebar from "./sidebar";
import {fetchDocument, getSubmissionsAndFetchDocument} from "../../actions/submissions";
import {docviewerActive, docviewerInactive} from "../../actions";

export class DocViewer extends React.Component {
    componentDidMount() {
        this.props.dispatch(docviewerActive());
        if (!this.props.submission && !this.props.loadingSubmissions) {
            return this.props.dispatch(getSubmissionsAndFetchDocument(String(this.props.match.params.submissionID)))
        } else if (!this.props.document) {
            return this.props.dispatch(fetchDocument(this.props.submission.id, this.props.submission.file))
        }
    }

    componentWillUnmount() {
        this.props.dispatch(docviewerInactive())
    }

    render() {
        if (!this.props.submission || this.props.loadingSubmissions || this.props.fetching) {
            return (
                <CubicLoadingSpinner/>
            )
        }

        let documentPreview;
        if (!this.props.document) {
            documentPreview = <div>Sorry, there was an error retrieving the document</div>
        } else {
            documentPreview = <embed width="100%" height="100%" className="docviewer__iframe" type="application/pdf" title={this.props.submission.title}
                                      src={this.props.document} frameBorder="0"/>
        }

        console.log(this.props.allLoaded);
        return (
            <div className="docviewer">
                <PushableLeftSidebar submission={this.props.submission}>
                    <div className="docviewer__wrapper">
                        <header className="docviewer__header">
                            <h1>{this.props.submission.title}</h1>
                            <h3>{this.props.submission.author}</h3>
                        </header>
                        <section className="docviewer__coverletter"></section>
                        <main className="docviewer__preview">
                            {documentPreview}
                        </main>
                    </div>
                </PushableLeftSidebar>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    submission: state.submissions.submissionData[ownProps.match.params.submissionID],
    allSubmissions: state.submissions.submissionData,
    loadingSubmissions: state.submissions.loading,
    document: state.submissions.loadedFiles[ownProps.match.params.submissionID],
    fetching: state.submissions.fetchingDocument,
    error: state.submissions.error,
    allLoaded: state.submissions.loadedFiles
});

export default connect(mapStateToProps)(DocViewer);