import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

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
    </Layout>
  );
}
