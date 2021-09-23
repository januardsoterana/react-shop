import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as eventsActions from './Events-Actions';

export const INITIAL_STATE = {
    title: '',
    subtitle: '',
    heroImage: '',
    events: []
};

const homePersistConfig = {
    key: 'events',
    storage,
};

export default persistReducer(homePersistConfig, utils.createReducer(INITIAL_STATE)({
    [eventsActions.setEventsContent().type]: (state, action) => createState(state || INITIAL_STATE,
        ['title', action.payload.title], ['subtitle', action.payload.subtitle], ['heroImage', action.payload.heroImage],
        ['events', action.payload.events])
    ,
}));
