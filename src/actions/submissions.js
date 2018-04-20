import {API_BASE_URL} from "../config";
import {normalizeResponseErrors} from "./utils";
import {SubmissionError} from "redux-form";

// Getting submissions
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

// Getting doc/pdf for preview
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
            const key = getState().submissions.submissionData[id].file;
            dispatch(fetchDocument(id, key))
        });
};

// Handle status change
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

// Delete submission
export const DELETE_SUBMISSION_REQUEST = 'DELETE_SUBMISSION_REQUEST';
export const deleteSubmissionRequest = submissionId => ({
    type: DELETE_SUBMISSION_REQUEST,
    submissionId
});

export const DELETE_SUBMISSION_SUCCESS = 'DELETE_SUBMISSION_SUCCESS';
export const deleteSubmissionSuccess = submissionId => ({
    type: DELETE_SUBMISSION_SUCCESS,
    submissionId
});

export const DELETE_SUBMISSION_ERROR = 'DELETE_SUBMISSION_ERROR';
export const deleteSubmissionError = error => ({
    type: DELETE_SUBMISSION_ERROR,
    error
});

export const deleteSubmission = submissionId => (dispatch, getState) => {
    dispatch(deleteSubmissionRequest(submissionId));
    fetch(`${API_BASE_URL}/submissions/${submissionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getState().auth.authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({submissionId})
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(deleteSubmissionSuccess(submissionId)))
        .catch(err => dispatch(deleteSubmissionError(err)))
};

// Comments
export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const createCommentRequest = () => ({
    type: CREATE_COMMENT_REQUEST
});

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const createCommentSuccess = (submissionId, comment) => ({
    type: CREATE_COMMENT_SUCCESS,
    submissionId,
    comment
});

export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';
export const createCommentError = error => ({
    type: CREATE_COMMENT_ERROR,
    error
});

export const createComment = (submissionId, comment) => (dispatch, getState) => {
    dispatch(createCommentRequest());
    fetch(`${API_BASE_URL}/submissions/${submissionId}/comment`, {
        method: 'POST',
        body: JSON.stringify({
            text: comment
        }),
        headers: {
            'Authorization': `Bearer ${getState().auth.authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(createCommentSuccess(submissionId, res)))
        .catch(error => dispatch(createCommentError(error)));
};

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const deleteCommentRequest = commentId => ({
    type: DELETE_COMMENT_REQUEST,
    commentId
});

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const deleteCommentSuccess = (submissionId, commentId) => ({
    type: DELETE_COMMENT_SUCCESS,
    submissionId,
    commentId
});

export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';
export const deleteCommentError = (commentId, error) => ({
    type: DELETE_COMMENT_ERROR,
    commentId,
    error
});

export const deleteComment = (submissionId, commentId) => (dispatch, getState) => {
    dispatch(deleteCommentRequest(commentId));
    fetch(`${API_BASE_URL}/submissions/${submissionId}/comment/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            submissionId,
            commentId
        }),
        headers: {
            'Authorization': `Bearer ${getState().auth.authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(deleteCommentSuccess(submissionId, commentId)))
        .catch(error => dispatch(deleteCommentError(commentId, error)))
};

// create submission
export const CREATE_SUBMISSION_REQUEST = 'CREATE_SUBMISSION_REQUEST';
export const createSubmissionRequest = () => ({
    type: CREATE_COMMENT_REQUEST
});

export const createSubmission = formData => (dispatch, getState) => {
    dispatch(createSubmissionRequest());
    return fetch(`${API_BASE_URL}/submissions`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${getState().auth.authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(() => {dispatch(fetchSubmissions())})
        .catch(err => {
            console.log(err);
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return new SubmissionError({
                        [location]: message
                    })
            } else {
                return new SubmissionError({
                        _error: message
                    });
            }
        })
};

export const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';
export const clearSubmissions = () => ({
    type: CLEAR_SUBMISSIONS
});