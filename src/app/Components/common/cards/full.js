import React from 'react'

import Base from './base'

import './card.css'

export default ({ card, format, ...rest }) => {
    console.log('card-full', card, format)

    // NOTE:  If we need a different layout we could import
    // the individual components from within Base and organize 
    // them differently, as per the needs of the card format
	return (
        <Base card={card} format={format} {...rest} />
    )
}