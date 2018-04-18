import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CardSubmission from "../../submission-cards/basic-card/index";
import {fetchSubmissions} from "../../../actions/submissions";
import { Icon, Dropdown} from 'semantic-ui-react';

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
        const options = [{text:'All Submissions', value: 'all'}, ...this.props.decisions];
        return(
            <section className={this.props.hidden ? "pane hidden" : "pane"}>
                <header className="pane__header">
                    <h2 className="pane__header__title">My submissions</h2>

                    <Link className="new-submission-button" to='/submit'><Icon name="plus"/> New submission</Link>
                </header>
                <div>
                    <h4>Filter by:</h4>
                    <Dropdown placeholder='Submission status' options={options} onChange={(e, data) => this.filterList(data)}/>
                </div>

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
            </section>
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
    decisions: state.sublitr.statusLists.decision
});

export default connect(mapStateToProps)(TabSubmissions)