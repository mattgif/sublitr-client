import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from "./utils";

export const TOGGLE_EDITOR = 'TOGGLE_EDITOR';
export const toggleEditor = (email) => ({
    type: TOGGLE_EDITOR,
    email
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

