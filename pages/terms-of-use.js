
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

export default function websitePrivacy() {
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
                  heading="Terms of Use"
                />
                <Breadcrumb
                  items={[{ label: "Home", link: "/" }, { label: "Terms of Use" }]}
                />
         <div className="container mx-auto">
  <div name="termly-embed" data-id="5dcc657a-5a07-46cf-b263-e98b94483f67"></div>
        </div>
      </div>
    </Layout>
  );
}
