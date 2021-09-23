import React, {useState, useEffect} from 'react'
import MarketingComponents from './marketingComponents'
import { Title, Icon, normalizeStyle, Description, Body } from './cards/base'

import './section.css'
import {doQuery} from "../../../state/utils/contentful";

const Container = ({ section, children }) => {
  const settings = section.settings || {}
  const containerSettings = settings.container || {}

  const bgColor = normalizeStyle(containerSettings.backgroundColor || 'default')
  const containerStyle = {}
  const spacerStyle = {}

  if (containerSettings.imagePosition === 'Background') {
    containerStyle.backgroundImage = `url(${section.image?.desktopMedia?.url})`
    containerStyle.backgroundSize = 'contain'
    containerStyle.backgroundRepeat = 'no-repeat'
    spacerStyle.paddingBottom = '4rem'
  }

  return (
    <div className={`section section__background__${bgColor}`} style={containerStyle}>
      { containerSettings.separator && 
        <hr className="section__separator" style={spacerStyle} />
      }
      {children}
    </div>
  )
}

export default ({ component }) => {
	const [section, setSection] = useState(null)

    // NOTE:  Querying for the section content by id.  Reference the note
    // in home.js and marketingComponents.js.
    //
    // Because there is a pattern with the marketing components attribute
    // the handling of this content can be performed generically and the
    // `MarketingComponents` component resused.
    //
    // Relative the query below, the related content types associated with the
    // marketing components attribute, such as `MarketingCollection` and `MarketingCard`, 
    // needs to be expanded to account for the other types of content that is allowed.
	const queryQL = `{
        marketingSection(id: "${component.sys.id}") {
          title
          description {
            json
          }
          settings
          icon {
            url
          }
          image {
            desktopMedia {
              url
            }
            mobileMedia {
              url
            }
          }
          marketingComponentsCollection {
            items {
              ... on MarketingCollection {
                __typename
                sys {
                  id
                }
              }
              ... on MarketingCard {
                __typename
                sys {
                  id
                }
              }
              ... on MarketingStyles {
                __typename
                sys {
                  id
                }
              }
              ... on MarketingIFrame {
                __typename
                sys {
                  id
                }
              }
              ... on MarketingCardStructuredData {
                __typename
                sys {
                  id
                }
              }
              ... on MarketingVideo {
                __typename
                sys {
                  id
                }
              }
            }
          }
        }
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setSection(data.marketingSection)
            })
    }, [])
    
	if (!section) {
		return null
  }

  const settings = section.settings || {}
  const containerSettings = settings.container || {}
  const titleSettings = settings.title || {}

	return (
    <React.Fragment>
      { (section.title && section.title.length) &&
        <a name={normalizeStyle(section.title)} id={normalizeStyle(section.title)} />
      }
      <Container section={section}>
          <Icon card={section} format="section" />
          <Title card={section} format="section" className={`${titleSettings.hoist ? 'title__hoist' : ''}`} />
          <Body format="section">
            <Description card={section} format="section" />
            <MarketingComponents components={section.marketingComponentsCollection.items} />
          </Body>
      </Container>
    </React.Fragment>
	)
}
