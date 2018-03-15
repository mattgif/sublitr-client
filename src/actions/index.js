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
export const openModal = (modalType, buttons) => ({
    type: OPEN_MODAL,
    modalType: modalType,
    buttons: buttons
});