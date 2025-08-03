"use client";

import { useMediaQuery } from "react-responsive";
import RibbonBannerDesktop from "@/public/media/banner2.png";
import RibbonBannerMobile from "@/public/media/banner2-mobile.jpg"
import Image from "next/image";

export default function RibbonBanner() {
      const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="block h-[375px] sm:h-[300px] md:h-[200px] w-full relative">
      <div className="block w-full">
        <Image
          src={isMobile ? RibbonBannerMobile : RibbonBannerDesktop}
          alt="Ribbon banner"
          className="h-[375px] sm:h-[300px] md:h-[200px]"
        />
      </div>
      <div className="block absolute top-0 left-0 flex-center md:items-start flex-col w-[254px] md:w-full pl-6 md:pl-0 h-full">
        <h2 className="text-[28px] md:text-[32px] leading-[36px] text-white">
          Healthcare Built Around You
        </h2>
        <p className="text-[#84D0D2] text-xl md:text-[22px] mt-4 md:mt-2.5 mb-0">
          Explore Our Services and Specialties
        </p>
      </div>
    </div>
  );
}
