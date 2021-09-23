import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {loadDryStylingContentful, setDryStylingContent} from './Dry-Styling-Actions';
import {gqlLoadDryStyling} from "../../../gql/dryStyling/contentfulDryStylingActions";

function* workerLoadDryStylingContentful({payload}) {
    const dryStylingSectionData = yield call(gqlLoadDryStyling);
    yield put(setDryStylingContent(dryStylingSectionData));
}

function* watcherLoadDryStylingContentful() {
    yield takeLatest(loadDryStylingContentful().type, workerLoadDryStylingContentful);
}

export const watchers = {
    watcherLoadDryStylingContentful: fork(watcherLoadDryStylingContentful),
};

export default {
    watchers,
};
