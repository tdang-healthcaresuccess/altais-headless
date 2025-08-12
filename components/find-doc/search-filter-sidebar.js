import React, { useState, useEffect } from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { specialitiesList } from '../DummyData';

export default function DocSearchFilterSidebar({ specialityFilter, setSpecialityFilter, genderFilter, setGenderFilter, educationFilter, setEducationFilter, insuranceFilter, setInsuranceFilter, languageFilter, setLanguageFilter, clearAllFilters }) {
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

  // Handler for Gender checkboxes
  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    setGenderFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handler for Education checkboxes
  const handleEducationChange = (event) => {
    const { value, checked } = event.target;
    setEducationFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  
  // Handler for Language checkboxes
  const handleLanguageChange = (event) => {
    const { value, checked } = event.target;
    setLanguageFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    setSpeciality(specialityFilter);
  }, [specialityFilter]);

  const allLanguages = ["English", "Spanish", "French", "Japanese", "Hindi"];

  const accordionItems = [
    {
      title: "Specialty",
      content: (
        <>
          <input
            type="text"
            value={speciality}
            onChange={handleSpecialityChange}
            placeholder="Search specialty"
            className="filter-input"
          />
          {specialitySuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-lightPrimary rounded-normal mt-1 max-h-48 overflow-y-auto">
              {specialitySuggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => handleSelectSpeciality(s)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    },
    {
      title: "Gender",
      content: (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              name="gender"
              value="Male"
              checked={genderFilter.includes("Male")}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              name="gender"
              value="Female"
              checked={genderFilter.includes("Female")}
              onChange={handleGenderChange}
            />
            Female
          </label>
          <button onClick={() => setGenderFilter([])} className="text-left text-blue-500 underline text-sm mt-2">Clear</button>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              name="education"
              value="Harvard Medical School"
              checked={educationFilter.includes("Harvard Medical School")}
              onChange={handleEducationChange}
            />
            Harvard Medical School
          </label>
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              name="education"
              value="Johns Hopkins University"
              checked={educationFilter.includes("Johns Hopkins University")}
              onChange={handleEducationChange}
            />
            Johns Hopkins University
          </label>
          <button onClick={() => setEducationFilter([])} className="text-left text-blue-500 underline text-sm mt-2">Clear</button>
        </div>
      ),
    },
    {
      title: "Accepted Insurance",
      content: (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              value="Aetna"
              checked={insuranceFilter.includes("Aetna")}
              onChange={(e) => {
                if (e.target.checked) {
                  setInsuranceFilter([...insuranceFilter, "Aetna"]);
                } else {
                  setInsuranceFilter(insuranceFilter.filter(item => item !== "Aetna"));
                }
              }}
            />
            Aetna
          </label>
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              value="Anthem Blue Cross"
              checked={insuranceFilter.includes("Anthem Blue Cross")}
              onChange={(e) => {
                if (e.target.checked) {
                  setInsuranceFilter([...insuranceFilter, "Anthem Blue Cross"]);
                } else {
                  setInsuranceFilter(insuranceFilter.filter(item => item !== "Anthem Blue Cross"));
                }
              }}
            />
            Anthem Blue Cross
          </label>
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              value="Cigna"
              checked={insuranceFilter.includes("Cigna")}
              onChange={(e) => {
                if (e.target.checked) {
                  setInsuranceFilter([...insuranceFilter, "Cigna"]);
                } else {
                  setInsuranceFilter(insuranceFilter.filter(item => item !== "Cigna"));
                }
              }}
            />
            Cigna
          </label>
          <label className="flex items-center gap-2 text-primary">
            <input
              type="checkbox"
              value="UnitedHealthcare"
              checked={insuranceFilter.includes("UnitedHealthcare")}
              onChange={(e) => {
                if (e.target.checked) {
                  setInsuranceFilter([...insuranceFilter, "UnitedHealthcare"]);
                } else {
                  setInsuranceFilter(insuranceFilter.filter(item => item !== "UnitedHealthcare"));
                }
              }}
            />
            UnitedHealthcare
          </label>
          <button onClick={() => setInsuranceFilter([])} className="text-left text-blue-500 underline text-sm mt-2">Clear</button>
        </div>
      ),
    },
    {
      title: "Languages",
      content: (
        <div className="flex flex-col gap-2">
          {allLanguages.map((lang) => (
            <label key={lang} className="flex items-center gap-2 text-primary">
              <input
                type="checkbox"
                name="language"
                value={lang}
                checked={languageFilter.includes(lang)}
                onChange={handleLanguageChange}
              />
              {lang}
            </label>
          ))}
          <button onClick={() => setLanguageFilter([])} className="text-left text-blue-500 underline text-sm mt-2">Clear</button>
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
