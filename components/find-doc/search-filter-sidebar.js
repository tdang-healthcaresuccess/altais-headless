"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import UpDownArrow from "@/public/icons/up-down-arrow.svg";
import Image from "next/image";
import { specialitiesList } from "../common/dummy-data";



export default function DocSearchFilterSidebar() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [speciality, setSpeciality] = useState("");
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);
  const handleSpecialityChange = (event) => {
    const value = event.target.value;
    setSpeciality(value);
    if (value) {
      const filteredSuggestions = specialitiesList.filter((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      );
      setSpecialitySuggestions(filteredSuggestions);
    } else {
      setSpecialitySuggestions([]);
    }
  };

  // Select a speciality from the suggestions.
  const handleSelectSpeciality = (selectedSpeciality) => {
    setSpeciality(selectedSpeciality);
    setSpecialitySuggestions([]); // Hide suggestions after selection.
  };

  const accordionItems = [
    {
      title: "Specialty",
      content: (
        <>
          <input
            text="text"
            value={speciality}
            onChange={handleSpecialityChange}
            placeholder="Search specialty"
            className="filter-input"
          />
          {specialitySuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
              {specialitySuggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => handleSelectSpeciality(s)}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
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
      title: "Location",
      content: (
        <>
          <select id="specialty" className="appearance-none filter-select">
            <option value="Norway">Norway</option>
            <option value="newyork">New York</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <Image src={UpDownArrow} alt="Arrow" />
          </div>
        </>
      ),
    },
    {
      title: "Gender",
      content: (
        <>
          <select id="specialty" className="appearance-none filter-select">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <Image src={UpDownArrow} alt="Arrow" />
          </div>
        </>
      ),
    },
    {
      title: "Accepted Insurance",
      content: (
        <>
          <select id="specialty" className="appearance-none filter-select">
            <option value="sitehealth">Site Health</option>
            <option value="bjajfinance">Bjaj Finance</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <Image src={UpDownArrow} alt="Arrow" />
          </div>
        </>
      ),
    },
    {
      title: "Education",
      content: (
        <>
          <select id="specialty" className="appearance-none filter-select">
            <option value="non-medical">Non-Medical</option>
            <option value="medical">Medical</option>
            <option value="Engneering">Engneering</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <Image src={UpDownArrow} alt="Arrow" />
          </div>
        </>
      ),
    },
    {
      title: "Languages",
      content: (
        <>
          <select id="specialty" className="appearance-none filter-select">
            <option value="English">English</option>
            <option value="frence">Frence</option>
            <option value="japneese">Japneese</option>
            <option value="hindi">Hindi</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <Image src={UpDownArrow} alt="Arrow" />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="block">
      {accordionItems.map((item, index) => (
        <div key={index} className="pb-3">
          {/* Header */}
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

          {/* Content */}
          {openIndex === index && (
            <div className="pt-0 relative">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
