import { gql } from '@apollo/client';

const storeLocator = (slug) => gql`{
  storeCollection(where: {AND: [{slug: "${slug}"}]}) {
      items {
        title
        number
        bookerLocationId
        type
        information
        contact
        slug
        mapImage {
          url
        } 
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
  }`

export default storeLocator;
