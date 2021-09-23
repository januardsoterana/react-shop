import React, {useState, useEffect} from 'react'

import Card, { Container, Body, Title, Image } from './cards/base'

import './thestyles.css'
import {doQuery} from "../../../state/utils/contentful";

const Style = ({ style }) => {
    return (
        <Container card={style} format="thestyle">
            <Image card={{ ...style, image: style.featuredImage }} format="thestyle" />
            <Body card={style} format="thestyle">
                <Title card={style} format="thestyle" />
            </Body>
        </Container>
    )
}

/**
 * NOTE:  The styles will need to be packaged into a slider/carousel.  The
 * example app does not attempt to implement this.
 */
const Styles = ({ styles }) => {
    return (
        <ul className="thestyles__styles">
            { styles.map(style => (
                <li key={`style__${style.sys.id}`} className="thestyles__style">
                    <Style style={style} />
                </li>
            )) }
        </ul>
    )
}

export default ({ component }) => {
	const [data, setData] = useState(null)

	const queryQL = `{
        marketingStyles(id: "${component.sys.id}") {
          title
          subtitle
          stylesCollection {
            items {
              sys {
                id
              }
              title
              slug
              subtitle
              featuredImage {
                desktopMedia {
                  url
                }
                mobileMedia {
                  url
                }
              }
            }
          }
          actionsCollection {
            items {
              sys {
                id
              }
              title
              alternateTitle
              style
              linkToUrl
              linkToContent {
                ... on Styles {
                  __typename
                  sys {
                    id
                  }
                  slug
                  title
                }
                ... on ScreenEvents {
                  __typename
                  sys {
                    id
                  }
                  slug
                  title
                }
              }
            }
          }
        }
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(qlData => {
                setData(qlData.marketingStyles)
            })
    }, [])
    
	if (!data) {
		return null
    }

	return (
        <div className="thestyles">
            <div className="thestyles__container__card">
                <Card card={data} format="thestyles" />
            </div>
            <div className="thestyles__container__styles">
                <Styles styles={data.stylesCollection.items} />
            </div>
        </div>
    )
}