import React, {useState, useEffect} from 'react'
import {StickyContainer, Sticky} from 'react-sticky'
import {HashLink as Link} from 'react-router-hash-link'

import Loader from '../../app/Components/common/loader'
import MarketingComponents from '../../app/Components/common/marketingComponents'
import {normalizeStyle} from '../../app/Components/common/cards/base'

import './franchise.scss'
import {doQuery} from "../../state/utils/contentful";

const FranchiseView = ({}) => {
    const [page, setPage] = useState(null)

    const queryQL = `{
        screenFranchiseCollection(where: {slug: "franchise"}) {
            items {
            title
            slug
            marketingComponentsCollection {
                items {
                ... on MarketingSection {
                    __typename
                    sys {
                        id
                    }
                    title
                }
                }
            }
            metadata {
                __typename
            }
            }
        }
    }`

    useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                const screen = data?.screenFranchiseCollection?.items

                if (!(screen && screen.length)) {
                    console.error('Page not found!!')
                }

                setPage(screen[0])
            })
    }, [])

    if (!page) {
        return <Loader/>
    }

    return (
        <React.Fragment>
            {/* NOTE:  Sticky Navigation (not yet sticky) */}
            <StickyContainer>
                <Sticky>
                    {({style, isSticky}) => (
                        <div className={`franchise__navigation ${isSticky ? 'navigation__sticky' : ''}`} style={style}>
                            {page.marketingComponentsCollection.items.map(item => {
                                return (
                                    <Link to={`#${normalizeStyle(item.title)}`} className="franchise__navigation__item">
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </Sticky>
                <MarketingComponents components={page.marketingComponentsCollection.items}/>
            </StickyContainer>
        </React.Fragment>
    )
}

export default FranchiseView;

