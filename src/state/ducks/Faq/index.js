import * as actions from './Faq-Actions';
import * as actionTypes from './Faq-ActionTypes';
import reducers from './Faq-Reducer';
import * as operations from './Faq-Operations';

const watchers = {
    ...operations.watchers,
};

export {
    actionTypes,
    actions,
    reducers,
    watchers,
};
