import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';

import {loadFranchisingContentful, setFranchisingContent} from "./Franchising-Actions";
import {gqlLoadFranchising} from "../../../gql/franchising/contentfulFranchisingActions";

function* workerLoadFranchisingContentful({payload}) {
    const franchisingSectionData = yield call(gqlLoadFranchising);
    yield put(setFranchisingContent(franchisingSectionData));
}

function* watcherLoadFranchisingContentful() {
    yield takeLatest(loadFranchisingContentful().type, workerLoadFranchisingContentful);
}

export const watchers = {
    watcherLoadFranchisingContentful: fork(watcherLoadFranchisingContentful),
};

export default {
    watchers,
};
