"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
import DocSearchForm from "components/find-doc/search-form";
import LayoutOptions from "@/components/common/LayoutOptions";
import DocSearchFilterSidebar from "components/find-doc/search-filter-sidebar";
import PhysicianCard from "@/components/common/PhysicianCard";
import { FilterMobile } from "@/public/icons/filter-mobile";
import { useFaustQuery } from "@faustwp/core";
import { GET_PHYSICIANS_FILTERED, GET_SPECIALTIES, GET_LANGUAGES } from "../queries/PhysicianQueries";
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

  // Get filter parameters from URL
  const {
    doctorName: searchQuery = "",
    zipCode: locationQuery = "",
    specialty: specialityFilter = "",
    gender: genderFilter = "",
    language: languageFilter = "",
    primaryCare: primaryCareFilter = false,
    page: currentPage = 1
  } = router.query;

  // Convert URL params to proper format
  const parsedPage = parseInt(currentPage) || 1;
  const parsedGenderFilter = genderFilter ? [].concat(genderFilter) : [];
  const parsedPrimaryCare = primaryCareFilter === 'true';

  // Get physicians data with current filters
  const { data: physiciansData, loading: physiciansLoading, error: physiciansError } = useFaustQuery(GET_PHYSICIANS_FILTERED, {
    variables: {
      search: searchQuery || null,
      specialty: specialityFilter || null,
      language: languageFilter || null,
      gender: genderFilter || null,
      primaryCare: parsedPrimaryCare || null,
      page: parsedPage,
      perPage: 10,
      orderBy: "last_name",
      order: "ASC"
    },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true
  }) || {};

  // Get available specialties and languages for filters
  const { data: specialtiesData } = useFaustQuery(GET_SPECIALTIES, {
    errorPolicy: 'all'
  }) || {};
  const { data: languagesData } = useFaustQuery(GET_LANGUAGES, {
    errorPolicy: 'all'
  }) || {};

  const physicians = physiciansData?.doctorsList?.items || [];
  const total = physiciansData?.doctorsList?.total || 0;
  const totalPages = Math.ceil(total / 10);
  const availableSpecialties = specialtiesData?.specialties || [];
  const availableLanguages = languagesData?.languages || [];

  // Handler for search form
  const handleSearch = (searchValue, locationValue) => {
    const query = {
      ...router.query,
      page: 1 // Reset to first page on new search
    };

    if (searchValue) {
      query.doctorName = Array.isArray(searchValue) ? searchValue.join(",") : searchValue;
    } else {
      delete query.doctorName;
    }

    if (locationValue) {
      query.zipCode = locationValue;
    } else {
      delete query.zipCode;
    }

    router.push({
      pathname: router.pathname,
      query
    });
  };

  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    const query = {
      ...router.query,
      page: 1 // Reset to first page on filter change
    };

    // Update query parameters based on filter changes
    if (newFilters.specialityFilter) {
      query.specialty = newFilters.specialityFilter;
    } else {
      delete query.specialty;
    }

    if (newFilters.genderFilter && newFilters.genderFilter.length > 0) {
      query.gender = newFilters.genderFilter;
    } else {
      delete query.gender;
    }

    if (newFilters.languageFilter) {
      query.language = newFilters.languageFilter;
    } else {
      delete query.language;
    }

    if (newFilters.primaryCareFilter) {
      query.primaryCare = 'true';
    } else {
      delete query.primaryCare;
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
                        availableSpecialties={availableSpecialties}
                        availableLanguages={availableLanguages}
                        onFilterChange={handleFilterChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <DocSearchFilterSidebar
                      specialityFilter={specialityFilter}
                      genderFilter={parsedGenderFilter}
                      languageFilter={languageFilter}
                      primaryCareFilter={parsedPrimaryCare}
                      availableSpecialties={availableSpecialties}
                      availableLanguages={availableLanguages}
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
                      {physicians.map((physician) => (
                        <PhysicianCard 
                          key={physician.doctorID} 
                          physician={physician}
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