import { gql } from '@apollo/client';
import contentIds from '../contentIds';

const screenButterCup = () => gql`{
    screenStylist(id: "${contentIds.butterCup}") {
        title
        featuredHeading
        stylistsHeading
        stylistsCollection {
          items {
            name
            biography{
              json
            }
            image{
              desktopMedia {
                url
              }
              title
            }
            instagramHandle
          }
        }
        marketingComponentsCollection(limit: 1) {
          items {
            ... on MarketingSection {
              internalName
              marketingComponentsCollection(limit: 1) {
                items {
                  ... on MarketingCard {
                    title
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
`;

export default screenButterCup;
