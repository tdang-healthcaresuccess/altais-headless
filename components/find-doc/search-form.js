import React, { useState, useEffect, useRef } from "react";
import { useGoogleApiKey } from "../common/LocationConfig";
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
import LocationPin from "@/public/icons/location_pin.svg";
import SpecialityShortInfo from "../common/specialty-short-info";
import { resolveSpecialtyAcronym } from "../specialtySearchUtils";

export default function DocSearchForm({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  activeLayout,
  setActiveLayout,
  onLocationUpdate = () => {}, // For user's actual location (geolocation)
  onSearchLocationUpdate = () => {}, // New prop for search location coordinates
  onSpecialtyFilterChange = () => {}, // New prop for auto-filling specialty filter
  availableSpecialties = [] // Available specialties for enhanced detection
}) {
  const [showLayoutGrid, setShowLayoutGrid] = useState(false);
  const LayoutRef = useRef(null);
  
  // Get Google API key from ACF
  const { apiKey: GOOGLE_API_KEY, loading: apiKeyLoading } = useGoogleApiKey();
  
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
  const [specialtyAutoFilled, setSpecialtyAutoFilled] = useState(null); // Track auto-filled specialty

  // Keep local state in sync with props after SSR search
  useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);
  useEffect(() => {
    setLocalLocation(locationQuery || "");
  }, [locationQuery]);

  // Clear the specialty notification after a few seconds
  useEffect(() => {
    if (specialtyAutoFilled) {
      const timer = setTimeout(() => {
        setSpecialtyAutoFilled(null);
      }, 3000); // Clear after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [specialtyAutoFilled]);


  // Request user's location on component mount and update parent
  useEffect(() => {
    // Don't auto-request location if user has manually entered a location or is using a location search
    if (hasManualLocation || locationQuery || isUsingSearchLocation) {
      return;
    }
    
    if (typeof window !== 'undefined' && navigator.geolocation && !locationPermissionDenied && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(coords);
          onLocationUpdate(coords);
        },
        (error) => {
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
      return null;
    }
    
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationString)}&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const result = {
          lat: location.lat,
          lng: location.lng
        };
        return result;
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
      return;
    }
    
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          
          // Set user location for distance calculations
          if (!userLocation) {
            setUserLocation(coords);
            onLocationUpdate(coords);
          }
          
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
              if (locationString && !hasManualLocation && !locationQuery) {
                setLocalLocation(locationString);
                setAutoLocationFilled(true);
              }
            }
          } catch (err) {
            console.error("Error fetching Google Geocoding API:", err);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []); // Empty deps to only run on mount and prevent re-runs that interfere

  // Manual geolocation trigger with throttling
  const triggerManualLocation = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastGeolocationRequest;
    const THROTTLE_DELAY = 2000; // 2 seconds between requests (reduced from 5)
    
    if (timeSinceLastRequest < THROTTLE_DELAY && lastGeolocationRequest > 0) {
      const remainingTime = Math.ceil((THROTTLE_DELAY - timeSinceLastRequest) / 1000);
      alert(`Please wait ${remainingTime} seconds before requesting location again.`);
      return;
    }
    
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setLastGeolocationRequest(now);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
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
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Helper to resolve acronyms to specialty names (now using utility function)
  // This is kept for backward compatibility, but delegates to the utility
  function resolveAcronym(term) {
    return resolveSpecialtyAcronym(term);
  }

  // ✨ NEW: Enhanced specialty detection that checks for partial matches
  function detectSpecialtyInSearch(searchTerm, availableSpecialties = []) {
    if (!searchTerm || !searchTerm.trim()) return null;
    
    const term = searchTerm.toLowerCase().trim();
    
    // First check acronym resolution
    const resolvedSpecialty = resolveAcronym(searchTerm);
    if (resolvedSpecialty !== searchTerm) {
      return resolvedSpecialty; // Found in acronym map
    }
    
    // Check for partial matches in available specialties
    // This catches cases like "cardio" matching "Cardiology" 
    const matchingSpecialties = availableSpecialties.filter(specialty => {
      if (!specialty) return false;
      const specialtyLower = specialty.toLowerCase();
      
      // Check if the search term is contained in the specialty name
      // or if the specialty name starts with the search term
      return specialtyLower.includes(term) || term.includes(specialtyLower);
    });
    
    if (matchingSpecialties.length > 0) {
      return matchingSpecialties.length === 1 ? matchingSpecialties[0] : matchingSpecialties;
    }
    
    return null; // No specialty detected
  }

  // Modified search handler for main input only
  async function handleMainSearch() {
    // Prevent concurrent searches
    if (isSearchInProgress) {
      return;
    }
    
    setIsSearchInProgress(true);
    
    try {
      // ✨ ENHANCED: Try enhanced specialty detection first
      const detectedSpecialty = detectSpecialtyInSearch(localSearch, availableSpecialties);
      
      // If specialty detected, auto-fill the sidebar filter
      if (detectedSpecialty) {
        console.log('🎯 Specialty detected in main search:', detectedSpecialty);
        
        // Set notification for user feedback
        const specialtyName = Array.isArray(detectedSpecialty) ? detectedSpecialty[0] : detectedSpecialty;
        setSpecialtyAutoFilled(specialtyName);
        
        // Auto-fill the sidebar specialty filter
        if (Array.isArray(detectedSpecialty)) {
          // Multiple specialties detected
          onSpecialtyFilterChange({ specialty: detectedSpecialty });
        } else {
          // Single specialty detected
          onSpecialtyFilterChange({ specialty: [detectedSpecialty] });
        }
      }
      
      // If the user typed an acronym, resolve it to specialty name(s) for the search query
      const resolvedSearch = resolveAcronym(localSearch);
      
      // Handle array results from acronym mapping
      let searchValue = resolvedSearch;
      if (Array.isArray(resolvedSearch)) {
        // For now, use the first specialty in the array for the main search
        // In the future, this could be enhanced to search for multiple specialties
        searchValue = resolvedSearch[0] || localSearch;
      }
      
      // If user entered a location manually, geocode it first
      if (localLocation && localLocation.trim()) {
        // Set flag to prevent auto-geolocation from interfering
        setIsUsingSearchLocation(true);
        
        const geocoded = await geocodeLocation(localLocation);
        
        if (geocoded) {
          // Update the search location immediately
          onSearchLocationUpdate(geocoded);
          
          // Trigger search immediately with geocoded coordinates
          // Pass the geocoded coordinates directly to preserve the search location
          setSearchQuery(searchValue, localLocation, geocoded);
          setIsSearchInProgress(false);
          // Keep the isUsingSearchLocation flag set to prevent auto-geolocation interference
        } else {
          // Still trigger search even if geocoding failed, but clear the search location flag
          setIsUsingSearchLocation(false);
          setSearchQuery(searchValue, localLocation);
          setIsSearchInProgress(false);
        }
        return; // Exit function after handling location geocoding
      }
      
      // No location to geocode, trigger search immediately
      // Clear the search location flag if no location is provided
      setIsUsingSearchLocation(false);
      // Only clear search location if we're not currently using a search location
      // This prevents clearing coordinates that were just set by a previous geocoding operation
      if (!isUsingSearchLocation) {
        onSearchLocationUpdate(null); // Clear search location
      }
      setSearchQuery(searchValue, localLocation);
      setIsSearchInProgress(false);
    } catch (error) {
      console.error('Search error:', error);
      setIsSearchInProgress(false);
    }
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
          <div className="flex flex-col md:flex-row flex-1 w-full relative gap-6">
            <div className="relative">
              <Image
                src={SearchIcon}
                alt="Search"
                className="absolute left-3 top-4"
              />
                <input
                  type="text"
                  placeholder="Doctor, hospital or specialty..."
                  className=" input-style2 !pl-10 w-full md:w-[250px] lg:w-[400px]"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleMainSearch();
                    }
                  }}
                  onClick={() => {
                    if (localSearch) setLocalSearch("");
                  }}
                />
            </div>
            
            {/* ✨ Specialty Auto-Detection Notification */}
            {specialtyAutoFilled && (
              <div className="absolute top-full left-0 mt-2 bg-green-100 border border-green-400 text-green-800 px-3 py-2 rounded-md shadow-sm z-10 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span className="text-sm">
                  Specialty filter applied: <strong>{specialtyAutoFilled}</strong>
                </span>
              </div>
            )}
          </div>
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
                  if (e.key === 'Enter') {
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
                <Image
                  src={LocationPin}
                  alt="Location Pin"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-1 w-full relative gap-6">
            
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
