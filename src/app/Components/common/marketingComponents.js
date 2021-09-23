import React from 'react'

import MarketingSection from './marketingSection'
import MarketingCollection from './marketingCollection'
import MarketingCard from './marketingCard'
import MarketingStyles from './marketingStyles'
import MarketingIFrame from './marketingIFrame'
import MarketingQuestionAnswer from './marketingQuestionAnswer'
import MarketingCardStructuredData from './marketingCardStructuredData'
import MarketingVideo from './marketingVideo'
import MarketingImage from './marketingImage'

import './components.css'

const COMPONENT_TYPES = {
    SECTION: 'MarketingSection',
    COLLECTION: 'MarketingCollection',
    CARD: 'MarketingCard',
    STYLES: 'MarketingStyles',
    IFRAME: 'MarketingIFrame',
    QUESTIONANSWER: 'MarketingQuestionAnswer',
    STRUCTURED: 'MarketingCardStructuredData',
    VIDEO: 'MarketingVideo',
    IMAGE: 'MarketingImage',
}

/**
 * NOTE:  The marketing components attribute is used across multiple content models and
 * the nested content models can be identified and rendered using associated metadata.
 * 
 * In this example, the `__typename` attribute is used to map the nested content model
 * to a component.
 * 
 * The component will use the ID value to execute a secondary query for content.  Depending
 * on how wide and deep the relationships are, this could result is many additional queries,
 * which be a performance concern.
 * 
 * The assumption is that content will not be queried from Contentful with each page request.
 * Ideally, a data layer with caching will be introduced.  This can shield the complexity of
 * data retrieval and assembly from the display layer.
 */
export const MappedComponent = ({ component }) => {
    if (!component) {
        return null
    }

    switch(component['__typename']) {
        case COMPONENT_TYPES.SECTION:
            return <MarketingSection component={component} key={component.sys.id} />
        case COMPONENT_TYPES.COLLECTION:
            return <MarketingCollection component={component} key={component.sys.id} />
        case COMPONENT_TYPES.CARD:
            return <MarketingCard component={component} key={component.sys.id} />
        case COMPONENT_TYPES.STYLES:
            return <MarketingStyles component={component} key={component.sys.id} />
        case COMPONENT_TYPES.IFRAME:
            return <MarketingIFrame component={component} key={component.sys.id} />
        case COMPONENT_TYPES.QUESTIONANSWER: 
            return <MarketingQuestionAnswer component={component} key={component.sys.id} />
        case COMPONENT_TYPES.STRUCTURED:
            return <MarketingCardStructuredData component={component} key={component.sys.id} />
        case COMPONENT_TYPES.VIDEO:
            return <MarketingVideo component={component} key={component.sys.id} />
        case COMPONENT_TYPES.IMAGE:
            return <MarketingImage component={component} key={component.sys.id} />
    }

    return null
}

export default ({ components }) => {
    if (!(components && components.length)) {
        return null
    }

	return (
        <div className="components">
            { components.map(component => (
                <MappedComponent component={component} />
            )) }
        </div>
	)
}