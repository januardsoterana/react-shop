import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as theStylesActions from './TheStyles-Actions';

export const INITIAL_STATE = {
    title: '',
    description: '',
    heroImage: '',
    styles: []
};

const theStylesPersistConfig = {
    key: 'theStyles',
    storage,
};

export default persistReducer(theStylesPersistConfig, utils.createReducer(INITIAL_STATE)({
    [theStylesActions.setTheStylesContent().type]: (state, action) => createState(state || INITIAL_STATE,
        ['title', action.payload.title], ['description', action.payload.description], ['heroImage', action.payload.heroImage],
        ['styles', action.payload.styles])
    ,
}));
