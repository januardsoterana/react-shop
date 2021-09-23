import {all} from 'redux-saga/effects';
import * as bookingSagas from '../ducks/Booking/index';
import * as eventsSagas from '../ducks/Events/index';
import * as faqSagas from '../ducks/Faq/index';
import * as homeSagas from '../ducks/Home/index';
import * as franchisingSagas from '../ducks/Franchising/index';
import * as dryStyling from '../ducks/DryStyling/index';
import * as theStylesSagas from '../ducks/TheStyles/index';
import * as barflySagas from '../ducks/Barfly/index';
import * as serviceSagas from '../ducks/Service/index';

const universalSagas = {
    ...bookingSagas.watchers,
    ...eventsSagas.watchers,
    ...faqSagas.watchers,
    ...homeSagas.watchers,
    ...franchisingSagas.watchers,
    ...dryStyling.watchers,
    ...theStylesSagas.watchers,
    ...barflySagas.watchers,
    ...serviceSagas.watchers
};

export default function* rootSaga() {
    yield all(universalSagas);
}
