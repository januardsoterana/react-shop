export const getServices = (hasLocationId) => ({
    url: '/booker/FindTreatments',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            LocationID: hasLocationId,
        },
    },
});

export const getAddOnsData = (getSelectedTreatmentId) => ({
    url: '/booker/GetTreatmentAddOns',
    data: {
        method: 'GET',
        urlParams: {
            id: getSelectedTreatmentId,
        },
        data: {},
    },
});

export const getAvailableDates = (startDate, endDate, hasLocationId) => ({
    url: '/booker/AvailableDates',
    data: {
        method: 'GET',
        urlParams: {},
        data: {
            locationIds: hasLocationId,
            fromDate: startDate,
            toDate: endDate,
        },
    },
});

export const getSlots = (selectedDate, hasLocationId, serviceId) => ({
    url: '/booker/Availability1Day',
    data: {
        method: 'GET',
        urlParams: {},
        data: {
            LocationId: hasLocationId,
            fromDateTime: selectedDate,
            IncludeEmployees: true,
            serviceId: serviceId
        },
    },
});

export const findMemberships = (locationId) => ({
    url: '/booker/FindMemberships',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            PageSize: 5,
            LocationID: locationId
        },
    },
});


export const findCustomerMemberships = (customerId, locationId) => ({
    
    url: '/booker/FindCustomerMemberships',
    data: {
        method: "POST",
        urlParams: {},
        data: {
            CustomerID: customerId,
            LocationID: locationId
        }
    }
})

export const createOrder = (customerId) => ({
    url: '/booker/CreateOrder',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            CustomerID: customerId
        },
    },
});

export const addMembershipToOrder = ({ orderId, locationId }) => ({
    url: '/booker/AddMembershipToOrder',
    data: {
        method: "POST",
        urlParams: {
            id: orderId
        },
        data: {
            BillingCycleStartDate: "/Date(1609313460416)/",
            InitiationFee: 0,
            LocationID: locationId,
            MembershipCardNumber: "BlahfooTest",
            AutoRenew: true,
            IncludeBenefits: true,
            PaymentPlanID: 59687
        }
    }
});

export const createAppointment = ({ TreatmentID, locationId, RoomID, authUser, slot }) => ({
    url: '/booker/CreateAppointment',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            AppointmentDateOffset: slot[Object.keys(slot)[0]].startDateTime,
            AppointmentTreatmentDTOs: Object.keys(slot).map((k) => {
                return {
                    EmployeeID: slot[k].employees[0],
                    StartTimeOffset: slot[k].startDateTime,
                    EndTimeOffset: slot[k].endDateTime,
                    TreatmentID: TreatmentID,
                    RoomID: RoomID
                }
            }),
            Customer: {
                FirstName: authUser?.firstname,
                LastName: authUser?.lastname,
                Email: authUser?.email,
                HomePhone: '7147881059',
                ID: authUser?.bookerID
            },
            ResourceTypeID: 1,
            LocationID: locationId,
        },
    },

});

export const updateAppointment = ({ startDate, endDate }) => ({
    url: '/booker/UpdateAppointment',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            AppointmentDateOffset: startDate,
            AppointmentTreatmentDTOs: [
                {
                    EmployeeID: 119629,
                    StartTimeOffset: startDate,
                    EndTimeOffset: endDate,
                    TreatmentID: 2490102,
                    RoomID: 11519,
                }],
            Customer: {
                FirstName: 'Steve',
                LastName: 'Monkeytime',
                Email: 'steve.witkos@thedrybar.com',
                HomePhone: '7147881059',
                ID: '119704791',
            },
            ResourceTypeID: 1,
            LocationID: '1639',
        },
    },

});

export const cancelAppointment = (ID) => ({
    url: '/booker/CancelAppointment',
    data: {
        method: 'PUT',
        urlParams: {},
        data: {
            ID,
        },
    },
});

export const getAppointments = (customerKey) => ({
    url: '/booker/GetCustomerAppointments',
    data: {
        method: 'GET',
        urlParams: {
            id: customerKey,
        },
        data: {
            Count: 1,
            PageNumber: 1,
            ShowAppointmentIconFlags: true
        },
    },
});

export const getSpecialByCode = (promoCode) => ({
    url: '/booker/GetSpecialByCode',
    data: {
        method: 'GET',
        urlParams: {
            id: '1639'
        },
        data: {
            couponcode: promoCode
        },
    }
})

export const addCreditCardCustomer = (cardNumber, cvv, customerId, nameOnCard) => ({
    url: '/booker/AddCreditCardToCustomer',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            SpaID: '112',
            CustomerID: customerId,
            CreditCard: {
                Type: {
                    ID: '2',
                    Name: 'Visa'
                },
                Number: cardNumber,
                NameOnCard: nameOnCard,
                ExpirationDate: "/Date(1638259200000-0500)/",
                SecurityCode: cvv,
            }
        },
    }
})

export const getCustomer = (customerId) => ({
    url: '/booker/GetCustomer',
    data: {
        method: 'GET',
        urlParams: {
            id: customerId
        },
        data: {
            includeFieldValues: true
        }
    }
})

export const updateCustomer = (customer) => ({
    url: '/booker/UpdateCustomer',
    data: {
        method: 'PUT',
        urlParams: {
            id: customer.ID
        },
        data: {
            LocationID: customer.LocationID,
            CustomerID: customer.ID,
            Customer: {
                LastName: customer.LastName,
                FirstName: customer.FirstName,
                Email: customer.Email,
                Address: customer.Address,
                CellPhone: customer.CellPhone,
                DateOfBirthOffset: customer.DateOfBirthOffset
            }
        }
    }
})

export const getCustomerCreditCards = (customerId) => ({
    url: '/booker/GetCustomerCreditCards',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            CustomerID: customerId,
            SpaID: 112
        }
    }
})

export const getBookerTimeSlot = (selectedStartTime, hasLocationId, selectedServiceId) => ({
    url: '/booker/TimeSlot',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            locationId: hasLocationId,
            serviceId: selectedServiceId,
            startDateTime: selectedStartTime
        }
    }
})

export const setFavouriteLocation = (fvtLocation, customerId) => ({
    url: '/booker/SetCustomerFavoriteLocation',
    data: {
        method: 'POST',
        urlParams: {
            id: customerId
        },
        data: {
            LocationID: fvtLocation,
            CustomerID: customerId,
            CustomerFieldValues: {
                FieldValues: [
                    {
                        Key: 56378,
                        Value: {
                            TextValue: {
                                Value: fvtLocation
                            }
                        }
                    }
                ]
            }
        }
    }
})

export const getCustomerDetailsById = (customerId) => ({
    url: '/booker/GetCustomer',
    data: {
        method: "GET",
        urlParams: {
            id: customerId
        },
        data: {
            Count: 1,
            PageNumber: 1,
            ShowAppointmentIconFlags: true,
            includeFieldValues: true
        }
    }
})

export default {
    getServices,
    getAddOnsData,
};
