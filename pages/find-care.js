"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
import DocSearchForm from "components/find-doc/search-form";
import LayoutOptions from "@/components/common/LayoutOptions";
import DocSearchFilterSidebar from "components/find-doc/search-filter-sidebar";
import DocSearchList from "@/components/common/doctor-list";
import { dummyDoctors, specialitiesList } from "../components/DummyData";
import { FilterMobile } from "@/public/icons/filter-mobile";

export async function getServerSideProps(context) {
  const DOCTORS_PER_PAGE = 10;
  const page = parseInt(context.query.page) || 1;

  // Read filters from query
  let searchQuery = context.query.doctorName || "";
  // If searchQuery is a comma-separated string, convert to array
  if (typeof searchQuery === "string" && searchQuery.includes(",")) {
    searchQuery = searchQuery.split(",").map(s => s.trim()).filter(Boolean);
  }
  const locationQuery = context.query.zipCode || "";
  const practiceNameQuery = context.query.practiceName || "";
  const specialityFilter = context.query.specialty || "";
  const genderFilter = context.query.gender
    ? [].concat(context.query.gender)
    : [];
  const educationFilter = context.query.education
    ? [].concat(context.query.education)
    : [];
  const insuranceFilter = context.query.insurance
    ? [].concat(context.query.insurance)
    : [];

  // Filtering logic (SSR)
  let filtered = dummyDoctors;
  if (searchQuery) {
    // If searchQuery is an array, match any term; else match single term
    const terms = Array.isArray(searchQuery) ? searchQuery : [searchQuery];
    filtered = filtered.filter((doc) => {
      return terms.some((t) => {
        const term = t.toLowerCase();
        const nameMatch = doc.node.doctorData.doctorsName
          ?.toLowerCase()
          .includes(term);
        const spec1Match = doc.node.doctorData.spec1
          ?.toLowerCase()
          .includes(term);
        const spec2Match = doc.node.doctorData.spec2
          ?.toLowerCase()
          .includes(term);
        const spec3Match = doc.node.doctorData.spec3
          ?.toLowerCase()
          .includes(term);
        return nameMatch || spec1Match || spec2Match || spec3Match;
      });
    });
  }
  if (practiceNameQuery) {
    filtered = filtered.filter((doc) =>
      doc.node.doctorData.practiceName
        .toLowerCase()
        .includes(practiceNameQuery.toLowerCase())
    );
  }
  if (locationQuery) {
    const query = locationQuery.toLowerCase().replace(/\s+/g, " ").trim();
    const queryWords = query.split(" ");
    filtered = filtered.filter((doc) => {
      const data = doc.node.doctorData;
      const fields = [
        data.address,
        data.city,
        data.addressCity,
        data.state,
        data.zipcode,
      ].map((f) => (f ? f.toLowerCase().replace(/\s+/g, " ").trim() : ""));
      return fields.some((field) =>
        queryWords.every((word) => field.includes(word))
      );
    });
  }
  if (specialityFilter) {
    filtered = filtered.filter((doc) =>
      doc.node.doctorData.speciality
        .toLowerCase()
        .includes(specialityFilter.toLowerCase())
    );
  }
  if (genderFilter.length > 0) {
    filtered = filtered.filter((doc) =>
      genderFilter.includes(doc.node.doctorData.sex)
    );
  }
  if (educationFilter.length > 0) {
    filtered = filtered.filter((doc) =>
      educationFilter.includes(doc.node.doctorData.medicalSchool)
    );
  }
  if (insuranceFilter.length > 0) {
    filtered = filtered.filter((doc) => {
      const ins = doc.node.doctorData.acceptedInsurance;
      if (Array.isArray(ins)) {
        return ins.some((i) => insuranceFilter.includes(i));
      } else if (typeof ins === "string") {
        return insuranceFilter.includes(ins);
      }
      return false;
    });
  }

  // Pagination
  const total = filtered.length;
  const start = (page - 1) * DOCTORS_PER_PAGE;
  const end = start + DOCTORS_PER_PAGE;
  const paginatedDoctors = filtered.slice(start, end);

  return {
    props: {
      doctors: paginatedDoctors,
      page,
      total,
      totalPages: Math.ceil(total / DOCTORS_PER_PAGE),
      filters: {
        searchQuery,
        locationQuery,
        practiceNameQuery,
        specialityFilter,
        genderFilter,
        educationFilter,
        insuranceFilter,
      },
    },
  };
}

