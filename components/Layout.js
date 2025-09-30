import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, siteTitle = 'Altais: Shaping the Future of Healthcare', siteDescription = '', metaD = null, noIndex = false, schemaMarkup = '' }) => {
  // ...existing code...
  // SSR meta rendering
  const metaTitle = metaD?.titleTag || siteTitle || 'Altais: Shaping the Future of Healthcare';
  const metaDescription = metaD?.metaDescription || siteDescription || 'Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today.';
  // Rewrite canonicalUrl to use frontend domain if needed
  const frontendDomain = 'https://altais.com'; // Set your public site domain here
  let canonicalUrl = metaD?.canonicalUrl;
  if (canonicalUrl && canonicalUrl.includes('wpenginepowered.com')) {
    canonicalUrl = canonicalUrl.replace(/https?:\/\/[^/]+/, frontendDomain);
  }
  const noIndexFollow = metaD?.noIndexFollow || false;
  let robotsContent = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  if (noIndex) {
    robotsContent = "noindex, nofollow";
  } else if (noIndexFollow) {
    robotsContent = "noindex, follow";
  }
  return (
    <>
  <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="title" content={metaTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={robotsContent} />
        <link rel="stylesheet" href="https://use.typekit.net/uoi7ptf.css" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {/* Inject schemaMarkup as JSON-LD if provided */}
        {typeof schemaMarkup === 'string' && schemaMarkup.trim() && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaMarkup }} />
        )}
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
