import React, { useState, useEffect, useRef } from "react";
import GOOGLE_API_KEY from "../common/LocationConfig";
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
  onLocationUpdate = () => {}, // For user's actual location (geolocation)
  onSearchLocationUpdate = () => {} // New prop for search location coordinates
}) {
  const [showLayoutGrid, setShowLayoutGrid] = useState(false);
  const LayoutRef = useRef(null);
  // Local state for input fields
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [localLocation, setLocalLocation] = useState(locationQuery || "");
  const [userLocation, setUserLocation] = useState(null); // {lat, lng}
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [hasManualLocation, setHasManualLocation] = useState(false); // Track if user manually entered location
  const [autoLocationFilled, setAutoLocationFilled] = useState(false); // Track if auto-location was already filled
  const [lastGeolocationRequest, setLastGeolocationRequest] = useState(0); // Track last geolocation request time
  const [isSearchInProgress, setIsSearchInProgress] = useState(false); // Prevent concurrent searches
  const [isUsingSearchLocation, setIsUsingSearchLocation] = useState(false); // Track if we're using a geocoded search location

  // Keep local state in sync with props after SSR search
  useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);
  useEffect(() => {
    setLocalLocation(locationQuery || "");
  }, [locationQuery]);


  // Request user's location on component mount and update parent
  useEffect(() => {
    // Don't auto-request location if user has manually entered a location or is using a location search
    if (hasManualLocation || locationQuery || isUsingSearchLocation) {
      console.log("Skipping auto-geolocation due to manual/search location:", { hasManualLocation, locationQuery, isUsingSearchLocation });
      return;
    }
    
    if (typeof window !== 'undefined' && navigator.geolocation && !locationPermissionDenied && !userLocation) {
      console.log("Requesting user location from search form...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("User location obtained:", coords);
          setUserLocation(coords);
          onLocationUpdate(coords);
        },
        (error) => {
          console.log('Location permission denied or unavailable:', error);
          setLocationPermissionDenied(true);
          setUserLocation(null);
          onLocationUpdate(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []); // Empty deps to only run on mount

  // Geocode location string to coordinates
  const geocodeLocation = async (locationString) => {
    if (!locationString || !GOOGLE_API_KEY) {
      console.log('Geocoding skipped - missing location or API key:', { locationString, hasApiKey: !!GOOGLE_API_KEY });
      return null;
    }
    
    console.log('Geocoding location:', locationString);
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationString)}&key=${GOOGLE_API_KEY}`;
      console.log('Geocoding URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      console.log('Geocoding response:', data);
      
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const result = {
          lat: location.lat,
          lng: location.lng
        };
        console.log('Geocoding successful:', result);
        return result;
      } else {
        console.warn('Geocoding failed:', data.status, data.error_message);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    
    return null;
  };

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

  // Auto-request geolocation and fill city on mount (only if no manual location)
  useEffect(() => {
    // Don't auto-fill if user has manually entered location or if location query exists or using search location
    if (hasManualLocation || locationQuery || autoLocationFilled || isUsingSearchLocation) {
      console.log("Skipping auto-fill geolocation:", { hasManualLocation, locationQuery, autoLocationFilled, isUsingSearchLocation });
      return;
    }
    
    if (typeof window !== 'undefined' && navigator.geolocation) {
      console.log("Requesting geolocation for auto-fill...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Geolocation success for auto-fill:", position);
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          
          // Set user location for distance calculations
          if (!userLocation) {
            setUserLocation(coords);
            onLocationUpdate(coords);
          }
          
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
          console.log("Fetching Google Geocoding API:", url);
          try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("Google Geocoding API response:", data);
            if (data.status === "OK" && data.results.length > 0) {
              const address = data.results[0].address_components;
              const cityObj = address.find(
                (c) => c.types.includes("locality") || c.types.includes("administrative_area_level_2")
              );
              const stateObj = address.find(
                (c) => c.types.includes("administrative_area_level_1")
              );
              const city = cityObj ? cityObj.long_name : "";
              const state = stateObj ? stateObj.short_name : "";
              const locationString = state ? `${city}, ${state}` : city;
              console.log("Resolved location:", locationString);
              if (locationString && !hasManualLocation && !locationQuery) {
                setLocalLocation(locationString);
                setAutoLocationFilled(true);
              }
            } else {
              console.error("Google Geocoding API did not return expected results:", data);
            }
          } catch (err) {
            console.error("Error fetching Google Geocoding API:", err);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation conditions not met:", {
        hasWindow: typeof window !== 'undefined',
        hasGeolocation: typeof window !== 'undefined' && !!navigator.geolocation,
        autoLocationFilled,
        hasManualLocation,
        locationQuery
      });
    }
  }, []); // Empty deps to only run on mount and prevent re-runs that interfere

  // Manual geolocation trigger with throttling
  const triggerManualLocation = () => {
    console.log('Location button clicked!');
    const now = Date.now();
    const timeSinceLastRequest = now - lastGeolocationRequest;
    const THROTTLE_DELAY = 2000; // 2 seconds between requests (reduced from 5)
    
    if (timeSinceLastRequest < THROTTLE_DELAY && lastGeolocationRequest > 0) {
      const remainingTime = Math.ceil((THROTTLE_DELAY - timeSinceLastRequest) / 1000);
      console.log(`Throttled: ${remainingTime} seconds remaining`);
      alert(`Please wait ${remainingTime} seconds before requesting location again.`);
      return;
    }
    
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setLastGeolocationRequest(now);
      console.log("Manual geolocation triggered...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Manual geolocation success:", position);
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          setUserLocation(coords);
          onLocationUpdate(coords);
          
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
          try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.status === "OK" && data.results.length > 0) {
              const address = data.results[0].address_components;
              const cityObj = address.find(
                (c) => c.types.includes("locality") || c.types.includes("administrative_area_level_2")
              );
              const stateObj = address.find(
                (c) => c.types.includes("administrative_area_level_1")
              );
              const city = cityObj ? cityObj.long_name : "";
              const state = stateObj ? stateObj.short_name : "";
              const locationString = state ? `${city}, ${state}` : city;
              if (locationString) {
                setLocalLocation(locationString);
                setHasManualLocation(false); // Reset this since user clicked the location button
                setAutoLocationFilled(true);
              }
            }
          } catch (err) {
            console.error("Error fetching Google Geocoding API:", err);
          }
        },
        (error) => {
          console.error("Manual geolocation error:", error);
          let errorMessage = 'Unable to detect your location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied. Please check your browser permissions.';
              setLocationPermissionDenied(true);
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable. Please try again later or enter your location manually.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage += 'Please try again or enter your location manually.';
              break;
          }
          
          alert(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Helper to resolve acronyms to specialty names
  function resolveAcronym(term) {
    if (!term) return term;
    // If term is not a string, return as-is (should only be string from input)
    if (typeof term !== "string") return term;
    const lower = term.trim().toLowerCase();
    const mapped = specialtyAcronymMap[lower];
    if (Array.isArray(mapped)) {
      return mapped;
    }
    return mapped || term;
  }

  // Modified search handler for main input only
  async function handleMainSearch() {
    console.log('🚀 === SEARCH BUTTON CLICKED ===');
    console.log('🕒 Timestamp:', new Date().toISOString());
    console.log('📝 Form state:', {
      localSearch,
      localLocation,
      isSearchInProgress,
      isUsingSearchLocation,
      userLocation,
      hasManualLocation,
      autoLocationFilled
    });
    
    // Prevent concurrent searches
    if (isSearchInProgress) {
      console.log('🚫 Search already in progress, skipping...');
      return;
    }
    
    setIsSearchInProgress(true);
    console.log('✅ Set isSearchInProgress to true');
    console.log('🔍 Search triggered with:', { localSearch, localLocation, timestamp: Date.now() });
    
    try {
      // If the user typed an acronym, replace with mapped specialty
      const resolvedSearch = resolveAcronym(localSearch);
      console.log('🔄 Resolved search term:', { original: localSearch, resolved: resolvedSearch });
      
      // If user entered a location manually, geocode it first
      if (localLocation && localLocation.trim()) {
        console.log('📍 === GEOCODING LOCATION FLOW ===');
        console.log('🗺️ Geocoding search location:', localLocation);
        console.log('🏁 Setting isUsingSearchLocation flag...');
        
        // Set flag to prevent auto-geolocation from interfering
        setIsUsingSearchLocation(true);
        
        console.log('🌍 Calling geocodeLocation...');
        const geocoded = await geocodeLocation(localLocation);
        console.log('📊 Geocoding result:', geocoded);
        
        if (geocoded) {
          console.log('✅ Search location geocoded successfully:', geocoded);
          console.log('📡 Calling onSearchLocationUpdate with coordinates...');
          // Update the search location immediately
          onSearchLocationUpdate(geocoded);
          
          // Trigger search immediately with geocoded coordinates
          console.log('🎯 Triggering search with coordinates...');
          console.log('📤 Calling setSearchQuery with:', { resolvedSearch, localLocation, geocoded });
          // Pass the geocoded coordinates directly to preserve the search location
          setSearchQuery(resolvedSearch, localLocation, geocoded);
          setIsSearchInProgress(false);
          console.log('✅ Search completed with geocoded location');
          // Keep the isUsingSearchLocation flag set to prevent auto-geolocation interference
        } else {
          console.warn('❌ Geocoding failed for:', localLocation);
          console.log('🧹 Clearing isUsingSearchLocation flag...');
          // Still trigger search even if geocoding failed, but clear the search location flag
          setIsUsingSearchLocation(false);
          console.log('📤 Calling setSearchQuery without coordinates...');
          setSearchQuery(resolvedSearch, localLocation);
          setIsSearchInProgress(false);
          console.log('✅ Search completed without geocoded location');
        }
        console.log('📍 === END GEOCODING LOCATION FLOW ===');
        return; // Exit function after handling location geocoding
      }
      
      // No location to geocode, trigger search immediately
      console.log('🚀 === NO LOCATION SEARCH FLOW ===');
      console.log('🧹 Clearing search location state...');
      // Clear the search location flag if no location is provided
      setIsUsingSearchLocation(false);
      // Only clear search location if we're not currently using a search location
      // This prevents clearing coordinates that were just set by a previous geocoding operation
      if (!isUsingSearchLocation) {
        console.log('📡 Calling onSearchLocationUpdate(null)...');
        onSearchLocationUpdate(null); // Clear search location
      } else {
        console.log('🔒 Preserving existing search location coordinates');
      }
      console.log('📤 Calling setSearchQuery without location...');
      setSearchQuery(resolvedSearch, localLocation);
      setIsSearchInProgress(false);
      console.log('✅ Search completed without location');
      console.log('🚀 === END NO LOCATION SEARCH FLOW ===');
    } catch (error) {
      console.error('💥 Search error:', error);
      setIsSearchInProgress(false);
      console.log('❌ Reset isSearchInProgress due to error');
    }
    
    console.log('🏁 === SEARCH FUNCTION COMPLETE ===');
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
                className=" input-style2 !pl-10 !pr-12 w-full md:w-[250px] lg:w-[400px]"
                value={localLocation}
                onChange={(e) => {
                  setLocalLocation(e.target.value);
                  setHasManualLocation(true); // Mark as manually entered
                  // If user clears the location, reset the search location flag and clear coordinates
                  if (!e.target.value.trim()) {
                    setIsUsingSearchLocation(false);
                    onSearchLocationUpdate(null); // Clear search location coordinates
                  }
                }}
                onKeyDown={(e) => {
                  console.log('⌨️ Location input keydown:', e.key);
                  if (e.key === 'Enter') {
                    console.log('🎯 Enter pressed in location field - triggering search');
                    handleMainSearch();
                  }
                }}
              />
              <button
                type="button"
                onClick={triggerManualLocation}
                className="absolute right-3 top-3 p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                title="Use my current location"
              >
                <MapPin className="w-5 h-5 text-blue-600 hover:text-blue-700" />
              </button>
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
                    console.log('⌨️ Search input keydown:', e.key);
                    if (e.key === 'Enter') {
                      console.log('🎯 Enter pressed in search field - triggering search');
                      handleMainSearch();
                    }
                  }}
                  onClick={() => {
                    if (localSearch) setLocalSearch("");
                  }}
                />
            </div>
            <button
              type="button"
              className="btn-md flex-center font-semibold btn-outline-secondary gap-1 w-full sm:w-auto px-4 py-2 rounded"
              onClick={(e) => {
                console.log('🖱️ === SEARCH BUTTON CLICKED ===');
                console.log('🎯 Button click event:', e.type);
                console.log('🕒 Click timestamp:', new Date().toISOString());
                handleMainSearch();
              }}
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
