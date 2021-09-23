import createState from 'redux-create-state';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';
import { handleAddonsData, handleServicesData } from '../../utils/helpers';

import * as serviceActions from './Service-Actions';

export const INITIAL_STATE = {
    stores: [],
    favourites: [],
    focusStore: null,
};

const servicePersistConfig = {
    key: 'service',
    storage,
};

export default persistReducer(servicePersistConfig, utils.createReducer(INITIAL_STATE)({
    [serviceActions.setStoresData().type]: (state, action) => createState(state || INITIAL_STATE, ['stores', action.payload]),
    [serviceActions.setFavouritesData().type]: (state, action) => createState(state || INITIAL_STATE, ['favourites', action.payload]),
    [serviceActions.setFocusStore().type]: (state, action) => createState(state || INITIAL_STATE, ['focusStore', action.payload]),
}));
