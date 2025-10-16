"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OurResources({ frontPageData }) {
  // Get the quickLinksWithImages data and limit to 3 items
  const quickLinksWithImages = frontPageData?.ourResourcesSection?.quickLinksWithImages?.slice(0, 3) || [];
  
  // Get the quickLinks data and limit to 3 items
  const quickLinks = frontPageData?.ourResourcesSection?.quickLinks?.slice(0, 3) || [];

  // Helper function to add <br> after the first word
  const formatTitle = (title) => {
    if (!title) return '';
    const words = title.split(' ');
    if (words.length <= 1) return title;
    
    return (
      <>
        {words[0]} <br className="hidden md:block" />
        {words.slice(1).join(' ')}
      </>
    );
  };

  return (
    <section className="block pt-12 md:pt-14 pb-[73px] md:pb-[75px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-7">
          {quickLinksWithImages.map((item, index) => (
            <div key={index} className="flex flex-1 mb-4 md:mb-12 gap-6">
              <div className="block">
                <Image
                  src={item?.quickLinkImage?.node?.sourceUrl || "/media/default-image.png"}
                  alt={item?.quickLinkSectionTitle || "Resource"}
                  width={130}
                  height={130}
                  className="rounded-normal border border-secondary w-[130px] min-w-[130px] h-[130px] object-cover"
                />
              </div>
              <div className="block w-full md:w-auto">
                <h3 className="text-[22px] leading-[36px] text-bluePrimary mb-3">
                  {item?.quickLinkSectionTitle}
                </h3>
                <ul>
                  {item?.quickLinkTitleA && (
                    <>
                      <li>
                        <Link
                          href={item?.quickLinkUrlA?.url || "#"}
                          target={item?.quickLinkUrlA?.target || "_self"}
                          className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                        >
                          <ChevronRight className="w-[20px] h-[20px]" /> 
                          {item?.quickLinkTitleA}
                        </Link>
                      </li>
                      {item?.quickLinkTitleB && (
                        <div className="w-full h-[1px] bg-lightPrimary my-3"></div>
                      )}
                    </>
                  )}
                  {item?.quickLinkTitleB && (
                    <li>
                      <Link
                        href={item?.quickLinkUrlB?.url || "#"}
                        target={item?.quickLinkUrlB?.target || "_self"}
                        className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                      >
                        <ChevronRight className="w-[20px] h-[20px]" /> 
                        {item?.quickLinkTitleB}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="w-full h-[1px] bg-lightPrimary mb-[35px]"></div>
        <div className="flex flex-wrap gap-12 md:gap-8">
          {quickLinks.map((item, index) => (
            <div key={index} className="flex flex-col justify-between w-full md:flex-1">
              <h3 className="mb-4 text-bluePrimary font-medium text-[22px] leading-[32px]">
                {formatTitle(item?.quickLinkSectionTitle)}
              </h3>
              <p className="mb-6 normal-content">
                {item?.quickLinkContent}
              </p>
              <Link
                href={item?.quickLinkButtonUrl?.url || "#"}
                target={item?.quickLinkButtonUrl?.target || "_self"}
                className="btn-outline-secondary btn-md font-semibold flex-center !w-[165px] !px-2 rounded-normal gap-1"
              >
                {item?.quickLinkButtonText || "Learn More"}{" "}
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
