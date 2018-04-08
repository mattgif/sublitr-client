import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from "./utils";

export const TOGGLE_EDITOR = 'TOGGLE_EDITOR';
export const toggleEditor = (email) => ({
    type: TOGGLE_EDITOR,
    email
});

export const DELETE_USER = 'DELETE_USER';
export const deleteUser = (id) => ({
    type: DELETE_USER,
    id
});

export const DELETE_SUBMISSION = 'DELETE_SUBMISSION';
export const deleteSubmission = (id) => ({
    type: DELETE_SUBMISSION,
    id
});

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (comment, id) => ({
    type: ADD_COMMENT,
    comment,
    id
});

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const updateStatus = (field, value, id) => ({
    type: UPDATE_STATUS,
    field,
    value,
    id
});

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
    fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(userList => dispatch(fetchUserSuccess(userList)))
        .catch(err => dispatch(fetchUserListError(err)))
};

export const FETCH_PUBLICATIONS_SUCCESS = 'FETCH_PUBLICATIONS_SUCCESS';
export const fetchPublicationsSuccess = publications => ({
    type: FETCH_PUBLICATIONS_SUCCESS,
    publications
});

export const FETCH_PUBLICATIONS_ERROR = 'FETCH_PUBLICATIONS_ERROR';
export const fetchPublicationsError = error => ({
    type: FETCH_PUBLICATIONS_ERROR,
    error
});

export const fetchPublications = () => dispatch => {
    fetch(`${API_BASE_URL}/publications`)
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(publications => dispatch(fetchPublicationsSuccess(publications)))
        .catch(err => dispatch(fetchPublicationsError(err)))
};

