import { gql } from "@apollo/client";

// The Component is required
export default function Component(props) {
  return (
    <>
    <div>Help</div>
    </>
  );
}

Component.query = gql`
  query GetPageDataByURI($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      content
      slug
    }
  }
`;

Component.variables = (seedQuery, context) => {
  return {
    uri: seedQuery?.uri,
  };
};


Component.variables = (seedQuery, context) => {
  return {
    uri: seedQuery?.uri,
  };
};