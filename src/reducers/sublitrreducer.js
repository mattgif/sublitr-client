import {
    DELETE_SUBMISSION, FETCH_PUBLICATIONS_SUCCESS, FETCH_PUBLICATIONS_ERROR
} from "../actions";

const initialState = {
    dashboard: {activeTab: 'submissions'},
    statusLists: {
        decision: [
            {text:'Pending review', value: 'pending', icon: 'hourglass full'},
            {text:'Revise & Resubmit', value: 'revise', icon: 'flag'},
            {text:'Accepted', value: 'accepted', icon: 'thumbs up'},
            {text:'Declined', value: 'declined', icon: 'remove circle outline'}
        ],
        recommendation: [
            {text: 'Not reviewed', value: 'none'},
            {text: 'Under review', value: 'underReview'},
            {text: 'Accept', value: 'accept'},
            {text: 'Revise & Resubmit', value: 'revise'},
            {text: 'Consider', value: 'consider'},
            {text: 'Decline', value: 'decline'}
        ]
    },
    publications:[
        {text: 'Jellyfish Magazine', value: 'jfm'},
        {text: 'Journal of Poetry', value: 'jop'},
        {text: 'Literature Review', value: 'litrev'},
        {text: 'Jubilat', value: 'jubilat'},
        {text: 'Writer\'s Digest', value: 'wd'},
        {text: 'Prose Studies', value:'prosestudies'}
    ],
    filterValues: {
        recommendationFilter: ["all"],
        publicationFilter: "all",
        decisionFilter: "all",
        userFilter: "all"
    },
    showSidebar: false,
    allowedFileTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
};

export const sublitrReducer = (state = initialState, action) => {
    if (action.type === DELETE_SUBMISSION) {
        // TODO: async
        const updatedSubmissions = state.submissions.filter(submission =>
            submission.id !== action.id);

        return Object.assign({}, state, {
            submissions: updatedSubmissions
        })
    }

    else if (action.type === FETCH_PUBLICATIONS_SUCCESS) {
        return Object.assign({}, state, {
            publications: action.publications
        })
    }

    else if (action.type === FETCH_PUBLICATIONS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    }

    return state;
};