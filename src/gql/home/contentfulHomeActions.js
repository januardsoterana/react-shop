import {
    queryMarketingCardInMarketingCollection,
    homeSecondLevelQuery,
    homeTopLevelQuery,
    querySocialInMarketingCollection, queryMarketingStyles
} from "./contentfulHomeQueries";
import {doQuery, extractIdsFromSecondLevel, extractIdsFromTopLevel} from "../../state/utils/contentful";

const parseMarketingCollectionWithMarketingCards = (data) => {
    let marketingCollectionData = {
        title: '',
        items: []
    };
    try {
        marketingCollectionData.title = data.marketingCollection?.title || '';
        const items = data.marketingCollection?.marketingComponentsCollection?.items || [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            marketingCollectionData['items'].push({
                title: item['title'],
                subtitle: item['subtitle'],
                avatar: item.avatar?.url || '',
                icon: item.icon?.url || '',
                image: item.image?.desktopMedia?.url || '',
                action: {
                    title: item.actionsCollection?.items[0]['title'] || '',
                    link: item.actionsCollection?.items[0]['linkToUrl'] || ''
                }
            })
        }
    } catch (err) {
        console.error(err);
    }
    return marketingCollectionData;
}

const parseMarketingStyles = (data) => {
    let marketingStylesData = {
        title: '',
        subtitle: '',
        action: {
            title: '',
            link: ''
        },
        items: []
    };

    try {
        marketingStylesData.title = data.marketingStyles?.title || '';
        marketingStylesData.subtitle = data.marketingStyles?.subtitle || '';
        const actions = data.marketingStyles?.actionsCollection?.items || [];
        if (actions.length > 0) {
            marketingStylesData.action.title = actions[0].title;
            marketingStylesData.action.link = actions[0].linkToUrl;
        }

        const items = data.marketingStyles?.stylesCollection?.items || [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            marketingStylesData['items'].push({
                title: item['title'],
                subtitle: item['subtitle'],
                image: item.featuredImage?.desktopMedia?.url || ''
            })
        }
    } catch (err) {
        console.error(err);
    }
    return marketingStylesData;
}

const parseSocialInMarketingCollection = (data) => {
    let socialData = {
        title: '',
        hashtag: '',
        handle: ''
    };
    try {
        const items = data.marketingSection?.marketingComponentsCollection?.items || [];
        if (items.length > 0) {
            socialData['title'] = items[0].title || '';
            socialData['hashtag'] = items[0].hashtag || '';
            socialData['handle'] = items[0].handle || '';
        }
    } catch (err) {
        console.error(err);
    }
    return socialData;
}

export const gqlLoadHome = async () => {
    let homeSectionData = {
        hero: {},
        ribbon: {},
        theStyles: {},
        promos: {},
        offers: {},
        social: {}
    };

    let data = await doQuery(homeTopLevelQuery());
    const firstLevelIds = extractIdsFromTopLevel(data.screenHomeCollection || {});

    if (firstLevelIds.length > 0) {
        // Load primary section
        data = await doQuery(homeSecondLevelQuery(firstLevelIds[0]));
        const primarySecondLevelIds = extractIdsFromSecondLevel(data.marketingSection || {});

        // Load hero section data
        const heroData = parseMarketingCollectionWithMarketingCards(
            await doQuery(queryMarketingCardInMarketingCollection(primarySecondLevelIds[0])));

        // Load ribbon section data
        const ribbonData = parseMarketingCollectionWithMarketingCards(
            await doQuery(queryMarketingCardInMarketingCollection(primarySecondLevelIds[1])));

        homeSectionData['hero'] = heroData;
        homeSectionData['ribbon'] = ribbonData;
    }

    if (firstLevelIds.length > 1) {
        // Load secondary section
        data = await doQuery(homeSecondLevelQuery(firstLevelIds[1]));
        const secondarySecondLevelIds = extractIdsFromSecondLevel(data.marketingSection || {});

        // Load the-the-styles section data
        const theStylesData = parseMarketingStyles(await doQuery(queryMarketingStyles(secondarySecondLevelIds[0])));

        // Load promo section data
        const promoData = parseMarketingCollectionWithMarketingCards(
            await doQuery(queryMarketingCardInMarketingCollection(secondarySecondLevelIds[1])));

        // Load offers section data
        const offersData = parseMarketingCollectionWithMarketingCards(
            await doQuery(queryMarketingCardInMarketingCollection(secondarySecondLevelIds[2])));

        homeSectionData['theStyles'] = theStylesData;
        homeSectionData['promos'] = promoData;
        homeSectionData['offers'] = offersData;
    }

    if (firstLevelIds.length > 2) {
        // Load instagram section
        data = await doQuery(querySocialInMarketingCollection(firstLevelIds[2]));
        homeSectionData['social'] = parseSocialInMarketingCollection(data);
    }

    return homeSectionData;
}




