import { gql } from '@apollo/client';
import contentIds from '../contentIds';

const screenStoreLocatorCollection = () => gql`{
    screenStoreLocator(id: "${contentIds.storeLocator}") {
        title
        slug
        description {
          json
        }
        marketingComponentsCollection(limit: 2) {
          total
          limit
          items {
            ... on MarketingSection {
              title
              internalName
              marketingComponentsCollection(limit: 2) {
                total
                items {
                  __typename
                  ... on MarketingCollection {
                    title
                    internalName
                    marketingComponentsCollection(limit: 2) {
                      items {
                        __typename
                        ... on MarketingCard {
                          title
                          subtitle
                          internalName
                          avatar {
                            url
                          }
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
              }
            }
          }
        }
      }    
  }
`;

export default screenStoreLocatorCollection;
