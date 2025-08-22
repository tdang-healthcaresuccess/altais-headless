import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import ProvidersDetailsContent from "@/components/providers/providers-details-content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dummyDoctors } from "@/components/DummyData";
const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    doctors(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content

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

  // Provider lookup logic
  const router = useRouter();
  const [providerName, setProviderName] = useState("");
  useEffect(() => {
    if (router.isReady) {
      const { asPath } = router;
      const segments = asPath.split('/').filter(Boolean);
      const profileUrlSegment = segments[segments.length - 1];
      const foundProvider = dummyDoctors.find(
        (doc) => doc.node.doctorData.profileurl === `/${profileUrlSegment}`
      );
      setProviderName(foundProvider ? foundProvider.node.doctorData.doctorsName : "");
    }
  }, [router.isReady, router.asPath]);

  const { title, content, contentTemplates, heroBanner } = data?.page || {};
  return (
    <Layout
      metaD={{
        titleTag: providerName ? `${providerName} | Altais` : "Altais: Shaping the Future of Healthcare",
        metaDescription: providerName
          ? `Learn more about Dr. ${providerName} and their compassionate, affordable, and connected care at Altais.`
          : "Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today."
      }}
    >
      <div className="block">
        {/* Inner Page Banner start */}
        <SinglePageBanner
          DesktopBanner="bg-single-landing-banner"
          MobileBanner="bg-single-landing-banner-mobile"
          heading={providerName}
        />
        {/* Inner Page Banner End */}

        {/* Breadcrumb Start */}
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Find Care", link: "/find-care/" },
            { label: providerName, link: `/physicians/${providerName}` },
          ]}
        />
        {/* Breadcrumb End */}

        {/* Provider Details Content */}
        <ProvidersDetailsContent providerName={providerName} />
      </div>
    </Layout>
  );
}
