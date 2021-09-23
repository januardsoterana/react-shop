import {call, fork, put, takeLatest} from "redux-saga/effects";
import {loadStoresContentful, setStores} from "./Barfly-Actions";
import {gqlLoadStores} from "../../../gql/barfly/contentfulBarflyActions";

function* workerLoadStoresContentful({payload}) {
    const storesData = yield call(gqlLoadStores);
    yield put(setStores(storesData));
}

function* watcherLoadStoresContentful() {
    yield takeLatest(loadStoresContentful().type, workerLoadStoresContentful);
}

export const watchers = {
    watcherLoadStoresContentful: fork(watcherLoadStoresContentful),
};

export default {
    watchers,
};