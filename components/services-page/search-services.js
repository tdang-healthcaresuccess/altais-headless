import { ChevronDown, Search } from "lucide-react";
import SearchBanner from "@/public/media/services-search-banner.png";
import Image from "next/image";
import Link from "next/link";

export default function HowCanWeHelp() {
  return (
    <section className="block pt-[50px] md:pt-[75px] pb-[73px] md:pb-[95px] px-4 md:px-0 bg-[#f9f9f9] shadow-[inset_0px_2px_3px_0px_#3D3D3D]">
      <div className="block container mx-auto">
        {/*
          Using a flex container to align the image and the content.
          The image takes up 3/4 of the width on medium screens and larger,
          and the content takes the remaining 1/4.
          On smaller screens, they will stack.
        */}
        <div className="flex flex-wrap md:flex-nowrap items-center border border-[#008889] bg-[#ffffff] rounded-[5px] ">
          {/* Image section, taking 3/4 width on md and up.
              Using a standard `<img>` tag with a placeholder image.
          */}
          <div className="w-full md:w-3/4 h-[300px] md:h-[400px]">
            <Image
              src={SearchBanner}
              alt="How can we help?"
              className="object-cover w-full h-full rounded-t-[5px] md:rounded-l-[5px] md:rounded-tr-none"
            />
          </div>

          {/* Content section, taking 1/4 width on md and up */}
          <div className="w-full md:w-1/4 p-8 flex flex-col justify-center bg-[#ffffff]">
            {/* Headline */}
            <h2 className="text-[22px] leading-[32px] text-[#083D78] mb-4">
              <span className="font-bold">How</span>
              <br />
              Can we Help?
            </h2>

            {/* Dropdown for Services */}
            <div className="relative mb-4">
              <select className="block w-full appearance-none bg-white border border-[#008889] rounded-[5px] py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-[#008889] text-[#3D3D3D]">
                <option>Services</option>
                {/* You can add more options here */}
                <option>Primary Care</option>
                <option>Mental Health</option>
                <option>Pediatrics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#083D78]">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            {/* Search Input Box with bottom border */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 border-b border-[#008889] focus:outline-none focus:border-[#008889] text-[#008889] placeholder-[#008889]"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#008889]">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
