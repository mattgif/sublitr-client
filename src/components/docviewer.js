import React from 'react';
import PageHeader from "./pageheader";
import {connect} from 'react-redux';
import './docviewer.css';
import PushableLeftSidebar from "./sidebar";

export function DocViewer(props) {
    return (
        <div className="docviewer">
            <PushableLeftSidebar>
                <PageHeader title={props.submission.title} subtitle={props.submission.author}/>
                <main>
                    <iframe className="docviewer__iframe" title={props.submission.title} src={props.submission.file} frameBorder="0"/>
                </main>
            </PushableLeftSidebar>
        </div>

    )
}

const mapStateToProps = state => ({
    submission: state.sublitr.activeSubmission
});

export default connect(mapStateToProps)(DocViewer);