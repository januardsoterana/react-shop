
/**
 * Load screenEventsCollection and its children's id
 * @returns {DocumentNode}
 */
const queryDryStylingCollection = () => (
    `{
      howToCollection(where: {slug: "dry-styling"}) {
        items {
          sys {
            id
          }
          title
          subtitle
          description {
            json
          }
          actionsCollection {
            items {
              title
              linkToUrl
            }
          }
          featuredImage {
            desktopMedia {
              url
            }
          }
          video {
            desktopUrl
          }
        }
      }
    }
    `
);

/**
 * Load events
 * @param howToId
 * @returns {DocumentNode}
 */
const queryImagesAndMarketingSectionIds = (howToId) => (
    `{
      howTo(id: "${howToId}") {
        imagesCollection {
          items {
            desktopMedia {
              url
            }
          }
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
                mobileMedia {
                  url
                }
              }
              actionsCollection {
                items {
                  title
                  linkToUrl
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
    queryDryStylingCollection,
    queryImagesAndMarketingSectionIds,
    queryMarketingSection
};
