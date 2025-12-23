import { gql } from "@apollo/client";

export const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    page(id: "about", idType: URI) {
      title
      heroBanner {
        enableHeroGradient
        fieldGroupName
        heroBannerImage {
          node {
            uri
            sourceUrl
          }
        }
        heroBannerImageMobile {
          node {
            sourceUrl
            uri
          }
        }
      }
      about {
        fieldGroupName
        section1Content
        section1Headline
        section2Content
        section2Image {
          node {
            sourceUrl
            uri
          }
        }
        section3Cards {
          cardTitle
          cardContent
          fieldGroupName
          iconImage {
            node {
              uri
              sourceUrl
            }
          }
        }
        section3Headline
        section4Image {
          node {
            uri
            sourceUrl
          }
        }
        section4LinkText
        section4LinkUrl {
          url
          title
          target
        }
        section4SubHeadline
        section4TitleBold
        section5ButtonText
        section5ButtonUrl {
          url
          title
          target
        }
        section5Content
        section5Headline
        section5Image {
          node {
            uri
            sourceUrl
          }
        }
        section6ButtonText
        section6ButtonUrl {
          url
          title
          target
        }
        section6Content
        section6Headline
        section6SubHeadline
        statBoxes {
          fieldGroupName
          statHeadlines
          stateValues
        }
        tickerBoxes {
          fieldGroupName
          tickerHeadline
          tickerNumber
        }
      }
    }
  }
`;
