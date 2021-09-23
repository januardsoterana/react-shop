import * as actions from './Dry-Styling-Actions';
import * as actionTypes from './Dry-Styling-ActionTypes';
import reducers from './Dry-Styling-Reducer';
import * as operations from './Dry-Styling-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
