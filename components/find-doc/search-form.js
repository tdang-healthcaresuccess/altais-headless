import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, AlignJustify, Check, ChevronDown, Search, MapPin, ChevronRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import GridIcon from "@/public/icons/grid-icon.svg";
import PinMarker from "@/public/icons/pin-marker.svg";
import SearchLaunchIcon from "@/public/icons/tabler_location-filled.svg";
import SearchIcon from "@/public/icons/icomoon-free_search.svg";
import SpecialityShortInfo from "../common/specialty-short-info";

export default function DocSearchForm({ searchQuery, setSearchQuery, locationQuery, setLocationQuery, activeLayout, setActiveLayout }) {
  const [showLayoutGrid, setShowLayoutGrid] = useState(false);
  const LayoutRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (LayoutRef.current && !LayoutRef.current.contains(event.target)) {
        setShowLayoutGrid(false);
      }
    }
    if (showLayoutGrid) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLayoutGrid]);

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
          <div className="flex flex-col md:flex-row pb-9 gap-6 px-6 md:px-0">

            <div className="block relative">
              <div className="relative">
                <Image
                src={PinMarker}
                alt="Pin Marker"
                className="absolute left-3 top-4"
              />
                <input
                  type="text"
                  placeholder="City, State or Zip Code"
                  className=" input-style2 !pl-10 w-full md:w-[250px] lg:w-[400px]"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
               
              </div>
            </div>
                        <div className="block flex-1 w-full relative">
              <div className="relative">
                <Image
                src={SearchIcon}
                alt="Search"
                className="absolute left-3 top-4"
              />
                <input
                  type="text"
                  placeholder="Doctor, hospital, conditions, or specialty..."
                  className=" input-style2 !pl-10 w-full md:w-[250px] lg:w-[400px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
              </div>
            </div>
            <div className="block grid-options">
              <div className="relative" ref={LayoutRef}>
                <button
                  type="button"
                  className="btn-md flex-center btn-normal-icon gap-3 w-full sm:w-auto"
                  onClick={() => setShowLayoutGrid(!showLayoutGrid)}
                >
                  <span className="flex-1 text-center font-normal">
                   
                  </span>
                  {activeLayout === "grid" ? (
                    <LayoutGrid color="#C85103" size={28} fill="#C85103"  />
                  ) : (
                    <AlignJustify color="#C85103" size={28}  strokeWidth={3}  />
                  )}
                  
                </button>
                {showLayoutGrid && (
                  <div className="block w-[122px] box-shadow-dark top-[100%] mt-3 right-0 absolute z-50 bg-white rounded-normal">
                    <h4 className="text-lg text-secondary font-medium px-2 py-1.5 border-b border-inputBorder">
                      Layout
                    </h4>
                    <ul className="block">
                      <li
                        className={`flex items-center text-[#083d7880] justify-between cursor-pointer p-2 gap-2 text-base font-normal rounded-lg ${
                          activeLayout === "grid" ? "bg-greyF5" : ""
                        }`}
                        onClick={() => {
                          setActiveLayout("grid");
                          setShowLayoutGrid(false);
                        }}
                      >
                        <Check
                          size={22}
                          color={activeLayout === "grid" ? "#083d78" : "transparent"}
                          className="mr-3"
                        />
                        Grid
                        <LayoutGrid color="#083d7880" size={26} />
                      </li>
                      <li
                        className={`flex items-center text-[#083d7880] justify-between cursor-pointer p-2 gap-2 text-base font-normal rounded-lg ${
                          activeLayout === "list" ? "bg-greyF5" : ""
                        }`}
                        onClick={() => {
                          setActiveLayout("list");
                          setShowLayoutGrid(false);
                        }}
                      >
                        <Check
                          size={22}
                          color={activeLayout === "list" ? "#999795" : "transparent"}
                          className="mr-3"
                        />
                        List
                        <AlignJustify color="#083d7880" size={26} />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
