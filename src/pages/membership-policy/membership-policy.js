/* eslint-disable no-console */
import React, {useEffect} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {loadDryStylingContentful} from "../../state/ducks/DryStyling/Dry-Styling-Actions";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './membership-policy.scss';

// const policyItems = [
//     {title: 'SECTION 1 - PERSONAL INFORMATION WE COLLECT'},
//     {title: 'SECTION 2 – HOW WE USE YOUR PERSONAL INFORMATION'},
//     {title: 'SECTION 3 – HOW WE SHARE YOUR PERSONAL INFORMATION'},
//     {title: 'SECTION 4 – YOUR CHOICES'},
//     {title: 'SECTION 5 – SECURITY'},
//     {title: 'SECTION 6 – OTHER SITES, MOBILE APPLICATIONS AND SERVICES'},
//     {title: 'SECTION 7 – CHILDREN'},
//     {title: 'SECTION 8 – CHANGES TO THIS PRIVACY POLICY'},
//     {title: 'SECTION 9 – HOW TO CONTACT US'},
//     {title: 'SECTION 10 – IMPORTANT INFORMATION FOR CALIFORNIA RESIDENTS'},
// ];

const MembershipPolicy = ({
                           loadDataFromContentful
                       }) => {
    useEffect(() => {
        loadDataFromContentful({});
    }, []);

    return (
        <div className="tab-pane fade show active static-page" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="title-container">
                <h5 className="text-uppercase text-center">Membership Policy</h5>
            </div>

            <div className="middle-section">
                <div className="card-body">
                    <div className="top-description">
                        <p>California Residents: Do Not Sell My Personal Information</p>
                        <p>California Residents: CCPA Opt-Out Choices</p>
                        <p>Non-California Residents: Opt-Out</p>
                    </div>
                    <div className="divider"/>
                    <div className="section">
                        <p className="information">Effective as of: <b>January 30, 2020</b> &nbsp; | &nbsp; A copy of our previous privacy
                            policy is
                            available <a href="#" className="link">here.</a></p>
                        <p>Drybar is committed to providing our customers with exceptional service. As providing this service involves the collection, use and disclosure of some personal information about you, protecting and ensuring the privacy of your personal information is one of our highest priorities. One of the ways we do that is to have this Privacy Policy, which tells you why and how we collect, use and disclose your personal information.</p>
                        <p>This Privacy Policy describes the privacy practices of Drybar Holdings LLC and our subsidiaries and affiliates (collectively, “Drybar”, “we”, “us”, or “our”) in connection with our website, the Drybar mobile application, and any other website or mobile application that we own or control and which posts  or links to this Privacy Policy (collectively, the “Services”), as well as certain offline services as described in this Privacy Policy, and the rights and choices available to individuals with respect to their information.</p> 
                        <p>Because Drybar is a U.S.-based company, our Services are controlled and offered from Drybar’s facilities in the United States.  
                        The data protection rules and rights of government access to your data in your state, province or country may be different than those in the United States.  Drybar will continue to process your personal information as described in this Privacy Policy.</p>
                    </div>
                    <div className="section">
                        <p>Drybar is committed to providing our customers with exceptional service. As providing this service involves the collection, use and disclosure of some personal information about you, protecting and ensuring the privacy of your personal information is one of our highest priorities. One of the ways we do that is to have this Privacy Policy, which tells you why and how we collect, use and disclose your personal information.</p>
                        <p>This Privacy Policy describes the privacy practices of Drybar Holdings LLC and our subsidiaries and affiliates (collectively, “Drybar”, “we”, “us”, or “our”) in connection with our website, the Drybar mobile application, and any other website or mobile application that we own or control and which posts  or links to this Privacy Policy (collectively, the “Services”), as well as certain offline services as described in this Privacy Policy, and the rights and choices available to individuals with respect to their information.</p> 
                        <p>
                        Because Drybar is a U.S.-based company, our Services are controlled and offered from Drybar’s facilities in the United States.  
                        The data protection rules and rights of government access to your data in your state, province or country may be different than those in the United States.  Drybar will continue to process your personal information as described in this Privacy Policy.
                        </p>
                    </div>
                    <div className="section">
                        <p>Drybar is committed to providing our customers with exceptional service. As providing this service involves the collection, use and disclosure of some personal information about you, protecting and ensuring the privacy of your personal information is one of our highest priorities. One of the ways we do that is to have this Privacy Policy, which tells you why and how we collect, use and disclose your personal information.</p>
                        <p>This Privacy Policy describes the privacy practices of Drybar Holdings LLC and our subsidiaries and affiliates (collectively, “Drybar”, “we”, “us”, or “our”) in connection with our website, the Drybar mobile application, and any other website or mobile application that we own or control and which posts  or links to this Privacy Policy (collectively, the “Services”), as well as certain offline services as described in this Privacy Policy, and the rights and choices available to individuals with respect to their information.</p> 
                        <p>
                        Because Drybar is a U.S.-based company, our Services are controlled and offered from Drybar’s facilities in the United States.  
                        The data protection rules and rights of government access to your data in your state, province or country may be different than those in the United States.  Drybar will continue to process your personal information as described in this Privacy Policy.
                        </p>
                    </div>
                    <div className="section">
                        <p>Drybar is committed to providing our customers with exceptional service. As providing this service involves the collection, use and disclosure of some personal information about you, protecting and ensuring the privacy of your personal information is one of our highest priorities. One of the ways we do that is to have this Privacy Policy, which tells you why and how we collect, use and disclose your personal information.</p>
                        <p>This Privacy Policy describes the privacy practices of Drybar Holdings LLC and our subsidiaries and affiliates (collectively, “Drybar”, “we”, “us”, or “our”) in connection with our website, the Drybar mobile application, and any other website or mobile application that we own or control and which posts  or links to this Privacy Policy (collectively, the “Services”), as well as certain offline services as described in this Privacy Policy, and the rights and choices available to individuals with respect to their information.</p> 
                        <p>
                        Because Drybar is a U.S.-based company, our Services are controlled and offered from Drybar’s facilities in the United States.  
                        The data protection rules and rights of government access to your data in your state, province or country may be different than those in the United States.  Drybar will continue to process your personal information as described in this Privacy Policy.
                        </p>
                    </div>
                    {/* <div className="items-description">
                        {policyItems.map((item, index) => (
                            <div className="card-item">
                                <div className="item-header">
                                    {item.title}
                                </div>
                                <div className="item-content">

                                </div>
                            </div>
                        ))}

                    </div> */}
                </div>
                <div className="end"/>
                {/* <div className="gradient-bottom-decorator"/> */}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadDryStylingContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembershipPolicy);
