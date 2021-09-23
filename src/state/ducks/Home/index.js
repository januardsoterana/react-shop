import * as actions from './Home-Actions';
import * as actionTypes from './Home-ActionTypes';
import reducers from './Home-Reducer';
import * as operations from './Home-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
