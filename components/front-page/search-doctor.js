"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SearchDoctor() {
  return (
    <section className="block pt-[50px] md:pt-14 pb-[73px] md:pb-15 px-6 md:px-0 shadow-custom2">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-10">
          <div className="block w-full md:w-[40%] max-w-[470px]">
            <p className="text-lg leading-[35px]">
              <b className="text-[#1D3F76] font-semibold">Everyone deserves care that's compassionate, </b>
              <br /> connected, and rooted in the communities they call home.
              Altais is the healthcare provider that makes this possible by
              supporting physicians and care teams—so you can get high-quality
              care, when and where you need it.
            </p>
          </div>
          {/* Vertical Separator */}
          <div className="hidden sm:block w-full md:w-[1px] h-[1px] md:h-[155px] bg-[#C75327] my-6 md:my-0 max-0 md:mx-10"></div>

          <div className="block flex-1">
            <h2 className="text-[26px] leading-[36px] text-[#083D78] pb-7">Search Doctors</h2>
            <div className="block w-full">
              <div className="flex flex-col md:flex-row gap-5 justify-between mb-5">
                <div className="block w-full">
                  <input type="text" placeholder="Doctor Name" className="input-style w-full" />
                </div>
                <div className="block">
                  <input type="text" placeholder="Zip Code" className="input-style w-full md:max-w-[134px] md:min-w-[134px]" />
                </div>
                <div className="relative block">
                  <select type="text" placeholder="Doctor Name" className="appearance-none bg-white input-style w-full md:max-w-[134px] md:min-w-[134px] cursor-pointer">
                    <option>Distance</option>
                    <option>2KM</option>
                    <option>5KM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-between">
                <div className="block flex-1">
                  <input type="text" placeholder="Practice Name" className="input-style w-full" />
                </div>
                <div className="relative block flex-1">
                  <select type="text" placeholder="Specialty" className="appearance-none bg-white input-style w-full cursor-pointer">
                    <option>Specialty</option>
                    <option>Specialty</option>
                    <option>Specialty</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <Link
              href="/find-doctor"
              className="flex-center text-primary"
            >
              Advanced Search
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
              <Link
              href="/#"
              className="btn-outline-secondary btn-sm flex-center !w-[135px] !px-2 rounded-[5px] !h-[50px] gap-1"
            >
              Search
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
