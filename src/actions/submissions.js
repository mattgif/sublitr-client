import {API_BASE_URL} from "../config";
import {normalizeResponseErrors} from "./utils";

export const GET_SUBMISSIONS_REQUEST = 'GET_SUBMISSIONS_REQUEST';
export const getSubmissionsRequest = () => ({
    type: GET_SUBMISSIONS_REQUEST
});

export const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS';
export const getSubmissionsSuccess = (submissions, userId) => ({
    type: GET_SUBMISSIONS_SUCCESS,
    submissions,
    userId
});

export const fetchSubmissions = () => (dispatch, getState) => {
    dispatch(getSubmissionsRequest());
    fetch(`${API_BASE_URL}/submissions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(submissions => dispatch(getSubmissionsSuccess(submissions, getState().auth.currentUser.id)))
};

export const FETCH_DOCUMENT_REQUEST = 'FETCH_DOCUMENT_REQUEST';
export const fetchDocumentRequest = () => ({
    type: FETCH_DOCUMENT_REQUEST
});

export const FETCH_DOCUMENT_SUCCESS = 'FETCH_DOCUMENT_SUCCESS';
export const fetchDocumentSuccess = (id, doc) => ({
    type: FETCH_DOCUMENT_SUCCESS,
    id,
    doc
});

export const FETCH_DOCUMENT_ERROR = 'FETCH_DOCUMENT_ERROR';
export const fetchDocumentError = error => ({
    type: FETCH_DOCUMENT_ERROR,
    error
});

export const fetchDocument = (id, key) => (dispatch, getState) => {
    dispatch(fetchDocumentRequest());
    let contentType;
    fetch(`${API_BASE_URL}/submissions/${id}/${key}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        }
    })
        .then(res => {
            contentType = res.headers.get("content-type");
            return normalizeResponseErrors(res)
        })
        .then(res => {
            const reader = res.body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        })
        .then(stream => new Response(stream, { headers: {'Content-Type': contentType}}))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => dispatch(fetchDocumentSuccess(id, url)))
        .catch(err => dispatch(fetchDocumentError(err)))
};

export const getSubmissionsAndFetchDocument = (id) => (dispatch, getState) => {
    dispatch(getSubmissionsRequest());
    fetch(`${API_BASE_URL}/submissions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(submissions => dispatch(getSubmissionsSuccess(submissions, getState().auth.currentUser.id)))
        .then(() => {
            const key = getState().submissions.allSubmissions.find(s => s.id === id).file;
            dispatch(fetchDocument(id, key))
        });
};

export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const updateStatusSuccess = (field, value, id) => ({
    type: UPDATE_STATUS_SUCCESS,
    field,
    value,
    id
});

export const UPDATE_STATUS_ERROR = 'UPDATE_STATUS_ERROR';
export const updateStatusError = (error, id) => ({
    type: UPDATE_STATUS_ERROR,
    error,
    id
});

export const UPDATE_STATUS_REQUEST = 'UPDATE_STATUS_REQUEST';
export const updateStatusRequest = id => ({
    type: UPDATE_STATUS_REQUEST,
    id
});

export const updateStatus = (field, value, id) => (dispatch, getState) => {
    dispatch(updateStatusRequest(id));
    fetch(`${API_BASE_URL}/submissions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            reviewerInfo: {
                [field]: value
            }
        }),
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(updateStatusSuccess(field, value, id)))
        .catch(error => dispatch(updateStatusError(error, id)))
};