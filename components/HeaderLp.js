"use client";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";
import { ChevronRight } from "lucide-react";
import Head from "next/head";

export default function HeaderLp({ siteTitle, siteDescription, metaD, noIndex = false }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta property="og:title" content={siteTitle} key="title" />
        <meta name="description" content={siteDescription} />
        <meta property="og:description" content={siteDescription} />
        {metaD && (
          <>
            <meta property="og:image" content={metaD} />
            <meta name="twitter:image" content={metaD} />
          </>
        )}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Head>



      {/* Main Header */}
      <header className="block py-4 lg:py-0 relative md:min-h-[100px]">
        <div className="container mx-auto bg-white">
          <div className="w-full flex items-center justify-between md:min-h-[100px]">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src={BrandLogo}
                  alt="Altais"
                  width={180}
                  height={55}
                  priority
                />
              </Link>
            </div>
            
            {/* Find Care Button */}
            <div className="flex items-center">
              <Link
                href="/find-care"
                className="btn-gradient btn-action flex-center gap-1 whitespace-nowrap"
              >
                Find Care{" "}
                <ChevronRight className="w-[10px] h-[10px] md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}