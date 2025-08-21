// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, siteTitle = 'Altais: Shaping the Future of Healthcare', siteDescription = '', metaD = null, noIndex = false }) => {
  return (
    <>
  {/* Remove duplicate <Head> and <title> to prevent overwriting dynamic page titles */}
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
