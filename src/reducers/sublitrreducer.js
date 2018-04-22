import {
    CLEAR_APP_STATE,
    CLEAR_DASHBOARD_MESSAGE,
    DOCVIEWER_ACTIVE, DOCVIEWER_INACTIVE,
    SHOW_DASHBOARD_MESSAGE, TOGGLE_DOCVIEWER_SIDEBAR, TOGGLE_PUBLICATION_FORM,
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
    displayMenuButton: false,
    showNewPublicationForm: false
};

export const sublitrReducer = (state = initialState, action) => {
    // reducer for APP state properties (e.g. whether certain panels are shown)

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

    else if (action.type === CLEAR_APP_STATE) {
        return Object.assign({}, state, initialState)
    }

    else if (action.type === TOGGLE_PUBLICATION_FORM) {
        return Object.assign({}, state, {
            showNewPublicationForm: !state.showNewPublicationForm
        })
    }

    return state;
};