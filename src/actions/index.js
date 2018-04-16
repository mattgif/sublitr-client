import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from "./utils";

export const DELETE_SUBMISSION = 'DELETE_SUBMISSION';
export const deleteSubmission = (id) => ({
    type: DELETE_SUBMISSION,
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