import React from 'react';
import {connect} from 'react-redux';
import DeleteSubmissionConfirm from './deletesubmissionconfirm';
import { Table } from 'semantic-ui-react';
import {formatDate} from "../../../actions/utils";
import StatusIndicator from "../../status-indicator/statusindicator";

export class SubmissionTable extends React.Component {
    render() {
        const {submissions, filters, search, publications} = this.props;

        function filterMatch(submission, filters) {
            // filters is an object with filter name as key, and value as value
            let match = true;
            Object.keys(filters).forEach(name => {
                // if filter is not 'all' and the values don't match, then return false
                if (filters[name] !== "all" && (submission[name] !== filters[name])) {
                    match = false;
                }
            });
            return match;
        }

        function searchMatch(submission, searchTerm) {
            return submission.title.toLowerCase().includes(searchTerm.toLowerCase());
        }

        function filterSubmissions(submissions, filters, searchTerm) {
                return Object.keys(submissions).filter(sub =>
                    (filterMatch(submissions[sub], filters)
                        && searchMatch(submissions[sub], searchTerm)))

        }

        const matchingSubmissions = filterSubmissions(submissions, filters, search);

        const formattedRows =  matchingSubmissions.map(key => {
            const {id, status, submitted, publication, title} = submissions[key];
            const image = publications[publication] ? publications[publication].image : 'https://s3.amazonaws.com/sublitr-images/logo.svg';
            return (
                <Table.Row key={id}>
                    <Table.Cell><StatusIndicator className="indicator" status={status}/></Table.Cell>
                    <Table.Cell className="title">{title}</Table.Cell>
                    <Table.Cell>{formatDate(submitted)}</Table.Cell>
                    <Table.Cell><div className="table__image"><img src={image} alt={publication + ' logo'}/></div></Table.Cell>
                    <Table.Cell className="publication">{publication}</Table.Cell>
                    <Table.Cell className="delete__wrapper"><DeleteSubmissionConfirm title={title} id={id}/></Table.Cell>
                </Table.Row>
            )
        });

        return (
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Submission date</Table.HeaderCell>
                        <Table.HeaderCell>Publication</Table.HeaderCell>
                        <Table.HeaderCell/>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {formattedRows}
                </Table.Body>
            </Table>
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
    publications: state.publications.publications
});

export default connect(mapStateToProps)(SubmissionTable)



