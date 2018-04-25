import React from 'react';
import {connect} from "react-redux";
import ReviewRow from "./review-table-row";
import CubicLoadingSpinner from "../../loading-animations/cubic-loading-spinner";

export class ReviewTable extends React.Component {
    // matchesField = (targetField, filterValue) => {
    //     return targetField === filterValue || filterValue === "all"
    // };

    // filteredSubmissions = (submissionList, state) => Object.keys(submissionList).reduce((hash, key) => {
    //     const submission = submissionList[key];
    //     let matches = true;
    //     if (this.state.search) {
    //         const string = `${submission.title} ${submission.author}`.toLowerCase();
    //         matches = string.includes(this.state.search.toLowerCase())
    //     }
    //
    //     if (Object.keys(submission).includes('reviewerInfo') &&
    //         matches &&
    //         this.matchesField(submission.publication, state.publicationFilter) &&
    //         this.matchesField(submission.reviewerInfo.decision, state.decisionFilter) &&
    //         this.matchesField(submission.reviewerInfo.recommendation, state.recommendationFilter)) {
    //         hash[key] = submission;
    //     }
    //     return hash;
    // }, {});
    //
    // formattedSubmissions = submissionList => Object.keys(submissionList).map(key => {
    //     const submission = submissionList[key];
    //     return (
    //         <li key={submission.id}>
    //             <CardReview submission={submission}/>
    //         </li>
    //     )});

    render() {
        // const {searchTerm, filters} = this.props;
        const { submissions, loading, publications } = this.props;
        // const filteredSubmissions = this.filteredSubmissions(submissions, this.state);

        let matchingSubmissions;
        if (loading) {
            matchingSubmissions = <CubicLoadingSpinner/>
        } else {
            matchingSubmissions = submissions;
        }
        const rows = Object.keys(matchingSubmissions).map(sub =>
            <ReviewRow submission={submissions[sub]}/>);
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
                {rows}
            </table>
        )
    }

}

const mapStateToProps = state => ({
    publications: state.publications.publicationsOptions(),
    publicationsAbbrHash: state.publications.publicationsAbbrHash(),
    filterValues: state.sublitr.filterValues,
    statusLists: state.sublitr.statusLists,
    submissions: state.submissions.submissionData,
    loading: state.submissions.loading,
    editorId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(ReviewTable);