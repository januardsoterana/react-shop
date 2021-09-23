
/**
 * Load screenEventsCollection and its children's id
 * @returns {DocumentNode}
 */
const queryFranchisingCollection = () => (
    `{
      screenFranchiseCollection(where: {slug: "franchise"}) {
        items {
          title
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
 * @param screenEventId
 * @returns {DocumentNode}
 */
const queryEvents = (screenEventId) => (
    `{
      screenEvents(id: "${screenEventId}") {
        eventsCollection {
          items {
            title
            subtitle
            description {
              json
            }
            image {
              desktopMedia {
                url
              }
            }
            actionsCollection {
              items {
                linkToUrl
                title
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
    queryFranchisingCollection,
    queryEvents,
    queryMarketingSection
};
