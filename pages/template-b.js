

import Breadcrumb from "@/components/common/breadcrumb";
import Layout from "@/components/Layout";
import TemplateBContent from "@/components/template-content/template-b-content";

export default function TemplateB() {
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
        items={[{ label: "Home", link: "/" }, { label: "Template A" }]}
      />
      {/* Breadcrumb End */}

      {/* Template B Start */}
      <TemplateBContent />
      {/* Template B End */}
    </Layout>
  );
}
