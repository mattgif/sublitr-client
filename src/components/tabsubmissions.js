import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './tab.css';
import CardSubmission from "./cardsubmission";

export class TabSubmissions extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filter: 'all'
        }
    };

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
                    {this.props.submissions.map((submission, index) => {
                        if (this.state.filter === "all" || submission.status === this.state.filter) {
                            return(
                                <li key={index}>
                                    <CardSubmission
                                        status={submission.status}
                                        publication={submission.publication}
                                        title={submission.title}
                                        submissionDate={submission.submitted}
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
    submissions: state.sublitr.submissions
});

export default connect(mapStateToProps)(TabSubmissions)