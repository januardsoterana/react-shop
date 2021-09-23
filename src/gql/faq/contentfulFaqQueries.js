
/**
 * Load screenEventsCollection and its children's id
 * @returns {DocumentNode}
 */
const queryHelpCenterCollection = () => (
    `{
      screenHelpCenterCollection(where: {slug: "help-center"}) {
        items {
          title
          subtitle
          sys {
            id
          }
          marketingComponentsCollection {
            items {
              ... on MarketingSection {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    }
    `
);

/**
 * Load events
 * @param screenHelpCenterId
 * @returns {DocumentNode}
 */
const queryFaqArticles = (screenHelpCenterId) => (
    `{
      screenHelpCenter(id: "${screenHelpCenterId}") {
        articleGroupsCollection {
          items {
            sys {
              id
            }
            title
            subtitle
            articlesCollection {
              items {
                title
                description {
                  json
                }
              }
            }
          }
        }
      }
    }
    `
);

const queryMarketingSection = (marketingSectionId) => (
    `{
      marketingSection(id:"${marketingSectionId}") {
        marketingComponentsCollection {
          items {
            ... on MarketingCard {
              image {
                desktopMedia {
                  url
                }
              }
            }
          }
        }
      }
    }
    `
);

export {
    queryHelpCenterCollection,
    queryFaqArticles,
    queryMarketingSection
};
