// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, title = 'Altais' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
