import {testingState} from "../dummy/testingstate";
import {CHANGE_TAB} from "../actions";
import {TOGGLE_SIDEBAR} from "../actions";

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
    return state;
};