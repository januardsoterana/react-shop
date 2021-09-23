import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as dryStylingActions from './Dry-Styling-Actions';

export const INITIAL_STATE = {
    data: {
        title: '',
        subtitle: '',
        description: '',
        action: {
            title: '',
            link: ''
        },
        featuredImage: '',
        featuredVideo: '',
        images: [],
        heroImage: '',
        promo: {
            image: '',
            action: {
                title: '',
                link: ''
            }
        }
    }
};

const homePersistConfig = {
    key: 'dryStyling',
    storage,
};

export default persistReducer(homePersistConfig, utils.createReducer(INITIAL_STATE)({
    [dryStylingActions.setDryStylingContent().type]: (state, action) =>
        createState(state || INITIAL_STATE, ['data', action.payload])
    ,
}));
