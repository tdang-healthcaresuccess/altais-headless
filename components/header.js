'use client';

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BrandLogo from "@/public/media/altais-logo.png"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="container shadow-sm bg-white px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between pt-4 pb-7">
        
        {/* Logo */}
        <div className="flex items-center">
          <Image src={BrandLogo} alt="Altais" width={180} height={55} priority />
        </div>

        {/* Desktop Nav */}
        <div className="flex items-center gap-6 w-full">
          {/* Menu Items */}
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="#">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Services</Link>
            <Link href="#">Doctors</Link>
            <Link href="#">Blog</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Contact</Link>
          </nav>

          {/* Find Care Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Find Care
          </button>

          {/* Search Input */}
          <div className="flex items-center border border-gray-300 rounded-[5px] px-2 py-1">
            {/* <Search size={16} className="text-gray-500" /> */}
            {/* <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none text-sm bg-transparent"
            /> */}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700"
        >
          {/* {isOpen ? <X size={28} /> : <Menu size={28} />} */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 space-y-4 bg-white shadow-md">
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
              Find Care
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
    </header>
  )
}
