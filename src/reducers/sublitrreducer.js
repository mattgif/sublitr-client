import {
    DELETE_SUBMISSION, ADD_COMMENT, FETCH_PUBLICATIONS_SUCCESS, FETCH_PUBLICATIONS_ERROR,
    TOGGLE_CARD_EXPAND, CREATE_CARD,
} from "../actions";

const initialState = {
    dashboard: {activeTab: 'submissions'},
    statusLists: {
        decision: [
            {
                short: 'pending',
                long: 'No decision'
            },
            {
                short: 'revise',
                long: 'Revise & resubmit'
            },
            {
                short: 'accepted',
                long: 'Accepted'
            },
            {
                short: 'declined',
                long: 'Declined'
            }
        ],
        recommendation: [
            {
                short: 'none',
                long: 'Not reviewed'
            },
            {
                short: 'underReview',
                long: 'Under review'
            },
            {
                short: 'accept',
                long: 'Accept'
            },
            {
                short: 'revise',
                long: 'Revise & Resubmit'
            },
            {
                short: 'consider',
                long: 'Consider'
            },
            {
                short: 'decline',
                long: 'Decline'
            }
        ]
    },
    publications: [
        {
            "title": "Jellyfish Magazine",
            "abbr": "jfm"
        },
        {
            "title": "Journal of Poetry",
            "abbr": "jop"
        },
        {
            "title": "Literature Review",
            "abbr": "litrev"
        },
        {
            "title": "Jubilat",
            "abbr": "jubilat"
        },
        {
            "title": "Writer's Digest",
            "abbr": "wd"
        },
        {
            "title": "Prose Studies",
            "abbr": "prosestudies"
        }
    ],
    submissionCards: {},
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

    else if (action.type === ADD_COMMENT) {
        // TODO: async
        const updatedSubmissions = state.submissions.slice();
        const foundIndex = updatedSubmissions.findIndex((el) => el.id === action.id);
        const submission = updatedSubmissions[foundIndex];
        updatedSubmissions.splice(foundIndex, 1);
        if (submission.reviewerInfo.comments) {
            submission.reviewerInfo.comments.push(action.comment)
        } else {
            submission.reviewerInfo.comments = [action.comment]
        }
        updatedSubmissions.push(submission);
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

    else if (action.type === TOGGLE_CARD_EXPAND) {
        const toggledCard = Object.assign({}, state.submissionCards[action.id], {
            expanded: !state.submissionCards[action.id].expanded
        });
        return Object.assign({}, state, {submissionCards: {...state.submissionCards, toggledCard}})
    }

    else if (action.type === CREATE_CARD) {
        if (!state.submissionCards[action.id]) {
            return Object.assign({}, state, {submissionCards:
                    {...state.submissionCards, [action.id]: {expanded: false}}
            })
        }
    }

    //


    return state;
};