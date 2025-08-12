import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

export default function ForPartners() {
  
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading="Healthcare Partnerships that Drive Better Outcomes"
        />
        {/* Inner Page Banner End */}

      </div>
    </Layout>
  );
}
