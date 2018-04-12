import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from './reducers/authreducer';
import {submissionReducer} from './reducers/submissionreducer'
import {sublitrReducer} from './reducers/sublitrreducer';
import {userReducer} from "./reducers/userreducer";
import {loadAuthToken} from "./localstorage";
import {refreshAuthToken, setAuthToken} from "./actions/auth";

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        users: userReducer,
        submissions: submissionReducer,
        sublitr: sublitrReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    store.dispatch(setAuthToken(authToken));
    store.dispatch(refreshAuthToken());
}

export default store;