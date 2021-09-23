import {
    call,
    fork, put, takeLatest,
} from 'redux-saga/effects';
import {
    editOrRebookAppointment,
    loadBookingState,
    setBookingService, setDateTimeClient, setEditEnabled, setLocationData, setSlotTime,
} from './Booking-Actions';

function* reloadBookingState({ payload }) {
    const { appointment } = payload;
    const slots = {
        startDateTime: appointment.StartDateTimeOffset,
        endDateTime: appointment.EndDateTimeOffset,
    };
    const dateTime = appointment.StartDateTimeOffset;
    yield put(setLocationData({
        lat: 37.758773,
        long: -122.486057,
        name: 'Drybar Huntington Beach in Pacific City',
        address: '21016 Pacific Coast Hwy Suite D104 Huntington Beach, CA 92644',
        distance: '3.8 miles away',
    }));
    yield put(setSlotTime(slots));
    yield put(setDateTimeClient(dateTime));
    // TODO add guest logic
    yield put(setBookingService({ user: 'Me', data: appointment.Treatment }));
}

// function* workerRebookAndEditAppointment({ payload }) {
//     if (isUpcoming) {
//         yield call(reloadBookingState, appointment);
//     } else {
//         reloadBookingState(appointment);
//     }
//     yield null;
// }

function* watcherReloadBookingState() {
    yield takeLatest(loadBookingState().type, reloadBookingState);
}

function* workerEditOrRebookAppointment({ payload }) {
    const { appointment: { isUpcoming }, history } = payload;
    yield history.push('/booking/review');
    yield call(reloadBookingState, { payload: payload.appointment });

    if (isUpcoming) {
        yield put(setEditEnabled(true));
    } else {
        yield put(setEditEnabled(false));
    }
}

function* watcherEditOrRebookAppointment() {
    yield takeLatest(editOrRebookAppointment().type, workerEditOrRebookAppointment);
}

export const watchers = [
    fork(watcherReloadBookingState),
    fork(watcherEditOrRebookAppointment),
];

export default {
    watchers,
};
