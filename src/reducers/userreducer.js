import {
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_SUCCESS,
    FETCH_USER_LIST_ERROR, FETCH_USER_SUCCESS, DELETE_USER_ERROR, USER_SORT_BY
} from "../actions/users";
import {sortByKey} from "../actions/utils";

const initialState = {
    users: [],
    error: null,
    loading: false,
    sortBy: 'lastName',
    reverse: false
};

export const userReducer = (state = initialState, action) => {
    if (action.type === UPDATE_USER_SUCCESS) {
        // find target user in state.users array
        // assign user data + updated info to new object
        // return state, with users = all users but target and add target
        let updatedUser = action.userInfo;
        const user = state.users.find(u => u.id === updatedUser.id);
        updatedUser = Object.assign({}, user, updatedUser);
        let users = [...state.users.filter(u => u !== user), {...updatedUser}];
        users = sortByKey(state.sortBy, users, state.reverse);
        return {...state, users}
    }

    else if (action.type === DELETE_USER_SUCCESS) {
        let updatedUsers = state.users.filter(user => user.id !== action.userId);
        updatedUsers = sortByKey(state.sortBy, updatedUsers, state.reverse);
        return Object.assign({}, state, {
            users: updatedUsers
        })
    }

    else if (action.type === DELETE_USER_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        })
    }

    else if (action.type === DELETE_USER_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        })
    }

    else if (action.type === FETCH_USER_SUCCESS) {
        const users = sortByKey(state.sortBy, action.userList, state.reverse);
        return Object.assign({}, state, {
            users,
            error: null
        })
    }

    else if (action.type === FETCH_USER_LIST_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    }

    else if (action.type === USER_SORT_BY) {
        let reverse = state.reverse;
        let key = action.key;
        if (key === state.sortBy) {
            reverse = !reverse
        }
        const users = sortByKey(key, state.users, reverse);
        return Object.assign({}, state, {
            users,
            sortBy: key,
            reverse
        })
    }

    return state;
};