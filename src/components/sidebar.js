import React from 'react';
import {connect} from 'react-redux';
import { Sidebar, Segment, Menu} from 'semantic-ui-react'

import PageHeader from "./pageheader";
import CommentForm from "./commentform";
import MobileMenuToggle from "./mobilemenutoggle";
import StatusIndicator from "./statusindicator";
import CommentCard from "./commentcard";

import {updateStatus} from "../actions/submissions";

import './sidebar.css';
import {formatDate} from "../actions/utils";

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
                                <ul className="comments__list">
                                    {this.props.submission.reviewerInfo.comments ? this.props.submission.reviewerInfo.comments.map((comment, index) => {
                                        return <CommentCard key={index} comment={comment}/>
                                    }) : ''}
                                </ul>
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

const mapStateToProps = (state, ownProps) => ({
    statusLists: state.sublitr.statusLists,
});

export default connect(mapStateToProps)(PushableLeftSidebar);