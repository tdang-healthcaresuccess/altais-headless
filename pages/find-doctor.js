import React, { useState, useEffect } from "react";
import DocSearchForm from "components/find-doc/search-form";
import DocSearchFilterSidebar from "components/find-doc/search-filter-sidebar";
import DocSearchList from "components/find-doc/doctor-list";
import { dummyDoctors, specialitiesList } from "components/DummyData";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";
export default function FindDoctor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [practiceNameQuery, setPracticeNameQuery] = useState(""); // Added practiceNameQuery
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState([]);
  const [insuranceFilter, setInsuranceFilter] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState(dummyDoctors);
  const [activeLayout, setActiveLayout] = useState("list"); // 'list' or 'grid'

  // Function to reset all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setPracticeNameQuery("");
    setSpecialityFilter("");
    setGenderFilter([]);
    setEducationFilter([]);
    setInsuranceFilter([]);
  };

  // Effect to read search parameters from the URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const doctorNameParam = params.get("doctorName");
    const zipCodeParam = params.get("zipCode");
    const practiceNameParam = params.get("practiceName");
    const specialtyParam = params.get("specialty");

    // Update state only if a parameter exists in the URL
    if (doctorNameParam) setSearchQuery(doctorNameParam);
    if (zipCodeParam) setLocationQuery(zipCodeParam);
    if (practiceNameParam) setPracticeNameQuery(practiceNameParam);
    if (specialtyParam) setSpecialityFilter(specialtyParam);
  }, []);

  useEffect(() => {
    const filterDoctors = () => {
      let filtered = dummyDoctors;

      // Filter by search query (doctor name)
      if (searchQuery) {
        filtered = filtered.filter((doc) =>
          doc.node.doctorData.doctorsName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }

      // Filter by practice name query
      if (practiceNameQuery) {
        filtered = filtered.filter((doc) =>
          doc.node.doctorData.practiceName
            .toLowerCase()
            .includes(practiceNameQuery.toLowerCase())
        );
      }

      // Filter by location query (zip code)
      if (locationQuery) {
        filtered = filtered.filter(
          (doc) =>
            doc.node.doctorData.zipcode &&
            doc.node.doctorData.zipcode.startsWith(locationQuery)
        );
      }

      // Filter by specialty
      if (specialityFilter) {
        filtered = filtered.filter((doc) =>
          doc.node.doctorData.speciality
            .toLowerCase()
            .includes(specialityFilter.toLowerCase())
        );
      }

      // Filter by gender
      if (genderFilter.length > 0) {
        filtered = filtered.filter((doc) =>
          genderFilter.includes(doc.node.doctorData.sex)
        );
      }

      // Filter by education
      if (educationFilter.length > 0) {
        filtered = filtered.filter((doc) =>
          educationFilter.includes(doc.node.doctorData.medicalSchool)
        );
      }

      // Filter by insurance
      if (insuranceFilter.length > 0) {
        filtered = filtered.filter((doc) =>
          doc.node.doctorData.acceptedInsurance.some((insurance) =>
            insuranceFilter.includes(insurance)
          )
        );
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
  ]);

  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-findDoc-landing-banner"
          MobileBanner="bg-findDoc-landing-banner-mobile"
          heading="Find a Doctor"
        />
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
