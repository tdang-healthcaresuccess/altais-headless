import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid, AlignJustify, Check } from "lucide-react";

export default function LayoutOptions({ activeLayout, setActiveLayout }) {
  const [showLayoutGrid, setShowLayoutGrid] = useState(false);
  const LayoutRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (LayoutRef.current && !LayoutRef.current.contains(event.target)) {
        setShowLayoutGrid(false);
      }
    }
    if (showLayoutGrid) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLayoutGrid]);

  return (
    <div className="hidden md:block grid-options">
      <div className="relative" ref={LayoutRef}>
        <button
          type="button"
          className="hidden md:flex btn-md flex-center btn-normal-icon gap-3 w-full sm:w-auto"
          onClick={() => setShowLayoutGrid(!showLayoutGrid)}
        >
          <span className="flex-1 text-center font-normal"></span>
          {activeLayout === "grid" ? (
            <LayoutGrid color="#C85103" size={28} fill="#C85103" />
          ) : (
            <AlignJustify color="#C85103" size={28} strokeWidth={3} />
          )}
        </button>
        {showLayoutGrid && (
          <div className="block w-[122px] box-shadow-dark top-[100%] mt-3 right-0 absolute z-50 bg-white rounded-normal">
            <h4 className="text-lg text-secondary font-medium px-2 py-1.5 border-b border-inputBorder">
              Layout
            </h4>
            <ul className="block">
              <li
                className={`flex items-center text-[#083d7880] justify-between cursor-pointer p-2 gap-2 text-base font-normal rounded-lg ${
                  activeLayout === "grid" ? "bg-greyF5" : ""
                }`}
                onClick={() => {
                  setActiveLayout("grid");
                  setShowLayoutGrid(false);
                }}
              >
                <Check
                  size={22}
                  color={activeLayout === "grid" ? "#083d78" : "transparent"}
                  className="mr-3"
                />
                Grid
                <LayoutGrid color="#083d7880" size={26} />
              </li>
              <li
                className={`flex items-center text-[#083d7880] justify-between cursor-pointer p-2 gap-2 text-base font-normal rounded-lg ${
                  activeLayout === "list" ? "bg-greyF5" : ""
                }`}
                onClick={() => {
                  setActiveLayout("list");
                  setShowLayoutGrid(false);
                }}
              >
                <Check
                  size={22}
                  color={activeLayout === "list" ? "#999795" : "transparent"}
                  className="mr-3"
                />
                List
                <AlignJustify color="#083d7880" size={26} />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
