import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as franchisingActions from './Franchising-Actions';

export const INITIAL_STATE = {
    title: '',
    heroImage: ''
};

const franchisingPersistConfig = {
    key: 'franchising',
    storage,
};

export default persistReducer(franchisingPersistConfig, utils.createReducer(INITIAL_STATE)({
    [franchisingActions.setFranchisingContent().type]: (state, action) => createState(state || INITIAL_STATE,
        ['title', action.payload.title])
    ,
}));
