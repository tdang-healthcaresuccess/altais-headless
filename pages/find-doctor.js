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
  const [genderFilter, setGenderFilter] = useState([]); // Changed to an array
  const [educationFilter, setEducationFilter] = useState([]); // Changed to an array
  const [insuranceFilter, setInsuranceFilter] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]); // New state for languages
  const [filteredDoctors, setFilteredDoctors] = useState(dummyDoctors);
  const [activeLayout, setActiveLayout] = useState('list'); // 'list' or 'grid'

  // Function to reset all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSpecialityFilter('');
    setGenderFilter([]); // Reset to empty array
    setEducationFilter([]); // Reset to empty array
    setInsuranceFilter([]);
    setLanguageFilter([]); // Reset to empty array
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
      const matchesGender = genderFilter.length === 0 || genderFilter.includes(doctorData.gender);
      const matchesEducation = educationFilter.length === 0 || educationFilter.includes(doctorData.education);
      const matchesInsurance = insuranceFilter.length === 0 || insuranceFilter.every(ins => doctorData.acceptedInsurance?.includes(ins));
      const matchesLanguage = languageFilter.length === 0 || languageFilter.some(lang => doctorData.languages?.includes(lang));

      // Return true if all criteria are met
      return matchesSearch && matchesLocation && matchesSpeciality && matchesGender && matchesEducation && matchesInsurance && matchesLanguage;
    });

    setFilteredDoctors(newFilteredDoctors);
  }, [searchQuery, locationQuery, specialityFilter, genderFilter, educationFilter, insuranceFilter, languageFilter]);

  return (
    <div className="bg-white p-6 md:p-10 min-h-screen font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-bluePrimary mb-8">Find a Doctor</h1>
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
                  languageFilter={languageFilter}
                  setLanguageFilter={setLanguageFilter}
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
  );
}
