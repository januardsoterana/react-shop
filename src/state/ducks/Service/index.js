import * as actions from './Service-Actions';
import * as actionTypes from './Service-ActionTypes';
import reducers from './Service-Reducer';
import * as operations from './Service-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
