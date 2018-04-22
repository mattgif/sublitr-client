import React from 'react';
import CubicLoadingSpinner from '../loading-animations/cubic-loading-spinner/index'
import {connect} from 'react-redux';
import './docviewer.css';
import PushableLeftSidebar from "./sidebar";
import {fetchDocument, getSubmissionsAndFetchDocument} from "../../actions/submissions";
import {docviewerActive, docviewerInactive} from "../../actions";
import {formatDate} from "../../actions/utils";
import {Icon} from 'semantic-ui-react';

export class DocViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCoverLetter: false
        }
    }
    componentDidMount() {
        this.props.dispatch(docviewerActive());
        if (!this.props.submission && !this.props.loadingSubmissions) {
            return this.props.dispatch(getSubmissionsAndFetchDocument(String(this.props.match.params.submissionID)))
        } else if (!this.props.document) {
            return this.props.dispatch(fetchDocument(this.props.submission.id, this.props.submission.file))
        }
    }

    toggleCoverLetter() {
        this.setState({showCoverLetter: !this.state.showCoverLetter})
    }

    componentWillUnmount() {
        this.props.dispatch(docviewerInactive())
    }

    render() {
        if (!this.props.submission || this.props.loadingSubmissions) {
            return (<CubicLoadingSpinner/>)
        }

        if (!Object.keys(this.props.submission).includes('reviewerInfo')) {
          //  user is not a reviewer for document at this link
          return (<div className="docviewer__error"><Icon name="ban" size="huge"/>Sorry, you are not authorized to review this document</div>)
        }

        let documentPreview;
        if (!this.props.document && this.props.fetching) {
            documentPreview = <CubicLoadingSpinner/>
        } else if (!this.props.document && !this.props.fetching) {
            documentPreview = <div className="docviewer__error"><Icon size="huge" name="frown"/> Sorry, there was an error retrieving the document</div>
        } else {
            documentPreview = <embed width="100%" height="100%" className="docviewer__iframe" type="application/pdf" title={this.props.submission.title}
                                      src={this.props.document} frameBorder="0"/>
        }

        let coverLetterSection;
        if (this.props.submission.coverLetter) {
            coverLetterSection =
                <section className="docviewer__coverletter__wrapper">
                    <div className={`docviewer__coverletter ${this.state.showCoverLetter ? 'open' : 'closed'}`}>{this.props.submission.coverLetter}</div>
                    <button className={this.state.showCoverLetter ? 'open' : 'closed'} onClick={() => this.toggleCoverLetter()}><Icon name={`chevron ${this.state.showCoverLetter ? 'up' : 'down'}`}/> {this.state.showCoverLetter ? 'Hide cover letter' : 'View cover letter'}</button>
                </section>

        }
        return (
            <div className="docviewer">
                <PushableLeftSidebar submission={this.props.submission}>
                    <div className="docviewer__wrapper">
                        <header className="docviewer__header">
                            <h1>{this.props.submission.title}</h1>
                            <dl>
                                <dt>Author</dt>
                                <dd>{this.props.submission.author}</dd>
                                <dt>Submitted</dt>
                                <dd><time dateTime={this.props.submission.submitted}>{formatDate(this.props.submission.submitted)}</time></dd>
                                <dt>Publication</dt>
                                <dd>{this.props.submission.publication}</dd>
                            </dl>
                        </header>
                        {coverLetterSection}
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