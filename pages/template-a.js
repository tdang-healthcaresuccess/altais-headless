import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";
import TemplateAContent from "@/components/template-content/template-a-content";

export default function TemplateA() {
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

      {/* Template A Start */}
      <TemplateAContent />
      {/* Template A End */}
    </Layout>
  );
}
