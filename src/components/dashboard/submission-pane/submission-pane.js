import React from 'react';
import {connect} from 'react-redux';
import CardSubmission from "../../submission-cards/basic-card/index";
import {fetchSubmissions} from "../../../actions/submissions";
import { Icon, Dropdown, Button, Message } from 'semantic-ui-react';
import SubmissionForm from "../../forms/submission-form/submissionform";
import {toggleSubmissionForm} from "../../../actions";
import { CSSTransitionGroup } from 'react-transition-group';
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";

export class TabSubmissions extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filter: 'all'
        }
    };

    componentDidMount() {
        this.props.dispatch(fetchSubmissions())
    }

    filterList = (data) => {
        const val = data.value;
        this.setState({filter: val})
    };

    render() {
        const options = [{text:'All Submissions', value: 'all', key: 'all'}, ...this.props.decisions];
        let submissionForm;
        let newSubmissionButton = <Button primary onClick={() => this.props.dispatch(toggleSubmissionForm())}><Icon name="plus"/> New submission</Button>;
        if (this.props.showNewSubmissionForm) {
            submissionForm = <section className="submission__form__wrapper"><SubmissionForm/></section>;
            newSubmissionButton = <Button onClick={() => this.props.dispatch(toggleSubmissionForm())}><Icon name="cancel"/> Cancel</Button>;
        }

        let message;
        if (this.props.message) {
            message = <Message error={this.props.message.error} positive={this.props.message.positive}><Message.Header>{this.props.message.header}</Message.Header>{this.props.message.text}</Message>
        }

        let submissionList;
        if (this.props.loading) {
            submissionList = <section className="submission__loading"><CubicLoadingSpinner text='Retrieving submissions...' prefix='submissions'/></section>
        } else {
            submissionList =
                <ul className="submissionList">
                    {Object.keys(this.props.submissions).map(key => {
                        const submission = this.props.submissions[key];
                        if (this.state.filter === "all" || submission.status === this.state.filter) {
                            return(
                                <li key={submission.id}>
                                    <CardSubmission
                                        status={submission.status}
                                        publication={submission.publication}
                                        title={submission.title}
                                        submissionDate={submission.submitted}
                                        id={submission.id}
                                    />
                                </li>
                            );
                        }
                        return ''
                    })}
                </ul>
        }

        return(
            <main className={this.props.hidden ? "pane hidden" : "pane"}>
                <header className="pane__header">
                    <h2 className="pane__header__title">My submissions</h2>
                    {newSubmissionButton}
                </header>
                {message}
                <CSSTransitionGroup transitionName="submissionForm" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                    {submissionForm}
                </CSSTransitionGroup>
                <section>
                    <div>
                        <h4>Filter by:</h4>
                        <Dropdown placeholder='Submission status' options={options} onChange={(e, data) => this.filterList(data)}/>
                    </div>

                    {submissionList}
                </section>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    publications: state.sublitr.publications,
    submissions: Object.keys(state.submissions.submissionData).reduce((hash, key) => {
        if (state.submissions.submissionData[key].authorID === state.auth.currentUser.id) {
             hash[key] = state.submissions.submissionData[key]
        }
        return hash;
    }, {}),
    decisions: state.sublitr.statusLists.decision,
    showNewSubmissionForm: state.sublitr.showNewSubmissionForm,
    message: state.sublitr.dashboardMessage,
    loading: state.submissions.loading
});

export default connect(mapStateToProps)(TabSubmissions)