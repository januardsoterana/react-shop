
/**
 * Load screenEventsCollection and its children's id
 * @returns {DocumentNode}
 */
const queryStylesCollection = () => (
    `{
      stylesCollection(where: {slug: "the-styles"}) {
        items {
          title
          description {
            json
          }
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
 * Load styles' ids
 * @param screenStylesId
 * @returns {DocumentNode}
 */
const queryStylesExceptGallery = (screenStylesId) => (
    `{
      styles(id: "${screenStylesId}") {
        stylesCollection {
          items {
            title
            subtitle
            featuredVideo {
              desktopUrl
            }
            slug
            featuredImage {
              desktopMedia {
                url
              }
            }
            featured360Gif {
              desktopMedia {
                url
              }
            }
            galleryCollection {
              items {
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
 * Load gallery
 * @param galleryId
 * @returns {DocumentNode}
 */
const queryGallery = (galleryId) => (
    `{
      styleGallery(id: "${galleryId}") {
        title
        imagesCollection {
          items {
            title
            desktopMedia {
              url
            }
          }
        }
      }
    }
    `
);

/**
 *
 * @param marketingSectionId
 * @returns {string}
 */
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
    queryStylesCollection,
    queryStylesExceptGallery,
    queryGallery,
    queryMarketingSection
};
