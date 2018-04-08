import {DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_SUCCESS,
    FETCH_USER_LIST_ERROR, FETCH_USER_SUCCESS} from "../actions/users";

const initialState = {
    users: [],
    error: null,
    loading: false
};

export const userReducer = (state = initialState, action) => {
    if (action.type === UPDATE_USER_SUCCESS) {
        // find target user in state.users array
        // assign user data + updated info to new object
        // return state, with users = all users but target and add target
        let updatedUser = action.userInfo;
        const user = state.users.find(u => u.id === updatedUser.id);
        updatedUser = Object.assign({}, user, updatedUser);
        return {...state, users: [...state.users.filter(u => u !== user), {...updatedUser}]}
    } else if (action.type === DELETE_USER_SUCCESS) {
        // TODO: async
        const updatedUsers = state.users.filter(user =>
            user.id !== action.id);

        return Object.assign({}, state, {
            users: updatedUsers
        })
    } else if (action.type === FETCH_USER_SUCCESS) {
        return Object.assign({}, state, {
            users: action.userList,
            error: null
        })
    } else if (action.type === FETCH_USER_LIST_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    } else if (action.type === DELETE_USER_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        })
    }

    return state;
};