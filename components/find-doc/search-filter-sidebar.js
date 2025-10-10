import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { getSpecialtySuggestions, resolveSpecialtyAcronym } from '../specialtySearchUtils';

const DocSearchFilterSidebar = ({ 
  specialityFilter = '',
  genderFilter = [],
  languageFilter = [],
  insuranceFilter = [],
  educationFilter = [],  // Now supports multiple degrees
  availableSpecialties = [], 
  availableLanguages = [], 
  availableInsurances = [],
  availableDegrees = [],
  onFilterChange = () => {},
  hideSpecialtyFilter = false // New prop to hide specialty filter
}) => {
  // Function to determine which sections should be open based on active filters
  const getInitialOpenSections = () => {
    const openSections = new Set();
    
    // Check if any filters have values and mark their sections as open
    if (specialityFilter && specialityFilter.trim() && !hideSpecialtyFilter) {
      openSections.add(0); // Specialty section
    }
    
    const genderArray = Array.isArray(genderFilter) ? genderFilter : [];
    const languageArray = Array.isArray(languageFilter) ? languageFilter : [];
    const insuranceArray = Array.isArray(insuranceFilter) ? insuranceFilter : [];
    const educationArray = Array.isArray(educationFilter) ? educationFilter : [];
    
    // Adjust indices based on whether specialty filter is hidden
    const baseIndex = hideSpecialtyFilter ? 0 : 1;
    
    if (genderArray.length > 0) {
      openSections.add(baseIndex); // Gender section
    }
    if (educationArray.length > 0) {
      openSections.add(baseIndex + 1); // Education section
    }
    if (languageArray.length > 0) {
      openSections.add(baseIndex + 2); // Languages section
    }
    if (insuranceArray.length > 0) {
      openSections.add(baseIndex + 3); // Insurance section
    }
    
    // If no filters are active, open the first section by default
    if (openSections.size === 0) {
      openSections.add(0);
    }
    
    return openSections;
  };

  const [openSections, setOpenSections] = useState(getInitialOpenSections());
  const [speciality, setSpeciality] = useState(specialityFilter);
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState(Array.isArray(genderFilter) ? genderFilter : []); // Now supports multiple
  const [selectedLanguages, setSelectedLanguages] = useState(Array.isArray(languageFilter) ? languageFilter : []);
  const [selectedInsurances, setSelectedInsurances] = useState(Array.isArray(insuranceFilter) ? insuranceFilter : []);
  const [selectedEducations, setSelectedEducations] = useState(Array.isArray(educationFilter) ? educationFilter : []); // Now supports multiple

  // Update open sections when filters change
  useEffect(() => {
    setOpenSections(getInitialOpenSections());
  }, [specialityFilter, genderFilter, languageFilter, insuranceFilter, educationFilter, hideSpecialtyFilter]);

  // Update local state when props change
  useEffect(() => {
    setSpeciality(specialityFilter);
    setSelectedGenders(Array.isArray(genderFilter) ? genderFilter : []);
    setSelectedLanguages(Array.isArray(languageFilter) ? languageFilter : []);
    setSelectedInsurances(Array.isArray(insuranceFilter) ? insuranceFilter : []);
    setSelectedEducations(Array.isArray(educationFilter) ? educationFilter : []);
  }, [specialityFilter, genderFilter, languageFilter, insuranceFilter, educationFilter]);

  // Filter specialties based on input with acronym mapping and user input suggestions
  useEffect(() => {
    if (speciality.trim()) {
      // Check if input contains comma (multiple specialties) - don't show suggestions for this
      if (speciality.includes(',')) {
        setSpecialitySuggestions([]);
        return;
      }
      
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
        // Use enhanced suggestions with available specialties for better fuzzy search
        const suggestions = getSpecialtySuggestions(speciality, availableSpecialties);
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

  // Handle gender toggle - Uses OR logic (shows doctors with ANY selected gender)
  const handleGenderToggle = (gender, event) => {
    event.stopPropagation(); // Prevent accordion collapse
    const newGenders = selectedGenders.includes(gender)
      ? selectedGenders.filter(g => g !== gender)
      : [...selectedGenders, gender];
    
    setSelectedGenders(newGenders);
    // Send array of genders - backend uses OR logic to find doctors with ANY of these genders
    onFilterChange({ gender: newGenders });
  };

  // Handle language toggle - Uses OR logic (shows doctors with ANY selected language)
  const handleLanguageToggle = (language, event) => {
    event.stopPropagation(); // Prevent accordion collapse
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(lang => lang !== language)
      : [...selectedLanguages, language];
    
    setSelectedLanguages(newLanguages);
    // Send array of languages - backend should use OR logic to find doctors with ANY of these languages
    onFilterChange({ languages: newLanguages });
  };

  // Handle insurance toggle - Uses OR logic (shows doctors accepting ANY selected insurance)
  const handleInsuranceToggle = (insurance, event) => {
    event.stopPropagation(); // Prevent accordion collapse
    const newInsurances = selectedInsurances.includes(insurance)
      ? selectedInsurances.filter(ins => ins !== insurance)
      : [...selectedInsurances, insurance];
    
    setSelectedInsurances(newInsurances);
    // Send array of insurances - backend should use OR logic to find doctors accepting ANY of these insurances
    onFilterChange({ insurances: newInsurances });
  };

  // Handle education toggle - Uses OR logic (shows doctors with ANY selected degree)
  const handleEducationToggle = (education, event) => {
    event.stopPropagation(); // Prevent accordion collapse
    const newEducations = selectedEducations.includes(education)
      ? selectedEducations.filter(edu => edu !== education)
      : [...selectedEducations, education];
    
    setSelectedEducations(newEducations);
    // Send array of degrees - backend uses OR logic to find doctors with ANY of these degrees
    onFilterChange({ education: newEducations });
  };

  const toggleAccordion = (index) => {
    setOpenSections(prevOpenSections => {
      const newOpenSections = new Set(prevOpenSections);
      if (newOpenSections.has(index)) {
        newOpenSections.delete(index);
      } else {
        newOpenSections.add(index);
      }
      return newOpenSections;
    });
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
                checked={selectedGenders.includes(gender.value)}
                onChange={(e) => handleGenderToggle(gender.value, e)}
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
                checked={selectedEducations.includes(education)}
                onChange={(e) => handleEducationToggle(education, e)}
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
                onChange={(e) => handleLanguageToggle(language, e)}
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
                onChange={(e) => handleInsuranceToggle(insurance, e)}
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
            {openSections.has(index) ? <Minus size={20} /> : <Plus size={20} />}
          </button>
          {openSections.has(index) && (
            <div className="pt-3">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocSearchFilterSidebar;
