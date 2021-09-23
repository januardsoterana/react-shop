import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as barflyActions from './Barfly-Actions';

export const INITIAL_STATE = {
    membership: {},
    selectedStore: {},
    stores: [],
    storeLoaded: false,
    updatedCustomer: null,
    card: null
};

const homePersistConfig = {
    key: 'barfly',
    storage,
};

export default persistReducer(homePersistConfig, utils.createReducer(INITIAL_STATE)({
    [barflyActions.setBarflyMembership().type]: (state, action) => createState(state || INITIAL_STATE,
        ['membership', action.payload]),
    [barflyActions.setStores().type]: (state, action) => createState(state || INITIAL_STATE,
        ['stores', action.payload], ['storeLoaded', true]),
    [barflyActions.chooseStore().type]: (state, action) => createState(state || INITIAL_STATE,
        ['selectedStore', action.payload]),
    [barflyActions.setUpdatedCustomer().type]: (state, action) => createState(state || INITIAL_STATE, ['updatedCustomer', action.payload]),
    [barflyActions.setCard().type]: (state, action) => createState(state || INITIAL_STATE, ['card', action.payload])
}));





