export const TOGGLE_SUBMISSION_FORM = 'TOGGLE_SUBMISSION_FORM';
export const toggleSubmissionForm = () => ({
    type: TOGGLE_SUBMISSION_FORM
});

export const SHOW_DASHBOARD_MESSAGE = 'SHOW_DASHBOARD_MESSAGE';
export const showDashboardMessage = message => ({
    type: SHOW_DASHBOARD_MESSAGE,
    message
});

export const CLEAR_DASHBOARD_MESSAGE = 'CLEAR_DASHBOARD_MESSAGE';
export const clearDashboardMessage = () => ({
    type: CLEAR_DASHBOARD_MESSAGE
});

export const TOGGLE_DOCVIEWER_SIDEBAR = 'TOGGLE_DOCVIEWER_SIDEBAR';
export const toggleDocViewerSidebar = () => ({
    type: TOGGLE_DOCVIEWER_SIDEBAR
});

export const DOCVIEWER_ACTIVE = 'DOCVIEWER_ACTIVE';
export const docviewerActive = () => ({
    type: DOCVIEWER_ACTIVE
});

export const DOCVIEWER_INACTIVE = 'DOCVIEWER_INACTIVE';
export const docviewerInactive = () => ({
    type: DOCVIEWER_INACTIVE
});

export const CLEAR_APP_STATE = 'CLEAR_APP_STATE';
export const clearAppState = () => ({
    type: CLEAR_APP_STATE
});