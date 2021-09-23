import React, {useState, useEffect} from 'react'

import { MappedCard } from './marketingCard'

import './iframe.css'
import {doQuery} from "../../../state/utils/contentful";

export const IFrame = ({ card, className, width="100%", height="750", ...rest }) => (
  <div className={`container__iframe ${className}`} {...rest}>
    <iframe src={card.desktopUrl} width={width} height={height} border={0} />
  </div>
)

export default ({ component }) => {
	const [card, setCard] = useState(null)

	const queryQL = `{
        marketingIFrame(id: "${component.sys.id}") {
          mobileUrl
          desktopUrl
          title
          subtitle
          description {
            json
          }
          image {
            desktopMedia {
              url
            }
            mobileMedia {
              url
            }
          }
          settings
        }
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setCard(data.marketingIFrame)
            })
    }, [])
    
	if (!card) {
		return null
    }

	return (
        <React.Fragment>
            <MappedCard card={card} />
            <IFrame card={card} />
        </React.Fragment>
    )
}