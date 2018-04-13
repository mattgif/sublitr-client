import {
    FETCH_DOCUMENT_ERROR,
    FETCH_DOCUMENT_REQUEST, FETCH_DOCUMENT_SUCCESS, GET_SUBMISSIONS_REQUEST, GET_SUBMISSIONS_SUCCESS,
    UPDATE_STATUS_ERROR,
    UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS
} from "../actions/submissions";

const initialState = {
    allSubmissions: [],
    loading: false,
    fetchingDocument: false,
    error: null,
    loadedFiles: {},
    updating: {}
};

export const submissionReducer = (state = initialState, action) => {
    if (action.type === GET_SUBMISSIONS_SUCCESS) {
        return Object.assign({}, state, {
            allSubmissions: action.submissions,
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

    else if (action.type === UPDATE_STATUS_REQUEST) {
        return {...state, updating: {...state.updating, [action.id]: true}}
    }

    else if (action.type === UPDATE_STATUS_SUCCESS) {
        const submission = state.allSubmissions.find(s => s.id === action.id);
        const updatedSubmission = Object.assign({}, submission,
            Object.assign({}, submission.reviewerInfo, {
                [action.field]: action.value
        }));
        if (action.field === 'decision') {updatedSubmission.status = action.value;}
        return {
            ...state,
            updating: {
                [action.id]: false
            },
            allSubmissions: [...state.allSubmissions.filter(s => s.id !== action.id), updatedSubmission]
        }
    }

    else if (action.type === UPDATE_STATUS_ERROR) {
        return {
            ...state,
            updating: {
                [action.id]: false
            },
            error: action.error
        }
    }

    return state;
};