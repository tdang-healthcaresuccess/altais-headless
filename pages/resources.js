import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

export default function Resources() {
  
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading="Resources"
        />
        {/* Inner Page Banner End */}

      </div>
    </Layout>
  );
}
