import React, {useState, useEffect} from 'react'

import { MappedCard } from './marketingCard'
import { Image } from './cards/base'

import './video.css'
import {doQuery} from "../../../state/utils/contentful";

export const Video = ({ card, format, className, ...rest }) => {
    const [showVideo, setShowVideo] = useState(false)

    if (!showVideo) {
        return (
            <div className={`container__video container__video__${format} ${className}`} {...rest} style={{cursor: 'pointer'}} onClick={() => setShowVideo(true)}>
                <Image card={{
                    image: card.previewImage
                }} format={format} />
            </div>
        )    
    }

    // NOTE:  Size the video correctly and auto detect the video service (youtube, vimeo, etc) 
    // and construct the correct embed code
    return (
        <div className={`container__video container__video__${format} ${className}`} {...rest}>
            <iframe width="560" height="315" src={card.desktopUrl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    )
}

export default ({ component }) => {
	const [card, setCard] = useState(null)

	const queryQL = `{
        marketingVideo(id: "${component.sys.id}") {
          title
          subtitle
          description {
              json
          }
          previewImage {
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
          desktopUrl
          mobileUrl
          settings
        }
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setCard(data.marketingVideo)
            })
    }, [])
    
	if (!card) {
		return null
    }

    // NOTE:  Relying on a circular reference here:
    //  Card actually references the exported Video component
    //  above.  I am sure there's a better way.  But, wanted
    //  to leverage the layout/format capabilities of the Card
	return (
        <React.Fragment>
            <MappedCard card={card} />
        </React.Fragment>
    )
}