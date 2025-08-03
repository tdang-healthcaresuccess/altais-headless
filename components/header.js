"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";
import SearchIcon from "@/public/media/search-icon.svg";
import { ChevronRight } from 'lucide-react';
import { AlignJustify } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
            <nav className="hidden md:flex items-end gap-6">
              <Link href="#" className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"><span className="font-normal">For</span> Patients</Link>
              <Link href="#" className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"><span className="font-normal">For</span> Providers</Link>
              <Link href="#" className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"><span className="font-normal">For</span> Partners</Link>
              <Link href="#" className="flex flex-col text-[#083D78] text-sm leading[18px] font-semibold"><span className="font-normal">Our</span> Clinics</Link>
              <Link href="#" className="text-[#083D78] text-sm leading[18px] font-semibold">About</Link>
              <Link href="#" className="text-[#083D78] text-sm leading[18px] font-semibold">Resources</Link>
              <Link href="#" className="text-[#083D78] text-sm leading[18px] font-semibold">Contact Us</Link>
            </nav>

            {/* Find Care Button */}
            <button className="btn-gradient btn-action flex-center gap-1">
              Find Care <ChevronRight className="w-[10px] h-[10px] md:w-[18px] md:h-[18px]" />
            </button>

            {/* Search Input */}
            <div className="flex items-center">
              <button type="button" className="border border-primary rounded-sm md:w-9 w-[26px] md:h-9 h-[26px] flex-center">
                <Image src={SearchIcon} className="w-[13px] md:w-[18px]" alt="Search" />
              </button>
              {/* <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none text-sm bg-transparent"
            /> */}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            // onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 ml-5"
          >
            {isOpen ? "" : <AlignJustify size={28} color="#C75327" />}
          </button> 
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden px-4 pt-4 pb-6 space-y-4 bg-white">
            <nav className="flex flex-col gap-4 text-sm font-medium text-gray-700">
              <Link href="#">Home</Link>
              <Link href="#">About</Link>
              <Link href="#">Services</Link>
              <Link href="#">Doctors</Link>
              <Link href="#">Blog</Link>
              <Link href="#">FAQ</Link>
              <Link href="#">Contact</Link>
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Find Care <ChevronRight />
              </button>

              <div className="flex items-center border border-gray-300 rounded-[5px] px-2 py-1">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="ml-2 outline-none text-sm bg-transparent w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
