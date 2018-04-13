import React from 'react';
import PageHeader from "./pageheader";
import CubicLoadingSpinner from './cubic-loading-spinner/'
import {connect} from 'react-redux';
import './docviewer.css';
import PushableLeftSidebar from "./sidebar";
import {fetchDocument, getSubmissionsAndFetchDocument} from "../actions/submissions";

export class DocViewer extends React.Component {
    componentDidMount() {
        if (!this.props.submission && !this.props.loadingSubmissions) {
            this.props.dispatch(getSubmissionsAndFetchDocument(String(this.props.match.params.submissionID)))
        } else if (!this.props.document) {
            this.props.dispatch(fetchDocument(this.props.submission.id, this.props.submission.file))
        }
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
            documentPreview = <iframe className="docviewer__iframe" title={this.props.submission.title}
                                      src={this.props.document} frameBorder="0"/>
        }

        return (
            <div className="docviewer">
                <PushableLeftSidebar submission={this.props.submission}>
                    <PageHeader title={this.props.submission.title} subtitle={this.props.submission.author}/>
                    <main>
                        {documentPreview}
                    </main>
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
    error: state.submissions.error
});

export default connect(mapStateToProps)(DocViewer);