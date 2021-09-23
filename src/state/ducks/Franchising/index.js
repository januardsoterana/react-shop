import * as actions from './Franchising-Actions';
import * as actionTypes from './Franchising-ActionTypes';
import reducers from './Franchising-Reducer';
import * as operations from './Franchising-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
