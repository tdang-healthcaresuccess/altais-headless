import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import TemplateCContent from "@/components/template-content/template-c-content";

export default function TemplateA() {
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <SinglePageBanner
          DesktopBanner="bg-single-landing-banner"
          MobileBanner="bg-single-landing-banner-mobile"
          heading="H1: Lorem Ipsum"
        />
      </div>

      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[{ label: "Home", link: "/" }, { label: "Template C" }]}
      />
      {/* Breadcrumb End */}

      {/* Template C Start */}
      <TemplateCContent />
      {/* Template C End */}
    </Layout>
  );
}
