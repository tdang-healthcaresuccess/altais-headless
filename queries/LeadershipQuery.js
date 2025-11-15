import { gql } from "@apollo/client";

export const LEADERSHIP_QUERY = gql`
  query GetLeadership {
    leadership(where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            uri
            sourceUrl
          }
        }
        leadership {
          quote
          title
          fieldGroupName
        }
      }
    }
    leadershipSettings {
      leadershipOptions {
        executiveIntro
        fieldGroupName
        leadershipFeatureImage {
          node {
            uri
            sourceUrl
          }
        }
        leadershipIntro
        leadershipIntroImage {
          node {
            uri
            sourceUrl
          }
        }
      }
    }
  }
`;
