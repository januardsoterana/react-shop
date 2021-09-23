/* eslint-disable import/no-cycle */
import AddOnsContainer from '../pages/booking/AddOns/AddOnsContainer';
import AppointmentHold from '../pages/booking/AppointmentHold';
import DateTimeContainer from '../pages/booking/DateTime/DateTimeContainer';
import HowManySummary from '../pages/booking/HowManySummary';
import NotesCard from '../pages/booking/NotesContainer';
import ReviewContainer from '../pages/booking/ReviewSummary/ReviewContainer';
import SelectLocationContainer from '../pages/booking/SelectLocation/SelectLocationContainer';
// import SelectServices from '../pages/booking/SelectServices';
import SelectServicesContainer from '../pages/booking/SelectServices/SelectServicesContainer';

export default [
    {
        path: '/booking/location',
        Component: SelectLocationContainer,
        label: 'Location',
    },
    {
        path: '/booking/how-many',
        Component: HowManySummary,
        label: 'How Many',
    },
    {
        path: '/booking/services',
        Component: SelectServicesContainer,
        label: 'Services',
    },
    {
        path: '/booking/addons',
        Component: AddOnsContainer,
        label: 'Add-ons',
    },
    {
        path: '/booking/select-date',
        Component: DateTimeContainer,
        label: 'Date/Time',
    },
    {
        path: '/booking/notes',
        Component: NotesCard,
        label: 'Notes',
    },
    {
        path: '/booking/hold',
        Component: AppointmentHold,
        label: 'Hold',
    },
    {
        path: '/booking/review',
        Component: ReviewContainer,
        label: 'Review',
    },
];
