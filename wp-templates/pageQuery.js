// queries/pageQuery.js
import { gql } from "@apollo/client";

export const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      contentTemplates {
        templateSelection
        templateA {
          ... on ContentTemplatesTemplateASection1aLayout {
            fieldGroupName
            section1aContent
            section1aImg {
              node {
                sourceUrl
                uri
              }
            }
          }
          ... on ContentTemplatesTemplateASection2aLayout {
            content2a
            headline2a
            sectionBackgroundColor
            fieldGroupName
          }
          ... on ContentTemplatesTemplateASection3aLayout {
            fieldGroupName
            section3aCards {
              cardContent
              cardHeadline
              cardOptions
              fieldGroupName
              cardImage {
                node {
                  uri
                }
              }
            }
          }
          ... on ContentTemplatesTemplateASection4aLayout {
            ctaButtonText
            ctaButtonTextCopy
            enableCta
            fieldGroupName
            section4aAdditionalHeadline
            section4aDescription
            section4aAdditionalHeadlineOption
            section4aHeadline
            section4aAdditionalDescription
            section4aImage {
              node {
                uri
              }
            }
          }
          ... on ContentTemplatesTemplateASection5aLayout {
            fieldGroupName
            section5aContent
          }
          ... on ContentTemplatesTemplateASection6aLayout {
            fieldGroupName
            section6aTestimonials {
              reviewerName
              reviewerDescription
            }
          }
        }
      }
    }
  }
`;
