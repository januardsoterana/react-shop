import { gql } from '@apollo/client';
import contentIds from '../contentIds';

const screenStylist = () => gql`{
    screenStylist(id: "${contentIds.meetOurStylist}") {
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

export default screenStylist;
