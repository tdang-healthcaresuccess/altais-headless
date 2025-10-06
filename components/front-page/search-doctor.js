// search-doctor.jsx
// This component contains the initial search form on the landing page.
// It is now a controlled component that passes its state to a parent component via a callback.

import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { GET_SPECIALTIES } from "../../queries/PhysicianQueries";
import { getSpecialtySuggestions } from "../specialtySearchUtils";
import { useGoogleApiKey } from "../common/LocationConfig";

export default function SearchDoctor() {
  const [doctorName, setDoctorName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [searching, setSearching] = useState(false);

  // Get Google API key from ACF
  const { apiKey: GOOGLE_API_KEY, loading: apiKeyLoading } = useGoogleApiKey();

  // Get specialties data from GraphQL
  const { data: specialtiesData } = useQuery(GET_SPECIALTIES, {
    errorPolicy: 'all'
  });
  const availableSpecialties = specialtiesData?.specialties || [];

  // Auto-request geolocation and fill zip code on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation && !locationPermissionDenied && !zipCode && GOOGLE_API_KEY) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocode to get zip code using Google API
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              // Find postal code component
              for (const result of data.results) {
                for (const component of result.address_components) {
                  if (component.types.includes('postal_code')) {
                    setZipCode(component.short_name);
                    break;
                  }
                }
                if (zipCode) break; // Exit if we found a postal code
              }
            }
          } catch (error) {
            console.error("Geocoding error:", error);
          } finally {
            setGettingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationPermissionDenied(true);
          setGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    }
  }, []);

  // Handle specialty input and show dropdown
  const handleSpecialtyInputChange = (e) => {
    const value = e.target.value;
    setSpecialtyInput(value);
    setShowSpecialtyDropdown(true);
  };

  // Get specialty suggestions
  const specialtySuggestions = getSpecialtySuggestions(specialtyInput, availableSpecialties);

  // Handle specialty selection from dropdown
  const handleSpecialtySelect = (selectedSpecialty) => {
    setSpecialty(selectedSpecialty);
    setSpecialtyInput(selectedSpecialty);
    setShowSpecialtyDropdown(false);
  };

  // Trigger geolocation manually
  const handleGetLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation && GOOGLE_API_KEY) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              // Find postal code component
              for (const result of data.results) {
                for (const component of result.address_components) {
                  if (component.types.includes('postal_code')) {
                    setZipCode(component.short_name);
                    break;
                  }
                }
                if (zipCode) break;
              }
            }
          } catch (error) {
            console.error("Geocoding error:", error);
          } finally {
            setGettingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationPermissionDenied(true);
          setGettingLocation(false);
        }
      );
    }
  };

  const handleSearch = async () => {
    setSearching(true);
    
    try {
      // Construct the search URL with query parameters
      const params = new URLSearchParams();
      
      // Combine doctor name and practice name into the main search field
      const searchTerms = [];
      if (doctorName.trim()) {
        searchTerms.push(doctorName.trim());
      }
      if (practiceName.trim()) {
        searchTerms.push(practiceName.trim());
      }
      
      // Add combined search terms to the main search parameter
      if (searchTerms.length > 0) {
        params.append('search', searchTerms.join(' '));
      }
      
      // Add specialty if selected
      if (specialty.trim()) {
        params.append('specialty', specialty.trim());
      }
      
      // Add location and geocode if zip code is provided
      if (zipCode.trim()) {
        params.append('location', zipCode.trim());
        
        // Only geocode if we have the Google API key
        if (GOOGLE_API_KEY) {
          try {
            // Use Google Geocoding API (same as find-care component)
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zipCode.trim())}&key=${GOOGLE_API_KEY}`;
            const geocodeResponse = await fetch(url);
            
            if (!geocodeResponse.ok) {
              throw new Error(`HTTP error! status: ${geocodeResponse.status}`);
            }
            
            const geocodeData = await geocodeResponse.json();
            
            if (geocodeData.status === 'OK' && geocodeData.results && geocodeData.results.length > 0) {
              const location = geocodeData.results[0].geometry.location;
              
              if (location.lat && location.lng) {
                // Add coordinates to URL so find-care can immediately sort by distance
                params.append('searchLat', location.lat.toString());
                params.append('searchLng', location.lng.toString());
              }
            }
          } catch (error) {
            // Continue without coordinates - find-care will still work but without distance sorting
          }
        }
      }

      const finalUrl = `/find-care?${params.toString()}`;
      
      // Navigate to the find-care page with the constructed parameters
      window.location.href = finalUrl;
    } catch (error) {
      // Silent error handling - continue with navigation
    } finally {
      setSearching(false);
    }
  };

  // The 'Advanced Search' link can now point directly to the find-care page
  // The 'Search' button is now a button that triggers the navigation logic
  return (
    <section className="block pt-12 md:pt-14 pb-[65px] md:pb-15 shadow-custom2">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-12">
          <div className="block w-full md:w-[40%] max-w-[470px]">
            <p className="text-lg font-normal leading-[35px]">
              <b className="text-[#1D3F76] font-semibold">Everyone deserves care that's compassionate, </b>
              <br /> connected, and rooted in the communities they call home.
              Altais is the healthcare provider that makes this possible by
              supporting physicians and care teams—so you can get high-quality
              care, when and where you need it.
            </p>
          </div>

          <div className="block flex-1 pt-6 md:pt-0 md:pl-12 border-t md:border-t-0 md:border-l border-secondary">
            <h2 className="text-[26px] leading-[36px] text-bluePrimary pb-7">Search Doctors</h2>
            <div className="block w-full">
              <div className="flex flex-col md:flex-row gap-5 justify-between mb-5">
                <div className="block w-full">
                  <input
                    type="text"
                    placeholder="Doctor Name"
                    className="input-style w-full"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
                <div className="block relative">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="input-style w-full md:max-w-[134px] md:min-w-[134px] pr-10"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  {!locationPermissionDenied && (
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={gettingLocation}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-blue-600 disabled:opacity-50"
                      title="Use my location"
                    >
                      <MapPin className={`w-4 h-4 ${gettingLocation ? 'animate-pulse' : ''}`} />
                    </button>
                  )}
                </div>
                {/* <div className="relative block">
                  <select type="text" placeholder="Distance" className="appearance-none bg-white input-style w-full md:max-w-[134px] md:min-w-[134px] cursor-pointer">
                    <option>Distance</option>
                    <option>5mi</option>
                    <option>10mi</option>
                    <option>15mi</option>
                    <option>20mi</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div> */}
              </div>
              <div className="flex gap-5 justify-between">
                <div className="block flex-1">
                  <input
                    type="text"
                    placeholder="Practice Name"
                    className="input-style w-full"
                    value={practiceName}
                    onChange={(e) => setPracticeName(e.target.value)}
                  />
                </div>
                <div className="relative block flex-1">
                  <input
                    type="text"
                    placeholder="Search Specialty"
                    className="input-style w-full"
                    value={specialtyInput}
                    onChange={handleSpecialtyInputChange}
                    onFocus={() => setShowSpecialtyDropdown(true)}
                    onBlur={() => {
                      // Delay hiding dropdown to allow for click selection
                      setTimeout(() => setShowSpecialtyDropdown(false), 200);
                    }}
                  />
                  {/* <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </div> */}
                  
                  {/* Specialty Dropdown */}
                  {showSpecialtyDropdown && specialtySuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {specialtySuggestions.slice(0, 10).map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-sm"
                          onClick={() => handleSpecialtySelect(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <a
                href="/find-care"
                className="flex-center btn-link-primary"
              >
                Advanced Search
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </a>
              <button
                onClick={handleSearch}
                disabled={searching}
                className="btn-outline-secondary btn-sm flex-center !w-[135px] !px-2 rounded-normal !h-[50px] gap-1 disabled:opacity-50"
              >
                {searching ? (zipCode.trim() ? 'Geocoding...' : 'Searching...') : 'Search'}
                <ChevronRight className={`w-[20px] h-[20px] md:w-[18px] md:h-[18px] ${searching ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
