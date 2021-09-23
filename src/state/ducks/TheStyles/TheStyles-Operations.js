import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {loadTheStylesContentful, setTheStylesContent} from './TheStyles-Actions';
import {gqlLoadTheStyles} from "../../../gql/the-styles/contentfulTheStylesActions";

function* workerLoadTheStylesContentful({payload}) {
    const theStylesSectionData = yield call(gqlLoadTheStyles);
    yield put(setTheStylesContent(theStylesSectionData));
}

function* watcherLoadTheStylesContentful() {
    yield takeLatest(loadTheStylesContentful().type, workerLoadTheStylesContentful);
}

export const watchers = {
    watcherLoadTheStylesContentful: fork(watcherLoadTheStylesContentful),
};

export default {
    watchers,
};
