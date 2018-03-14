import React from 'react';
import {connect} from 'react-redux';
import PageHeader from "./pageheader";
import StatusUpdater from "./statusupdater";
import CommentForm from "./commentform";
import CommentList from "./commentlist";
import './sidebar.css'

export function Sidebar(props) {
    return (
        <section className={props.showSidebar ? "sidebar" : "sidebar hidden"}>
            <p><strong>[Status icon]</strong></p>
            <h2>Status</h2>
            <PageHeader title={props.submission.title} subtitle={props.submission.author}/>
            <section>
                <label>Decision
                    <StatusUpdater selected={props.submission.reviewerInfo.decision} type="decision"/>
                </label>
                <label>Recommendation
                    <StatusUpdater elected={props.submission.reviewerInfo.recommendation} type="recommendation"/>
                </label>
                <ul>
                    <li>Submitted: <time datetime={props.submission.submitted}>{props.submission.submitted}</time></li>
                    <li>Last action: <time datetime={props.submission.reviewerInfo.lastAction}>{props.submission.reviewerInfo.lastAction}</time></li>
                </ul>
            </section>
            <section>
                <CommentForm/>
                <CommentList comments={props.comments}/>
            </section>
        </section>
    )}

const mapStateToProps = state => ({
    submission: state.activeSubmission,
    comments: state.activeSubmission.reviewerInfo.comments,
    showSidebar: state.showSidebar
});

export default connect(mapStateToProps)(Sidebar);