import {testingState} from "../dummy/testingstate";
import {CHANGE_TAB, TOGGLE_SIDEBAR, CLOSE_MODAL, OPEN_MODAL, LOGOUT, TOGGLE_EDITOR} from "../actions";

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
                buttons: []
            }
        })
    }

    if (action.type === OPEN_MODAL) {
        return Object.assign({}, state, {
           modal: {
               show: true,
               type: action.modalType,
               buttons: action.buttons
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

    return state;
};