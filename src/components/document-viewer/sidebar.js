import React from 'react';
import {connect} from 'react-redux';
import { Sidebar, Segment, Menu} from 'semantic-ui-react';
import { CSSTransitionGroup } from 'react-transition-group';

import PageHeader from "../pageheader";
import CommentForm from "../comments/comment-form/index";
import MobileMenuToggle from "./mobilemenutoggle";
import StatusIndicator from "../status-indicator/statusindicator";
import CommentCard from "../comments/comment-card/index";

import {updateStatus} from "../../actions/submissions";

import './sidebar.css';
import {formatDate} from "../../actions/utils";

export class PushableLeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible} );
    }

    handleStatusChange = (e, statusType) => {
        this.props.dispatch(
            updateStatus(statusType, e.target.value, this.props.submission.id)
        )
    };

    render() {
        const { visible } = this.state;
        const lastActionDate = formatDate(this.props.submission.reviewerInfo.lastAction);
        const submittedDate = formatDate(this.props.submission.submitted);

        const statusOptions = statusType => this.props.statusLists[statusType].map((opt, index) => {
            return(<option key={index} value={opt.short}>{opt.long}</option>)
        });

        let comments;
        if (this.props.submission.reviewerInfo.comments) {
            // generate sorted list of comment cards
            const sortedComments = this.props.submission.reviewerInfo.comments.sort(function(a,b){
                // sort newest to oldest
                return new Date(b.date) - new Date(a.date)
            });
            const commentCards = sortedComments.map(comment => {
                // returns array of comments cards (which are <li> elements)
                return <CommentCard key={comment._id} comment={comment} submissionId={this.props.submission.id}/>
            });
            comments = <ul className="comments__list">{commentCards}</ul>
        }

        return (
            <div className="sidebar">
                <MobileMenuToggle checked={this.state.visible} onChange={this.toggleVisibility}/>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='uncover' width='wide' visible={visible} icon='labeled' vertical>
                        <PageHeader title={this.props.submission.title} subtitle={this.props.submission.author}/>
                        <Menu.Item name='status'>
                            <StatusIndicator status={this.props.submission.reviewerInfo.decision}/>
                            <h2>Status</h2>
                            <label>Decision
                                <select value={this.props.submission.reviewerInfo.decision}
                                        onChange={e => this.handleStatusChange(e, 'decision')}
                                >
                                    {statusOptions('decision')}
                                </select>
                            </label>
                            <label>Recommendation
                                <select value={this.props.submission.reviewerInfo.recommendation}
                                        onChange={e => this.handleStatusChange(e, 'recommendation')}
                                >
                                    {statusOptions('recommendation')}
                                </select>
                            </label>
                            <dl>
                                <dt>Submitted:</dt>
                                <dd><time dateTime={this.props.submission.submitted}>{submittedDate}</time></dd>
                                <dt>Last action:</dt>
                                <dd><time dateTime={this.props.submission.reviewerInfo.lastAction}>{lastActionDate}</time></dd>
                            </dl>
                        </Menu.Item>
                        <Menu.Item>
                            <section>
                                <CommentForm submissionID={this.props.submission.id}/>
                                <CSSTransitionGroup>
                                    {comments}
                                </CSSTransitionGroup>
                            </section>
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        {this.props.children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    statusLists: state.sublitr.statusLists,
});

export default connect(mapStateToProps)(PushableLeftSidebar);