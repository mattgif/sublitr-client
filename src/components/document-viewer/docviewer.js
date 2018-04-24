import React from 'react';
import CubicLoadingSpinner from '../loading-animations/cubic-loading-spinner/index'
import {connect} from 'react-redux';
import './docviewer.css';
import PushableLeftSidebar from "./sidebar";
import {fetchDocument, getSubmissionsAndFetchDocument} from "../../actions/submissions";
import {docviewerActive, docviewerInactive} from "../../actions";
import {formatDate} from "../../actions/utils";
import {Icon, Message} from 'semantic-ui-react';

export class DocViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCoverLetter: false,
            showMenuMessage: true,
            showHeader: true,
        };
        this.dismissMenuMessage = this.dismissMenuMessage.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(docviewerActive());
        if (!this.props.submission && !this.props.loadingSubmissions) {
            return this.props.dispatch(getSubmissionsAndFetchDocument(String(this.props.match.params.submissionID)))
        } else if (!this.props.document) {
            return this.props.dispatch(fetchDocument(this.props.submission.id, this.props.submission.file))
        }
    }

    dismissMenuMessage() {
        this.setState({showMenuMessage: false})
    }
    toggleCoverLetter() {
        this.setState({showCoverLetter: !this.state.showCoverLetter})
    }

    toggleHeader() {
        this.setState({showHeader: !this.state.showHeader})
    }

    componentWillUnmount() {
        this.props.dispatch(docviewerInactive())
    }

    render() {
        const {submission, loadingSubmissions, fetching, document, sidebarOpen} = this.props;
        const {showCoverLetter, showMenuMessage, showHeader} = this.state;
        if (!submission || loadingSubmissions) {
            return (<CubicLoadingSpinner/>)
        }

        if (!Object.keys(submission).includes('reviewerInfo')) {
          //  user is not a reviewer for document at this link
          return (<div className="docviewer__error"><Icon name="ban" size="huge"/>Sorry, you are not authorized to review this document</div>)
        }

        let documentPreview;
        if (!document && fetching) {
            documentPreview = <CubicLoadingSpinner/>
        } else if (!document) {
            documentPreview = <div className="docviewer__error"><Icon size="huge" name="frown"/> Sorry, there was an error retrieving the document</div>
        } else {
            documentPreview = <embed width="100%" height="100%" className="docviewer__iframe" type="application/pdf" title={this.props.submission.title}
                                      src={document} frameBorder="0"/>
        }

        let coverLetterSection;
        if (submission.coverLetter) {
            coverLetterSection =
                <section className="docviewer__coverletter__wrapper">
                    <div className={`docviewer__coverletter ${showCoverLetter ? 'open' : 'closed'}`}>{submission.coverLetter}</div>
                    <button className={showCoverLetter ? 'open' : 'closed'} onClick={() => this.toggleCoverLetter()}><Icon name={`chevron ${showCoverLetter ? 'up' : 'down'}`}/> {showCoverLetter ? 'Hide cover letter' : 'View cover letter'}</button>
                </section>

        }

        let menuMessage;
        if (!sidebarOpen) {
            if (showMenuMessage) {
                menuMessage = <Message onDismiss={this.dismissMenuMessage}><Message.Header><Icon name="arrow up"/> Select the menu button to add comments and update the status</Message.Header></Message>
            }
        }

        let header;
        if (showHeader) {
            header = (
                <header className="docviewer__header">
                    <h1>{submission.title}</h1>
                    <dl>
                        <dt>Author</dt>
                        <dd>{submission.author}</dd>
                        <dt>Submitted</dt>
                        <dd><time dateTime={submission.submitted}>{formatDate(this.props.submission.submitted)}</time></dd>
                        <dt>Publication</dt>
                        <dd>{submission.publication}</dd>
                    </dl>
                    {coverLetterSection}
                </header>
            )
        }

        return (
            <div className={`docviewer ${sidebarOpen ? 'sidebaropen' : ''}`}>
                <PushableLeftSidebar submission={submission}>
                    <div className="docviewer__wrapper">
                        {menuMessage}
                        {header}
                        <button className={`headerbutton ${showHeader ? 'open' : 'closed'}`} onClick={() => this.toggleHeader()}>{showHeader ? 'Hide header' : 'View header'}</button>
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
    allLoaded: state.submissions.loadedFiles,
    sidebarOpen: state.sublitr.showSidebar
});

export default connect(mapStateToProps)(DocViewer);