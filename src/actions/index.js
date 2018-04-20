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