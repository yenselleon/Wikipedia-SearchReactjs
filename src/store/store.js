import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import persidState from 'redux-localstorage'
import { setLocalStorageReducer } from '../reducers/setLocalStorageReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    ui: uiReducer,
    localStoragedata: setLocalStorageReducer,
});

let config = {
    key: 'lastViewAndBookmarks'
}

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk),
        persidState('localStoragedata', config)
    )
);

