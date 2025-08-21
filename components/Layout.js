// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, siteTitle = 'Altais', siteDescription = '', metaD = null, noIndex = false }) => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* Header with meta tags */}
        <Header siteTitle={siteTitle} siteDescription={siteDescription} metaD={metaD} noIndex={noIndex} />

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
