import { Route, Switch } from 'react-router-dom';
import React from 'react';
import serviceRoutes from '../../routes/serviceRoutes';
import ServiceWrapper from './ServiceWrapper';

const Account = () => (
    <ServiceWrapper>
        <Switch>
            {
                serviceRoutes.map(({ path, Component }) => (
                    <Route
                        path={path}
                        render={() => (
                            <Component />
                        )}
                    />
                ))
            }
        </Switch>
    </ServiceWrapper>
);

export default Account;
