/* eslint-disable import/prefer-default-export */

import bookingActionTypes from './Booking-ActionTypes';

export const setDateTimeClient = (state) => ({
    type: bookingActionTypes.BOOKING_DATE_TIME,
    payload: state,
});

export const setSlotTime = (state) => ({
    type: bookingActionTypes.BOOKING_SLOT_TIME,
    payload: state,
});

export const setLocationData = (locationData) => ({
    type: bookingActionTypes.BOOKING_LOCATION,
    payload: locationData,
});

export const setBookingService = (service) => ({
    type: bookingActionTypes.BOOKING_SERVICE,
    payload: service,
});

export const setNumberOfGuests = (num) => ({
    type: bookingActionTypes.BOOKING_HOW_MANY,
    payload: num,
});

export const setDifferentServiceEachUser = (payload) => ({
    type: bookingActionTypes.BOOKING_DIFFERENT_SERVICE_FOR_GUEST,
    payload,
});

export const setAddOnsServiceUser = (addons) => ({
    type: bookingActionTypes.BOOKING_ADDONS,
    payload: addons,
});

export const resetOnGuestChange = () => ({
    type: bookingActionTypes.RESET_ON_GUEST_CHANGE,
});

export const overwriteServicesData = (data) => ({
    type: bookingActionTypes.BOOKING_OVERWRITE_SERVICES_DATA,
    payload: data,
});

export const clearBookingDetails = () => ({
    type: bookingActionTypes.BOOKING_CLEAR_DATA,
});

export const loadBookingState = (data) => ({
    type: bookingActionTypes.BOOKING_LOAD_BOOKING_STATE,
    payload: data,
});

export const editOrRebookAppointment = (data) => ({
    type: bookingActionTypes.BOOKING_REBOOK_EDIT_APPOINTMENT,
    payload: data,
});

export const setEditEnabled = (bool) => ({
    type: bookingActionTypes.BOOKING_IS_EDIT_ENABLED,
    payload: bool,
});

export const setRequestNoteMessage = (bool) => ({
    type: bookingActionTypes.BOOKING_REQUEST_NOTES,
    payload: bool,
});

export const setExtensions = (bool) => ({
    type: bookingActionTypes.BOOKING_SET_EXTENSIONS,
    payload: bool,
});

export const availEmployeeBookingSlots = (data) => ({
    type: bookingActionTypes.BOOKING_SET_AVAIL_EMPLOYEE,
    payload: data,
})

export const availRoomBookingSlot = (data) => ({
    type: bookingActionTypes.BOOKING_SET_AVAIL_ROOM,
    payload: data,
})

export const setRegisterUserInfo = (data) => ({
    type: bookingActionTypes.BOOKING_SET_REGISTER_USER,
    payload: data
})


export const setServicesAvailableDates = (data) => ({
    type: bookingActionTypes.BOOKING_SET_AVAILABLE_DATES,
    payload: data
})


// storing the login user detail will seprate this in future
export const setAuthUserDetails = (data) => ({
    type: bookingActionTypes.SET_AUTH_USER_DETAILS,
    payload: data
})
