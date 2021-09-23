import * as actions from './Booking-Actions';
import * as actionTypes from './Booking-ActionTypes';
import reducers from './Booking-Reducer';
import * as operations from './Booking-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
