import React, {useState, useEffect} from 'react'

import { Image } from './cards/base'

import './image.css'
import {doQuery} from "../../../state/utils/contentful";

export default ({ component }) => {
	const [card, setCard] = useState(null)

	const queryQL = `{
        marketingImage(id: "${component.sys.id}") {
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
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setCard(data.marketingImage)
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
            <Image card={{
                image: card
            }} format="image" />
        </React.Fragment>
    )
}