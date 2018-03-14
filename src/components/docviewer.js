import React from 'react';
import SidebarToggle from "./sidebartoggle";
import Sidebar from "./sidebar";
import PageHeader from "./pageheader";
import { Document } from 'react-pdf/build/entry.noworker';
import {connect} from 'react-redux';

export function DocViewer(props) {
    return (
        <div>
            <SidebarToggle/>
            <Sidebar />
            <PageHeader/>
            <main>
                <Document file={props.submission.file}></Document>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    submission: state.activeSubmission
});

export default connect(mapStateToProps)(DocViewer);