/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPlayer from 'react-player'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import {doQuery} from "../../state/utils/contentful";
import enlargeIcon from '../../assets/images/ic-enlarge.png';

import {loadDryStylingContentful} from "../../state/ducks/DryStyling/Dry-Styling-Actions";
import {parsedJSON2Html} from "../../state/utils/contentful";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './privacy-policy.scss';

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

const PrivacyPolicyElem = ({
    content
}) => {
    const parseNode = (node)=>{
        if( node.content.length > 1 ){
            node.content.map((subnode)=>{
                return parseNode(subnode)
            })
        } else if(node.content.length == 1){
            if( content.nodeType == 'text' ){
                return <span>{node.value}</span>
            } else if( content.nodeType == 'text' ){
                
            }
        }
    }

    
    
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyElem);
