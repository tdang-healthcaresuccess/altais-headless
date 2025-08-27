import React from "react";
import Image from "next/image";
import {
  LayoutGrid,
  AlignJustify,
  Check,
  ChevronDown,
  Search,
  MapPin,
  ChevronRight,
} from "lucide-react";
import PinMarker from "@/public/icons/pin-marker.svg";
import SearchLaunchIcon from "@/public/icons/tabler_location-filled.svg";
import SearchIcon from "@/public/icons/icomoon-free_search.svg";
export default function SpecialtyDocSearchForm({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  activeLayout,
  setActiveLayout,
  showIcons,
}) {
  // Local state for input fields to match DocSearchForm behavior
  const [localSearch, setLocalSearch] = React.useState(searchQuery || "");
  const [localLocation, setLocalLocation] = React.useState(locationQuery || "");

  React.useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);
  React.useEffect(() => {
    setLocalLocation(locationQuery || "");
  }, [locationQuery]);

  return (
    <section className="block box-shadow-custom5 pt-7 md:pt-6">
      <div className="container mx-auto">
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
                className={`input-style2 ${showIcons ? '!pl-10' : ''} w-full md:w-[250px] lg:w-[400px]`}
                value={localLocation}
                onChange={e => setLocalLocation(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setSearchQuery(localSearch);
                    setLocationQuery(localLocation);
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
                className={`input-style2 ${showIcons ? '!pl-10' : ''} w-full md:w-[250px] lg:w-[400px]`}
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setSearchQuery(localSearch);
                    setLocationQuery(localLocation);
                  }
                }}
              />
            </div>
            <button
              type="button"
              className="btn-md flex-center font-semibold btn-outline-secondary gap-1 w-full sm:w-auto px-4 py-2 rounded"
              onClick={() => {
                setSearchQuery(localSearch);
                setLocationQuery(localLocation);
              }}
            >
              Search
                <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
