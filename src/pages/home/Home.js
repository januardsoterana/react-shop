/* eslint-disable no-console */
import React, {useEffect} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadHomeContentful} from "../../state/ducks/Home/Home-Actions";
import HeroSectionView from "./slider-section";
import ContainerOuterBorderView from "./container-outer-border";
import StylesSectionView from "./styles-section";
import PromoEventsSectionView from "./promo-event-section";
import SpecialOfferSectionView from "./special-offer-section";
import MobileAppSectionView from "./mobile-app-section";
import SocialSectionView from "./social-section";
import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './home.scss';

const Home = ({ loadDataFromContentful }) => {
    useEffect(() => {
        loadDataFromContentful({});
    }, []);

    return (
        <div className="tab-pane fade show homepage active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <HeroSectionView/>
            <div className="middle_section">
                <ContainerOuterBorderView/>
                <StylesSectionView/>
                <PromoEventsSectionView/>
                <SpecialOfferSectionView/>
                <SocialSectionView/>
                <MobileAppSectionView/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadHomeContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
