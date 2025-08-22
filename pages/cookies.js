
import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

export default function cookies() {
  const termlyDivRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && termlyDivRef.current) {
      // Inject script only after div is present
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
                  heading="Cookies"
                />
                <Breadcrumb
                  items={[{ label: "Home", link: "/" }, { label: "Cookies" }]}
                />
         <div className="container mx-auto">
           <div name="termly-embed" data-id="3df920b2-6eb2-4641-92ed-55ca8ba8624b" ref={termlyDivRef}></div>
         </div>
      </div>
    </Layout>
  );
}
