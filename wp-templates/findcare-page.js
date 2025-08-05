import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import EntryHeader from "../components/EntryHeader";
import Footer from "@/components/footer";
import Header from "@/components/header";
import DoctorSearchApp from "@/components/DoctorSearchApp";

// The Component is required
export default function Component(props) {
  return (
   <>
      <Head>
        <title>Find Care</title>
      </Head>
      <Header />
      <DoctorSearchApp />
      <Footer />
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