import { useRouter } from "next/router";
import { X } from "lucide-react";

export default function FindCare({
  doctors,
  page,
  total,
  totalPages,
  filters,
}) {
  const [activeLayout, setActiveLayout] = React.useState("list");
  const [filteredDoctors, setFilteredDoctors] = React.useState(doctors);
  const [filteredTotal, setFilteredTotal] = React.useState(total);
  const router = useRouter();

  // SSR-compatible handlers for input fields
  // Unified search trigger: always include both fields in query
  const handleSearch = (searchValue, locationValue) => {
    // If searchValue is an array, join to string for query param
    const doctorNameParam = Array.isArray(searchValue) ? searchValue.join(",") : searchValue || "";
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        doctorName: doctorNameParam,
        zipCode: locationValue || "",
        page: 1,
      },
    });
  };

  // Handler for filter sidebar changes
  const handleFilterChange = (newFilters) => {
    // Filtering logic (client-side, matches SSR logic)
    let filtered = doctors;
    if (newFilters.specialityFilter) {
      filtered = filtered.filter((doc) =>
        doc.node.doctorData.speciality
          .toLowerCase()
          .includes(newFilters.specialityFilter.toLowerCase())
      );
    }
    if (newFilters.genderFilter.length > 0) {
      filtered = filtered.filter((doc) =>
        newFilters.genderFilter.includes(doc.node.doctorData.sex)
      );
    }
    if (newFilters.educationFilter.length > 0) {
      filtered = filtered.filter((doc) =>
        newFilters.educationFilter.includes(doc.node.doctorData.medicalSchool)
      );
    }
    if (newFilters.insuranceFilter.length > 0) {
      filtered = filtered.filter((doc) => {
        const ins = doc.node.doctorData.acceptedInsurance;
        if (Array.isArray(ins)) {
          return ins.some((i) => newFilters.insuranceFilter.includes(i));
        } else if (typeof ins === "string") {
          return newFilters.insuranceFilter.includes(ins);
        }
        return false;
      });
    }
    setFilteredDoctors(filtered);
    setFilteredTotal(filtered.length);
  };

  const [showFilter, setShowFilter] = useState(false);
  const handleToggleFilterMobile = () => setShowFilter(true);
  const handleCloseMobileFilter = () => setShowFilter(false);

  return (
    <Layout
      metaD={{
        titleTag: page > 1 ? `Find Care | Altais - Page ${page}` : "Find Care | Altais",
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
          searchQuery={filters.searchQuery}
          locationQuery={filters.locationQuery}
          setSearchQuery={(searchValue, locationValue) =>
            handleSearch(searchValue, locationValue)
          }
          setLocationQuery={(searchValue, locationValue) =>
            handleSearch(searchValue, locationValue)
          }
          activeLayout={activeLayout}
          setActiveLayout={setActiveLayout}
        />
        {/* Results Count, Clear All Filters Link, and LayoutOptions */}
        <div className="container mx-auto">
          <div className="flex justify-between gap-10 pt-9 pb-6 border-b border-lightPrimary">
            <div className="flex flex-col gap-2">
              <span className="text-bluePrimary text-sm">
                Showing {filteredDoctors.length} of {filteredTotal} results
              </span>
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
              <div className="block w-full md:w-[calc(30%-16px)] lg:w-[calc(25%-35px)]">
                {showFilter ? (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center p-5 bg-grey00BF z-50">
                    <button onClick={handleCloseMobileFilter} type="button" className="absolute top-2 right-2">
                      <X size={28} color="#fff" />
                    </button>
                    <div className="block bg-white p-5 w-full rounded-normal">
                      <DocSearchFilterSidebar
                        specialityFilter={filters.specialityFilter}
                        genderFilter={filters.genderFilter}
                        educationFilter={filters.educationFilter}
                        insuranceFilter={filters.insuranceFilter}
                        onFilterChange={handleFilterChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <DocSearchFilterSidebar
                      specialityFilter={filters.specialityFilter}
                      genderFilter={filters.genderFilter}
                      educationFilter={filters.educationFilter}
                      insuranceFilter={filters.insuranceFilter}
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
              <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
                {/* Only show filteredDoctors if filtering is active, else show doctors */}
                <DocSearchList
                  doctors={filteredDoctors.length ? filteredDoctors : doctors}
                  activeLayout={activeLayout}
                />
                {/* Pagination Controls (styled and placed like doctor-list.js) */}
                {total > 10 && (
                  <div className="flex justify-end w-full mt-4">
                    <ul className="flex gap-3">
                      <li
                        className={`pagination-li pag-action ${page === 1 ? "!hidden md:!flex" : "cursor-pointer"}`}
                      >
                        <a
                          href={
                            page > 1
                              ? `/find-care?page=${page - 1}${filters.searchQuery ? `&doctorName=${encodeURIComponent(filters.searchQuery)}` : ""}${filters.locationQuery ? `&zipCode=${encodeURIComponent(filters.locationQuery)}` : ""}${filters.specialityFilter ? `&specialty=${encodeURIComponent(filters.specialityFilter)}` : ""}`
                              : "#"
                          }
                          aria-disabled={page === 1}
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
                      {(() => {
                        let startPage = Math.max(1, page - 2);
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
                            className={`pagination-li ${page === p ? "active" : ""} cursor-pointer`}
                          >
                            <a
                              href={`/find-care?page=${p}${filters.searchQuery ? `&doctorName=${encodeURIComponent(filters.searchQuery)}` : ""}${filters.locationQuery ? `&zipCode=${encodeURIComponent(filters.locationQuery)}` : ""}${filters.specialityFilter ? `&specialty=${encodeURIComponent(filters.specialityFilter)}` : ""}`}
                              className={
                                page === p ? "font-bold text-secondary" : ""
                              }
                            >
                              {p}
                            </a>
                          </li>
                        ));
                      })()}
                      <li
                        className={`pagination-li pag-action ${page === totalPages ? "hidden" : "cursor-pointer"}`}
                      >
                        <a
                          href={
                            page < totalPages
                              ? `/find-care?page=${page + 1}${filters.searchQuery ? `&doctorName=${encodeURIComponent(filters.searchQuery)}` : ""}${filters.locationQuery ? `&zipCode=${encodeURIComponent(filters.locationQuery)}` : ""}${filters.specialityFilter ? `&specialty=${encodeURIComponent(filters.specialityFilter)}` : ""}`
                              : "#"
                          }
                          aria-disabled={page === totalPages}
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
                {/* Results count moved above Clear All Filters */}
              </div>
            </div>
          </div>
          <div className="container mx-auto">
           <p className="italic text-sm normal-content pt-5">The Find a Doctor directory is published by Altais Physicians as a way to find Altais-affiliated physicians in the San Francisco Bay Area. This directory may not be republished, sold, resold, copied, duplicated or downloaded in whole or in part, for commercial or any other purposes, such as the distribution of mailing lists.
Altais Physicians makes no guarantee or warranty as to the accuracy or completeness of the information in this directory. You should verify the accuracy of the information directly with the physician’s office. Altais Physicians does not recommend or endorse any particular provider in the directory.
Using the directory is not a reliable method to verify the credentials or licenses of any physician in the directory. Altais Physicians is not responsible for any loss or damage caused by your reliance on information in the directory.
</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
