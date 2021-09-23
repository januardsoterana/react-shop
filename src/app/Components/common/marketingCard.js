import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import Base from './cards/base'
import Full from './cards/full'
import {doQuery} from "../../../state/utils/contentful";

// NOTE:  The content model attempts to generically represent "Card" data
// and relies on format settings to influence how the card data should be
// oriented, formatted and displayed.  These are the formats currently 
// accounted for.  How these formats are used and applied is up to you.
const CARD_FORMATS = {
    BASE: 'base',
    MARQUEE: 'marquee',
    HERO: 'hero',
    AVATAR: 'avatar',
    PORTRAIT: 'portrait',
    TEXT_COLUMNS: 'text_columns',
    TEXT_TOP: 'text_top',
    TEXT_BOTTOM: 'text_bottom',
    TEXT_LEFT: 'text_left',
    TEXT_RIGHT: 'text_right',
    TEXT_LEFT_WRAPPED: 'text_left_wrapped',
    TEXT_RIGHT_WRAPPED: 'text_right_wrapped',
    TEXT_LEFT_WEIGHTED: 'text_left_weighted',
    TEXT_RIGHT_WEIGHTED: 'text_right_weighted',
}

// NOTE:  As noted above with `CARD_FORMATS`, the format will influence
// what the card data will be displayed.  Here is an example or two of 
// using the format data to drive an alternate display.
export const MappedCard = ({ card, ...rest }) => {
    const format = card?.settings?.container?.format || 'base'

    switch(format) {
        case CARD_FORMATS.MARQUEE:
        case CARD_FORMATS.HERO:
            return <Full card={card} format={format} {...rest} />
        case CARD_FORMATS.TEXT_COLUMNS: 
        case CARD_FORMATS.TEXT_TOP: 
        case CARD_FORMATS.TEXT_BOTTOM: 
        case CARD_FORMATS.TEXT_LEFT: 
        case CARD_FORMATS.TEXT_LEFT_WRAPPED: 
        case CARD_FORMATS.TEXT_LEFT_WEIGHTED: 
        case CARD_FORMATS.TEXT_RIGHT: 
        case CARD_FORMATS.TEXT_RIGHT_WRAPPED: 
        case CARD_FORMATS.TEXT_RIGHT_WEIGHTED:
        default:
            return <Base card={card} format={format} {...rest} />
    }
}

export default ({ component }) => {
	const [card, setCard] = useState(null)

    // NOTE:  Querying for the card content by id.  Reference the note
    // in home.js and marketingComponents.js.
    //
    // This content model does not include the marketing components attribute.
    // As such, this query references the related content directly.
	const queryQL = `{
        marketingCard(id: "${component.sys.id}") {
          title
          subtitle
          description {
            json
          }
          avatar {
            url
          }
          icon {
            url
          }
          image {
            title
            alternateTitle
            caption
            description {
                json
            }
            desktopMedia {
              url
            }
            mobileMedia {
              url
            }
          }
          settings
          actionsCollection {
            items {
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
            .then(data => {
                setCard(data.marketingCard)
            })
    }, [])
    
	if (!card) {
		return null
    }

    const actions = card.actionsCollection?.items || []
    const wrappedAction = actions.reduce((value, action, idx) => {
        if (!value) {
            return action
        }

        if (action.style === 'Wrapper') {
            return action
        }

        return value
    }, null)
    const wrappedClass = wrappedAction && wrappedAction.style === 'Wrapper' ? 'action__wrapped' : ''
    const history = useHistory()
    const handleOnClick =() => {
        if (wrappedAction) {
          let link = wrappedAction.linkToContent?.slug?.length ? wrappedAction.linkToContent.slug : null

          link = wrappedAction.linkToUrl?.length ? wrappedAction.linkToUrl : link

          if (link) {
            history.push(wrappedAction.linkToUrl)
          }
        }
    }

	return <MappedCard card={card} className={wrappedClass} onClick={handleOnClick} />
}