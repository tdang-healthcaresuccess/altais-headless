import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { getSpecialtySuggestions, resolveSpecialtyAcronym } from '../specialtySearchUtils';

const DocSearchFilterSidebar = ({ 
  specialityFilter = '',
  genderFilter = [],
  languageFilter = [],
  insuranceFilter = [],
  educationFilter = '',
  availableSpecialties = [], 
  availableLanguages = [], 
  availableInsurances = [],
  availableDegrees = [],
  onFilterChange = () => {},
  hideSpecialtyFilter = false // New prop to hide specialty filter
}) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [speciality, setSpeciality] = useState(specialityFilter);
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);
  const [selectedGender, setSelectedGender] = useState(Array.isArray(genderFilter) ? genderFilter[0] || '' : genderFilter);
  const [selectedLanguages, setSelectedLanguages] = useState(Array.isArray(languageFilter) ? languageFilter : []);
  const [selectedInsurances, setSelectedInsurances] = useState(Array.isArray(insuranceFilter) ? insuranceFilter : []);
  const [selectedEducation, setSelectedEducation] = useState(educationFilter);

  // Update local state when props change
  useEffect(() => {
    setSpeciality(specialityFilter);
    setSelectedGender(Array.isArray(genderFilter) ? genderFilter[0] || '' : genderFilter);
    setSelectedLanguages(Array.isArray(languageFilter) ? languageFilter : []);
    setSelectedInsurances(Array.isArray(insuranceFilter) ? insuranceFilter : []);
    setSelectedEducation(educationFilter);
  }, [specialityFilter, genderFilter, languageFilter, insuranceFilter, educationFilter]);

  // Filter specialties based on input with acronym mapping and user input suggestions
  useEffect(() => {
    if (speciality.trim()) {
      // Don't show suggestions if the input exactly matches an available specialty
      const exactMatch = availableSpecialties.some(specialty => 
        specialty && specialty.toLowerCase() === speciality.toLowerCase()
      );
      
      // Also check if this input resolves to a known specialty (but only if it actually resolved to something different)
      const resolvedSpecialty = resolveSpecialtyAcronym(speciality);
      const wasActuallyResolved = Array.isArray(resolvedSpecialty) || 
        (resolvedSpecialty !== speciality && resolvedSpecialty.toLowerCase() !== speciality.toLowerCase());
      
      const isResolvedMatch = wasActuallyResolved && (
        Array.isArray(resolvedSpecialty) 
          ? resolvedSpecialty.some(spec => spec.toLowerCase() === speciality.toLowerCase())
          : resolvedSpecialty.toLowerCase() === speciality.toLowerCase()
      );
      
      if (!exactMatch && !isResolvedMatch) {
        // Use enhanced suggestions - pass empty array to avoid GraphQL limitation
        // This allows fuzzy search to work with acronym map values independently
        const suggestions = getSpecialtySuggestions(speciality, []);
        setSpecialitySuggestions(suggestions);
      } else {
        setSpecialitySuggestions([]);
      }
    } else {
      setSpecialitySuggestions([]);
    }
  }, [speciality, availableSpecialties]);

  // Handle specialty input change
  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  };

  // Handle Enter key press for specialty search
  const handleSpecialityKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (speciality.trim()) {
        // If there are suggestions, use the first one, otherwise use the typed value
        const searchTerm = specialitySuggestions.length > 0 ? specialitySuggestions[0] : speciality;
        handleSelectSpeciality(searchTerm);
        // Explicitly close suggestions after Enter
        setSpecialitySuggestions([]);
      }
    }
  };

  // Handle specialty selection
  const handleSelectSpeciality = (specialty) => {
    let selectedValue = specialty;
    
    // Handle "Search for" options - extract the actual search term
    if (specialty.startsWith('Search for "') && specialty.endsWith('"')) {
      selectedValue = specialty.slice(12, -1); // Remove 'Search for "' and '"'
    }
    
    setSpeciality(selectedValue);
    setSpecialitySuggestions([]);
    
    // Resolve acronyms when setting the filter - now supporting arrays
    const resolvedSpecialty = resolveSpecialtyAcronym(selectedValue);
    
    // Send array or single value as appropriate
    let filterValue;
    if (Array.isArray(resolvedSpecialty)) {
      // GraphQL now supports array of specialties
      filterValue = resolvedSpecialty;
    } else {
      // Single specialty - send as array for consistency  
      filterValue = [resolvedSpecialty];
    }
    
    console.log(`Setting specialty filter:`, filterValue);
    onFilterChange({ specialty: filterValue });
  };

  // Handle gender change
  const handleGenderChange = (gender) => {
    const newGender = selectedGender === gender ? '' : gender;
    setSelectedGender(newGender);
    onFilterChange({ gender: newGender });
  };

  // Handle language toggle
  const handleLanguageToggle = (language) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(lang => lang !== language)
      : [...selectedLanguages, language];
    
    setSelectedLanguages(newLanguages);
    onFilterChange({ languages: newLanguages });
  };

  // Handle insurance toggle
  const handleInsuranceToggle = (insurance) => {
    const newInsurances = selectedInsurances.includes(insurance)
      ? selectedInsurances.filter(ins => ins !== insurance)
      : [...selectedInsurances, insurance];
    
    setSelectedInsurances(newInsurances);
    onFilterChange({ insurances: newInsurances });
  };

  // Handle education change
  const handleEducationChange = (education) => {
    const newEducation = selectedEducation === education ? '' : education;
    setSelectedEducation(newEducation);
    onFilterChange({ education: newEducation });
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const genderOptions = [
    { label: 'Female', value: 'F' },
    { label: 'Male', value: 'M' },
    { label: 'Non-binary', value: 'N' }
  ];
  // Use actual degrees from database instead of hardcoded options
  const educationOptions = availableDegrees.length > 0 ? availableDegrees : ['MD', 'DO', 'NP', 'PA', 'DPM', 'LCSW', 'ACU', 'RD', 'PharmD', 'DDS', 'DMD', 'DPT', 'OTR', 'RN', 'CNM', 'CRNA'];

  const accordionItems = [
    // Only include specialty filter if not hidden
    ...(!hideSpecialtyFilter ? [{
      title: 'Specialty',
      content: (
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search..."
            value={speciality}
            onChange={handleSpecialityChange}
            onKeyPress={handleSpecialityKeyPress}
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
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    }] : []),
    {
      title: 'Gender',
      content: (
        <div className="filter-result-box">
          {genderOptions.map((gender, index) => (
            <label key={index} className="list-items1 text-bluePrimary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGender === gender.value}
                onChange={() => handleGenderChange(gender.value)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{gender.label}</span>
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
      title: 'Languages',
      content: (
        <div className="filter-result-box max-h-48 overflow-y-auto">
          {availableLanguages.map((language, index) => (
            <label key={index} className="list-items1 text-bluePrimary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language)}
                onChange={() => handleLanguageToggle(language)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{language}</span>
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
                checked={selectedInsurances.includes(insurance)}
                onChange={() => handleInsuranceToggle(insurance)}
                className="w-4 h-4 mr-2 accent-primary"
              />
              <span>{insurance}</span>
            </label>
          ))}
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
