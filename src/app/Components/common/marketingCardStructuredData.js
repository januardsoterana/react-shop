import React, {useState, useEffect} from 'react'


import { MappedCard } from './marketingCard'

import './structured.css'
import {doQuery} from "../../../state/utils/contentful";

export const Structured = ({ card }) => (
    <div className="container__structured">
        <table>
            <thead>
                <tr>
                    { card.structuredData.data.header.map(heading => (
                        <th>
                            {heading}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                    { card.structuredData.data.body.map(row => (
                        <tr>
                            { row.map(cell => (
                                <td>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
            <tfoot>
                <tr>
                    { card.structuredData.data.footer.map(heading => (
                        <td>
                            {heading}
                        </td>
                    ))}
                </tr>
            </tfoot>
        </table>
    </div>
)

export default ({ component }) => {
	const [card, setCard] = useState(null)

	const queryQL = `{
        marketingCardStructuredData(id: "${component.sys.id}") {
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
          structuredData
          settings
        }
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setCard(data.marketingCardStructuredData)
            })
    }, [])
    
	if (!card) {
		return null
    }

    // NOTE:  The intent is to support other structured data types
	return (
        <React.Fragment>
            <MappedCard card={card} />
            <Structured card={card} />
        </React.Fragment>
    )
}