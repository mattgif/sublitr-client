import {testingState} from "../dummy/testingstate";
import {
    CHANGE_TAB, LOGOUT, TOGGLE_EDITOR, DELETE_USER,
    DELETE_SUBMISSION, ADD_COMMENT, UPDATE_STATUS
} from "../actions";

const initialState = testingState;

export const sublitrReducer = (state = initialState, action) => {
    if (action.type === CHANGE_TAB) {
        // TODO: async
        return Object.assign({}, state, {
            dashboard: {
                activeTab: action.tab
            }
        });
    }

    if (action.type === LOGOUT) {
        // TODO: async
        return Object.assign({}, state, {
            user: false
        });
    }

    if (action.type === TOGGLE_EDITOR) {
        // TODO: async
        const usersUpdated = state.users.slice();
        const foundIndex = usersUpdated.findIndex(user => user.email === action.email);
        usersUpdated[foundIndex].editor = !usersUpdated[foundIndex].editor;
        return Object.assign({}, state, {
            users: usersUpdated
        })
    }

    if (action.type === DELETE_USER) {
        // TODO: async
        const updatedUsers = state.users.filter(user =>
            user.id !== action.id);

        return Object.assign({}, state, {
            users: updatedUsers
        })
    }

    if (action.type === DELETE_SUBMISSION) {
        // TODO: async
        const updatedSubmissions = state.submissions.filter(submission =>
            submission.id !== action.id);

        return Object.assign({}, state, {
            submissions: updatedSubmissions
        })
    }

    if (action.type === ADD_COMMENT) {
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

    if (action.type === UPDATE_STATUS) {
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
    }

    return state;
};