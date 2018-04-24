import React from 'react';
import {connect} from 'react-redux';
import { Sidebar, Segment, Menu} from 'semantic-ui-react';
import {toggleDocViewerSidebar} from "../../actions";

import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import './sidebar.css';
import StatusSection from "./menu-elements/status-section";

export class PushableLeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.props.dispatch(toggleDocViewerSidebar())
    }

    render() {
        const visible = this.props.visible;

        return (
            <div className="sidebar">
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical>
                        <StatusSection submission={this.props.submission}/>
                        <Menu.Item>
                            <CommentForm submissionID={this.props.submission.id}/>
                        </Menu.Item>
                        <Menu.Item>
                            <CommentList submissionId={this.props.submission.id}/>
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
    visible: state.sublitr.showSidebar
});

export default connect(mapStateToProps)(PushableLeftSidebar);