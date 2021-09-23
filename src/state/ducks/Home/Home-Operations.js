import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {loadHomeContentful, setHomeContent} from './Home-Actions';
import {gqlLoadHome} from "../../../gql/home/contentfulHomeActions";

function* workerLoadHomeContentful({payload}) {
    const homeSectionData = yield call(gqlLoadHome);
    yield put(setHomeContent(homeSectionData));
}

function* watcherLoadHomeContentful() {
    yield takeLatest(loadHomeContentful().type, workerLoadHomeContentful);
}

export const watchers = {
    watcherLoadHomeContentful: fork(watcherLoadHomeContentful),
};

export default {
    watchers,
};
