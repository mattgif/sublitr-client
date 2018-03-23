import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import {sublitrReducer} from './reducers/sublitrreducer';

const store = createStore(
    combineReducers({
        form: formReducer,
        sublitr: sublitrReducer
    }),
    applyMiddleware(thunk)
);

export default store;