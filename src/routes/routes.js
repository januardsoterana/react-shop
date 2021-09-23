import Booking from '../pages/booking/Bookng';
import BookingConfirmation from '../pages/booking/Confirmation/BookingConfirmation';

import LogInContainer from '../app/Components/Auth/LogInContainer';
import Landing from '../app/Components/Auth/Landing';
import SignUpContainer from '../app/Components/Auth/Partials/Registration/RegistrationUser';
import Account from '../pages/account/Account';
import Service from '../pages/service/Service';
import Home from "../pages/home/Home";
import Events from "../pages/events/Events";
import HelpCenter from "../pages/faqs/help-center";
import FaqDetailsSectionView from "../pages/faqs/faq-details-section";
import TheStyles from "../pages/the-styles/TheStyles";
import DryStyling from "../pages/dry-styling/dry-styling";
import FranchiseView from "../pages/franchise/franchise";
import BarflyMembershipEnrollment from '../pages/BarflyMembership/GraphqlBarflyMembership';
import BarflyEnrollmentPage from '../pages/BarflyMembership/BarflyEnrollmentPage';
import PrivacyPolicy from "../pages/privacy-policy/privacy-policy";
import TermsOfServices from "../pages/terms-of-services/terms-of-services";
import ConnectedRecoverPassword from '../app/Components/Auth/Partials/RecoverPassword/ResetPassword'
import AccessabilityPolicy from '../pages/accessability-policy/accessability-policy';
import CancellationPolicy from '../pages/cancellation-policy/cancellation-policy';
import MembershipPolicy from '../pages/membership-policy/membership-policy';
import Contact from '../pages/contact/contact';
import BuyOut from '../pages/buyout/Buyout'


export default [
    {
        path: '/service/:page',
        Component: Service,
    },
    {
        path: '/auth/login',
        Component: LogInContainer,
    },
    {
        path: '/auth/recover-password',
        Component: ConnectedRecoverPassword
    },
    {
        path: '/auth-landing',
        Component: Landing,
    },
    {
        path: '/auth/sign-up',
        Component: SignUpContainer,
    },
    {
        path: '/appointment-confirm',
        Component: BookingConfirmation,
    },
    {
        path: '/account/:page',
        Component: Account,
        privateRoute: true,
    },
    {
        path: '/booking/:page',
        Component: Booking,
        privateRoute: true,
    },
    {
        path: '/events',
        Component: Events,
    },
    {
        path: '/faqs/:id',
        Component: FaqDetailsSectionView,
    },
    {
        path: '/faqs',
        Component: HelpCenter,
    },
    {
        path: '/dry-styling',
        Component: DryStyling
    },
    {
        path: '/the-styles',
        Component: TheStyles
    },
    {
        path: '/franchising',
        Component: FranchiseView
    },
    {
        path: '/barfly-confirm',
        Component: BarflyMembershipEnrollment,
    },
    {
        path: '/barfly-membership-enrollment',
        Component: BarflyEnrollmentPage,
        privateRoute: true,
    },
    {
        path: '/barfly-membership',
        Component: BarflyMembershipEnrollment,
    },
    {
        path: '/privacy-policy',
        Component: PrivacyPolicy
    },
    {
        path: '/terms-of-service',
        Component: TermsOfServices
    },
    {
        path: '/accessability-policy',
        Component: AccessabilityPolicy
    },
    {
        path: '/cancellation-policy',
        Component: CancellationPolicy
    },
    {
        path: '/membership-policy',
        Component: MembershipPolicy
    },
    {
        path: '/franchising',
        Component: FranchiseView
    },
    {
        path: '/contact',
        Component: Contact
    },
    {
        path: '/buyout',
        Component: BuyOut
    },
    {
        path: '/',
        Component: Home
    }
];
