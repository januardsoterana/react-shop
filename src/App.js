/* eslint-disable react/prop-types */
import React from 'react';
import {
    Switch,
    Route, withRouter,
} from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import AppShell from './AppShell';

import publicRoutes from './routes/routes';
import config from './app.config';
import './assets/css/bootstrap.scss';
import './assets/css/font-awesome.min.scss';

const oktaAuth = new OktaAuth(config);

const App = ({ history }) => (
    <Security
        oktaAuth={oktaAuth}
        onAuthRequired={() => history.push('/auth/login')}
    >
        <Switch>
            {/** Test route */}
            <SecureRoute path="/secure" />
            <Route path="/login/callback" component={LoginCallback} />
            {
                publicRoutes.map(({ path, Component, privateRoute }) => (
                    privateRoute ? (
                        <SecureRoute
                            path={path}
                            render={() => (
                                <>
                                    <AppShell>
                                        <Component />
                                    </AppShell>
                                </>
                            )}
                        />
                    ) : (
                        <Route
                            path={path}
                            render={() => (
                                <>
                                    <AppShell>
                                        <Component />
                                    </AppShell>
                                </>
                            )}
                        />
                    )
                ))
            }
        </Switch>
    </Security>
);

export default withRouter(App);
