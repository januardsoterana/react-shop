import React, {useState} from 'react';

import {useOktaAuth} from '@okta/okta-react';
import {
    Button, withStyles,
    InputLabel, Select, MenuItem, FormControl
} from '@material-ui/core';

import buyoutLogoutHeader from '../../assets/images/buyout_logout_header.png';
import buyoutLoginHeader from '../../assets/images/buyout_login_header.png';
import buyoutLogoutHeadline from '../../assets/images/buyout-logout-headline.png';
import buyoutLoginHeadline from '../../assets/images/buyout-login-headline.png';
import stockUpImage from '../../assets/images/stock-up.png';
import buyoutLoginLocationImage from '../../assets/images/buyout-login-location.png';

import LogInCard from "../../app/Components/Auth/LogInContainer";
import Registration from "../../app/Components/Auth/Partials/Registration/RegistrationUser";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './buyout.scss';
import './buyout-responsive.scss';


const BuyOut = (props) => {
    const { authState } = useOktaAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(authState.isAuthenticated);
    const [location, setLocation] = useState('');

    const handleLocation = () => {

    }

    const handleAuth = () => {
        // setIsAuthenticated(!isAuthenticated)
    }

    return (
        <div onClick={handleAuth} className="section__background__grey">
            <div className="tab-pane fade show active mw-1295 m-auto buyout-page" id="nav-home" role="tabpanel"
                 aria-labelledby="nav-home-tab">
                <div className="banner-section">
                    <div className="banner-image">
                        <img className="d-block w-100" src={isAuthenticated ? buyoutLoginHeader : buyoutLogoutHeader} alt="Banner"/>
                    </div>
                </div>
                <div className="middle-section">
                    <div className="buyout-headline">
                        <div className="row buyout-headline-title">
                            <h2>HEADLINE LOREM IPSUM</h2>
                        </div>
                        <div className={"row p-4 d-flex w-100 buyout-headline-body flex-column-reverse-responsive " + (isAuthenticated ? " flex-row-reverse " : "")}>
                            {!isAuthenticated && (
                                <div className={"col-md-6 pr-4 buyout-headline-body-content"}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doremi eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utore aliquip ex ea commodo consequat. Duis aute irure dolor in senoras reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla vigo pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dostihe eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi utomer aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="col-md-6 pl-4 buyout-headline-body-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minime veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea neu commodo consequat.
                                    </p>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum vona dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat noner proident, sunt in culpa.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex sers commodo consequat. Duis aute irure dolor in reprehenderit. Duis ner suscipit facilisis euismod. Maecenas risus felis faucibus.
                                    </p>
                                </div>
                            )}
                            <div className={"col-md-6 buyout-headline-body-banner " + (isAuthenticated ? "pr-4 border-right" : "pl-4 border-left")}>
                                <img className="d-block w-100" src={isAuthenticated ? buyoutLoginHeadline : buyoutLogoutHeadline} alt="Headline Banner"/>
                            </div>
                        </div>
                    </div>
                    <div className="buyout-get-started pt-5">
                        <div className="get-started-title pb-4">
                            {!isAuthenticated && (
                                <p>
                                    Please login to get started
                                </p>
                            )}
                            {isAuthenticated && (
                                <p>
                                    Please select a location to get started
                                </p>
                            )}
                        </div>
                        <div className="row w-100 d-flex get-started-body">
                            {!isAuthenticated && (
                                <>
                                    <div className="col-md-6">
                                        <LogInCard buyout={true} />
                                        <div className="login-footer hide">
                                            <div className="stock-up">
                                                <img src={stockUpImage} alt="stock up image"/>
                                                <Button type="button" className="learn-more-btn" variant={"outlined"}>
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <Registration buyout={true} />
                                    </div>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <div className="col-md-6 text-center">
                                        <FormControl className="w-100 select-location">
                                            <InputLabel id="select-location-label">Select a location</InputLabel>
                                            <Select
                                                labelId="select-location-label"
                                                id="select-location"
                                                value={location}
                                                onChange={handleLocation}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button
                                            className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100 mt-5 mb-5 btn-begin-booking"
                                            type={"button"}
                                            variant={"outlined"}>
                                            {"Begin Booking Process"}
                                        </Button>
                                    </div>
                                    <div className="col-md-6">
                                        <img className="hide" src={buyoutLoginLocationImage} alt="location image"/>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BuyOut;