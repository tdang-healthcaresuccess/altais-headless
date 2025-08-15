
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    specialty(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

export default function SpecialtyDetails(props) {

  return (
    <Layout>
      
    </Layout>
  );
}
