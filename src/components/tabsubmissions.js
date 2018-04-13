import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './tab.css';
import CardSubmission from "./cardsubmission";
import {fetchSubmissions} from "../actions/submissions";

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

    filterList = (e) => {
        const val = e.target.value;
        this.setState({filter: val})
    };

    render() {
        return(
            <section className={this.props.hidden ? "tab hidden" : "tab"}>
                <h2>My submissions</h2>

                <Link to='/submit'>+ New submission</Link>

                <div>
                    <label htmlFor="submissionFilter">Status</label>
                    <select className="filter"
                            name="submissionFilter"
                            id="submissionFilter"
                            value={this.state.filter}
                            onChange={e => this.filterList(e)}
                    >
                        <option value="all">All submissions</option>
                        <option value="pending">Pending review</option>
                        <option value="revise">Revise &amp; Resubmit</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>
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
    }, {})
});

export default connect(mapStateToProps)(TabSubmissions)