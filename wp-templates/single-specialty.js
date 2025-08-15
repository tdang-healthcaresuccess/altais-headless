
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
  const [activeLayout, setActiveLayout] = useState("list");

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setPracticeNameQuery("");
    setSpecialityFilter(title || "");
    setGenderFilter([]);
    setEducationFilter([]);
    setInsuranceFilter([]);
  };

  useEffect(() => {
    const filterDoctors = () => {
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
        const query = locationQuery.toLowerCase().replace(/\s+/g, ' ').trim();
        const queryWords = query.split(' ');
        filtered = filtered.filter((doc) => {
          const data = doc.node.doctorData;
          const fields = [data.address, data.city, data.addressCity, data.state, data.zipcode]
            .map(f => (f ? f.toLowerCase().replace(/\s+/g, ' ').trim() : ''));
          return fields.some(field =>
            queryWords.every(word => field.includes(word))
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
      setFilteredDoctors(filtered);
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

  return (
    <Layout>
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
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          activeLayout={activeLayout}
          setActiveLayout={setActiveLayout}
        />
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
                  doctors={filteredDoctors}
                  activeLayout={activeLayout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
