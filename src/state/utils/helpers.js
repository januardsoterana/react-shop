/* eslint-disable max-len */
export const addRemoveDataFromArrayInStore = (state = [], payload, key) => {
    const oldData = [...state];
    let newData = [];
    if (oldData.some((data) => data[key] === payload[key])) {
        newData = oldData.filter((data) => data[key] !== payload[key]);
    } else {
        newData = [...oldData, payload];
    }

    return newData;
};

export const handleAddonsData = (state, payload) => {
    const selectedAddons = state.addonsData;
    const addOnsWithoutUser = selectedAddons.filter((data) => data.user !== payload.user);
    const selectedAddonsForUser = selectedAddons.find((data) => data.user === payload.user)?.data || [];
    const isAddonInUserList = selectedAddonsForUser?.some((data) => data.Name === payload.data.Name);
    let newUserAddonData = [];
    if (!isAddonInUserList) {
        newUserAddonData = [...selectedAddonsForUser, payload.data];
    } else {
        newUserAddonData = selectedAddonsForUser?.filter((data) => data.Name !== payload.data.Name);
    }
    if (newUserAddonData?.length) {
        addOnsWithoutUser.push({ user: payload.user, data: newUserAddonData });
    }
    return addOnsWithoutUser;
};

export const handleServicesData = (state, payload) => {
    const selectedServices = state.services.serviceData;
    const servicesWithoutUser = selectedServices.filter((data) => data.user !== payload.user);
    servicesWithoutUser.push(payload);

    return servicesWithoutUser;
};

export default {};
