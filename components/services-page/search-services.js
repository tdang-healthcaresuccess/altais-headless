import { ChevronDown, Search } from "lucide-react";
import SearchBanner from "@/public/media/services-search-banner.png";
import Image from "next/image";
import Link from "next/link";

export default function HowCanWeHelp() {
  return (
    <section className="block pt-[50px] md:pt-[75px] pb-[73px] md:pb-[95px] px-4 md:px-0 bg-greyF9 box-shadow-custom3">
      <div className="block container mx-auto">
        {/*
          Using a flex container to align the image and the content.
          The image takes up 3/4 of the width on medium screens and larger,
          and the content takes the remaining 1/4.
          On smaller screens, they will stack.
        */}
        <div className="flex flex-wrap bg-white md:flex-nowrap items-center border-none md:border border-primary rounded-normal"> 
          {/* Image section, taking 3/4 width on md and up.
              Using a standard `<img>` tag with a placeholder image.
          */}
          <div className="w-full md:w-3/5 lg:w-3/4 h-[350px] md:h-[400px]">
            <Image
              src={SearchBanner}
              alt="How can we help?"
              className="object-cover w-full h-full rounded-t-[5px] md:rounded-l-[5px] md:rounded-tr-none"
            />
          </div>

          {/* Content section, taking 1/4 width on md and up */}
          <div className="w-full h-full md:w-1/2 lg:w-1/4 pb-[60px] md:pb-8 p-8 flex flex-col justify-center">
            {/* Headline */}
            <h2 className="text-[26px] leading-[36px] text-bluePrimary font-light mb-9">
              <span className="font-medium">How</span>
              <br />
              Can we Help?
            </h2>

            {/* Dropdown for Services */}
            <div className="relative mb-[55px]">
              <select className="block w-full appearance-none bg-white border border-[#999795] rounded-normal py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-primary text-bluePrimary">
                <option>Services</option>
                {/* You can add more options here */}
                <option>Primary Care</option>
                <option>Mental Health</option>
                <option>Pediatrics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-bluePrimary">
                <ChevronDown className="w-5 h-5" color="#008889" />
              </div>
            </div>

            {/* Search Input Box with bottom border */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 border-b border-lightPrimary focus:outline-none focus:border-primary text-primary placeholder-primary"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-primary">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
