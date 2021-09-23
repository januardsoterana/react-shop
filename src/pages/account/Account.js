import { Route, Switch } from 'react-router-dom';
import React from 'react';
import accountRoutes from '../../routes/accountRoutes';
import AccountWrapper from './common/AccountWrapper';

const Account = () => (
    <AccountWrapper>
        {({ user }) => (
            <Switch>
                {
                    accountRoutes.map(({ path, Component }) => (
                        <Route
                            path={path}
                            render={() => (
                                <Component user={user} />
                            )}
                        />
                    ))
                }
            </Switch>
        )}
    </AccountWrapper>
);

export default Account;
