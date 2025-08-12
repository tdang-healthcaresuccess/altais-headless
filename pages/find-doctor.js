import React, { useState, useEffect } from 'react';
import DocSearchForm from 'components/find-doc/search-form'
import DocSearchFilterSidebar from 'components/find-doc/search-filter-sidebar';
import DocSearchList from 'components/find-doc/doctor-list';
import { dummyDoctors, specialitiesList } from 'components/DummyData';
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from '@/components/Layout';
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const [insuranceFilter, setInsuranceFilter] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState(dummyDoctors);
  const [activeLayout, setActiveLayout] = useState('list'); // 'list' or 'grid'

  // Function to reset all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSpecialityFilter('');
    setGenderFilter('');
    setEducationFilter('');
    setInsuranceFilter([]);
  };

  useEffect(() => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const lowerCaseLocationQuery = locationQuery.toLowerCase();
    const lowerCaseSpecialityFilter = specialityFilter.toLowerCase();

    // Split search queries into words for fuzzy-like matching
    const searchWords = lowerCaseSearchQuery.split(' ').filter(Boolean);
    const locationWords = lowerCaseLocationQuery.split(' ').filter(Boolean);

    const newFilteredDoctors = dummyDoctors.filter((doc) => {
      const doctorData = doc.node.doctorData;

      // Fuzzy search logic for doctor/hospital/specialty
      const matchesSearch = searchWords.every(word =>
        doctorData.doctorsName.toLowerCase().includes(word) ||
        (doctorData.practiceName && doctorData.practiceName.toLowerCase().includes(word)) ||
        (doctorData.speciality && doctorData.speciality.toLowerCase().includes(word)) ||
        (doctorData.spec1 && doctorData.spec1.toLowerCase().includes(word)) ||
        (doctorData.spec2 && doctorData.spec2.toLowerCase().includes(word)) ||
        (doctorData.spec3 && doctorData.spec3.toLowerCase().includes(word))
      );

      // Fuzzy search logic for location
      const matchesLocation = locationWords.every(word =>
        (doctorData.addressCity && doctorData.addressCity.toLowerCase().includes(word)) ||
        (doctorData.state && doctorData.state.toLowerCase().includes(word)) ||
        (doctorData.zipcode && doctorData.zipcode.includes(word))
      );

      // Other filter logic
      const matchesSpeciality = lowerCaseSpecialityFilter === '' || doctorData.speciality.toLowerCase().includes(lowerCaseSpecialityFilter);
      const matchesGender = genderFilter === '' || doctorData.gender === genderFilter;
      const matchesEducation = educationFilter === '' || doctorData.education === educationFilter;
      const matchesInsurance = insuranceFilter.length === 0 || insuranceFilter.every(ins => doctorData.acceptedInsurance?.includes(ins));

      // Return true if all criteria are met
      return matchesSearch && matchesLocation && matchesSpeciality && matchesGender && matchesEducation && matchesInsurance;
    });

    setFilteredDoctors(newFilteredDoctors);
  }, [searchQuery, locationQuery, specialityFilter, genderFilter, educationFilter, insuranceFilter]);

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
                <button type="button" className="btn-md flex-center btn-normal gap-3 w-full">
                  Apply Filter and Sort
                </button>
              </div>
            </div>
            <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
              <DocSearchList doctors={filteredDoctors} activeLayout={activeLayout} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

