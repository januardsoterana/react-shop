import { combineReducers } from 'redux';
import booking from '../ducks/Booking/Booking-Reducer';
import events from '../ducks/Events/Events-Reducer';
import faq from '../ducks/Faq/Faq-Reducer';
import home from '../ducks/Home/Home-Reducer';
import franchising from '../ducks/Franchising/Franchising-Reducer';
import dryStyling from '../ducks/DryStyling/Dry-Styling-Reducer';
import theStyles from '../ducks/TheStyles/TheStyles-Reducer';
import barfly from '../ducks/Barfly/Barfly-Reducer';
import service from '../ducks/Service/Service-Reducer';

export default combineReducers({
    booking,
    events,
    faq,
    home,
    franchising,
    dryStyling,
    theStyles,
    barfly,
    service
});
