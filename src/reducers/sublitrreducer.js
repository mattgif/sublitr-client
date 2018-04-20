import {
    DELETE_SUBMISSION, FETCH_PUBLICATIONS_SUCCESS, FETCH_PUBLICATIONS_ERROR
} from "../actions";

const initialState = {
    dashboard: {activeTab: 'submissions'},
    statusLists: {
        decision: [
            {text:'Pending review', value: 'pending', icon: 'hourglass full', key:'pending'},
            {text:'Revise & Resubmit', value: 'revise', icon: 'flag', key:'revise'},
            {text:'Accepted', value: 'accepted', icon: 'thumbs up', key: 'accepted'},
            {text:'Declined', value: 'declined', icon: 'remove circle outline', key: 'declined'}
        ],
        recommendation: [
            {text: 'Not reviewed', value: 'none', key: 'none'},
            {text: 'Under review', value: 'underReview', key: 'underReview'},
            {text: 'Accept', value: 'accept', key: 'accept'},
            {text: 'Revise & Resubmit', value: 'revise', key: 'revise'},
            {text: 'Consider', value: 'consider', key: 'consider'},
            {text: 'Decline', value: 'decline', key:'decline'}
        ]
    },
    publications:[
        {text: 'Jellyfish Magazine', value: 'Jellyfish Magazine', key: 'jfm'},
        {text: 'Jellyfish Magazine', value: 'Jellyfish Magazine', key: 'jop'},
        {text: 'Literature Review', value: 'Literature Review', key: 'litrev'},
        {text: 'Jubilat', value: 'Jubilat', key: 'jublat'},
        {text: 'Writer\'s Digest', value: 'Writer\'s Digest', key: 'wd'},
        {text: 'Prose Studies', value:'Prose Studies', key: 'prosestudies'}
    ],
    filterValues: {
        recommendationFilter: ["all"],
        publicationFilter: "all",
        decisionFilter: "all",
        userFilter: "all"
    },
    showSidebar: false,
    allowedFileTypes: ["application/pdf"]
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