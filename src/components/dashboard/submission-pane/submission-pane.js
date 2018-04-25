import React from 'react';
import {connect} from 'react-redux';
import {fetchSubmissions} from "../../../actions/submissions";
import { Icon, Dropdown, Button } from 'semantic-ui-react';
import SubmissionForm from "../../forms/submission-form/submissionform";
import { toggleSubmissionForm} from "../../../actions";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";
import SubmissionTable from "./submission-table";

export class SubmissionsPane extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            statusFilter: 'all',
            search: ''
        }
    };

    componentDidMount() {
        this.props.dispatch(fetchSubmissions())
    }

    updateStatusFilter = (data) => {
        const val = data.value;
        this.setState({statusFilter: val})
    };

    updateSearch = e => this.setState({ search: e.target.value });


    render() {
        const options = [{text:'All Submissions', value: 'all', key: 'all'}, ...this.props.decisions];
        const {loading, showNewSubmissionForm, submissions, hidden, dispatch} = this.props;
        const {statusFilter, search} = this.state;

        let submissionForm;
        let newSubmissionButton = <Button primary onClick={() => dispatch(toggleSubmissionForm())}><Icon name="plus"/> New submission</Button>;
        if (showNewSubmissionForm) {
            submissionForm = <section className="submission__form__wrapper"><SubmissionForm/></section>;
            newSubmissionButton = <Button onClick={() => dispatch(toggleSubmissionForm())}><Icon name="cancel"/> Cancel</Button>;
        }

        let contentSection;
        if (loading) {
            contentSection = <section className="submission__loading"><CubicLoadingSpinner text='Retrieving submissions...' prefix='submissions'/></section>
        } else if (!Object.keys(submissions).length) {
            contentSection = <section className="submission_empty"><h2>No submissions yet...</h2><p>Click New Submission to get started!</p></section>
        } else {
            contentSection = <SubmissionTable filters={{'status': statusFilter}} search={search}/>
        }

        return(
            <main className={hidden ? "pane hidden" : "pane"}>
                <header className="pane__header">
                    <h2 className="pane__header__title">My submissions</h2>
                    {newSubmissionButton}
                </header>
                {submissionForm}
                <div>
                    <h4 style={{display: 'inline-block', marginRight: '10px'}}>Filter by:</h4>
                    <Dropdown style={{display: 'inline-block', marginBottom: '10px'}}
                              placeholder='Submission status'
                              options={options}
                              onChange={(e, data) => this.updateStatusFilter(data)}/>
                    <div className="search__filter__wrapper">
                        <input placeholder='Search by title' className="search__filter" type='text' value={search} onChange={e => this.updateSearch(e)}/>
                        <Icon name="search"/>
                    </div>
                </div>
                {contentSection}
            </main>
        )
    }
}

const mapStateToProps = state => ({
    submissions: Object.keys(state.submissions.submissionData).reduce((hash, key) => {
        if (state.submissions.submissionData[key].authorID === state.auth.currentUser.id) {
             hash[key] = state.submissions.submissionData[key]
        }
        return hash;
    }, {}),
    decisions: state.sublitr.statusLists.decision,
    showNewSubmissionForm: state.sublitr.showNewSubmissionForm,
    message: state.sublitr.dashboardMessage,
    loading: state.submissions.loading,
    publications: state.publications.publications
});

export default connect(mapStateToProps)(SubmissionsPane)