import React, {Component} from 'react';
import {getPromosData, getTheStylesData} from "../../state/ducks/Home/Home-Selectors";
import {connect} from "react-redux";

class PromoEventsSectionView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.promosData.items) {
            return <div/>;
        }
        return (
            <>
                <div className="full_with_part">
                    {
                        this.props.promosData.items.map((data, index) => {
                            return <div className="first_with_row" key={index}>
                                {!data['icon'] && data['image'] && <>
                                    <img src={data['image']} alt=""/>
                                </>}
                                {data['icon'] && !data['image'] && <>
                                    <div className="store_point_box">
                                        <div className="box_bg_tracks">
                                            <div className="stris">
                                                <span><img src={data['icon']} alt=""/></span></div>
                                            <div className="heading_text">
                                                <h3>{data['title']}</h3>
                                                <p>{data['subtitle']}</p>
                                            </div>
                                            <div className="bnt_see_more"><a
                                                href={data['action']['link']}>{data['action']['title']}</a></div>
                                        </div>
                                    </div>
                                </>}
                            </div>;
                        })
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    promosData: getPromosData(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PromoEventsSectionView);
