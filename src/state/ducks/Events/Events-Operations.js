import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {loadEventsContentful, setEventsContent} from './Events-Actions';
import {gqlLoadEvents} from "../../../gql/events/contentfulEventsActions";

function* workerLoadEventsContentful({payload}) {
    const eventsSectionData = yield call(gqlLoadEvents);
    yield put(setEventsContent(eventsSectionData));
}

function* watcherLoadEventsContentful() {
    yield takeLatest(loadEventsContentful().type, workerLoadEventsContentful);
}

export const watchers = {
    watcherLoadEventsContentful: fork(watcherLoadEventsContentful),
};

export default {
    watchers,
};
