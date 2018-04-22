import {API_BASE_URL} from "../config";
import {normalizeResponseErrors} from "./utils";
import {SubmissionError} from "redux-form";
import {showDashboardMessage} from "./index";

// create
export const CREATE_PUBLICATION_REQUEST = 'CREATE_PUBLICATION_REQUEST';
export const createPublicationRequest = () => ({
    type: CREATE_PUBLICATION_REQUEST
});

export const CREATE_PUBLICATION_SUCCESS = 'CREATE_PUBLICATION_SUCCESS';
export const createPublicationSuccess = publication => ({
    type: CREATE_PUBLICATION_SUCCESS,
    publication
});

export const createPublication = formData => (dispatch, getState) => {
    dispatch(createPublicationRequest());
    return fetch(`${API_BASE_URL}/publications`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        },
        body: formData
    }).then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(createPublicationSuccess(res)))
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
        });
};

// retrieve
export const FETCH_PUBLICATIONS_REQUEST = 'FETCH_PUBLICATIONS_REQUEST';
export const fetchPublicationsRequest = () => ({
    type: FETCH_PUBLICATIONS_REQUEST
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

export const fetchPublications = () => (dispatch) => {
    dispatch(fetchPublicationsRequest());
    return fetch(`${API_BASE_URL}/publications`, {
        method: 'GET'
    }).then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(fetchPublicationsSuccess(res)))
        .catch(err => {dispatch(fetchPublicationsError(err));})
};

// update
export const UPDATE_PUBLICATION_SUCCESS = 'UPDATE_PUBLICATION_SUCCESS';
export const updatePublicatonSuccess = publication => ({
    type: UPDATE_PUBLICATION_SUCCESS,
    publication
});


export const updatePublication = (formData, id) => (dispatch, getState) => {
    return fetch(`${API_BASE_URL}/publications/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(publication => dispatch(updatePublicatonSuccess(publication)))
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
        });
};

// destroy
export const DELETE_PUBLICATION_REQUEST = 'DELETE_PUBLICATION_REQUEST';
export const deletePublicationRequest = () => ({
    type: DELETE_PUBLICATION_REQUEST
});

export const DELETE_PUBLICATION_SUCCESS = 'DELETE_PUBLICATION_SUCCESS';
export const deletePublicationSuccess = title => ({
    type: DELETE_PUBLICATION_SUCCESS,
    title
});

export const deletePublication = (title, id) => (dispatch, getState) => {
    dispatch(deletePublicationRequest());
    return fetch(`${API_BASE_URL}/publications/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        }
    })
        .then(() => {
            dispatch(deletePublicationSuccess(title));
            dispatch(showDashboardMessage({
                header: 'Deleted publication',
                text: '',
                error: false,
                positive: true
            }))
        })
        .catch(console.error)
};