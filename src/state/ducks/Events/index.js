import * as actions from './Events-Actions';
import * as actionTypes from './Events-ActionTypes';
import reducers from './Events-Reducer';
import * as operations from './Events-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
