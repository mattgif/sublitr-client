import {
    FETCH_DOCUMENT_ERROR,
    FETCH_DOCUMENT_REQUEST, FETCH_DOCUMENT_SUCCESS, GET_SUBMISSIONS_REQUEST, GET_SUBMISSIONS_SUCCESS
} from "../actions/submissions";

const initialState = {
    allSubmissions: [],
    mySubmissions: [],
    loading: false,
    fetchingDocument: false,
    error: null,
    loadedFiles: {}
};

export const submissionReducer = (state = initialState, action) => {
    if (action.type === GET_SUBMISSIONS_SUCCESS) {
        return Object.assign({}, state, {
            allSubmissions: action.submissions,
            mySubmissions: action.submissions.filter(submission => submission.authorID === action.userId),
            loading: false
        })
    }

    else if (action.type === FETCH_DOCUMENT_REQUEST) {
        return Object.assign({}, state, {
            fetchingDocument: true
        })
    }

    else if (action.type === FETCH_DOCUMENT_SUCCESS) {
        return {
            ...state,
            loadedFiles: {
                ...state.loadedFiles,
                [action.id]: action.doc
            },
            fetchingDocument: false,
            error: null
        }
    }

    else if (action.type === FETCH_DOCUMENT_ERROR) {
        return Object.assign({}, state, {
            fetchingDocument: false,
            error: action.error
        })
    }

    else if (action.type === GET_SUBMISSIONS_REQUEST) {
        return Object.assign({}, state, {
            loading: true
        })
    }
    return state;
};