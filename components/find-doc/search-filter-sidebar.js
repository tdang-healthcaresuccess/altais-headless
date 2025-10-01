import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';

const DocSearchFilterSidebar = ({ 
  specialityFilter = '',
  genderFilter = [],
  languageFilter = [],
  insuranceFilter = [],
  primaryCareFilter = false,
  availableSpecialties = [], 
  availableLanguages = [], 
  availableInsurances = [],
  onFilterChange = () => {}
}) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [speciality, setSpeciality] = useState(specialityFilter);
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);
  const [selectedGender, setSelectedGender] = useState(Array.isArray(genderFilter) ? genderFilter[0] || '' : genderFilter);
  const [selectedLanguages, setSelectedLanguages] = useState(Array.isArray(languageFilter) ? languageFilter : []);
  const [selectedInsurances, setSelectedInsurances] = useState(Array.isArray(insuranceFilter) ? insuranceFilter : []);
  const [selectedEducation, setSelectedEducation] = useState('');
  const [isPrimaryCare, setIsPrimaryCare] = useState(primaryCareFilter);

  // Update local state when props change
  useEffect(() => {
    setSpeciality(specialityFilter);
    setSelectedGender(Array.isArray(genderFilter) ? genderFilter[0] || '' : genderFilter);
    setSelectedLanguages(Array.isArray(languageFilter) ? languageFilter : []);
    setSelectedInsurances(Array.isArray(insuranceFilter) ? insuranceFilter : []);
    setIsPrimaryCare(primaryCareFilter);
  }, [specialityFilter, genderFilter, languageFilter, insuranceFilter, primaryCareFilter]);

  // Filter specialties based on input
  useEffect(() => {
    if (speciality.trim()) {
      const filtered = availableSpecialties.filter(specialty =>
        specialty.name && specialty.name.toLowerCase().includes(speciality.toLowerCase())
      );
      setSpecialitySuggestions(filtered);
    } else {
      setSpecialitySuggestions([]);
    }
  }, [speciality, availableSpecialties]);

  // Handle specialty input change
  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  };

  // Handle specialty selection
  const handleSelectSpeciality = (specialty) => {
    setSpeciality(specialty.name);
    setSpecialitySuggestions([]);
    onFilterChange({ specialty: specialty.name });
  };

  // Handle gender change
  const handleGenderChange = (gender) => {
    const newGender = selectedGender === gender ? '' : gender;
    setSelectedGender(newGender);
    onFilterChange({ gender: newGender });
  };

  // Handle language toggle
  const handleLanguageToggle = (language) => {
    const newLanguages = selectedLanguages.includes(language.name)
      ? selectedLanguages.filter(lang => lang !== language.name)
      : [...selectedLanguages, language.name];
    
    setSelectedLanguages(newLanguages);
    onFilterChange({ languages: newLanguages });
  };

  // Handle insurance toggle
  const handleInsuranceToggle = (insurance) => {
    const newInsurances = selectedInsurances.includes(insurance.name)
      ? selectedInsurances.filter(ins => ins !== insurance.name)
      : [...selectedInsurances, insurance.name];
    
    setSelectedInsurances(newInsurances);
    onFilterChange({ insurances: newInsurances });
  };

  // Handle education change
  const handleEducationChange = (education) => {
    const newEducation = selectedEducation === education ? '' : education;
    setSelectedEducation(newEducation);
    onFilterChange({ education: newEducation });
  };

  // Handle primary care toggle
  const handlePrimaryCareToggle = () => {
    const newIsPrimaryCare = !isPrimaryCare;
    setIsPrimaryCare(newIsPrimaryCare);
    onFilterChange({ isPrimaryCare: newIsPrimaryCare });
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const genderOptions = ['Female', 'Male'];
  const educationOptions = ['MD', 'DO', 'NP', 'PA'];

  const accordionItems = [
    {
      title: 'Specialty',
      content: (
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search..."
            value={speciality}
            onChange={handleSpecialityChange}
            className="filter-input"
          />
          {specialitySuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-inputBorder rounded-normal mt-1 max-h-40 overflow-y-auto shadow-sm">
              {specialitySuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm text-bluePrimary"
                  onClick={() => handleSelectSpeciality(suggestion)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Gender',
      content: (
        <div className="filter-result-box">
          {genderOptions.map((gender, index) => (
            <label key={index} className="list-items1 text-bluePrimary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGender === gender}
                onChange={() => handleGenderChange(gender)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{gender}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Languages',
      content: (
        <div className="filter-result-box max-h-48 overflow-y-auto">
          {availableLanguages.map((language, index) => (
            <label key={index} className="list-items1 text-bluePrimary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language.name)}
                onChange={() => handleLanguageToggle(language)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{language.name}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Accepted Insurance',
      content: (
        <div className="filter-result-box max-h-48 overflow-y-auto">
          {availableInsurances.map((insurance, index) => (
            <label key={index} className="list-items1 text-bluePrimary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedInsurances.includes(insurance.name)}
                onChange={() => handleInsuranceToggle(insurance)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{insurance.name}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Education',
      content: (
        <div className="filter-result-box">
          {educationOptions.map((education, index) => (
            <label key={index} className="list-items1 text-bluePrimary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedEducation === education}
                onChange={() => handleEducationChange(education)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{education}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Primary Care',
      content: (
        <div className="filter-result-box">
          <label className="list-items1 text-bluePrimary cursor-pointer">
            <input
              type="checkbox"
              checked={isPrimaryCare}
              onChange={handlePrimaryCareToggle}
              className="w-4 h-4 mr-2 accent-primary"
            />
            <span>Primary Care Provider</span>
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="filter-sidebar">
      <h3 className="text-[22px] leading-[32px] text-bluePrimary pb-6">Filter Results</h3>
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-lightPrimary py-3">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-bluePrimary hover:text-secondary"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-lg leading-[24px]">{item.title}</span>
            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
          </button>
          {openIndex === index && (
            <div className="pt-3">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocSearchFilterSidebar;
