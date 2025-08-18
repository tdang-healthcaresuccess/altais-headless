import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { specialitiesList, genderList, educationList, insuranceList }from '../DummyData';
// Ensure insuranceList is always an array and fallback to [] if not
const availableInsuranceList = Array.isArray(insuranceList) ? insuranceList : [];
export default function DocSearchFilterSidebar({
  specialityFilter,
  setSpecialityFilter,
  genderFilter,
  setGenderFilter,
  educationFilter,
  setEducationFilter,
  insuranceFilter,
  setInsuranceFilter,
  clearAllFilters
}) {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(0);
  const [speciality, setSpecialityLocal] = useState(specialityFilter);
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Helper to update query params and reload page
  const updateQuery = (newParams) => {
    const query = { ...router.query, ...newParams, page: 1 };
    router.push({ pathname: router.pathname, query });
  };

  const handleSpecialityChange = (event) => {
    const value = event.target.value;
    setSpecialityLocal(value);
    if (setSpecialityFilter) setSpecialityFilter(value);
    if (value) {
      const filteredSuggestions = specialitiesList.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );
      setSpecialitySuggestions(filteredSuggestions);
    } else {
      setSpecialitySuggestions([]);
    }
  };

  const handleSelectSpeciality = (selectedSpeciality) => {
    setSpecialityLocal(selectedSpeciality);
    if (setSpecialityFilter) setSpecialityFilter(selectedSpeciality);
    setSpecialitySuggestions([]);
    if (!setSpecialityFilter) updateQuery({ specialty: selectedSpeciality });
  };

  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    let newGender = checked
      ? [...genderFilter, value]
      : genderFilter.filter((item) => item !== value);
    if (setGenderFilter) setGenderFilter(newGender);
    if (!setGenderFilter) updateQuery({ gender: newGender });
  };

  const handleEducationChange = (event) => {
    const { value, checked } = event.target;
    let newEdu = checked
      ? [...educationFilter, value]
      : educationFilter.filter((item) => item !== value);
    if (setEducationFilter) setEducationFilter(newEdu);
    if (!setEducationFilter) updateQuery({ education: newEdu });
  };

  const handleInsuranceChange = (event) => {
    const { value, checked } = event.target;
    let newIns = checked
      ? [...insuranceFilter, value]
      : insuranceFilter.filter((item) => item !== value);
    if (setInsuranceFilter) setInsuranceFilter(newIns);
    if (!setInsuranceFilter) updateQuery({ insurance: newIns });
  };

  // Clear handlers
  const handleClearSpeciality = () => {
    setSpecialityLocal('');
    if (setSpecialityFilter) setSpecialityFilter('');
    if (!setSpecialityFilter) updateQuery({ specialty: '' });
  };
  const handleClearGender = () => {
    if (setGenderFilter) setGenderFilter([]);
    if (!setGenderFilter) updateQuery({ gender: [] });
  };
  const handleClearEducation = () => {
    if (setEducationFilter) setEducationFilter([]);
    if (!setEducationFilter) updateQuery({ education: [] });
  };
  const handleClearInsurance = () => {
    if (setInsuranceFilter) setInsuranceFilter([]);
    if (!setInsuranceFilter) updateQuery({ insurance: [] });
  };

  const accordionItems = [
    {
      title: 'Specialty',
      content: (
        <div className="block">
          <div className="relative w-full">
            <input
              type="text"
              name="speciality"
              placeholder="Search by specialty"
              value={specialityFilter}
              onChange={handleSpecialityChange}
              className="w-full text-base leading-5 text-bluePrimary font-normal border border-lightPrimary rounded-normal outline-none focus:outline-none p-2.5 pr-10"
            />
            {specialitySuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
                {specialitySuggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelectSpeciality(s)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
            <span className="absolute top-1/2 -translate-y-1/2 right-3">
          
            </span>
          </div>
          {specialityFilter && (
            <button onClick={handleClearSpeciality} className="text-left text-blue-500 underline text-sm mt-2">
              Clear
            </button>
          )}
        </div>
      ),
    },
    {
      title: 'Gender',
      content: (
        <div className="flex flex-col gap-2 filter-result-box">
          {genderList.map((gender, index) => {
            let displayGender = gender;
            if (gender === 'M') displayGender = 'Male';
            else if (gender === 'F') displayGender = 'Female';
            return (
              <label key={index} className="flex items-center gap-2 text-primary">
                <input
                  type="checkbox"
                  name="gender"
                  value={gender}
                  checked={genderFilter.includes(gender)}
                  onChange={handleGenderChange}
                />
                {displayGender}
              </label>
            );
          })}
          <button onClick={handleClearGender} className="text-left text-blue-500 underline text-sm mt-2">
            Clear
          </button>
        </div>
      ),
    },
    {
      title: 'Education',
      content: (
        <div className="flex flex-col gap-2 filter-result-box">
          {educationList.map((edu, index) => (
            <label key={index} className="flex items-center gap-2 text-primary">
              <input
                type="checkbox"
                name="education"
                value={edu}
                checked={educationFilter.includes(edu)}
                onChange={handleEducationChange}
              />
              {edu}
            </label>
          ))}
          <button onClick={handleClearEducation} className="text-left text-blue-500 underline text-sm mt-2">
            Clear
          </button>
        </div>
      ),
    },
    {
      title: 'Accepted Insurance',
      content: (
        <div className="flex flex-col gap-2 filter-result-box">
          {availableInsuranceList.map((ins, index) => (
            <label key={index} className="flex items-center gap-2 text-primary">
              <input
                type="checkbox"
                name="insurance"
                value={ins}
                checked={insuranceFilter.includes(ins)}
                onChange={handleInsuranceChange}
              />
              {ins}
            </label>
          ))}
          <button onClick={handleClearInsurance} className="text-left text-blue-500 underline text-sm mt-2">
            Clear
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="block relative">
  {/* Clear All Filters button moved to find-care.js */}
      {accordionItems.map((item, index) => (
        <div key={index} className="pb-3">
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex justify-between items-center pb-2.5 text-left"
          >
            <span className="text-base leading-[19px] text-bluePrimary font-medium">
              {item.title}
            </span>
            {openIndex === index ? (
              <Minus className="w-5 h-5 text-primary" />
            ) : (
              <Plus className="w-5 h-5 text-primary" />
            )}
          </button>
          {openIndex === index && (
            <div className="pt-2">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}