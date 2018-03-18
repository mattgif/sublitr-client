import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {sublitrReducer} from './reducers/sublitrreducer';

const store = createStore(
    combineReducers({
        form: formReducer,
        sublitr: sublitrReducer
    })
);

export default store;