import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as faqActions from './Faq-Actions';

export const INITIAL_STATE = {
    title: '',
    subtitle: '',
    heroImage: '',
    articles: []
};

const faqPersistConfig = {
    key: 'faq',
    storage,
};

export default persistReducer(faqPersistConfig, utils.createReducer(INITIAL_STATE)({
    [faqActions.setFaqContent().type]: (state, action) => createState(state || INITIAL_STATE,
        ['title', action.payload.title], ['subtitle', action.payload.subtitle], ['heroImage', action.payload.heroImage],
        ['articles', action.payload.articles])
    ,
}));
