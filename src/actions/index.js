export const CHANGE_TAB = 'CHANGE_TAB';
export const changeTab = tab => ({
    type: CHANGE_TAB,
    tab
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: LOGOUT,
});

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

export const UPDATE_ACTIVE_SUBMISSION = 'UPDATE_ACTIVE_SUBMISSION';
export const updateActiveSubmission = (id) => ({
    type: UPDATE_ACTIVE_SUBMISSION,
    id
});

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const updateStatus = (field, value, id) => ({
    type: UPDATE_STATUS,
    field,
    value,
    id
});