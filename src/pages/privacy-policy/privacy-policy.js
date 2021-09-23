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

const PrivacyPolicy = ({
                           loadDataFromContentful
                       }) => {

    const [content, setContent] = useState(null);

    const query = `{
        screenCollection(where: {slug: "privacy-policy"}) {
          items {
            title
            description{
                json
            }
          }
        }
      }`;
      useEffect(() => {
        doQuery(query)
            .then(data => {
                console.log('-- data : ', data.screenCollection.items[0])
                setContent(data?.screenCollection?.items?.[0])
            })
    }, [])

    const newLineText = (text) => {        
        let textArr = text.split('\n');
        if( text == '' ) return <></>

        let newText
        if(textArr.length > 1){
            newText = textArr.map(str => <span>{str}<br></br></span>);
        } else {
            newText = <span>{text}</span>
        }
        return newText
    }

    const parseNode = (node)=>{
        if(node){
            let subNode = "";        
            if( node?.content?.length > 0 ){
                subNode = node.content.map((subnode)=>{
                    return parseNode(subnode)
                })
            } else {
                subNode = node.value
            }
    
            if( node.nodeType == 'text' ){
                
                return <span>{newLineText(subNode)}</span>
            } else if( node.nodeType == 'hr' ){
                return <hr></hr>
            } else if( node.nodeType == 'paragraph' ){
                return <p>{subNode}</p>
            } else if( node.nodeType == 'heading-3' ){
                return <h3>{subNode}</h3>
            } else if( node.nodeType == 'hyperlink' ){
                return <a>{subNode}</a>
            } else if( node.nodeType == 'document' ){
                return <>{subNode}</>
            } else {
                console.log('---------- : ', node)
            }
        } else {
            return <></>
        }
    }

    let parseContent = parseNode(content?.description?.json)
    console.log('-- parseContent : ', parseContent)
    return (
        <div className="tab-pane fade show active static-page" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="title-container">
                <h5 className="text-uppercase text-center">{content?.title}</h5>
            </div>

            <div className="middle-section">
                <div className="card-body">
                    { parseContent }
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
