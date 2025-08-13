// search-doctor.jsx
// This component contains the initial search form on the landing page.
// It is now a controlled component that passes its state to a parent component via a callback.

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SearchDoctor() {
  const [doctorName, setDoctorName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSearch = () => {
    // Construct the search URL with query parameters
    const params = new URLSearchParams();
    if (doctorName) params.append('doctorName', doctorName);
    if (zipCode) params.append('zipCode', zipCode);
    if (practiceName) params.append('practiceName', practiceName);
    if (specialty) params.append('specialty', specialty);

    // Navigate to the search page with the new parameters
    window.location.href = `/find-doctor?${params.toString()}`;
  };

  // The 'Advanced Search' link can now point directly to the find-doctor page
  // The 'Search' button is now a button that triggers the navigation logic
  return (
    <section className="block pt-[50px] md:pt-14 pb-[65px] md:pb-15 px-6 md:px-0 shadow-custom2">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-10">
          <div className="block w-full md:w-[40%] max-w-[470px]">
            <p className="text-lg leading-[35px]">
              <b className="text-[#1D3F76] font-semibold">Everyone deserves care that's compassionate, </b>
              <br /> connected, and rooted in the communities they call home.
              Altais is the healthcare provider that makes this possible by
              supporting physicians and care teams—so you can get high-quality
              care, when and where you need it.
            </p>
          </div>
          {/* Vertical Separator */}
          <div className="hidden sm:block w-full md:w-[1px] h-[1px] md:h-[155px] bg-[#C75327] my-6 md:my-0 max-0 md:mx-10"></div>

          <div className="block flex-1">
            <h2 className="text-[26px] leading-[36px] text-bluePrimary pb-7">Search Doctors</h2>
            <div className="block w-full">
              <div className="flex flex-col md:flex-row gap-5 justify-between mb-5">
                <div className="block w-full">
                  <input
                    type="text"
                    placeholder="Doctor Name"
                    className="input-style w-full"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
                <div className="block">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="input-style w-full md:max-w-[134px] md:min-w-[134px]"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="relative block">
                  <select type="text" placeholder="Distance" className="appearance-none bg-white input-style w-full md:max-w-[134px] md:min-w-[134px] cursor-pointer">
                    <option>Distance</option>
                    <option>2KM</option>
                    <option>5KM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-between">
                <div className="block flex-1">
                  <input
                    type="text"
                    placeholder="Practice Name"
                    className="input-style w-full"
                    value={practiceName}
                    onChange={(e) => setPracticeName(e.target.value)}
                  />
                </div>
                <div className="relative block flex-1">
                  <select
                    type="text"
                    placeholder="Specialty"
                    className="appearance-none bg-white input-style w-full cursor-pointer"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    <option value="">Specialty</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopaedic Surgery">Orthopaedic Surgery</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <a
                href="/find-doctor"
                className="flex-center text-primary"
              >
                Advanced Search
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </a>
              <button
                onClick={handleSearch}
                className="btn-outline-secondary btn-sm flex-center !w-[135px] !px-2 rounded-normal !h-[50px] gap-1"
              >
                Search
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
