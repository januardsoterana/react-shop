import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

import backArrow2Image from '../../assets/images/back_arrow2.png';
import serviceContactIcon from '../../assets/images/service_contact.png';
import {getArticle, getFaqSectionHeroImage} from "../../state/ducks/Faq/Faq-Selectors";

class FaqDetailsSectionView extends Component {
    constructor(props) {
        super(props);

        this.onCick = this.onCick.bind(this);
    }

    onCick() {
        this.props.history.push('/faqs');
    }

    render() {
        const heroImage = getFaqSectionHeroImage(this.props.state);
        const pathArray = this.props.history.location.pathname.split('/');
        let article = {};
        if (pathArray.length > 0) {
            const faqId = pathArray[pathArray.length - 1];
            article = getArticle(this.props.state, faqId);
        }

        return (
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div className="middle-section">
                    <div className="faq_bg">
                        <img className="img-fluid banner_help" src={heroImage} alt="Banner"/>
                    </div>
                    <div className="clearfix"/>
                    <div className="inner_detisls">
                        <div className="inner_bg_views">
                            <div className="container">
                                <div className="main_detils-row">
                                    <div className="inner_account_history">
                                        <div className="row">
                                            <div className="col-md-5 col-lg-4 order-2 order-md-1">
                                                <div className="order-hist_heading article_title">
                                                    <h6><a onClick={this.onCick} style={{cursor: 'pointer'}}><img
                                                        src={backArrow2Image} alt=""/> &nbsp;  Back to Help Center</a>
                                                    </h6>
                                                </div>
                                                <div className="booking_faq" style={{margin: '0px'}}>
                                                    <h4>Related Articles</h4>
                                                    <p>Aliquam sed eleifend mauris neromsera fusce congue varius tenor
                                                        Suspendisse at nisi et velit dapibus pellent leo ante, venenatis
                                                        Aenean rutrum vitae magna vel placerat sed eu sollicitudin
                                                        tellus Nulla ipsum dolor pulvinar ut malesuada fringilla</p>
                                                </div>
                                                <div className="booking_faq booking_numbers" style={{margin: '20px'}}>
                                                    <h4>Need another help? Call Us.</h4>
                                                    <div className="drybar_services1">
                                                        <p>Drybar Services</p>
                                                        <h5>(877) 379-2279 <span><img src={serviceContactIcon} alt=""/></span>
                                                        </h5>
                                                    </div>
                                                    <div className="drybar_services1">
                                                        <p>Drybar Products</p>
                                                        <h5>(800) 646-4479 <span><img src={serviceContactIcon} alt=""/></span>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7 col-lg-8 order-1 order-md-2">
                                                <div className="order-hist_heading article_title">
                                                    <h4>{article.title}</h4>
                                                </div>
                                                <div className="rgiht_actve-actitions">
                                                    <div className="order_hefing_details-bg">
                                                        <div className="paragraph_faq" dangerouslySetInnerHTML={{__html: article.article}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(withRouter(FaqDetailsSectionView));


