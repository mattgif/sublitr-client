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
                <Document>
                    <Page/>
                </Document>
            </main>
        </div>
    )
}