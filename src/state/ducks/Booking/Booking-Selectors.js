/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
// get full date-time selectors
export const getSelectedDateTime = (state) => state.booking?.dateTime || '';
export const getLocationData = (state) => state.booking?.location || {};
export const getServicesData = (state) => state.booking?.services?.serviceData || [];
export const getServicesAvailableDates = (state) => state.booking?.services?.availableDates || [];
export const getNumberOfGuests = (state) => state.booking?.guests;
export const isGuestWithDifferentServices = (state) => state.booking?.services?.guestsWithDifferentServices;
export const getAddOnsServiceData = (state) => state.booking?.addonsData || [];
export const getIsEditEnabled = (state) => state.booking?.editEnabled || false;
export const getNotesMessage = (state) => state.booking?.notesMessage || '';

export const getAddonsByUser = (state, user) => state.booking.addonsData?.find((data) => data.user === user)?.data || [];
export const getSelectedDate = (state) => state.booking.dateTime || '';
export const getSelectedSlot = (state) => state.booking.slotTime;
export const getExtensions = (state) => state.booking.extensions;

export const getAvailableEmpId = (state) => state?.booking?.services?.availEmployeeSlots || []
export const getAvailableRoomId = (state) => state?.booking?.services?.availRoomSlots || []
export const getAuthUserInfo = (state) => state?.booking?.authUser || {}
export const getOktaUserInfo = (state) => state?.booking?.authUserDetails || {}

export const getAvailableServiceIds = (state) => {
    const availableDates = getServicesAvailableDates(state);
    return availableDates.reduce((ids, cur) => {
        const serviceIdsByCategory = cur.serviceCategories.reduce((ids1, cur1) => {
            return [
                ...ids1,
                ...cur1.services.map((s) => s.serviceId)
            ]
        }, [])
        return [
            ...ids,
            ...serviceIdsByCategory
        ]
    }, [])
}


export const getServicesDataFormatted = (state) => {
    const servicesData = getServicesData(state) || [];
    const formattedData = {};
    const { ID, EmployeeIDs, RoomIDs } = servicesData[0]?.data || {};
    // TODO temporary 0th index for developement
    formattedData.serviceId = ID;
    formattedData.employeeId = EmployeeIDs?.[0];
    formattedData.roomId = RoomIDs?.[1];

    return formattedData;
};

export const isDataSelected = (state, type) => {
    switch (type) {
    case 'Date/Time':
        {
            const servicesData = getServicesData(state);
            if (servicesData.length) {
                return true;
            }
        }
        return false;
    case 'Review':
    {
        const servicesData = getServicesData(state);
        const date = getSelectedDate(state);
        const slot = getSelectedSlot(state);
        if (date !== '' && slot !== '' && servicesData.length) {
            return true;
        }
        return false;
    }
    default:
        return true;
    }
};
export default {};
