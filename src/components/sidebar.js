import React from 'react';
import {connect} from 'react-redux';
import { Sidebar, Segment, Menu} from 'semantic-ui-react'
import PageHeader from "./pageheader";
import StatusUpdater from "./statusupdater";
import CommentForm from "./commentform";
import CommentList from "./commentlist";
import MobileMenuToggle from "./mobilemenutoggle";

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

    render() {
        const { visible } = this.state;
        return (
            <div className="sidebar">
                <MobileMenuToggle checked={this.state.visible} onChange={this.toggleVisibility}/>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='uncover' width='wide' visible={visible} icon='labeled' vertical>
                        <PageHeader title={this.props.submission.title} subtitle={this.props.submission.author}/>
                        <Menu.Item name='status'>
                            <p><strong>[Status icon]</strong></p>
                            <h2>Status</h2>
                            <label>Decision
                                <StatusUpdater selected={this.props.submission.reviewerInfo.decision} type="decision"/>
                            </label>
                            <label>Recommendation
                                <StatusUpdater elected={this.props.submission.reviewerInfo.recommendation} type="recommendation"/>
                            </label>
                            <ul>
                                <li>Submitted: <time dateTime={this.props.submission.submitted}>{this.props.submission.submitted}</time>
                                </li>
                                <li>Last action: <time
                                    dateTime={this.props.submission.reviewerInfo.lastAction}>{this.props.submission.reviewerInfo.lastAction}</time>
                                </li>
                            </ul>
                        </Menu.Item>
                        <Menu.Item>
                            <section>
                                <CommentForm/>
                                <CommentList comments={this.props.comments}/>
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
    submission: state.sublitr.activeSubmission,
    comments: state.sublitr.activeSubmission.reviewerInfo.comments,
});

export default connect(mapStateToProps)(PushableLeftSidebar);