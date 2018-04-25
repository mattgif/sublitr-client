import React from 'react';
import {connect} from "react-redux";
import ReviewRow from "./review-table-row";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";

export class ReviewTable extends React.Component {
    render() {
        // const {searchTerm, filters} = this.props;
        const { submissions, loading, filters, searchTerm } = this.props;
        if (loading) {
            return <CubicLoadingSpinner/>
        }

        function filterMatch(submission, filters) {
            // filters is an object with filter name as key, and value as value
            let match = true;
            Object.keys(filters).forEach(name => {
                // if filter is not 'all' and the values don't match, then return false
                const submissionInfo = {
                    publication: submission.publication,
                    decision: submission.reviewerInfo.decision,
                    recommendation: submission.reviewerInfo.recommendation
                };
                if (filters[name] !== "all" && (submissionInfo[name] !== filters[name])) {
                    console.log(name, 'does not match. Filter value:', filters[name], 'Sub value:', submissionInfo[name])
                    match = false;
                }
            });
            return match;
        }

        function searchMatch(submission, searchTerm) {
            // string should contain both firstName lastName & lastName firstName
            const string = `${submission.title.toLowerCase()} ${submission.author.toLowerCase()} ${submission.author.toLowerCase()}`
            return string.includes(searchTerm.toLowerCase());
        }

        function filterSubmissions(submissions, filters, searchTerm) {
            return Object.keys(submissions).filter(sub =>
                (
                    Object.keys(submissions[sub]).includes('reviewerInfo') // rules out listing user's own submissions
                    && filterMatch(submissions[sub], filters)
                    && searchMatch(submissions[sub], searchTerm)
                ))

        }

        const matchingSubmissions = filterSubmissions(submissions, filters, searchTerm).map(sub =>
            <ReviewRow key={sub} submission={submissions[sub]}/>);

        if (!matchingSubmissions.length) {
            return <div className="Not found"><h2>No submissions found for review</h2></div>
        }

        return (
            <table cellSpacing={0} className="review__table">
                <thead>
                <tr>
                    <th colSpan={2}>Publication</th>
                    <th>Submitter</th>
                    <th>Title</th>
                    <th>Recommendation</th>
                    <th/>
                </tr>
                </thead>
                {matchingSubmissions}
            </table>
        )
    }

}

const mapStateToProps = state => ({
    submissions: state.submissions.submissionData,
    loading: state.submissions.loading,
    editorId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(ReviewTable);