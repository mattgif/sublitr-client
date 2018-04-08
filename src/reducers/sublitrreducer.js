import {
    DELETE_SUBMISSION, ADD_COMMENT, UPDATE_STATUS, FETCH_PUBLICATIONS_SUCCESS, FETCH_PUBLICATIONS_ERROR,
} from "../actions";
import {AUTH_REQUEST} from "../actions/auth";

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
    submissions: [],
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
    } else if (action.type === ADD_COMMENT) {
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
    } else if (action.type === UPDATE_STATUS) {
        const updatedSubmissions = state.submissions.map((sub) => {
            if (sub.id !== action.id) {
                return sub;
            }
            const newItem = Object.assign({}, sub);
            newItem.reviewerInfo[action.field] = action.value;
            newItem.reviewerInfo.lastAction = new Date().toLocaleDateString();
            newItem.status = newItem.reviewerInfo.decision;
            return newItem
        });
        return Object.assign({}, state, {
            submissions: updatedSubmissions
        })
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        })
    } else if (action.type === FETCH_PUBLICATIONS_SUCCESS) {
        return Object.assign({}, state, {
            publications: action.publications
        })
    } else if (action.type === FETCH_PUBLICATIONS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    }

    return state;
};