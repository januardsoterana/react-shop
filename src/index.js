/* eslint-disable no-underscore-dangle */
/* eslint-disable space-infix-ops */
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './state';
import theme from './theme';
import baseGraphQLClient from './gql';
import saga from './state/saga/saga';
import EventEmitter from './utils/event/EventEmitter';

const store = configureStore();
const persistor = persistStore(store);

store.runSaga(saga);

const apolloState = (typeof window !== 'undefined' && window.__APOLLO_STATE__) ? window.__APOLLO_STATE__ : null;

// base apollo client config
const { apolloClient } = baseGraphQLClient({
    initialState: apolloState,
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <ThemeProvider theme={theme}>
                            <EventEmitter>
                                <CssBaseline />
                                <App />
                            </EventEmitter>
                        </ThemeProvider>
                    </Router>
                </PersistGate>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
