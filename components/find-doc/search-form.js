import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GridIcon from "@/public/icons/grid-icon.svg";
import PinMarker from "@/public/icons/pin-marker.svg"
import SearchLaunchIcon from "@/public/icons/tabler_location-filled.svg"
import SearchIcon from "@/public/icons/icomoon-free_search.svg"

export default function DocSearchForm() {
  return (
    <div className="block">
      <section className="block box-shadow-custom5">
        <div className="container mx-auto">
          <div className="hidden md:block pt-3 pb-6 px-6 md:px-0">
            <ul className="flex gap-1">
              <li className="flex items-center gap-1">
                <Link
                  href="/"
                  className="text-bluePrimary text-xs leading-[19px]"
                >
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-bluePrimary md:w-[18px] md:h-[18px]" />
              </li>
              <li className="text-xs leading-[19px] font-medium text-primary">
                Find a Doctor
              </li>
            </ul>
          </div>
          <div className="block md:hidden px-6 py-8">
            <div className=" w-full h-[1px] bg-secondary"></div>
          </div>
          
          <div className="flex flex-col md:flex-row pb-9 gap-6 px-6 md:px-0">
            <div className="block relative">
              <Image src={PinMarker} alt="Pin Marker" className="absolute left-2 top-4" />
              <input type="text" placeholder="City or Zip" className="input-style2 !pl-9 w-full md:w-[400px]" />
              <button type="button">
                <Image src={SearchLaunchIcon} alt="Launch" className="absolute right-2 top-4" />
              </button>
            </div>
            <div className="block relative">
              <Image src={SearchIcon} alt="Search" className="absolute left-2 top-4" />
              <input type="text" placeholder="Doctor's Name, Insurance, Specialty, etc." className="input-style2 !pl-9 w-full md:w-[400px]" />
            </div>
            <div className="flex justify-end">
              <button type="button" className="btn-md max-w-[175px] btn-outline-secondary rounded-[5px] flex-center gap-1">
                Search{" "}
                <ChevronRight className="w-[20px] h-[20px] text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex pt-[44px] px-6 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between pb-9 border-b border-primary">
            <div className="block w-full md:w-[calc(25%-35px)] pb-6 md:pb-0">
              <p className="text-[14px] text-bluePrimary leading-[19px] font-light pb-2">
                1 - 20 of 5117 results
              </p>
              <p className="text-[14px] text-bluePrimary leading-[19px] font-medium">
                Clear All Filters
              </p>
            </div>
            <div className="flex justify-between items-end w-full md:w-[calc(75%-35px)]">
              <div className="flex w-full md:w-auto gap-6">
                <button type="button" className="flex-1 whitespace-nowrap btn-normal">
                  Find Primary Care
                </button>
                <button type="button" className="flex-1 btn-normal">
                  Find Urgent Care
                </button>
              </div>
              <div className="hidden md:block">
                <button type="button" className="btn">
                  <Image src={GridIcon} alt="category" width={26} height={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
