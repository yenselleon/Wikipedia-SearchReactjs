import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getDataReducer } from '../reducers/getDataReducer';
import persidState from 'redux-localstorage'
import { setLocalStorageReducer } from '../reducers/setLocalStorageReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    getData: getDataReducer,
    localStoragedata: setLocalStorageReducer,
});

let config = {
    key: 'lastViewAndBookmarks'
}

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk),
        persidState('localStoragedata', config)
    )
);

export default store;