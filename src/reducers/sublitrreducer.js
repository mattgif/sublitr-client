import {
    CLEAR_DASHBOARD_MESSAGE,
    DOCVIEWER_ACTIVE, DOCVIEWER_INACTIVE,
    SHOW_DASHBOARD_MESSAGE, TOGGLE_DOCVIEWER_SIDEBAR,
    TOGGLE_SUBMISSION_FORM
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
        {text: 'Journal of Poetry', value: 'Journal of Poetry', key: 'jop'},
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
    allowedFileTypes: ["application/pdf"],
    showNewSubmissionForm: false,
    dashboardMessage: undefined,
    displayMenuButton: false
};

export const sublitrReducer = (state = initialState, action) => {
    if (action.type === TOGGLE_SUBMISSION_FORM) {
        return Object.assign({}, state, {
            showNewSubmissionForm: !state.showNewSubmissionForm
        })
    }

    else if (action.type === SHOW_DASHBOARD_MESSAGE) {
        return Object.assign({}, state, {
            dashboardMessage: action.message
        })
    }

    else if (action.type === CLEAR_DASHBOARD_MESSAGE) {
        return Object.assign({}, state, {
            dashboardMessage: undefined
        })
    }

    else if (action.type === TOGGLE_DOCVIEWER_SIDEBAR) {
        return Object.assign({}, state, {
            showSidebar: !state.showSidebar
        })
    }

    else if (action.type === DOCVIEWER_ACTIVE) {
        return Object.assign({}, state, {
            displayMenuButton: true
        })
    }

    else if (action.type === DOCVIEWER_INACTIVE) {
        return Object.assign({}, state, {
            displayMenuButton: false
        })
    }

    return state;
};