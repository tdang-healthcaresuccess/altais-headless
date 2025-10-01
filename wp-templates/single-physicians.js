import { gql } from "@apollo/client";
import { useFaustQuery } from "@faustwp/core";
import { GET_PHYSICIAN_BY_SLUG } from "../queries/PhysicianQueries";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import ProvidersDetailsContent from "@/components/providers/providers-details-content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// This template is now primarily for WordPress custom post type "physicians"
// Individual physician profiles from the plugin should use /pages/physicians/[slug].js
const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

export default function ProviderDetails(props) {
  const databaseId = props.__SEED_NODE__.databaseId;
  const asPreview = props.__SEED_NODE__.asPreview;

  const { data, loading, error } = useFaustQuery(PAGE_QUERY, {
    variables: {
      databaseId: databaseId,
      asPreview: asPreview,
    },
  });

  const { data: siteData } = useFaustQuery(SITE_DATA_QUERY);
  const { data: menuData } = useFaustQuery(HEADER_MENU_QUERY);

  const site = siteData?.generalSettings || {};
  const menuItems = menuData?.primaryMenuItems?.nodes || [];
  const { title: siteTitle, description: siteDescription } = site;

  // Router for redirects if needed
  const router = useRouter();
  const [providerName, setProviderName] = useState("");

  // Handle redirects from old URLs to new slug-based URLs
  useEffect(() => {
    if (router.isReady) {
      const { asPath } = router;
      const segments = asPath.split('/').filter(Boolean);
      const profileUrlSegment = segments[segments.length - 1];
      
      // Try to find physician by old profileurl format and redirect to new format
      // You may need to implement a lookup service for old URLs -> new slugs
      console.log('Legacy physician URL accessed:', profileUrlSegment);
      
      // For now, redirect to find-care page
      // In production, you'd want to implement a mapping from old URLs to new slugs
      if (profileUrlSegment && !profileUrlSegment.includes('preview')) {
        router.push('/find-care/');
      }
    }
  }, [router.isReady, router.asPath]);

  const { title, content } = data?.page || {};
  
  return (
    <Layout
      metaD={{
        titleTag: title ? `${title} | Altais` : "Physician Profile | Altais",
        metaDescription: "Find detailed information about our healthcare providers at Altais."
      }}
    >
      <div className="block">
        {/* Inner Page Banner start */}
        <SinglePageBanner
          DesktopBanner="bg-single-landing-banner"
          MobileBanner="bg-single-landing-banner-mobile"
          heading={title || "Physician Profile"}
        />
        {/* Inner Page Banner End */}

        {/* Breadcrumb Start */}
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Find Care", link: "/find-care/" },
            { label: title || "Physician", link: "#" },
          ]}
        />
        {/* Breadcrumb End */}

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8">
                Individual physician profiles have moved to a new format.
              </h2>
              <p className="text-gray-600 mb-8">
                Please use our physician search to find specific doctors by name, specialty, or location.
              </p>
              <a 
                href="/find-care/" 
                className="btn-primary inline-block"
              >
                Find a Doctor
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
