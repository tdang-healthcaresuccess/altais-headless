"use client";

import { ChevronRight } from "lucide-react";

export default function ContactJourney() {
  return (
    <section className="block pt-[50px] md:pt-14 pb-[73px] md:pb-15 px-4 md:px-0 shadow-[inset_0px_2px_4px_0px_#3D3D3D]">
      <div className="container mx-auto">
        <div className="block md:flex justify-center items-start">
          {/* Left Column */}
          <div className="flex justify-center md:justify-end">
            <h3 className="flex flex-col font-light text-center md:text-left max-w-[250px] text-[#083D78]">
              <b>Let’s Redefine</b> What Care Feels Like
            </h3>
          </div>

          {/* Vertical Separator */}
          <div className="w-full md:w-[1px] h-[1px] md:h-[155px] bg-[#008889] my-6 md:my-0 max-0 md:mx-10"></div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[540px]">
            <p className="text-[#3D3D3D] text-lg font-normal text-center md:text-left">
              Wherever you are in your health journey, Altais connects you to
              the care you deserve — delivered by doctors who listen to provide
              personalized care.
            </p>
            <button className="btn-gradient btn-sm flex-center gap-1 mt-8">
              Find Care{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
