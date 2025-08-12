
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import ProvidersDetailsContent from "@/components/providers/providers-details-content";
const PAGE_QUERY = gql`
  query GetDoctors {
     doctor {
    nodes {
      title
    }
  }
}
`;

export default function ProviderDetails(props) {
    const databaseId = props.__SEED_NODE__.databaseId;
    const asPreview = props.__SEED_NODE__.asPreview;
  
    const {
      data,
      loading = true,
      error,
    } = useQuery(PAGE_QUERY, {
      variables: {
        databaseId: databaseId,
        asPreview: asPreview,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    });
  
    const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
    const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};
  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content, contentTemplates, heroBanner } = data?.page || {};
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <SinglePageBanner
          DesktopBanner="bg-single-landing-banner"
          MobileBanner="bg-single-landing-banner-mobile"
          heading="Find a Doctor"
        />
        {/* Inner Page Banner End */}

        {/* Breadcrumb Start */}
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Find Doctor", link: "/find-doctor" },
            { label: title },
          ]}
        />
        {/* Breadcrumb End */}

        {/* Provider Details Portion Start */}
        <ProvidersDetailsContent />
        {/* Provider Details Portion End */}
      </div>
    </Layout>
  );
}
