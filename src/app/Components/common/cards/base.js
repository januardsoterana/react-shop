import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import slugify from 'slugify'

import {BLOCKS, MARKS} from "@contentful/rich-text-types"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

import {Video} from '../marketingVideo'

import './card.css'
import {doQuery} from "../../../../state/utils/contentful";

const Bold = ({children}) => <span className="bold">{children}</span>
const Text = ({children}) => <p>{children}</p>
const Img = ({id, ...rest}) => {
    const [asset, setAsset] = useState(null)

    const queryQL = `{
        asset(id:"${id}") {
          sys {
            id
          }
          title
          fileName
          url
        }
    }`

    useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setAsset(data.asset)
            })
    }, [])

    if (!asset) {
        return null
    }

    return (
        <img src={asset.url}/>
    )
}

const options = {
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br/>, text]),
    renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        [BLOCKS.EMBEDDED_ASSET]: node => <Img {...node.data.target.sys} />,
    },
}

export const normalizeStyle = value => slugify(value || '', '_').replaceAll('-', '').toLowerCase()

export const Container = ({card, format, className = '', children, ...rest}) => {
    const settings = card.settings?.container || {}
    const containerStyles = []

    if (settings.backgroundColor && settings.backgroundColor.length) {
        containerStyles.push(`card__container__color__${normalizeStyle(settings.backgroundColor)}`)
    }

    return (
        <div
            className={`card__container card__container__${format} ${containerStyles.join(' ')} ${className}`} {...rest}
            data-format={format}>
            {children}
        </div>
    )
}

export const Body = ({card, format, className = '', children, ...rest}) => (
    <div className={`card__body card__body__${format} ${className}`} {...rest}>
        {children}
    </div>
)

export const Media = ({card, format, className = '', children, ...rest}) => (
    <div className={`card__media card__media__${format} ${className}`} {...rest}>
        {children}
    </div>
)

export const Title = ({card, format, className = '', ...rest}) => {
    if (!card.title) {
        return null
    }

    const settings = card.settings?.title || {}
    const titleStyles = []

    if (settings.color && settings.color.length) {
        titleStyles.push(`card__title__color__${normalizeStyle(settings.color, '_')}`)
    }

    if (settings.dropShadow) {
        titleStyles.push(`card__title__dropShadow`)
    }

    if (settings.size && settings.size.length) {
        titleStyles.push(`card__title__size__${normalizeStyle(settings.size, '_')}`)
    }

    return (
        <h3 className={`card__title card__title__${format} ${titleStyles.join(' ')} ${className}`} {...rest}
            dangerouslySetInnerHTML={{__html: card.title}}/>
    )
}

export const Subtitle = ({card, format, className = '', ...rest}) => {
    if (!card.subtitle) {
        return null
    }

    return (
        <p className={`card__subtitle card__subtitle__${format} ${className}`} {...rest}
           dangerouslySetInnerHTML={{__html: card.subtitle}}/>
    )
}

export const Description = ({card, format, className = '', ...rest}) => {
    if (!(card.description && card.description.json)) {
        return null
    }

    try {
        return (
            <div className={`card__description card__description__${format} ${className}`} {...rest}>
                {documentToReactComponents(card.description.json, options)}
            </div>
        )
    } catch (e) {
        console.error(e, card)
        return null
    }
}

export const Icon = ({card, format, className = '', ...rest}) => {
    if (!(card.icon && card.icon.url)) {
        return null
    }

    return (
        <img src={card.icon.url} className={`card__icon card__icon__${format} ${className}`} {...rest} />
    )
}

export const Avatar = ({card, format, className = '', ...rest}) => {
    if (!(card.avatar && card.avatar.url)) {
        return null
    }

    return (
        <img src={card.avatar.url} className={`card__avatar card__avatar__${format} ${className}`} {...rest} />
    )
}

