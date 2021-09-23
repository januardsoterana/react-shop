import {
    queryEventsCollection,
    queryEvents,
    queryMarketingSection
} from "./contentfulEventQueries";
import {
    doQuery,
    extractIdsFromSecondLevel,
    extractIdsFromTopLevel,
    parseJSONFormat
} from "../../state/utils/contentful";

const parseEventsCollection = (data) => {
    let eventsCollectionData = {
        title: '',
        subtitle: '',
        id: '',
        marketingSectionId: ''
    };
    try {
        const items = data.screenEventsCollection?.items || [];
        if (items.length > 0) {
            eventsCollectionData.title = items[0].title || '';
            eventsCollectionData.subtitle = items[0].subtitle || '';
            eventsCollectionData.id = items[0].sys?.id || '';
            eventsCollectionData.marketingSectionId = items[0].marketingComponentsCollection?.items[0].sys?.id || '';
        }
    } catch (err) {
        console.error(err);
    }
    return eventsCollectionData;
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

export const gqlLoadEvents = async () => {
    let eventsSectionData = {
        title: '',
        subtitle: '',
        events: [],
        heroImage: ''
    };

    let data = await doQuery(queryEventsCollection());
    const eventsCollectionData = parseEventsCollection(data);
    eventsSectionData.title = eventsCollectionData.title;
    eventsSectionData.subtitle = eventsCollectionData.subtitle;

    if (eventsCollectionData.marketingSectionId) {
        data = await doQuery(queryMarketingSection(eventsCollectionData.marketingSectionId));
        eventsSectionData.heroImage = parseMarketingSection(data);
    }

    if (eventsCollectionData.id) {
        data = await doQuery(queryEvents(eventsCollectionData.id));
        eventsSectionData.events = parseEvents(data);
    }

    return eventsSectionData;
}




