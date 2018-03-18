export const CHANGE_TAB = 'CHANGE_TAB';
export const changeTab = tab => ({
    type: CHANGE_TAB,
    tab
});

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = ({modalType, label, confirmMessage, confirmAction} = {}) => ({
    type: OPEN_MODAL,
    modalType,
    label,
    confirmAction,
    confirmMessage
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