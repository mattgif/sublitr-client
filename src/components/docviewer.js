import React from 'react';
import SidebarToggle from "./sidebartoggle";
import Sidebar from "./sidebar";
import PageHeader from "./pageheader";
import {connect} from 'react-redux';
import './docviewer.css';

export function DocViewer(props) {
    return (
        <div className="docviewer">
            <SidebarToggle/>
            <Sidebar />
            <PageHeader/>
            <main>
                <iframe title={props.submission.title} src={props.submission.file} frameBorder="0"/>
            </main>
        </div>

    )
}

const mapStateToProps = state => ({
    submission: state.activeSubmission
});

export default connect(mapStateToProps)(DocViewer);