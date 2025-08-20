"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ContactJourney({heading, subheading,description, linkUrl }) {
  return (
    <section className="block pt-12 bg-[#d9d9d926] md:pt-14 pb-[73px] md:pb-15 box-shadow-custom2">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-11">
          {/* Left Column */}
          <div className="flex justify-center md:justify-end">
            <h3 className="flex flex-col text-[22px] leading-[32px] font-light text-center md:text-left max-w-[250px] text-bluePrimary">
              <b className="font-medium">{heading}</b> {subheading}
            </h3>
          </div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[540px] pt-6 md:pt-0 md:pl-9 border-t md:border-t-0 md:border-l border-primary">
            <p className="text-grey3d text-lg leading-[32px] font-normal text-center md:text-left">
              {description}
            </p>
            <Link href={linkUrl || ""} className="btn-gradient btn-sm flex-center w-full md:w-[180px] gap-1 mt-8">
              Find Care{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
