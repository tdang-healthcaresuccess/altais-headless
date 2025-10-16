"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServicesMedia1 from "@/public/media/services-1.png";
import ServicesMedia2 from "@/public/media/services-2.png";
import ServicesMedia3 from "@/public/media/services-3.png";
import ServicesMedia4 from "@/public/media/services-4.png";
import ServicesMedia5 from "@/public/media/services-5.png";
import ServicesMedia6 from "@/public/media/services-6.png";
import ServicesMedia7 from "@/public/media/services-7.png";
import ServicesMedia8 from "@/public/media/services-8.jpg";
import ServicesMedia9 from "@/public/media/services-9.jpg";
import ServicesMedia10 from "@/public/media/services-10.jpg";
import ServicesMedia11 from "@/public/media/services-11.jpg";
import ServicesMedia12 from "@/public/media/services-12.jpg";
import ServicesMedia13 from "@/public/media/services-13.jpg";
import ServicesMedia14 from "@/public/media/services-14.jpg";


export default function OurServices({ hideViewAll = true, frontPageData }) {
  return (
    <section className="block pt-12 md:pt-[75px] pb-[73px] md:pb-[95px] box-shadow-custom3">
      <div className="block container mx-auto">
        <div className="flex flex-wrap gap-10 items-stretch">
          {frontPageData?.ourServices?.services?.map((service, index) => (
            <div key={index} className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
              <div className="block border border-primary rounded-normal mb-4 md:mb-6">
                <Image
                  src={service.serviceImage?.node?.sourceUrl || ServicesMedia1}
                  alt={service.serviceImage?.altText || service.serviceHeadlineText || "Service"}
                  className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
                  width={500}
                  height={170}
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="block">
                  <h3
                    className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                    id={service.serviceHeadlineText?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `service-${index}`}
                  >
                    {service.serviceHeadlineText}
                  </h3>
                  <p className="text-lg leading-[32px] text-grey3d mb-7">
                    {service.serviceContent}
                  </p>
                </div>
                <Link
                  href={service.serviceUrl?.url || "#"}
                  className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
                >
                  {service.serviceUrl?.title || "Learn More"}
                  <ChevronRight className="w-[20px] h-[20px]" />
                </Link>
              </div>
            </div>
          )) || []}
        </div>
        {hideViewAll && (
          <div className="flex-center">
            <Link
              href={frontPageData?.ourServices?.servicesButtonUrl?.url || "/services"}
              className="btn-gradient btn-md flex-center gap-1 mt-0 md:mt-8 w-full md:w-[534px]"
            >
              {frontPageData?.ourServices?.servicesButtonText || "See All Services"}{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}