/* eslint-disable no-underscore-dangle */

import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import rootReducer from './reducers';

const devTools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : () => (noop) => noop;

// this is required key for persistReducer
const persistConfig = {
    key: 'root',
    storage,
};
const sagaMiddleware = createSagaMiddleware();
const configureStore = (initialState = {}) => {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const enhancers = [applyMiddleware(sagaMiddleware), devTools()];
    const composedEnhancers = compose(...enhancers);
    const store = createStore(persistedReducer, initialState, composedEnhancers);
    store.runSaga = sagaMiddleware.run;
    return store;
};

export default configureStore;
