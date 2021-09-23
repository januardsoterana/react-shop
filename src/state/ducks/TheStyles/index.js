import * as actions from './TheStyles-Actions';
import * as actionTypes from './TheStyles-ActionTypes';
import reducers from './TheStyles-Reducer';
import * as operations from './TheStyles-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
