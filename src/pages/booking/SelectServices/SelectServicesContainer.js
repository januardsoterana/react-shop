import {
    array, bool, func, number, object,
} from 'prop-types';
import React, {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';
import { Grid, withStyles } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { getServices } from '../../../api/booking-api';
import { getNumberOfGuests, getServicesData, isGuestWithDifferentServices, getLocationData, getSelectedDate, getServicesAvailableDates, getAvailableServiceIds } from '../../../state/ducks/Booking/Booking-Selectors';
import {setRegisterUserInfo, setServicesAvailableDates } from '../../../state/ducks/Booking/Booking-Actions';
import { getAvailableDates } from '../../../api/booking-api';
import { getWeekByFirstDate } from '../../../Helpers/dateTime';
import restClient from '../../../api/restClient';
import SummaryWrapper from '../SummaryWrapper';
import MultipleUserServices from './MultipleUserServices';
import ServiceSkeleton from '../../../app/Components/Skeleton/ServiceSkeleton';
import { MOBILE_BREAKPOINT } from '../../../Helpers/breakpoints'
import ServiceButton from './Partials/ServiceButton';

const PAGE_TITLE = 'WHAT SERVICE?';

const styles = (theme) => ({
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: '60px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '60px 30px',
        }
    },
});

const SelectServicesContainer = ({
    classes,
    guests,
    isDifferentServiceEnabled,
    selectedServices,
    goToNextPage,
    getLocationId,
    oktaAuth,
    setAuthUserInfo,
    selectedDate,
    availableDates,
    setServicesAvailableDates,
    availableServiceIds
}) => {
    const hasLocationId = getLocationId?.bookerLocationId || '11031'
    const [availableDatesError, setErrors] = useState(null);
    

    useEffect(() => {
        console.log("in treatments");
        oktaAuth.getUser().then((res) => {
            setAuthUserInfo(res)
       });

    }, []);


    useEffect(() => {
        const selDate = selectedDate ? new Date(selectedDate) : new Date();
        restClient.post(
            getAvailableDates(getWeekByFirstDate(selDate)[0], getWeekByFirstDate(selDate)[6], hasLocationId)
        ).then((res) => {
            if (res) {
                setServicesAvailableDates(res.data);
            }
        }).catch((err) => {
            setErrors(err)
        });

    }, [selectedDate, setErrors])

    return (
        <SummaryWrapper
            title={PAGE_TITLE}
            nextButtonEnabled={guests && isDifferentServiceEnabled}
            useFetch={getServices(hasLocationId)}
            onButtonClick={goToNextPage}
        >
            {({ data, error, loading }) => {
                if (loading || availableDates.length === 0) {
                    return <ServiceSkeleton />;
                }

                if (error || availableDatesError) {
                    return null;
                }

                if (data?.Treatments?.length && availableDates.length) {
                    const services = data?.Treatments?.filter(isOnline => isOnline?.AllowCustomersToBookOnline === true && availableServiceIds.indexOf(isOnline.ID));
                    if (guests) {
                        return (
                            <MultipleUserServices
                                guests={guests}
                                isDifferentServiceEnabled={isDifferentServiceEnabled}
                                services={services}
                                selectedServices={selectedServices}
                                goToNextPage={goToNextPage}
                            />
                        );
                    }

                    return (
                        <Grid className={classes.buttonsWrapper}>
                            {services.map((service) => (
                                <ServiceButton
                                    goToNextPage={goToNextPage}
                                    service={service}
                                    isSelected={selectedServices.some((s) => s.user === 'Me' && s.data.Name === service.Name)}
                                />
                            ))}
                        </Grid>
                    );
                }
                return <></>;
            }}
        </SummaryWrapper>
    )
}

SelectServicesContainer.propTypes = {
    guests: number,
    isDifferentServiceEnabled: bool,
    selectedServices: array,
    classes: object.isRequired,
    goToNextPage: func,
};

SelectServicesContainer.defaultProps = {
    guests: 0,
    isDifferentServiceEnabled: false,
    selectedServices: [],
    goToNextPage: () => { },
};

const mapStateToProps = (state) => ({
    guests: getNumberOfGuests(state),
    isDifferentServiceEnabled: isGuestWithDifferentServices(state),
    availableDates: getServicesAvailableDates(state),
    selectedServices: getServicesData(state),
    getLocationId: getLocationData(state),
    selectedDate: getSelectedDate(state),
    availableServiceIds: getAvailableServiceIds(state)
});

const mapDispatchToProps = (dispatch) => ({
    setAuthUserInfo: bindActionCreators(setRegisterUserInfo, dispatch),
    setServicesAvailableDates: bindActionCreators(setServicesAvailableDates, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withOktaAuth(SelectServicesContainer)));
