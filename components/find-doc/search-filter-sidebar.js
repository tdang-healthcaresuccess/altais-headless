import React, { useState, useEffect } from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { specialitiesList, genderList, educationList, insuranceList }from '../DummyData';
export default function DocSearchFilterSidebar({
  specialityFilter, setSpecialityFilter,
  genderFilter, setGenderFilter,
  educationFilter, setEducationFilter,
  insuranceFilter, setInsuranceFilter,
  clearAllFilters
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [speciality, setSpeciality] = useState(specialityFilter);
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSpecialityChange = (event) => {
    const value = event.target.value;
    setSpeciality(value);
    setSpecialityFilter(value);

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
    setSpeciality(selectedSpeciality);
    setSpecialityFilter(selectedSpeciality);
    setSpecialitySuggestions([]);
  };

  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    setGenderFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleEducationChange = (event) => {
    const { value, checked } = event.target;
    setEducationFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleInsuranceChange = (event) => {
    const { value, checked } = event.target;
    setInsuranceFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
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
              value={speciality}
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
          {speciality && (
            <button onClick={() => { setSpeciality(''); setSpecialityFilter(''); }} className="text-left text-blue-500 underline text-sm mt-2">
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
          {genderList.map((gender, index) => (
            <label key={index} className="flex items-center gap-2 text-primary">
              <input
                type="checkbox"
                name="gender"
                value={gender}
                checked={genderFilter.includes(gender)}
                onChange={handleGenderChange}
              />
              {gender}
            </label>
          ))}
          <button onClick={() => setGenderFilter([])} className="text-left text-blue-500 underline text-sm mt-2">
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
          <button onClick={() => setEducationFilter([])} className="text-left text-blue-500 underline text-sm mt-2">
            Clear
          </button>
        </div>
      ),
    },
    {
      title: 'Accepted Insurance',
      content: (
        <div className="flex flex-col gap-2 filter-result-box">
          {insuranceList.map((ins, index) => (
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
          <button onClick={() => setInsuranceFilter([])} className="text-left text-blue-500 underline text-sm mt-2">
            Clear
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="block relative">
      <button
        onClick={clearAllFilters}
        className="btn-md btn-outline-secondary w-full mb-4 flex-center font-semibold rounded-normal"
      >
        Clear All Filters
      </button>
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