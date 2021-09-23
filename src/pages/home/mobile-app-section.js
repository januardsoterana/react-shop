import React, {Component} from 'react';
import {getOffersData} from "../../state/ducks/Home/Home-Selectors";
import {connect} from "react-redux";
import {
    Grid, Typography, FormControl, Input, Button,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {TABLET_BREAKPPOINT} from '../../Helpers/breakpoints';

import drybarBlackBig from '../../assets/images/drybarBlackBig.svg';
import mobilePhoneIcon from '../../assets/images/mobilePhoneIcon.svg';
import mobilePhone from '../../assets/images/mobile-phone.svg';
import drybarAppStoreIcon from '../../assets/images/downloadAppStore.svg';
import downloadPlayStore from '../../assets/images/downloadPlayStore.svg';

const styles = theme => ({
    phoneForm: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexDirection: 'column',
        },
        marginTop: '40px'
    },
    input: {
        '&::placeholder': {
            fontStyle: 'oblique',
        },
    },
    phoneNumber: {
        width: '70%',
        height: '40px',
        marginRight: '20px'
    },
    phoneSubmit: {
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
        width: '160px',
        height: '40px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '30px 0',
            width: '100%',
        },
    },
    submitBtnText: {
        fontFamily: 'AvenirNext',
        fontWeight: '400'
    }
});

class MobileAppSectionView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        const submitBtn = <span className={classes.submitBtnText}>Text Me The App</span>

        return (
            <>
                <div className="mobile_app">
                    <div className="container">
                        <div className="row">
                            <div className="mobile-phone-img">
                                <img src={mobilePhone} />
                            </div>
                            <div className="d-flex flex-wrap flex-1 align-items-center">
                                <div className="col-md-12 col-lg-6">
                                    <div className="app-store">
                                        <h3>
                                            GET THE
                                            <img src={drybarBlackBig} />
                                            BOOKING APP!
                                        </h3>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.
                                        </p>
                                        <div className="app-store-btns">
                                            <img alt="apple-store" src={drybarAppStoreIcon} className="app-store-btn"/>
                                            <img alt="play-store" src={downloadPlayStore} className="app-store-btn"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="direct-link">
                                        <img src={mobilePhoneIcon} className="mobile-phone-icon"></img>
                                        <h3>
                                            Want us to send a link to the Drybar app directly to your phone?
                                        </h3>
                                        <FormControl fullWidth className={classes.phoneForm}>
                                            <Input
                                                classes={{
                                                    input: {},
                                                }}
                                                id="standard-adornment-amount"
                                                value=""
                                                // onChange={handleChange('amount')} // this will use in future when data come from API
                                                startAdornment=""
                                                placeholder="Enter your phone number"
                                                className={classes.phoneNumber}
                                            />
                                            <Button className={classes.phoneSubmit} variant="outlined" children={submitBtn}>
                                            </Button>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    offersData: getOffersData(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MobileAppSectionView));
