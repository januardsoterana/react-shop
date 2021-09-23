import {
    queryDryStylingCollection,
    queryImagesAndMarketingSectionIds,
    queryMarketingSection
} from "./contentfulDryStylingQueries";
import {
    doQuery,
    extractIdsFromSecondLevel,
    extractIdsFromTopLevel,
    parseJSONFormat
} from "../../state/utils/contentful";

const parseDryStylingCollection = (data) => {
    let dryStylingCollectionData = {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        featuredImage: '',
        featuredVideo: '',
        action: {
            title: '',
            link: '',
        }
    };
    try {
        const items = data.howToCollection?.items || [];
        if (items.length > 0) {
            dryStylingCollectionData.title = items[0].title || '';
            dryStylingCollectionData.subtitle = items[0].subtitle || '';
            dryStylingCollectionData.id = items[0].sys?.id || '';
            dryStylingCollectionData.featuredImage = items[0].featuredImage?.desktopMedia?.url || '';
            dryStylingCollectionData.featuredVideo = items[0].video?.desktopUrl || '';
            dryStylingCollectionData.action.title = items[0].actionsCollection?.items[0]?.title || '';
            dryStylingCollectionData.action.link = items[0].actionsCollection?.items[0]?.link || '';
            dryStylingCollectionData.description = parseJSONFormat(items[0].description || {});
        }
    } catch (err) {
        console.error(err);
    }
    return dryStylingCollectionData;
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

const parseImagesAndMarketingSectionIds = (data) => {
    try {
        const imageItems = data.howTo?.imagesCollection?.items || [];
        const marketingSectionItems = data.howTo?.marketingComponentsCollection?.items || [];
        return {
            images: imageItems.map(item => item?.desktopMedia?.url || ''),
            marketingSectionIds: marketingSectionItems.map(item => item?.sys.id)
        };
    } catch (err) {
        console.error(err);
    }
    return {};
}

export const gqlLoadDryStyling = async () => {
    let dryStylingSectionData = {
        title: '',
        subtitle: '',
        description: '',
        action: {
            title: '',
            link: ''
        },
        featuredImage: '',
        featuredVideo: '',
        images: [],
        heroImage: '',
        promo: {
            image: '',
            action: {
                title: '',
                link: ''
            }
        }
    };

    let data = await doQuery(queryDryStylingCollection());
    const dryStylingCollectionData = parseDryStylingCollection(data);
    for (const k in dryStylingCollectionData) dryStylingSectionData[k] = dryStylingCollectionData[k];

    data = await doQuery(queryImagesAndMarketingSectionIds(dryStylingCollectionData.id));
    const imagesAndMarketingSectionIds = parseImagesAndMarketingSectionIds(data);
    dryStylingSectionData.images = imagesAndMarketingSectionIds.images || [];

    if (imagesAndMarketingSectionIds.marketingSectionIds.length > 0) {
        data = await doQuery(queryMarketingSection(imagesAndMarketingSectionIds.marketingSectionIds[0]));
        dryStylingSectionData.heroImage = {
            desktop: data.marketingSection?.marketingComponentsCollection?.items[0]?.image.desktopMedia.url,
            mobile: data.marketingSection?.marketingComponentsCollection?.items[0]?.image.mobileMedia.url,
        };
    }
    if (imagesAndMarketingSectionIds.marketingSectionIds.length > 1) {
        data = await doQuery(queryMarketingSection(imagesAndMarketingSectionIds.marketingSectionIds[1]));
        dryStylingSectionData.promo.image = {
            desktop: data.marketingSection?.marketingComponentsCollection?.items[0]?.image.desktopMedia.url,
            mobile: data.marketingSection?.marketingComponentsCollection?.items[0]?.image.mobileMedia.url
        }
        dryStylingSectionData.promo.action.title = data.marketingSection?.marketingComponentsCollection?.items[0]?.actionsCollection?.items[0]?.title;
        dryStylingSectionData.promo.action.link = data.marketingSection?.marketingComponentsCollection?.items[0]?.actionsCollection?.items[0]?.link;
    }

    return dryStylingSectionData;
}




