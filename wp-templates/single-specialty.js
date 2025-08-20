import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Breadcrumb from "@/components/common/breadcrumb";
import SinglePageBanner from "@/components/common/single-page-banner";
import Layout from "@/components/Layout";
import SpecialityShortInfo from "@/components/common/specialty-short-info";
import DocSearchForm from "@/components/find-doc/search-form";
import DocSearchFilterSidebar from "@/components/find-doc/search-filter-sidebar";
import DocSearchList from "@/components/common/doctor-list";
import { dummyDoctors } from "@/components/DummyData";
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
export default function specialty(props) {

  const databaseId = props.__SEED_NODE__?.databaseId;
  const asPreview = props.__SEED_NODE__?.asPreview;

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
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content } = data?.specialty || {};

  // Specialty filter state and doctor filtering logic
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [practiceNameQuery, setPracticeNameQuery] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  // Update specialty filter when title changes
  useEffect(() => {
    if (title) {
      setSpecialityFilter(title);
    }
  }, [title]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState([]);
  const [insuranceFilter, setInsuranceFilter] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState(dummyDoctors);
  const [initialTotal, setInitialTotal] = useState(0);
  const [activeLayout, setActiveLayout] = useState("list");
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const DOCTORS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice((page - 1) * DOCTORS_PER_PAGE, page * DOCTORS_PER_PAGE);

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setPracticeNameQuery("");
    setGenderFilter([]);
    setEducationFilter([]);
    setInsuranceFilter([]);
    setSpecialityFilter(title || "");
    // Reset URL to only specialty
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.location.replace(url.pathname);
    }
  };

  useEffect(() => {
    const filterDoctors = () => {
      let filtered = dummyDoctors;
      // Always apply specialty filter first for initialTotal
      let specialtyFiltered = filtered;
      if (specialityFilter) {
        specialtyFiltered = specialtyFiltered.filter((doc) =>
          doc.node.doctorData.speciality
            .toLowerCase()
            .includes(specialityFilter.toLowerCase())
        );
      }
      // Set initialTotal to specialtyFiltered before other filters
      setInitialTotal(specialtyFiltered.length);
      // Now apply all filters for live results
      if (searchQuery) {
        specialtyFiltered = specialtyFiltered.filter((doc) =>
          doc.node.doctorData.doctorsName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }
      if (practiceNameQuery) {
        specialtyFiltered = specialtyFiltered.filter((doc) =>
          doc.node.doctorData.practiceName
            .toLowerCase()
            .includes(practiceNameQuery.toLowerCase())
        );
      }
      if (locationQuery) {
        const query = locationQuery.toLowerCase().replace(/\s+/g, ' ').trim();
        const queryWords = query.split(' ');
        specialtyFiltered = specialtyFiltered.filter((doc) => {
          const data = doc.node.doctorData;
          const fields = [data.address, data.city, data.addressCity, data.state, data.zipcode]
            .map(f => (f ? f.toLowerCase().replace(/\s+/g, ' ').trim() : ''));
          return fields.some(field =>
            queryWords.every(word => field.includes(word))
          );
        });
      }
      if (genderFilter.length > 0) {
        specialtyFiltered = specialtyFiltered.filter((doc) =>
          genderFilter.includes(doc.node.doctorData.sex)
        );
      }
      if (educationFilter.length > 0) {
        specialtyFiltered = specialtyFiltered.filter((doc) =>
          educationFilter.includes(doc.node.doctorData.medicalSchool)
        );
      }
      if (insuranceFilter.length > 0) {
        specialtyFiltered = specialtyFiltered.filter((doc) => {
          const ins = doc.node.doctorData.acceptedInsurance;
          if (Array.isArray(ins)) {
            return ins.some((i) => insuranceFilter.includes(i));
          } else if (typeof ins === "string") {
            return insuranceFilter.includes(ins);
          }
          return false;
        });
      }
      setFilteredDoctors(specialtyFiltered);
    };
    filterDoctors();
  }, [
    searchQuery,
    locationQuery,
    practiceNameQuery,
    specialityFilter,
    genderFilter,
    educationFilter,
    insuranceFilter,
    title
  ]);

  // Helper to get correct path for specialty page
  const getSpecialtyPath = () => {
    return router.asPath.split('?')[0];
  };

  // Helper to filter out unwanted query params
  const getCleanQuery = (query) => {
    const { wordpressNode, ...rest } = query;
    // Remove all instances of wordpressNode (array or string)
    if (Array.isArray(wordpressNode)) {
      return rest;
    }
    return rest;
  };

  // SSR-compatible search handler
  const handleSearch = (searchValue, locationValue) => {
    router.push({
      pathname: getSpecialtyPath(),
      query: {
        ...getCleanQuery(router.query),
        doctorName: searchValue || "",
        zipCode: locationValue || "",
        page: 1,
      },
    });
  };

  return (
    <Layout
      metaD={{
        titleTag: title ? `${title} | Altais` : "Altais: Shaping the Future of Healthcare",
        metaDescription: title
          ? `Find top physicians and specialists for ${title} at Altais. Compassionate, affordable, and connected care across California.`
          : "Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today."
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
        <SpecialityShortInfo name={title} />
        <DocSearchForm
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          setSearchQuery={(searchValue, locationValue) => handleSearch(searchValue, locationValue)}
          setLocationQuery={(searchValue, locationValue) => handleSearch(searchValue, locationValue)}
          activeLayout={activeLayout}
          setActiveLayout={setActiveLayout}
        />
        {/* Results Count, Clear All Filters Link, and LayoutOptions */}
        <div className="block container mx-auto mt-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-base">
              Showing {filteredDoctors.length} of {initialTotal} results
            </span>
            <span
              onClick={clearAllFilters}
              className="text-bluePrimary text-sm underline cursor-pointer ml-4"
              role="button"
              tabIndex={0}
            >
              Clear All Filters
            </span>
          </div>
          {/* If you have LayoutOptions component, use it here: */}
          {/* <LayoutOptions activeLayout={activeLayout} setActiveLayout={setActiveLayout} /> */}
        </div>
        <div className="block gap-[70px] pb-[155px] pt-6 md:pt-[40px] px-6 md:px-0">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-9 md:gap-8 lg:gap-[70px]">
              <div className="block w-full md:w-[calc(30%-16px)] lg:w-[calc(25%-35px)]">
                <div className="hidden md:block">
                  <DocSearchFilterSidebar
                    specialityFilter={specialityFilter}
                    setSpecialityFilter={setSpecialityFilter}
                    genderFilter={genderFilter}
                    setGenderFilter={setGenderFilter}
                    educationFilter={educationFilter}
                    setEducationFilter={setEducationFilter}
                    insuranceFilter={insuranceFilter}
                    setInsuranceFilter={setInsuranceFilter}
                    clearAllFilters={clearAllFilters}
                  />
                </div>
                <div className="block md:hidden">
                  <button
                    type="button"
                    className="btn-md flex-center btn-normal gap-3 w-full"
                  >
                    Apply Filter and Sort
                  </button>
                </div>
              </div>
              <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
                <DocSearchList
                  doctors={paginatedDoctors}
                  activeLayout={activeLayout}
                />
                {/* SSR Pagination Controls */}
                {filteredDoctors.length > DOCTORS_PER_PAGE && (
                  <div className="flex justify-end w-full mt-4">
                    <ul className="flex gap-3">
                      <li
                        className={`pagination-li pag-action ${page === 1 ? '!hidden md:!flex' : 'cursor-pointer'}`}
                      >
                        <a
                          href={page > 1 ? `${getSpecialtyPath()}?${Object.entries({ ...getCleanQuery(router.query), page: page - 1 }).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}` : '#'}
                          aria-disabled={page === 1}
                          className="flex items-center"
                        >
                          <svg className="w-[20px] h-[20px] text-secondary" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> Previous Page
                        </a>
                      </li>
                      {/* Show only 4 page numbers at a time */}
                      {(() => {
                        let startPage = Math.max(1, page - 2);
                        let endPage = Math.min(totalPages, startPage + 3);
                        if (endPage - startPage < 3) {
                          startPage = Math.max(1, endPage - 3);
                        }
                        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
                          <li
                            key={p}
                            className={`pagination-li ${page === p ? 'active' : ''} cursor-pointer`}
                          >
                            <a
                              href={`${getSpecialtyPath()}?${Object.entries({ ...getCleanQuery(router.query), page: p }).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`}
                              className={page === p ? 'font-bold text-secondary' : ''}
                            >
                              {p}
                            </a>
                          </li>
                        ));
                      })()}
                      <li
                        className={`pagination-li pag-action ${page === totalPages ? 'hidden' : 'cursor-pointer'}`}
                      >
                        <a
                          href={page < totalPages ? `${getSpecialtyPath()}?${Object.entries({ ...getCleanQuery(router.query), page: page + 1 }).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}` : '#'}
                          aria-disabled={page === totalPages}
                          className="flex items-center"
                        >
                          Next Page <svg className="w-[20px] h-[20px] text-secondary" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
