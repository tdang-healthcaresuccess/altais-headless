import { gql } from "@apollo/client";

export const HEADER_MENU_QUERY = gql`
  query GetHeaderMenu {
    primaryMenuItems: menuItems(where: { location: PRIMARY ,parentDatabaseId: 0 }) {
         nodes {
      id
      uri
      path
      label
      parentId
      cssClasses
      childItems {
        nodes {
          id
          url
          uri
          path
          parentId
          label
          cssClasses
          childItems {
            nodes {
              id
              url
              uri
              path
              parentId
              label
              cssClasses
              childItems {
                nodes {
                  id
                  url
                  uri
                  path
                  parentId
                  label
                  cssClasses
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
