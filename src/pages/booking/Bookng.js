import { Switch, Route } from 'react-router-dom';
import React from 'react';
import bookingRoutes from '../../routes/bookingRoutes';
import BookingWrapper from './BookingWrapper';

const Bookng = () => (
    <BookingWrapper>
        {({ goToNextPage }) => (
            <Switch>
                {
                    bookingRoutes.map(({ path, Component }) => (
                        <Route
                            path={path}
                            render={() => (
                                <Component goToNextPage={goToNextPage} />
                            )}
                        />
                    ))
                }
            </Switch>
        )}
    </BookingWrapper>


);

export default Bookng;
