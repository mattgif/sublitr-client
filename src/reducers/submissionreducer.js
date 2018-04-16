import {
    CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
    FETCH_DOCUMENT_ERROR,
    FETCH_DOCUMENT_REQUEST, FETCH_DOCUMENT_SUCCESS, GET_SUBMISSIONS_REQUEST, GET_SUBMISSIONS_SUCCESS,
    UPDATE_STATUS_ERROR,
    UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS
} from "../actions/submissions";

const initialState = {
    submissionData: {},
    loading: false,
    fetchingDocument: false,
    error: null,
    loadedFiles: {},
    updating: {},
    commenting: false,
};

export const submissionReducer = (state = initialState, action) => {
    if (action.type === GET_SUBMISSIONS_SUCCESS) {
        const updatedSubmissionData = Object.assign({}, state.submissionData);
        action.submissions.forEach(sub => updatedSubmissionData[sub.id] = sub);

        return Object.assign({}, state, {
            submissionData: updatedSubmissionData,
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
        const submissionData = Object.assign({}, state.submissionData);
        const updatedSubmission = submissionData[action.id];
        if (action.field === 'decision') {
            updatedSubmission.status = action.value;
            updatedSubmission.reviewerInfo.decision = action.value;
        } else {
            updatedSubmission.reviewerInfo.recommendation = action.value
        }
        updatedSubmission.reviewerInfo.lastAction = new Date().toString();
        const updating = Object.assign({}, state.updating, {
            [action.id]: false
        });
        return Object.assign({}, state, {submissionData, updating})
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

    else if (action.type === CREATE_COMMENT_REQUEST) {
        return {
            ...state,
            commenting: true
        }
    }

    else if (action.type === CREATE_COMMENT_SUCCESS) {
        console.log(action);
        return {
            ...state,
            commenting: false,
            submissionData: {
                ...state.submissionData,
                [action.submissionId]: {
                    ...state.submissionData[action.submissionId],
                    reviewerInfo: {
                        ...state.submissionData[action.submissionId].reviewerInfo,
                        comments: [...state.submissionData[action.submissionId].reviewerInfo.comments, action.comment]
                    }
                }
            }
        }
    }

    return state;
};