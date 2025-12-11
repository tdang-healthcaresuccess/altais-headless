import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import ProvidersDetailsContent from "@/components/providers/providers-details-content";

/**
 * WARNING: This page may be LEGACY and UNUSED.
 * 
 * Active physician profiles now use: /pages/physicians/[slug].js
 * which renders /components/PhysicianProfileContent.js
 * 
 * This appears to be a static demo page with hardcoded breadcrumb.
 * Consider removing if confirmed unused.
 */
export default function ProviderDetails() {
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
            { label: "Find Care", link: "/find-care" },
            { label: "Brittany Camille, FNP-C" }, 
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
