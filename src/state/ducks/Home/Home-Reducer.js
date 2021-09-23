import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as homeActions from './Home-Actions';

export const INITIAL_STATE = {
    hero: {},
    ribbon: {},
    theStyles: {},
    promos: {},
    offers: {},
    social: {}
};

const homePersistConfig = {
    key: 'home',
    storage,
};

export default persistReducer(homePersistConfig, utils.createReducer(INITIAL_STATE)({
    [homeActions.setHomeContent().type]: (state, action) => createState(state || INITIAL_STATE,
        ['hero', action.payload.hero], ['ribbon', action.payload.ribbon], ['theStyles', action.payload.theStyles],
        ['promos', action.payload.promos], ['offers', action.payload.offers], ['social', action.payload.social])
    ,
}));
