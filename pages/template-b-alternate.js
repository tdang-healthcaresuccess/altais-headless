

import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";
import TemplateBAlternateContent from "@/components/template-content/template-b-alternate-content";

export default function TemplateBAlternate() {
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading="H1: Lorem ipsum dolor sit amet consectetur"
        />
      </div>

      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[{ label: "Home", link: "/" },{ label: "Services", link: "/#" }, { label: "Vaccinations" }]}
      />
      {/* Breadcrumb End */}

      {/* Template B Alternate Start */}
      <TemplateBAlternateContent />
      {/* Template B Alternate End */}
    </Layout>
  );
}
