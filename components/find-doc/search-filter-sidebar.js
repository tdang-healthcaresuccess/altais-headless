"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import UpDownArrow from "@/public/icons/up-down-arrow.svg";
import Image from "next/image";

const accordionItems = [
  {
    title: "Specialty",
    content: (
      <>
        <select id="specialty" className="appearance-none filter-select">
          <option value="All Specialties">All Specialties</option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="neurology">Neurology</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
          <Image src={UpDownArrow} alt="Arrow" />
        </div>
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

export default function DocSearchFilterSidebar() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
