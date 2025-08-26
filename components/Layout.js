// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, siteTitle = 'Altais: Shaping the Future of Healthcare', siteDescription = '', metaD = null, noIndex = false }) => {
  // Inject Termly script globally for consent modal
  React.useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("termly-jssdk")) {
      const script = document.createElement("script");
      script.id = "termly-jssdk";
      script.type = "text/javascript";
      script.src = "https://app.termly.io/embed-policy.min.js";
      document.body.appendChild(script);
    }
  }, []);
  // SSR meta rendering
  const metaTitle = metaD?.titleTag || siteTitle || 'Altais: Shaping the Future of Healthcare';
  const metaDescription = metaD?.metaDescription || siteDescription || 'Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today.';
  const canonicalUrl = metaD?.canonicalUrl;
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="title" content={metaTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
        <link rel="stylesheet" href="https://use.typekit.net/uoi7ptf.css" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header siteTitle={siteTitle} siteDescription={siteDescription} metaD={metaD} noIndex={noIndex} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
