import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from "./utils";

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
    fetch(`${API_BASE_URL}/users/${userInfo.id}`, {
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