export const Image = ({card, format, className = '', ...rest}) => {
    if (!card.image) {
        return null
    }

    if (!(card.image.desktopMedia?.url || card.image.mobileMedia?.url)) {
        return null
    }

    const primaryImage = card.image.desktopMedia?.url || card.image.mobileMedia?.url
    const imageSet = []

    if (card.image.mobileMedia?.url && card.image.desktopMedia?.url) {
        imageSet.push(`${card.image.mobileMedia.url}?q=50&w=295 295w`)
        imageSet.push(`${card.image.mobileMedia.url}?q=50&w=590 590w`)
        imageSet.push(`${card.image.desktopMedia.url}?q=50&w=1180 1180w`)
        imageSet.push(`${card.image.desktopMedia.url}?q=50&w=1295 1295w`)
    } else if (card.image.mobileMedia?.url) {
        imageSet.push(`${card.image.mobileMedia.url}?q=50&w=295 295w`)
        imageSet.push(`${card.image.mobileMedia.url}?q=50&w=590 590w`)
        imageSet.push(`${card.image.mobileMedia.url}?q=50&w=1180 1180w`)
        imageSet.push(`${card.image.mobileMedia.url}?q=50&w=1295 1295w`)
    } else if (card.image.desktopMedia?.url) {
        imageSet.push(`${card.image.desktopMedia.url}?q=50&w=295 295w`)
        imageSet.push(`${card.image.desktopMedia.url}?q=50&w=590 590w`)
        imageSet.push(`${card.image.desktopMedia.url}?q=50&w=1180 1180w`)
        imageSet.push(`${card.image.desktopMedia.url}?q=50&w=1295 1295w`)
    }

    return (
        <picture className={`card__image card__image__${format} ${className}`} {...rest}>
            <img
                loading="lazy"
                sizes="(max-width: 1180px) 100vw, 1180px"
                srcSet={imageSet.join(', ')}
                src={primaryImage}
                alt={card.image.title || card.image.alternateTitle || card.title}
            />
        </picture>
    )
}

export const InstagramHandle = ({card, format, className = '', ...rest}) => {
    if (!(card.instagramHandle && card.instagramHandle.length)) {
        return null
    }

    return (
        <div className={`card__social_instagram card__social_instagram__${format} ${className}`} {...rest}>
            {card.instagramHandle}
        </div>
    )
}

export const Actions = ({card, format, className = '', ...rest}) => {
    if (!(card.actionsCollection && card.actionsCollection.items && card.actionsCollection.items.length)) {
        return null
    }

    const actions = card.actionsCollection.items.filter(action => action.style !== 'Wrapper')

    if (!actions.length) {
        return null
    }

    return (
        <ul className={`card__actions card__actions__${format} ${className}`} {...rest}>
            {actions.map((action, idx) => {
                // NOTE:  Need to set this value conditionally, based on
                // linkToContent versus linkToUrl
                let link = action.linkToContent?.slug?.length ? action.linkToContent.slug : null

                link = action.linkToUrl?.length ? action.linkToUrl : link

                if (!link) {
                    return null
                }

                return (
                    <li className="card__action" key={`action__${link}__${idx}`}>
                        <Link href={link} title={action.alternateTitle || action.title}
                              className={`card__action__link link__style__${normalizeStyle(action.style, '_')}`}>
                            {action.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default ({card, format, className, onClick}) => {
    console.log('card-base', card, format)
    return (
        <Container card={card} format={format} className={className} onClick={onClick}>
            <Media card={card} format={format}>
                <Image card={card} format={format}/>
                <Video card={card} format={format}/>
            </Media>
            <Body card={card} format={format}>
                <Icon card={card} format={format}/>
                <Avatar card={card} format={format}/>
                <Title card={card} format={format}/>
                <Subtitle card={card} format={format}/>
                <Description card={card} format={format}/>
                <InstagramHandle card={card} format={format}/>
                <Actions card={card} format={format}/>
            </Body>
        </Container>
    )
}
