import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import { loadFaqContentful } from "../../state/ducks/Faq/Faq-Actions";
import {
    getArticles,
    getFaqSectionHeroImage,
    getFaqSectionSubTitle,
    getFaqSectionTitle
} from "../../state/ducks/Faq/Faq-Selectors";

const HelpCenter = ({
    title,
    subtitle,
    heroImage,
    articles,
    loadDataFromContentful
}) => {
    useEffect(() => {
        loadDataFromContentful({});
    }, []);

    if (!title && !subtitle && !heroImage) {
        return (
            <Backdrop
                open
                style={{
                    zIndex: 11,
                    color: '#fff',
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="middle-section">
                <div className="faq_bg">
                    <img className="img-fluid banner_help" src={heroImage} alt="Banner" />
                </div>
                <div className="clearfix" />
                <div className="inner_detisls">
                    <div className="inner_bg_views" style={{ background: '#f6f6f6' }}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className="find_answer">
                                        <h1>{title}</h1>
                                        <h5>{subtitle}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile d-none d-md-block d-lg-block">
                                <div className="row">
                                    {articles.map((article, index) => {
                                        return <div className="col-md-6 faq-wrapper" key={index}>
                                            <div className="booking_faq">
                                                <a href={'/faqs/' + article.id}><h4>{article.title}</h4></a>
                                                <p>{article.subtitle}</p>
                                            </div>
                                        </div>;
                                    })}
                                </div>
                            </div>
                            <div className="row d-block d-md-none d-lg-none">
                                <div className="col-md-6">
                                    <div className="faq_question">
                                        <div id="accordion">
                                            {articles.map((article, index) => {
                                                return <div className="card card_header" key={index}>
                                                    <div className="card-header">
                                                        <a className="card-link"
                                                            data-toggle="collapse"
                                                            href={'/faqs/' + article.id}
                                                            aria-expanded="true"
                                                            aria-controls="menuone">{article.title}
                                                            <span className="collapsed">
                                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                                            </span>
                                                            <span className="expanded">
                                                                <i className="fa fa-angle-up" aria-hidden="true"></i>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div id="menuone" className="collapse show">
                                                        <div className="card-body alisquam_s">
                                                            <div className="booking_faq">
                                                                <p>{article.subtitle}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            })}
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
};

const mapStateToProps = (state) => ({
    title: getFaqSectionTitle(state),
    subtitle: getFaqSectionSubTitle(state),
    heroImage: getFaqSectionHeroImage(state),
    articles: getArticles(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadFaqContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpCenter);
