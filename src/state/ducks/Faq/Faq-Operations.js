import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {loadFaqContentful, setFaqContent} from './Faq-Actions';
import {gqlLoadFaq} from "../../../gql/faq/contentfulFaqActions";

function* workerLoadFaqContentful({payload}) {
    const faqSectionData = yield call(gqlLoadFaq);
    yield put(setFaqContent(faqSectionData));
}

function* watcherLoadFaqContentful() {
    yield takeLatest(loadFaqContentful().type, workerLoadFaqContentful);
}

export const watchers = {
    watcherLoadFaqContentful: fork(watcherLoadFaqContentful),
};

export default {
    watchers,
};
