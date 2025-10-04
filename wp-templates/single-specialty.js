import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import SpecialityShortInfo from "@/components/common/specialty-short-info";
import DocSearchForm from "components/find-doc/search-form"; // Updated to use standard search form
import LayoutOptions from "@/components/common/LayoutOptions"; // Added layout options
import DocSearchFilterSidebar from "components/find-doc/search-filter-sidebar";
import { 
  GET_PHYSICIANS_LIST,
  GET_SPECIALTIES, 
  GET_LANGUAGES, 
  GET_INSURANCES,
  GET_DEGREES
} from "../queries/PhysicianQueries"; // Updated to use GraphQL
import { useRouter } from "next/router";

const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    specialty(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FilterMobile } from "@/public/icons/filter-mobile";

export default function specialty(props) {
  const databaseId = props.__SEED_NODE__?.databaseId;
  const asPreview = props.__SEED_NODE__?.asPreview;
  const router = useRouter();

  const {
    data,
    loading = true,
    error,
  } = useQuery(PAGE_QUERY, {
    variables: {
      databaseId: databaseId,
      asPreview: asPreview,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};
  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content } = data?.specialty || {};

  // State management similar to find-care.js
  const [activeLayout, setActiveLayout] = useState("list");
  const [showFilter, setShowFilter] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  // Parse URL parameters for search (similar to find-care.js)
  const parsedPage = parseInt(router.query.page) || 1;
  const searchQuery = router.query.search || "";
  const locationQuery = router.query.location || "";
  const genderFilter = router.query.gender || [];
  const languageFilter = router.query.language || []; // Use singular form like find-care.js
  const insuranceFilter = router.query.insurance || []; // Use singular form like find-care.js
  const educationFilter = router.query.education || [];  // Now supports multiple degrees
  
  // Parse search coordinates from URL
  const searchLat = router.query.searchLat ? parseFloat(router.query.searchLat) : null;
  const searchLng = router.query.searchLng ? parseFloat(router.query.searchLng) : null;

  // Parse array filters
  const parsedGenderFilter = genderFilter ? [].concat(genderFilter) : [];
  const parsedLanguageFilter = languageFilter ? (typeof languageFilter === 'string' ? languageFilter.split(',') : [].concat(languageFilter)) : [];
  const parsedInsuranceFilter = insuranceFilter ? (typeof insuranceFilter === 'string' ? insuranceFilter.split(',') : [].concat(insuranceFilter)) : [];
  const parsedEducationFilter = educationFilter ? (typeof educationFilter === 'string' ? educationFilter.split(',') : [].concat(educationFilter)) : [];

  // Restore search location from URL parameters
  useEffect(() => {
    if (searchLat && searchLng && !isNaN(searchLat) && !isNaN(searchLng)) {
      const coords = {
        latitude: parseFloat(searchLat),
        longitude: parseFloat(searchLng)
      };
      setSearchLocation(coords);
    } else if (!searchLat && !searchLng) {
      setSearchLocation(null);
    }
  }, [searchLat, searchLng]);

  // Use current specialty as filter (always filter by current specialty)
  const currentSpecialtyFilter = title ? [title] : null;

  // Determine sorting - if user has location, sort by distance, otherwise alphabetical
  const orderBy = userLocation ? "distance" : "last_name";
  const order = userLocation ? "ASC" : "ASC";

  // Get physicians data with current filters (filtered by current specialty)
  const { data: physiciansData, loading: physiciansLoading, error: physiciansError } = useQuery(GET_PHYSICIANS_LIST, {
    variables: {
      search: searchQuery || null,
      specialty: currentSpecialtyFilter, // Always filter by current specialty
      // All filters now use array format with OR logic - backend matches ANY selected values
      language: parsedLanguageFilter.length > 0 ? parsedLanguageFilter : null,
      gender: parsedGenderFilter.length > 0 ? parsedGenderFilter : null,
      degree: parsedEducationFilter.length > 0 ? parsedEducationFilter : null,
      // Insurance filtering uses OR logic - shows doctors accepting ANY of the selected insurances
      insurance: parsedInsuranceFilter.length > 0 ? parsedInsuranceFilter : null,
      page: parsedPage,
      perPage: 10, // Use same pagination as find-care.js
      orderBy: orderBy,
      order: order
    },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    skip: !title // Skip query until we have the specialty title
  });

  // Get available specialties, languages, insurances, and degrees for filters
  const { data: specialtiesData, error: specialtiesError } = useQuery(GET_SPECIALTIES, {
    errorPolicy: 'all'
  });
  const { data: languagesData, error: languagesError } = useQuery(GET_LANGUAGES, {
    errorPolicy: 'all'
  });
  const { data: insurancesData, error: insurancesError } = useQuery(GET_INSURANCES, {
    errorPolicy: 'all'
  });
  const { data: degreesData, error: degreesError } = useQuery(GET_DEGREES, {
    errorPolicy: 'all'
  });

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
  const totalPages = Math.ceil(total / 10); // Same as find-care.js
  
  // Debug pagination info
  console.log('Specialty page pagination debug:', {
    total,
    totalPages,
    parsedPage,
    physiciansCount: physicians.length,
    title
  });
  
  // Client-side distance calculation and sorting (same as find-care.js)
  const locationProcessedPhysicians = (searchLocation || userLocation) ? physicians.map(physician => {
    if (!physician.latitude || !physician.longitude) {
      return { ...physician, distance: Infinity };
    }
    
    const referenceLocation = searchLocation || userLocation;
    const distance = calculateDistance(
      referenceLocation.latitude,
      referenceLocation.longitude,
      parseFloat(physician.latitude),
      parseFloat(physician.longitude)
    );
    
    return { ...physician, distance };
  }).sort((a, b) => a.distance - b.distance) : physicians;

  const sortedPhysicians = locationProcessedPhysicians;

  // Extract available filter options from GraphQL data
  const availableSpecialties = specialtiesData?.specialties || [];
  const availableLanguages = languagesData?.languages || [];
  const availableInsurances = insurancesData?.insurances || [];
  const availableDegrees = degreesData?.degrees || [];

  // Clear all filters and redirect to clean specialty page
  const clearAllFilters = () => {
    // Reset URL to clean specialty page with no filters
    if (typeof window !== "undefined") {
      const cleanPath = router.asPath.split("?")[0];
      router.push(cleanPath);
    }
  };

  // Handle search form submission (same pattern as find-care.js)
  const handleSearch = (searchValue, locationValue, coordinates) => {
    const query = {
      ...router.query,
      page: 1 // Reset to first page on new search
    };

    if (searchValue) {
      query.search = Array.isArray(searchValue) ? searchValue.join(",") : searchValue;
    } else {
      delete query.search;
    }

    if (locationValue) {
      query.location = locationValue;
    } else {
      delete query.location;
    }

    // Persist search coordinates in URL to prevent loss during navigation
    if (coordinates && coordinates.lat && coordinates.lng) {
      query.searchLat = coordinates.lat.toString();
      query.searchLng = coordinates.lng.toString();
    } else {
      delete query.searchLat;
      delete query.searchLng;
    }

    // Don't overwrite coordinates here - they should be set by handleSearchLocationUpdate
    // This prevents the search location from being converted to user location

    // Use shallow routing to prevent server-side re-render and hydration mismatch
    const currentPath = router.asPath.split("?")[0];
    router.push({
      pathname: currentPath,
      query
    }, undefined, { shallow: true });
  };

  // Handle filter changes from sidebar
  const handleFilterChange = (filterUpdate) => {
    const currentPath = router.asPath.split("?")[0];
    const query = { ...router.query, page: 1 }; // Reset to first page on filter change
    
    // Handle different filter types (same logic as find-care.js)
    if (filterUpdate.specialty !== undefined) {
      if (filterUpdate.specialty) {
        // Handle array of specialties
        if (Array.isArray(filterUpdate.specialty)) {
          query.specialty = filterUpdate.specialty.join(',');
        } else {
          query.specialty = filterUpdate.specialty;
        }
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
        query.language = filterUpdate.languages.join(','); // Convert plural to singular URL param
      } else {
        delete query.language;
      }
    }

    if (filterUpdate.insurances !== undefined) {
      if (filterUpdate.insurances && filterUpdate.insurances.length > 0) {
        query.insurance = filterUpdate.insurances.join(','); // Convert plural to singular URL param
      } else {
        delete query.insurance;
      }
    }

    if (filterUpdate.education !== undefined) {
      if (filterUpdate.education && filterUpdate.education.length > 0) {
        query.education = filterUpdate.education.join(',');
      } else {
        delete query.education;
      }
    }
    
    router.push({
      pathname: currentPath,
      query: query
    });
  };

  // Handler for user's geolocation updates
  const handleLocationUpdate = (coordinates) => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      // Convert from search form format {lat, lng} to our format {latitude, longitude}
      const coords = {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };
      setUserLocation(coords);
    } else {
      setUserLocation(null);
    }
  };

  // Handler for search location updates (manual input geocoding)
  const handleSearchLocationUpdate = (coordinates) => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      const coords = {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };
      setSearchLocation(coords);
    } else {
      setSearchLocation(null);
    }
  };

  const handleToggleFilterMobile = () => setShowFilter(true);
  const handleCloseMobileFilter = () => setShowFilter(false);

  return (
    <Layout
      metaD={{
        titleTag: title
          ? parsedPage > 1
            ? `${title} | Page ${parsedPage} | Altais`
            : `${title} | Altais`
          : "Altais: Shaping the Future of Healthcare",
        metaDescription: title
          ? parsedPage > 1
            ? `Find top physicians and specialists for ${title} (Page ${parsedPage}) at Altais. Compassionate, affordable, and connected care across California.`
            : `Find top physicians and specialists for ${title} at Altais. Compassionate, affordable, and connected care across California.`
          : "Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today.",
      }}
    >
      <div className="block">
        <SinglePageBanner
          DesktopBanner="bg-single-landing-banner"
          MobileBanner="bg-single-landing-banner-mobile"
          heading={title || "Specialty"}
        />
         <Breadcrumb
            items={[{ label: "Home", link: "/" }, { label: title }]}
          />
        <div className="container mx-auto pt-3 pb-6">
         
        </div>
        <SpecialityShortInfo name={title} />
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
        <div className="block container mx-auto mt-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-base">
                Showing {physicians.length} of {total} results
              </span>
              <span
                onClick={clearAllFilters}
                className="text-bluePrimary text-sm underline cursor-pointer"
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
        <div className="block gap-[70px] pb-[155px] pt-6 md:pt-[40px]">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-9 md:gap-8 lg:gap-[70px]">
              <div className="block w-full md:w-[calc(30%-16px)] lg:w-[calc(25%-35px)]">
                {showFilter ? (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center p-5 bg-grey00BF z-50">
                    <button
                      onClick={handleCloseMobileFilter}
                      type="button"
                      className="absolute top-2 right-2"
                    >
                      <X size={28} color="#fff" />
                    </button>
                    <div className="block bg-white p-5 w-full rounded-normal">
                      <DocSearchFilterSidebar
                        specialityFilter={""} // Hide specialty filter on specialty pages
                        genderFilter={parsedGenderFilter}
                        languageFilter={parsedLanguageFilter}
                        insuranceFilter={parsedInsuranceFilter}
                        educationFilter={parsedEducationFilter}
                        availableSpecialties={[]} // Hide specialty options
                        availableLanguages={availableLanguages}
                        availableInsurances={availableInsurances}
                        availableDegrees={availableDegrees}
                        onFilterChange={handleFilterChange}
                        hideSpecialtyFilter={true} // Add prop to hide specialty section
                      />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <DocSearchFilterSidebar
                      specialityFilter={""} // Hide specialty filter on specialty pages
                      genderFilter={parsedGenderFilter}
                      languageFilter={parsedLanguageFilter}
                      insuranceFilter={parsedInsuranceFilter}
                      educationFilter={parsedEducationFilter}
                      availableSpecialties={[]} // Hide specialty options
                      availableLanguages={availableLanguages}
                      availableInsurances={availableInsurances}
                      availableDegrees={availableDegrees}
                      onFilterChange={handleFilterChange}
                      hideSpecialtyFilter={true} // Add prop to hide specialty section
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
              <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
                {physiciansLoading ? (
                  <div className="text-center py-8">
                    <p>Loading physicians...</p>
                  </div>
                ) : sortedPhysicians.length === 0 ? (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-bold mb-4">No physicians found</h3>
                    <p className="text-gray-600 mb-8">Try adjusting your search criteria or filters.</p>
                    <button
                      onClick={clearAllFilters}
                      className="btn-primary"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Physician Grid/List */}
                    <div className={
                      activeLayout === "grid"
                        ? "flex flex-col md:flex-row flex-wrap gap-6"
                        : "flex flex-col flex-wrap gap-6"
                    }>
                      {sortedPhysicians.map((physician) => (
                        <div
                          key={physician.doctorID}
                          className={
                            activeLayout === "grid"
                              ? "block border border-primary rounded-normal p-3 w-full md:w-full lg:w-[calc(50%-12px)]"
                              : "block border border-primary rounded-normal p-3 w-full"
                          }
                        >
                          <div className="flex pb-6 gap-6">
                            <div
                              className={
                                activeLayout === "grid"
                                  ? "w-[30%] min-w-[118px] md:min-w-[133px] h-[124px] md:h-[140px]"
                                  : "min-w-[118px] md:min-w-[200px] h-[124px] md:h-[200px]"
                              }
                            >
                              <img
                                src={physician.profileImageUrl || "/media/doctor1.png"}
                                alt={`${physician.firstName} ${physician.lastName}`}
                                className={
                                  activeLayout === "grid"
                                    ? "border border-lightPrimary rounded-normal w-full h-full object-cover"
                                    : "border border-lightPrimary rounded-normal w-full h-full object-cover"
                                }
                              />
                            </div>
                            <div className="block w-full">
                              <div
                                className={activeLayout === "grid" ? "block" : "flex gap-4"}
                              >
                                <h3 className="font-semibold text-bluePrimary text-lg pb-3">
                                  {physician.firstName} {physician.lastName}{physician.degree ? `, ${physician.degree}` : ''}
                                </h3>
                              </div>
                              <div
                                className={activeLayout === "grid" ? "block" : "block md:flex gap-4"}
                              >
                                <div className="block flex-1">
                                  <p
                                    className={
                                      activeLayout === "grid"
                                        ? "text-primary text-xs font-semibold pb-1"
                                        : "text-primary text-base font-semibold pb-1"
                                    }
                                  >
                                    Specialties
                                  </p>
                                  <p
                                    className={
                                      activeLayout === "grid"
                                        ? "text-grey3d text-xs pb-2"
                                        : "text-grey3d text-base pb-2"
                                    }
                                  >
                                    {Array.isArray(physician.specialties) 
                                      ? physician.specialties.join(', ') 
                                      : physician.specialties}
                                  </p>
                                  {(searchLocation || userLocation) && physician.distance !== undefined && (
                                    <>
                                      <p
                                        className={
                                          activeLayout === "grid"
                                            ? "text-primary text-xs font-semibold pb-1"
                                            : "text-primary text-base font-semibold pb-1"
                                        }
                                      >
                                        Distance
                                      </p>
                                      <p
                                        className={
                                          activeLayout === "grid"
                                            ? "text-grey3d text-xs pb-2"
                                            : "text-grey3d text-base pb-2"
                                        }
                                      >
                                        {physician.distance.toFixed(1)} miles away
                                      </p>
                                    </>
                                  )}
                                </div>
                                <div className="block flex-1">
                                  <p
                                    className={
                                      activeLayout === "grid"
                                        ? "text-primary text-xs font-semibold pb-1"
                                        : "text-primary text-base font-semibold pb-1"
                                    }
                                  >
                                    Location
                                  </p>
                                  <p
                                    className={
                                      activeLayout === "grid"
                                        ? "text-grey3d text-xs pb-2"
                                        : "text-grey3d text-base pb-2"
                                    }
                                  >
                                    {physician.practiceName && (
                                      <>
                                        {physician.practiceName} <br />
                                      </>
                                    )}
                                    {physician.address && (
                                      <>
                                        {physician.address} <br />
                                      </>
                                    )}
                                    {physician.city}, {physician.state} {physician.zip}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-full gap-3 border-t border-lightPrimary pt-3 items-center">
                            <a
                              href={`/physicians/${physician.slug || physician.doctorID}/`}
                              className="btn-md btn-outline-secondary flex-center !w-50 !px-1 font-semibold rounded-normal flex-1 text-center"
                            >
                              View Profile
                            </a>
                            <a
                              href={`tel:${physician.phoneNumber}`}
                              className="btn-md btn-outline-ternery !w-50 !px-1 rounded-normal font-semibold flex-1 flex items-center justify-center text-center"
                            >
                              Click to Call
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-end w-full mt-4">
                    <ul className="flex gap-3">
                      <li
                        className={`pagination-li pag-action ${parsedPage === 1 ? "!hidden md:!flex" : "cursor-pointer"}`}
                      >
                        <a
                          href={
                            parsedPage > 1
                              ? `${router.asPath.split("?")[0]}?${new URLSearchParams({
                                  ...router.query,
                                  page: parsedPage - 1,
                                }).toString()}`
                              : "#"
                          }
                          aria-disabled={parsedPage === 1}
                          className="flex items-center"
                        >
                          <svg
                            className="w-[20px] h-[20px] text-secondary"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M15 19l-7-7 7-7"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>{" "}
                          Previous Page
                        </a>
                      </li>
                      {/* Show only 4 page numbers at a time */}
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
                              href={`${router.asPath.split("?")[0]}?${new URLSearchParams({
                                ...router.query,
                                page: p,
                              }).toString()}`}
                              className={
                                parsedPage === p ? "font-bold text-secondary" : ""
                              }
                            >
                              {p}
                            </a>
                          </li>
                        ));
                      })()}
                      <li
                        className={`pagination-li pag-action ${parsedPage === totalPages ? "hidden" : "cursor-pointer"}`}
                      >
                        <a
                          href={
                            parsedPage < totalPages
                              ? `${router.asPath.split("?")[0]}?${new URLSearchParams({
                                  ...router.query,
                                  page: parsedPage + 1,
                                }).toString()}`
                              : "#"
                          }
                          aria-disabled={parsedPage === totalPages}
                          className="flex items-center"
                        >
                          Next Page{" "}
                          <svg
                            className="w-[20px] h-[20px] text-secondary"
                            viewBox="0 0 24 24"
                          >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
