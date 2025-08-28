import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid,
  AlignJustify,
  Check,
  ChevronDown,
  Search,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GridIcon from "@/public/icons/grid-icon.svg";
import PinMarker from "@/public/icons/pin-marker.svg";
import SearchLaunchIcon from "@/public/icons/tabler_location-filled.svg";
import SearchIcon from "@/public/icons/icomoon-free_search.svg";
import SpecialityShortInfo from "../common/specialty-short-info";
import specialtyAcronymMap from "@/components/specialtyAcronymMap";

export default function DocSearchForm({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  activeLayout,
  setActiveLayout,
}) {
  const [showLayoutGrid, setShowLayoutGrid] = useState(false);
  const LayoutRef = useRef(null);
  // Local state for input fields
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [localLocation, setLocalLocation] = useState(locationQuery || "");

  // Keep local state in sync with props after SSR search
  useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);
  useEffect(() => {
    setLocalLocation(locationQuery || "");
  }, [locationQuery]);

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

  // Helper to resolve acronyms to specialty names
  function resolveAcronym(term) {
    if (!term) return term;
    const lower = term.trim().toLowerCase();
    return specialtyAcronymMap[lower] || term;
  }

  // Modified search handler for main input only
  function handleMainSearch() {
    // If the user typed an acronym, replace with mapped specialty
    const resolvedSearch = resolveAcronym(localSearch);
    setSearchQuery(resolvedSearch, localLocation);
  }

  return (
    <section className="block box-shadow-custom5 pt-7 md:pt-0">
      <div className="container mx-auto">
        <div className="hidden md:block pt-3 pb-6">
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
        <div className="flex flex-col md:flex-row pb-9 gap-6">
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
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleMainSearch();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-1 w-full relative gap-6">
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
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleMainSearch();
                    }
                  }}
                />
            </div>
            <button
              type="button"
              className="btn-md flex-center font-semibold btn-outline-secondary gap-1 w-full sm:w-auto px-4 py-2 rounded"
              onClick={handleMainSearch}
            >
              Search
              <ChevronRight />
            </button>
          </div>
          {/* Search Button */}
          {/* ...grid-options layout moved to LayoutOptions component... */}
        </div>
      </div>
    </section>
  );
}
