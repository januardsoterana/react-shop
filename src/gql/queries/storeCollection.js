import { gql } from '@apollo/client';

const storeCollectionContainer = () => gql`
  query storeCollection {
    storeCollection {
      items {
        title
        number
        bookerLocationId
        type
        information
        contact
        slug
        settings
        arrivalInformation
        storefrontImage {
          internalName
          title
          alternateTitle
          caption
          desktopMedia {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
          mobileMedia {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
        }
      }
    }
  }`;

export default storeCollectionContainer;
