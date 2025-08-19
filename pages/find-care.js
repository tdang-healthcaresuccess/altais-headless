import React from "react";
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
  const searchQuery = context.query.doctorName || "";
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
    filtered = filtered.filter((doc) =>
      doc.node.doctorData.doctorsName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
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

export default function FindCare({
  doctors,
  page,
  total,
  totalPages,
  filters,
}) {
  const [activeLayout, setActiveLayout] = React.useState("list");
  const router = useRouter();

  // SSR-compatible handlers for input fields
  // Unified search trigger: always include both fields in query
  const handleSearch = (searchValue, locationValue) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        doctorName: searchValue || "",
        zipCode: locationValue || "",
        page: 1,
      },
    });
  };

  return (
    <Layout metaD={{
    titleTag: "Find a Doctor | Altais",
    metaDescription: "Search for compassionate, affordable, and connected care providers across California with Altais."
  }}>
      <div className="block">
        <InnerPageBanner
          DesktopBanner="bg-findDoc-landing-banner"
          MobileBanner="bg-findDoc-landing-banner-mobile"
          heading="Find a Doctor"
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
                Showing {doctors.length} of {total} results
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
                <div className="hidden md:block">
                  <DocSearchFilterSidebar
                    specialityFilter={filters.specialityFilter}
                    genderFilter={filters.genderFilter}
                    educationFilter={filters.educationFilter}
                    insuranceFilter={filters.insuranceFilter}
                  />
                </div>
                <div className="block md:hidden">
                  <button
                    type="button"
                    className="btn-md flex-center btn-normal btn-filter gap-3 w-full"
                  >
                    <FilterMobile />
                    Apply Filter and Sort
                  </button>
                </div>
              </div>
              <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
                <DocSearchList doctors={doctors} activeLayout={activeLayout} />
                {/* Pagination Controls (styled and placed like doctor-list.js) */}
                {total > 10 && (
                  <div className="flex justify-end w-full mt-4">
                    <ul className="flex gap-3">
                      <li
                        className={`pagination-li pag-action ${page === 1 ? "!hidden md:!flex" : "cursor-pointer"}`}
                      >
                        <a
                          href={page > 1 ? `/find-care?page=${page - 1}` : "#"}
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
                              href={`/find-care?page=${p}`}
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
                              ? `/find-care?page=${page + 1}`
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
        </div>
      </div>
    </Layout>
  );
}
