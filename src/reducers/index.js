import {testingState} from "../dummy/testingstate";
import {CHANGE_TAB, TOGGLE_SIDEBAR, CLOSE_MODAL, OPEN_MODAL} from "../actions";

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
    return state;
};