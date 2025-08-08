"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";
import SearchIcon from "@/public/media/search-icon.svg";
import { ChevronRight, Search } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const handleToggle = () => {
    if (isOpenSearch) {
      setIsOpenSearch(false);
    }
    setIsOpen(!isOpen);
  };
  const handleToggleSearch = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    setIsOpenSearch(!isOpenSearch);
  };

  return (
    <header className="block">
      <div className="container mx-auto bg-white">
        <div className="w-full flex items-center justify-between pt-3 md:pt-4 pb-4 md:pb-7 px-4 md:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={BrandLogo}
              alt="Altais"
              width={180}
              height={55}
              priority
            />
          </div>

          {/* Desktop Nav */}
          <div className="flex items-center gap-2 md:gap-10 w-full justify-end">
            {/* Menu Items */}
            <nav className="hidden lg:flex items-end gap-6">
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">For</span> Patients
              </Link>
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">For</span> Providers
              </Link>
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">For</span> Partners
              </Link>
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">Our</span> Clinics
              </Link>
              <Link
                href="/about"
                className="text-[#083D78] text-sm leading[18px] font-semibold"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-[#083D78] text-sm leading[18px] font-semibold"
              >
                Resources
              </Link>
              <Link
                href="#"
                className="text-[#083D78] text-sm leading[18px] font-semibold"
              >
                Contact Us
              </Link>
            </nav>

            {/* Find Care Button */}
            <Link href="/find-doctor" className="btn-gradient btn-action flex-center gap-1">
              Find Care{" "}
              <ChevronRight className="w-[10px] h-[10px] md:w-[18px] md:h-[18px]" />
            </Link>

            {/* Search Input */}
            <div className="flex items-center">
              <button
                onClick={handleToggleSearch}
                type="button"
                className="border border-primary rounded-sm md:w-9 w-[26px] md:h-9 h-[26px] flex-center"
              >
                <Image
                  src={SearchIcon}
                  className="w-[13px] md:w-[18px]"
                  alt="Search"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 ml-5"
            onClick={handleToggle}
          >
            {isOpen ? (
              <X size={28} color="#C75327" />
            ) : (
              <AlignJustify size={28} color="#C75327" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute bg-white top-[60.9px] px-4 pt-4 pb-6 space-y-4 z-50 h-full w-full shadow-[inset_0px_2px_4px_0px_rgba(61,61,61,0.15)]">
            <nav className="flex flex-col gap-6 text-sm font-medium text-gray-700">
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">For</span> Patients
              </Link>
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">For</span> Providers
              </Link>
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">For</span> Partners
              </Link>
              <Link
                href="#"
                className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"
              >
                <span className="font-normal">Our</span> Clinics
              </Link>
              <Link
                href="/about"
                className="text-[#083D78] text-sm leading[18px] font-semibold"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-[#083D78] text-sm leading[18px] font-semibold"
              >
                Resources
              </Link>
              <Link
                href="#"
                className="text-[#083D78] text-sm leading[18px] font-semibold"
              >
                Contact Us
              </Link>
            </nav>

            <div className="mt-10 pt-5 flex flex-col gap-3">
              <button className="btn-gradient btn-sm flex-center w-full gap-1">
                Find Care{" "}
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>
        )}
        {isOpenSearch && (
          <div className="flex absolute bg-white rounded-none md:rounded-lg p-5 top-[60.9px] mt-0 md:mt-10 z-50 pb-10 md:pb-5 right-0 md:right-[90px] w-full shadow-[inset_0px_2px_4px_0px_rgba(61,61,61,0.15)] md:shadow-none max-w-full md:max-w-[340px]">
            <div className="input-style flex gap-2 items-center w-full">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 outline-none text-sm bg-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
