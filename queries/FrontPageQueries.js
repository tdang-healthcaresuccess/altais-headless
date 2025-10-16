import { gql } from "@apollo/client";

export const GET_FRONT_PAGE_CONTENT = gql`
  query GetFrontPageContent {
    contentNode(id: "/", idType: URI) {
      ... on Page {
        homePageContent {
          fieldGroupName
          leftSnippetContent
        }
        ribbonBanner {
          ribbonBannerContent
          ribbonBannerHeadline
        }
        homePage {
          heroBannerHeadline
          heroBannerButtonLabel
          heroButtonLink
          enableHeroButton
          heroBanner {
            node {
              sourceUrl
              uri
            }
          }
        }
        ourResourcesSection {
          quickLinks {
            quickLinkButtonText
            quickLinkButtonUrl {
              target
              title
              url
            }
            quickLinkContent
            quickLinkSectionTitle
          }
          quickLinksWithImages {
            quickLinkImage {
              node {
                sourceUrl(size: MEDIUM)
                uri
              }
            }
            quickLinkSectionTitle
              quickLinkTitleA
              quickLinkTitleB
              quickLinkUrlA {
                url
                target
              }
              quickLinkUrlB {
                url
                target
              }
          }
        }
        ourServices {
          services {
            serviceContent
            serviceHeadlineText
            serviceImage {
              node {
                sourceUrl(size: LARGE)
                uri
              }
            }
            serviceUrl {
              target
              title
              url
            }
          }
          servicesButtonText
          servicesButtonUrl {
            target
            title
            url
          }
        }
        ticker {
          counter {
            counterValue
            fieldGroupName
            label
          }
        }
      }
    }
  }
`;