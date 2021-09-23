import React, {useState, useEffect} from 'react'

import MarketingComponents, { MappedComponent } from './marketingComponents'
import { Title } from './cards/base'

import Slider from 'react-slick'

import './collection.css'
import {doQuery} from "../../../state/utils/contentful";

export default ({ component }) => {
	const [collection, setCollection] = useState(null)

    // NOTE:  Querying for the collection content by id.  Reference the note
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
        marketingCollection(id: "${component.sys.id}") {
          title
          settings
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
              ... on MarketingQuestionAnswer {
                __typename
                sys {
                  id
                }
              }
              ... on MarketingImage {
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
                setCollection(data.marketingCollection)
            })
    }, [])
    
	if (!collection) {
		return null
    }
    

    // NOTE:  Calculate the collection display format
    const format = collection.settings?.container?.format || ''

    // NOTE:  Use the calculated format to drive a specific display
    switch(format) {
        case 'carousel':
        case 'slider':
            const sliderSetting = collection.settings?.settings?.slider || {}

            return (
                <div className={`collection collection__${format}`}>
                    <Slider {...sliderSetting}>
                        { collection.marketingComponentsCollection.items.map((component, idx) => (
                            <div key={`slider__${idx}__${component.sys.id}`}>
                                <MappedComponent component={component} />
                            </div>
                        )) }
                    </Slider>
                </div>
            )
        case 'ribbon':
            return (
                <div className={`collection collection__${format}`}>
                    <Title card={collection} format="ribbon" />
                    <MarketingComponents components={collection.marketingComponentsCollection.items} />
                </div>
            )        
        case 'stacked':
        case 'stacked_vertical':
        case 'fluid':
    }

	return (
        <div className={`collection collection__${format}`}>
            <MarketingComponents components={collection.marketingComponentsCollection.items} />
        </div>
	)
}
