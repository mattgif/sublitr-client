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