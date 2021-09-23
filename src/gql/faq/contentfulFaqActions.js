import {
    queryHelpCenterCollection,
    queryFaqArticles,
    queryMarketingSection
} from "./contentfulFaqQueries";
import {doQuery} from "../../state/utils/contentful";


const parseHelpCenterCollection = (data) => {
    let helpCenterCollectionData = {
        title: '',
        subtitle: '',
        id: '',
        marketingSectionId: ''
    };
    try {
        const items = data.screenHelpCenterCollection?.items || [];
        if (items.length > 0) {
            helpCenterCollectionData.title = items[0].title || '';
            helpCenterCollectionData.subtitle = items[0].subtitle || '';
            helpCenterCollectionData.id = items[0].sys?.id || '';
            helpCenterCollectionData.marketingSectionId = items[0].marketingComponentsCollection?.items[0].sys?.id || '';
        }
    } catch (err) {
        console.error(err);
    }
    return helpCenterCollectionData;
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

const parseArticles = (data) => {
    let articlesData = [];
    try {
        const articleGroups = data.screenHelpCenter?.articleGroupsCollection?.items || [];
        articleGroups.forEach(articleGroup => {
            let articleData = {
                id: articleGroup.sys?.id, title: articleGroup.title, subtitle: articleGroup.subtitle, article: ''
            };
            const articlesCollection = articleGroup.articlesCollection?.items || [];
            if (articlesCollection.length > 0) {
                const article = articlesCollection[0];
                const articleContents = article.description?.json?.content || [];
                articleContents.forEach(content => {
                    if (content.nodeType === 'paragraph' && content.content && content.content.length > 0) {
                        articleData.article += '<p>' + content.content[0].value + '</p>';
                    }
                });
            }
            articlesData.push(articleData);
        });
    } catch (err) {
        console.error(err);
    }
    return articlesData;
}


export const gqlLoadFaq = async () => {
    let helpCenterSectionData = {
        title: '',
        subtitle: '',
        articles: [],
        heroImage: ''
    };

    let data = await doQuery(queryHelpCenterCollection());
    const helpCenterCollectionData = parseHelpCenterCollection(data);
    helpCenterSectionData.title = helpCenterCollectionData.title;
    helpCenterSectionData.subtitle = helpCenterCollectionData.subtitle;

    if (helpCenterCollectionData.marketingSectionId) {
        data = await doQuery(queryMarketingSection(helpCenterCollectionData.marketingSectionId));
        helpCenterSectionData.heroImage = parseMarketingSection(data);
    }

    if (helpCenterCollectionData.id) {
        data = await doQuery(queryFaqArticles(helpCenterCollectionData.id));
        helpCenterSectionData.articles = parseArticles(data);
    }

    return helpCenterSectionData;
}





