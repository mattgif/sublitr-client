import React from 'react';
import SidebarToggle from "./sidebartoggle";
import Sidebar from "./sidebar";
import PageHeader from "./pageheader";
import {connect} from 'react-redux';

export function DocViewer(props) {
    return (
        <div>
            <SidebarToggle/>
            <Sidebar />
            <PageHeader/>
            <main>
                <iframe src={props.submission.file} frameborder="0"/>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    submission: state.activeSubmission
});

export default connect(mapStateToProps)(DocViewer);