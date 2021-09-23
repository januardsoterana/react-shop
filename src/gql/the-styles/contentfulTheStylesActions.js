import {doQuery} from "../../state/utils/contentful";
import {
    queryGallery,
    queryMarketingSection, queryStylesCollection, queryStylesExceptGallery, queryStylesIds
} from "./contentfulTheStylesQueries";

const parseStylesCollection = (data) => {
    let stylesCollectionData = {
        title: '',
        description: '',
        id: '',
        marketingSectionId: '',
        slug: ''
    };
    try {
        const items = data.stylesCollection?.items || [];
        if (items.length > 0) {
            stylesCollectionData.id = items[0].sys?.id || '';
            stylesCollectionData.title = items[0].title || '';
            stylesCollectionData.slug = items[0].slug || '';
            stylesCollectionData.description = items[0].description?.json?.content[0]?.content[0]?.value || '';
            stylesCollectionData.marketingSectionId = items[0].marketingComponentsCollection?.items[0].sys?.id || '';
        }
    } catch (err) {
        console.error(err);
    }
    return stylesCollectionData;
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

const parseStylesExceptGallery = (data) => {
    let stylesData = [];
    try {
        const items = data.styles?.stylesCollection?.items || [];
        items.forEach(item => {
            let styleData = {
                title: item.title,
                subtitle: item.subtitle,
                slug: item.slug,
                featuredVideo: item.featuredVideo?.desktopUrl || '',
                featuredImage: item.featuredImage?.desktopMedia?.url || '',
                featured360Gif: item.featured360Gif?.desktopMedia?.url || '',
                galleryCollectionIds: (item.galleryCollection?.items || []).filter(item => item?.sys?.id).map(item => item?.sys?.id)
            }
            stylesData.push(styleData);
        });
    } catch (err) {
        console.error(err);
    }
    return stylesData;
}

const parseGallery = (data) => {
    let galleryData = {
        title: '',
        video: '',
        images: []
    };
    try {
        galleryData.title = data?.styleGallery?.title;
        galleryData.video = data?.styleGallery?.video?.desktopUrl;
        galleryData.images = (data?.styleGallery?.imagesCollection?.items || []).map(item => item?.desktopMedia?.url || '');
    } catch (err) {
        console.error(err);
    }
    return galleryData;
}

export const gqlLoadTheStyles = async () => {
    let theStylesSectionData = {
        title: '',
        description: '',
        heroImage: '',
        styles: [],
    };

    let data = await doQuery(queryStylesCollection());
    const stylesCollectionData = parseStylesCollection(data);
    theStylesSectionData.title = stylesCollectionData.title;
    theStylesSectionData.description = stylesCollectionData.description;

    if (stylesCollectionData.marketingSectionId) {
        data = await doQuery(queryMarketingSection(stylesCollectionData.marketingSectionId));
        theStylesSectionData.heroImage = parseMarketingSection(data);
    }

    if (stylesCollectionData.id) {
        data = await doQuery(queryStylesExceptGallery(stylesCollectionData.id));

        let stylesData = parseStylesExceptGallery(data);
        for (let i = 0; i < stylesData.length; i++) {
            stylesData[i].gallery = [];

            let promises = [];
            for (let j = 0; j < stylesData[i].galleryCollectionIds.length; j++) {
                promises.push(doQuery(queryGallery(stylesData[i].galleryCollectionIds[j])));
            }

            data = await Promise.all(promises) || [];
            stylesData[i].gallery = data.map(item => parseGallery(item));
        }
        theStylesSectionData.styles = stylesData;
    }

    console.log('contentfulTheStylesActions ', theStylesSectionData);

    return theStylesSectionData;
}




