import { useState } from "react";

const SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Family Medicine",
];

export default function SearchBox({ onSearch }) {
  const [doctorName, setDoctorName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [distance, setDistance] = useState("10");
  const [specialty, setSpecialty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ doctorName, zipcode, practiceName, distance, specialty });
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4 bg-white rounded-md shadow" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Practice Name"
          value={practiceName}
          onChange={(e) => setPracticeName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          {[0, 5, 10, 25, 50, 75, 100].map((miles) => (
            <option key={miles} value={miles}>
              {miles} miles
            </option>
          ))}
        </select>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select Specialty</option>
          {SPECIALTIES.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}