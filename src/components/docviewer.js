import React from 'react';
import PageHeader from "./pageheader";
import {connect} from 'react-redux';
import './docviewer.css';
import PushableLeftSidebar from "./sidebar";

export function DocViewer(props) {
    return (
        <div className="docviewer">
            <PushableLeftSidebar submission={props.submission}>
                <PageHeader title={props.submission.title} subtitle={props.submission.author}/>
                <main>
                    <iframe className="docviewer__iframe" title={props.submission.title} src={props.submission.file} frameBorder="0"/>
                </main>
            </PushableLeftSidebar>
        </div>

    )
}

const mapStateToProps = (state, ownProps) => ({
    submission: state.sublitr.submissions.filter(sub => String(sub.id) === ownProps.match.params.submissionID)[0],
});

export default connect(mapStateToProps)(DocViewer);