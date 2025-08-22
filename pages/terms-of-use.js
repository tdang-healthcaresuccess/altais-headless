
import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

export default function websitePrivacy() {
  const termlyDivRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && termlyDivRef.current) {
      if (!document.getElementById("termly-jssdk")) {
        const script = document.createElement("script");
        script.id = "termly-jssdk";
        script.src = "https://app.termly.io/embed-policy.min.js";
        document.body.appendChild(script);
      }
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
           <div name="termly-embed" data-id="5dcc657a-5a07-46cf-b263-e98b94483f67" ref={termlyDivRef}></div>
         </div>
      </div>
    </Layout>
  );
}
