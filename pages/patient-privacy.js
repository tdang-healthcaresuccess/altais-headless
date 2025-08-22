
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

export default function patientPrivacy() {
  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      (function(d, s, id) {
        var js, tjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://app.termly.io/embed-policy.min.js";
        tjs.parentNode.insertBefore(js, tjs);
      }(document, 'script', 'termly-jssdk'));
    }
  }, []);

  return (
    <Layout>
      <div className="block">
         <InnerPageBanner
                  DesktopBanner="bg-landing-common-banner"
                  MobileBanner="bg-landing-common-banner-mobile"
                  heading="News"
                />
                <Breadcrumb
                  items={[{ label: "Home", link: "/" }, { label: "Website Privacy" }]}
                />
         <div className="container mx-auto">
        <div name="termly-embed" data-id="aa828519-f77d-434e-856b-798a8373d995"></div>
        </div>
      </div>
    </Layout>
  );
}
