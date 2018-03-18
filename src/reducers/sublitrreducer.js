import {testingState} from "../dummy/testingstate";
import {CHANGE_TAB, TOGGLE_SIDEBAR, CLOSE_MODAL, OPEN_MODAL, LOGOUT, TOGGLE_EDITOR, DELETE_USER} from "../actions";

const initialState = testingState;

export const sublitrReducer = (state = initialState, action) => {
    if (action.type === CHANGE_TAB) {
        return Object.assign({}, state, {
           dashboard: {
               activeTab: action.tab
           }
        });
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return Object.assign({}, state, {
            showSidebar: !state.showSidebar
        });
    }

    if (action.type === CLOSE_MODAL) {
        return Object.assign({}, state, {
            modal: {
                show: false,
                type: undefined,
                label: undefined,
                confirmMessage: undefined,
                confirmAction: undefined
            }
        })
    }

    if (action.type === OPEN_MODAL) {
        return Object.assign({}, state, {
           modal: {
               show: true,
               type: action.modalType,
               label: action.label,
               confirmMessage: action.confirmMessage,
               confirmAction: action.confirmAction
           }
        });
    }

    if (action.type === LOGOUT) {
        return Object.assign({}, state, {
            user: false
        });
    }

    if (action.type === TOGGLE_EDITOR) {
        const usersUpdated = state.users.slice();
        const foundIndex = usersUpdated.findIndex(user => user.email === action.email);
        usersUpdated[foundIndex].editor = !usersUpdated[foundIndex].editor;
        return Object.assign({}, state, {
            users: usersUpdated
        })
    }

    if (action.type === DELETE_USER) {
        const updatedUsers = state.users.filter(user =>
            user.id !== action.id);

        return Object.assign({}, state, {
            users: updatedUsers
        })
    }

    return state;
};