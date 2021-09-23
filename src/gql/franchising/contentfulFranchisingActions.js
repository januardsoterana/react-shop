import {
    queryFranchisingCollection,
    queryEvents,
    queryMarketingSection
} from "./contentfulFranchisingQueries";
import {
    doQuery,
    extractIdsFromSecondLevel,
    extractIdsFromTopLevel,
    parseJSONFormat
} from "../../state/utils/contentful";

const parseFranchisingCollection = (data) => {
    let franchisingCollectionData = {
        title: '',
        marketingSectionIds: []
    };
    try {
        const items = data.screenFranchiseCollection?.items || [];
        if (items.length > 0) {
            franchisingCollectionData.title = items[0].title || '';
            franchisingCollectionData.marketingSectionIds = (items[0].marketingComponentsCollection?.items || []).map(item => item.sys?.id);
        }
    } catch (err) {
        console.error(err);
    }
    return franchisingCollectionData;
}

const parseMarketingSection = (data) => {
    let heroImage = '';

    try {
        heroImage = data.marketingSection.marketingComponentsCollection.items[0].image.desktopMedia.url;
    } catch (err) {
        console.error(err);
    }
    return heroImage;
}

const parseEvents = (data) => {
    let eventsData = [];
    try {
        const items = data.screenEvents?.eventsCollection?.items || [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let eventData = {};
            eventData.title = item.title;
            eventData.subtitle = item.subtitle;
            eventData.image = item.image?.desktopMedia?.url || '';
            eventData.action = {
                title: item.actionsCollection?.items[0].title,
                link: item.actionsCollection?.items[0].linkToUrl,
            }

            eventData.description = parseJSONFormat(item.description || {});
            eventsData.push(eventData);
        }
    } catch (err) {
        console.error(err);
    }
    return eventsData;
}

export const gqlLoadFranchising = async () => {
    let franchisingSectionData = {
        title: '',
        subtitle: '',
        events: [],
        heroImage: ''
    };

    let data = await doQuery(queryFranchisingCollection());
    const franchisingCollectionData = parseFranchisingCollection(data);
    franchisingSectionData.title = franchisingCollectionData.title;

    console.log(franchisingCollectionData);

    return franchisingSectionData;
}




