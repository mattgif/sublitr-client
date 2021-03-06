import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from "./utils";
import {SubmissionError} from 'redux-form';

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = userInfo => ({
    type: UPDATE_USER_SUCCESS,
    userInfo
});

export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const updateUserError = error => ({
    type: UPDATE_USER_ERROR,
    error
});

export const editUserInfo = userInfo => (dispatch, getState) => {
    return fetch(`${API_BASE_URL}/users/${userInfo.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...userInfo})
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(updateUserSuccess(userInfo)))
        .catch(err => dispatch(updateUserError(err)))
};

export const DELETE_USER_REQUEST = 'DELETE_REQUEST';
export const deleteRequest = userId => ({
    type: DELETE_USER_REQUEST,
    userId
});

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const deleteUserSuccess = userId => ({
    type: DELETE_USER_SUCCESS,
    userId
});

export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const deleteUserError = error => ({
    type: DELETE_USER_ERROR,
    error
});

export const deleteUser = userId => (dispatch, getState) => {
    dispatch(deleteRequest(userId));
    return fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(deleteUserSuccess(userId)))
        .catch(err => dispatch(deleteUserError(err)))
};

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = userList => ({
    type: FETCH_USER_SUCCESS,
    userList
});

export const FETCH_USER_LIST_ERROR = 'FETCH_USER_LIST_ERROR';
export const fetchUserListError = error => ({
    type: FETCH_USER_LIST_ERROR,
    error
});

export const fetchUserList = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(userList => dispatch(fetchUserSuccess(userList)))
        .catch(err => dispatch(fetchUserListError(err)))
};

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = () => ({
    type: CREATE_USER_SUCCESS
});

export const createUser = user => dispatch => {
    dispatch(createUserRequest);
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(() => dispatch(createUserSuccess()))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason ==='ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                )
            } else {
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                )
            }
        })
};

export const USER_SORT_BY = 'USER_SORT_BY';
export const userSortBy = key => ({
    type: USER_SORT_BY,
    key
});