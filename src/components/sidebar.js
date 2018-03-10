import React from 'react';
import PageHeader from "./pageheader";
import StatusUpdater from "./statusupdater";
import CommentForm from "./commentform";
import CommentList from "./commentlist";

export default function Sidebar(props) {
    return (
        <section>
            <PageHeader/>
            <section>
                <StatusUpdater/>
                <StatusUpdater/>
            </section>
            <section>
                <CommentForm/>
                <CommentList/>
            </section>
        </section>
    )
}