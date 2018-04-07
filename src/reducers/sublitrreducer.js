import {testingState} from "../dummy/testingstate";
import {
    LOGOUT, TOGGLE_EDITOR, DELETE_USER,
    DELETE_SUBMISSION, ADD_COMMENT, UPDATE_STATUS, FETCH_USER_SUCCESS, FETCH_USER_LIST_ERROR,
} from "../actions";
import {AUTH_REQUEST} from "../actions/auth";

const initialState = testingState;

export const sublitrReducer = (state = initialState, action) => {
    if (action.type === LOGOUT) {
        // TODO: async
        return Object.assign({}, state, {
            user: false
        });
    }

    else if (action.type === TOGGLE_EDITOR) {
        // TODO: async
        const usersUpdated = state.users.slice();
        const foundIndex = usersUpdated.findIndex(user => user.email === action.email);
        usersUpdated[foundIndex].editor = !usersUpdated[foundIndex].editor;
        return Object.assign({}, state, {
            users: usersUpdated
        })
    }

    else if (action.type === DELETE_USER) {
        // TODO: async
        const updatedUsers = state.users.filter(user =>
            user.id !== action.id);

        return Object.assign({}, state, {
            users: updatedUsers
        })
    }

    else if (action.type === DELETE_SUBMISSION) {
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

    else if (action.type === UPDATE_STATUS) {
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

    else if (action.type === FETCH_USER_SUCCESS) {
        return Object.assign({}, state, {
            users: action.userList
        })
    }

    else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        })
    }

    else if (action.type === FETCH_USER_LIST_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    }

    return state;
};