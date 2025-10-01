"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
import DocSearchForm from "components/find-doc/search-form";
import LayoutOptions from "@/components/common/LayoutOptions";
import DocSearchFilterSidebar from "components/find-doc/search-filter-sidebar";
import PhysicianCard from "@/components/common/PhysicianCard";
import { FilterMobile } from "@/public/icons/filter-mobile";
import { useQuery } from "@apollo/client";
import { 
  GET_PHYSICIANS_FILTERED, 
  GET_PHYSICIANS_LIST,
  GET_SPECIALTIES, 
  GET_LANGUAGES, 
  GET_INSURANCES 
} from "../queries/PhysicianQueries";
import { useRouter } from "next/router";
import { X } from "lucide-react";

export async function getServerSideProps(context) {
  // This makes the page server-side rendered instead of static
  // so it won't fail during build when GraphQL is unavailable
  return {
    props: {}
  };
}

export default function FindCare() {
  const router = useRouter();
  const [activeLayout, setActiveLayout] = useState("list");
  const [showFilter, setShowFilter] = useState(false);
  const [userLocation, setUserLocation] = useState(null); // User's actual location for distance sorting {latitude, longitude}
  const [searchLocation, setSearchLocation] = useState(null); // Search location for filtering {latitude, longitude}

  // Parse URL parameters for search
  const parsedPage = parseInt(router.query.page) || 1;
  const searchQuery = router.query.search || "";
  const locationQuery = router.query.location || "";
  const specialityFilter = router.query.specialty || "";
  const genderFilter = router.query.gender || [];
  const languageFilter = router.query.language || [];
  const insuranceFilter = router.query.insurance || [];
  const primaryCareFilter = router.query.primaryCare || false;
  
  // Parse search coordinates from URL
  const searchLat = router.query.searchLat ? parseFloat(router.query.searchLat) : null;
  const searchLng = router.query.searchLng ? parseFloat(router.query.searchLng) : null;

  // Parse array and boolean filters
  const parsedGenderFilter = genderFilter ? [].concat(genderFilter) : [];
  const parsedLanguageFilter = languageFilter ? (typeof languageFilter === 'string' ? languageFilter.split(',') : [].concat(languageFilter)) : [];
  const parsedInsuranceFilter = insuranceFilter ? (typeof insuranceFilter === 'string' ? insuranceFilter.split(',') : [].concat(insuranceFilter)) : [];
  const parsedPrimaryCare = primaryCareFilter === 'true';

  // Restore search location from URL parameters
  useEffect(() => {
    if (searchLat && searchLng && !isNaN(searchLat) && !isNaN(searchLng)) {
      const coords = {
        latitude: searchLat,
        longitude: searchLng
      };
      console.log('🔄 Restoring search location from URL:', coords);
      setSearchLocation(coords);
    } else if (!searchLat && !searchLng) {
      // Clear search location if no coordinates in URL
      console.log('🧹 Clearing search location (no coordinates in URL)');
      setSearchLocation(null);
    }
  }, [searchLat, searchLng]);

  // Determine sorting - if user has location, sort by distance, otherwise alphabetical
  const orderBy = userLocation ? "distance" : "last_name";
  const order = userLocation ? "ASC" : "ASC";

  // Get physicians data with current filters
  const { data: physiciansData, loading: physiciansLoading, error: physiciansError } = useQuery(GET_PHYSICIANS_LIST, {
    variables: {
      search: searchQuery || null,
      specialty: specialityFilter || null,
      language: parsedLanguageFilter.length > 0 ? parsedLanguageFilter.join(',') : null,
      gender: parsedGenderFilter.length > 0 ? parsedGenderFilter.join(',') : null,
      primaryCare: parsedPrimaryCare || null,
      page: parsedPage,
      perPage: 10,
      orderBy: orderBy,
      order: order
      // Note: location filtering will be done client-side since GraphQL doesn't support it
    },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });

  // Get available specialties, languages, and insurances for filters
  // TODO: These queries might be causing issues - temporarily commented out
  /*
  const { data: specialtiesData, error: specialtiesError } = useQuery(GET_SPECIALTIES, {
    errorPolicy: 'all'
  });
  const { data: languagesData, error: languagesError } = useQuery(GET_LANGUAGES, {
    errorPolicy: 'all'
  });
  const { data: insurancesData, error: insurancesError } = useQuery(GET_INSURANCES, {
    errorPolicy: 'all'
  });
  */

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in miles
  };

  const physicians = physiciansData?.doctorsList?.items || [];
  const total = physiciansData?.doctorsList?.total || 0;
  const totalPages = Math.ceil(total / 10);
  
  // Client-side distance calculation and sorting if we have a search location
  const locationProcessedPhysicians = searchLocation ? physicians.map(physician => {
    if (!physician.latitude || !physician.longitude) {
      return { ...physician, distance: Infinity }; // Put physicians without coordinates at the end
    }
    
    const distance = calculateDistance(
      searchLocation.latitude,
      searchLocation.longitude,
      parseFloat(physician.latitude),
      parseFloat(physician.longitude)
    );
    
    return { ...physician, distance };
  }).sort((a, b) => a.distance - b.distance) : physicians; // Sort by distance, closest first
  
  // Hardcode empty arrays for filters since queries are disabled
  const availableSpecialties = [];
  const availableLanguages = [];
  const availableInsurances = [];

  // Debug the GraphQL data
  console.log('GraphQL data loaded:', {
    physicians: physicians.length,
    firstPhysician: physicians[0] ? {
      name: `${physicians[0].firstName} ${physicians[0].lastName}`,
      latitude: physicians[0].latitude,
      longitude: physicians[0].longitude,
      hasCoordinates: Boolean(physicians[0].latitude && physicians[0].longitude)
    } : null,
    samplePhysicians: physicians.slice(0, 3).map(p => ({
      name: `${p.firstName} ${p.lastName}`,
      lat: p.latitude,
      lng: p.longitude,
      hasCoords: Boolean(p.latitude && p.longitude)
    }))
  });
  console.log('Specialty filtering debug:', {
    hasSpecialtyTerms: Boolean(specialityFilter?.length),
    specialtyTerms: specialityFilter,
    useSpecialtyFiltering: Boolean(specialityFilter?.length),
    selectedSpecialties: specialityFilter || ''
  });

  // Reverse geocoding function to get address from coordinates
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      return `${data.city}, ${data.principalSubdivision}`;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return '';
    }
  };

  // Get user's geolocation on page load
  // Note: Geolocation is now handled by the search form component
  // to avoid conflicts and use Google's Geocoding API

  // Determine which location to use for sorting (prioritize search location over user location)
  const sortingLocation = userLocation; // Only use user location for sorting, search location is already handled

  // Sort physicians by distance if we have user location (and search location hasn't already sorted them)
  const sortedPhysicians = (sortingLocation && !searchLocation) ? [...locationProcessedPhysicians].sort((a, b) => {
      // Check if both physicians have valid coordinates
      const aLat = parseFloat(a.latitude);
      const aLng = parseFloat(a.longitude);
      const bLat = parseFloat(b.latitude);
      const bLng = parseFloat(b.longitude);
      
      // If either physician doesn't have coordinates, put them at the end
      if (isNaN(aLat) || isNaN(aLng)) {
        console.warn(`Physician ${a.firstName} ${a.lastName} has invalid coordinates:`, { lat: a.latitude, lng: a.longitude });
        return 1;
      }
      if (isNaN(bLat) || isNaN(bLng)) {
        console.warn(`Physician ${b.firstName} ${b.lastName} has invalid coordinates:`, { lat: b.latitude, lng: b.longitude });
        return -1;
      }
      
      const distanceA = calculateDistance(
        sortingLocation.latitude, 
        sortingLocation.longitude, 
        aLat, 
        aLng
      );
      const distanceB = calculateDistance(
        sortingLocation.latitude, 
        sortingLocation.longitude, 
        bLat, 
        bLng
      );
      
      console.log(`Distance comparison - ${a.firstName} ${a.lastName}: ${distanceA.toFixed(1)} miles, ${b.firstName} ${b.lastName}: ${distanceB.toFixed(1)} miles`);
      
      return distanceA - distanceB;
    }) : locationProcessedPhysicians;

  // Log sorting information
  console.log('Sorting info:', {
    userLocation,
    searchLocation,
    sortingLocation: searchLocation || sortingLocation,
    sortingBy: searchLocation ? 'search location (zip code)' : userLocation ? 'user location (geolocation)' : 'no location',
    totalPhysicians: physicians.length,
    processedPhysicians: locationProcessedPhysicians.length,
    sortedPhysicians: sortedPhysicians.length,
    firstPhysician: sortedPhysicians[0] ? {
      name: `${sortedPhysicians[0].firstName} ${sortedPhysicians[0].lastName}`,
      coordinates: `${sortedPhysicians[0].latitude}, ${sortedPhysicians[0].longitude}`,
      distance: sortedPhysicians[0].distance ? `${sortedPhysicians[0].distance.toFixed(1)} miles` : 'unknown',
      hasCoordinates: !!(sortedPhysicians[0].latitude && sortedPhysicians[0].longitude)
    } : null,
    samplePhysicians: sortedPhysicians.slice(0, 3).map(p => ({
      name: `${p.firstName} ${p.lastName}`,
      lat: p.latitude,
      lng: p.longitude,
      distance: p.distance ? `${p.distance.toFixed(1)} miles` : 'unknown',
      hasCoords: !!(p.latitude && p.longitude)
    }))
  });

  // Handler for search form
  const handleSearch = (searchValue, locationValue, coordinates) => {
    console.log('🔍 === HANDLE SEARCH CALLED ===');
    console.log('🕒 Timestamp:', new Date().toISOString());
    console.log('📝 Received parameters:', { 
      searchValue, 
      locationValue, 
      coordinates,
      hasCoordinates: Boolean(coordinates),
      coordinatesType: typeof coordinates
    });
    console.log('🌐 Current router state:', {
      pathname: router.pathname,
      query: router.query,
      asPath: router.asPath
    });
    
    const query = {
      ...router.query,
      page: 1 // Reset to first page on new search
    };
    console.log('📋 Base query object:', query);

    if (searchValue) {
      query.search = Array.isArray(searchValue) ? searchValue.join(",") : searchValue;
      console.log('✅ Added search to query:', query.search);
    } else {
      delete query.search;
      console.log('🗑️ Removed search from query');
    }

    if (locationValue) {
      query.location = locationValue;
      console.log('✅ Added location to query:', query.location);
    } else {
      delete query.location;
      console.log('🗑️ Removed location from query');
    }

    // Persist search coordinates in URL to prevent loss during navigation
    if (coordinates && coordinates.lat && coordinates.lng) {
      query.searchLat = coordinates.lat.toString();
      query.searchLng = coordinates.lng.toString();
      console.log('✅ Added search coordinates to query:', { lat: coordinates.lat, lng: coordinates.lng });
    } else {
      delete query.searchLat;
      delete query.searchLng;
      console.log('🗑️ Removed search coordinates from query');
    }

    console.log('📦 Final query object:', query);
    console.log('🚀 About to call router.push...');

    // Don't overwrite coordinates here - they should be set by handleSearchLocationUpdate
    // This prevents the search location from being converted to user location

    // Use shallow routing to prevent server-side re-render and hydration mismatch
    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true }).then((success) => {
      console.log('🎯 Router.push completed:', success);
      console.log('🔄 New router state:', {
        pathname: router.pathname,
        query: router.query,
        asPath: router.asPath
      });
    }).catch((error) => {
      console.error('❌ Router.push failed:', error);
    });
    
    console.log('🔍 === END HANDLE SEARCH ===');
  };

  // Handler for location updates from the search form
  const handleLocationUpdate = (coordinates) => {
    console.log('User location update received:', coordinates);
    if (coordinates && coordinates.lat && coordinates.lng) {
      // Convert from search form format {lat, lng} to our format {latitude, longitude}
      const coords = {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };
      setUserLocation(coords);
      console.log('User location set:', coords);
    } else {
      setUserLocation(null);
      console.log('User location cleared');
    }
  };

  // Handler for search location updates (manual input geocoding)
  const handleSearchLocationUpdate = (coordinates) => {
    console.log('🗺️ SEARCH LOCATION UPDATE:', coordinates, 'at', Date.now());
    
    if (coordinates && coordinates.lat && coordinates.lng) {
      const coords = {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };
      setSearchLocation(coords);
      console.log('✅ Search location set:', coords);
    } else {
      console.log('🚫 Clearing search location');
      setSearchLocation(null);
    }
  };

  // Handler for filter changes
  const handleFilterChange = (filterUpdate) => {
    const query = {
      ...router.query,
      page: 1 // Reset to first page on filter change
    };

    // Handle different filter types
    if (filterUpdate.specialty !== undefined) {
      if (filterUpdate.specialty) {
        query.specialty = filterUpdate.specialty;
      } else {
        delete query.specialty;
      }
    }

    if (filterUpdate.gender !== undefined) {
      if (filterUpdate.gender) {
        query.gender = filterUpdate.gender;
      } else {
        delete query.gender;
      }
    }

    if (filterUpdate.languages !== undefined) {
      if (filterUpdate.languages && filterUpdate.languages.length > 0) {
        query.language = filterUpdate.languages.join(',');
      } else {
        delete query.language;
      }
    }

    if (filterUpdate.insurances !== undefined) {
      if (filterUpdate.insurances && filterUpdate.insurances.length > 0) {
        query.insurance = filterUpdate.insurances.join(',');
      } else {
        delete query.insurance;
      }
    }

    if (filterUpdate.isPrimaryCare !== undefined) {
      if (filterUpdate.isPrimaryCare) {
        query.primaryCare = 'true';
      } else {
        delete query.primaryCare;
      }
    }

    router.push({
      pathname: router.pathname,
      query
    });
  };

  const handleToggleFilterMobile = () => setShowFilter(true);
  const handleCloseMobileFilter = () => setShowFilter(false);

  // Generate pagination URL
  const getPaginationUrl = (page) => {
    const query = { ...router.query, page };
    const params = new URLSearchParams();
    Object.keys(query).forEach(key => {
      if (query[key]) {
        params.append(key, query[key]);
      }
    });
    return `/find-care?${params.toString()}`;
  };

  return (
    <Layout
      metaD={{
        titleTag: parsedPage > 1 ? `Find Care | Altais - Page ${parsedPage}` : "Find Care | Altais",
        metaDescription:
          "Search for compassionate, affordable, and connected care providers across California with Altais.",
        noIndexFollow: true,
      }}
    >
      <div className="block">
        <InnerPageBanner
          DesktopBanner="bg-findDoc-landing-banner"
          MobileBanner="bg-findDoc-landing-banner-mobile"
          heading="Find Care"
        />
        
        <DocSearchForm
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          setSearchQuery={handleSearch}
          setLocationQuery={handleSearch}
          activeLayout={activeLayout}
          setActiveLayout={setActiveLayout}
          onLocationUpdate={handleLocationUpdate}
          onSearchLocationUpdate={handleSearchLocationUpdate}
        />

        {/* Results Count, Clear All Filters Link, and LayoutOptions */}
        <div className="container mx-auto">
          <div className="flex justify-between gap-10 pt-9 pb-6 border-b border-lightPrimary">
            <div className="flex flex-col gap-2">
              {physiciansLoading ? (
                <span className="text-bluePrimary text-sm">Loading results...</span>
              ) : (
                <span className="text-bluePrimary text-sm">
                  Showing {physicians.length} of {total} results
                </span>
              )}
              <span
                onClick={() => router.push({ pathname: router.pathname })}
                className="text-bluePrimary font-medium text-sm cursor-pointer"
                role="button"
                tabIndex={0}
              >
                Clear All Filters
              </span>
            </div>
            <LayoutOptions
              activeLayout={activeLayout}
              setActiveLayout={setActiveLayout}
            />
          </div>
        </div>

        <div className="block gap-[70px] pb-[155px] pt-6 md:pt-10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-9 md:gap-8 lg:gap-[70px]">
              
              {/* Filter Sidebar */}
              <div className="block w-full md:w-[calc(30%-16px)] lg:w-[calc(25%-35px)]">
                {showFilter ? (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center p-5 bg-grey00BF z-50">
                    <button onClick={handleCloseMobileFilter} type="button" className="absolute top-2 right-2">
                      <X size={28} color="#fff" />
                    </button>
                    <div className="block bg-white p-5 w-full rounded-normal">
                      <DocSearchFilterSidebar
                        specialityFilter={specialityFilter}
                        genderFilter={parsedGenderFilter}
                        languageFilter={languageFilter}
                        primaryCareFilter={parsedPrimaryCare}
                        insuranceFilter={parsedInsuranceFilter}
                        availableSpecialties={availableSpecialties}
                        availableLanguages={availableLanguages}
                        availableInsurances={availableInsurances}
                        onFilterChange={handleFilterChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <DocSearchFilterSidebar
                      specialityFilter={specialityFilter}
                      genderFilter={parsedGenderFilter}
                      languageFilter={parsedLanguageFilter}
                      primaryCareFilter={parsedPrimaryCare}
                      insuranceFilter={parsedInsuranceFilter}
                      availableSpecialties={availableSpecialties}
                      availableLanguages={availableLanguages}
                      availableInsurances={availableInsurances}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                )}

                <div className="block md:hidden">
                  <button
                    type="button"
                    onClick={handleToggleFilterMobile}
                    className="btn-md flex-center btn-normal btn-filter gap-3 w-full"
                  >
                    <FilterMobile />
                    Apply Filter and Sort
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
                {physiciansLoading ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading physicians...</p>
                  </div>
                ) : physiciansError ? (
                  <div className="text-center py-16">
                    <p className="text-red-600">Error loading physicians. Please try again.</p>
                  </div>
                ) : physicians.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-bold mb-4">No physicians found</h3>
                    <p className="text-gray-600 mb-8">Try adjusting your search criteria or filters.</p>
                    <button
                      onClick={() => router.push({ pathname: router.pathname })}
                      className="btn-primary"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Physician Grid/List */}
                    <div className={`grid gap-6 ${
                      activeLayout === "grid" 
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                        : "grid-cols-1"
                    }`}>
                      {sortedPhysicians.map((physician) => (
                        <PhysicianCard 
                          key={physician.doctorID} 
                          physician={physician}
                          userLocation={sortingLocation}
                          showDistance={!!sortingLocation}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center w-full mt-8">
                        <ul className="flex gap-3">
                          {/* Previous Page */}
                          <li className={`pagination-li pag-action ${parsedPage === 1 ? "!hidden md:!flex" : "cursor-pointer"}`}>
                            <a
                              href={parsedPage > 1 ? getPaginationUrl(parsedPage - 1) : "#"}
                              aria-disabled={parsedPage === 1}
                              className="flex items-center"
                            >
                              <svg className="w-[20px] h-[20px] text-secondary" viewBox="0 0 24 24">
                                <path
                                  d="M15 19l-7-7 7-7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Previous Page
                            </a>
                          </li>

                          {/* Page Numbers */}
                          {(() => {
                            let startPage = Math.max(1, parsedPage - 2);
                            let endPage = Math.min(totalPages, startPage + 3);
                            if (endPage - startPage < 3) {
                              startPage = Math.max(1, endPage - 3);
                            }
                            return Array.from(
                              { length: endPage - startPage + 1 },
                              (_, i) => startPage + i
                            ).map((p) => (
                              <li
                                key={p}
                                className={`pagination-li ${parsedPage === p ? "active" : ""} cursor-pointer`}
                              >
                                <a
                                  href={getPaginationUrl(p)}
                                  className={parsedPage === p ? "font-bold text-secondary" : ""}
                                >
                                  {p}
                                </a>
                              </li>
                            ));
                          })()}

                          {/* Next Page */}
                          <li className={`pagination-li pag-action ${parsedPage === totalPages ? "hidden" : "cursor-pointer"}`}>
                            <a
                              href={parsedPage < totalPages ? getPaginationUrl(parsedPage + 1) : "#"}
                              aria-disabled={parsedPage === totalPages}
                              className="flex items-center"
                            >
                              Next Page
                              <svg className="w-[20px] h-[20px] text-secondary" viewBox="0 0 24 24">
                                <path
                                  d="M9 5l7 7-7 7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="container mx-auto">
            <p className="italic text-sm normal-content pt-5">
              The Find a Doctor directory is published by Altais Physicians as a way to find Altais-affiliated physicians in the San Francisco Bay Area. This directory may not be republished, sold, resold, copied, duplicated or downloaded in whole or in part, for commercial or any other purposes, such as the distribution of mailing lists.
              Altais Physicians makes no guarantee or warranty as to the accuracy or completeness of the information in this directory. You should verify the accuracy of the information directly with the physician's office. Altais Physicians does not recommend or endorse any particular provider in the directory.
              Using the directory is not a reliable method to verify the credentials or licenses of any physician in the directory. Altais Physicians is not responsible for any loss or damage caused by your reliance on information in the directory.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}