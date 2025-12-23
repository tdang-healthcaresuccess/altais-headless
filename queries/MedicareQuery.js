import { gql } from '@apollo/client';

export const GET_MEDICARE_PAGE = gql`
  query GetMedicarePage {
    medicareLandingPage {
      medicare {
        fieldGroupName
        heroHeadline
        heroImage {
          node {
            sourceUrl
            uri
            altText
          }
        }
        heroImageMobile {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section1Bullets {
          bulletText
          fieldGroupName
        }
        section1Headline
        section1StepHeadline
        section2Content
        section2Headline
        section2Image {
          node {
            uri
            sourceUrl
            altText
          }
        }
        section2ImageContentLeft
        section2ImageContentRight
        section2SubHeadline
        section3Content
        section3Headline
        section3Image {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section4ButonText
        section4ButtonUrl {
          url
          title
          target
        }
        section4Content
        section4Headline
        section4Image {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section4ImageMobile {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section5Button1Text
        section5Button1Url {
          target
          title
          url
        }
        section5Button2Text
        section5Button2Url {
          url
          title
          target
        }
        section5Content
        section5Headline
        section5Image {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section6ButtonText
        section6ButtonUrl {
          target
          title
          url
        }
        section6Content
        section6Headline
        section6Image {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section7Content
        section7Headline
        section7Image {
          node {
            sourceUrl
            uri
            altText
          }
        }
        section8
        section8Content
        section9Content
        section9Headline
        stepBoxes {
          fieldGroupName
          stepBoxText
          stepBoxUrl {
            url
            title
            target
          }
        }
      }
    }
  }
`;
