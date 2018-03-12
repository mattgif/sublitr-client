import React from 'react';
import SidebarToggle from "./sidebartoggle";
import Sidebar from "./sidebar";
import PageHeader from "./pageheader";
import { Document, Page } from 'react-pdf';

export default function DocViewer(props) {
    return (
        <div>
            <SidebarToggle/>
            <Sidebar/>
            <PageHeader/>
            <main>
                <Document file={props.submission.file}></Document>
            </main>
        </div>
    )
}

DocViewer.defaultProps = {
    submission: {
        title: 'Demo title 1',
        author: 'Rea Roos',
        submitted: '2018-01-01',
        publication: 'Journal 1',
        status: 'pending',
        url: '#',
        file: "../dummy/test_pdf.pdf",
        reviewerInfo: {
            decision: 'pending',
            recommendation: 'none',
            lastAction: '2018-01-01'
        }
    },
}