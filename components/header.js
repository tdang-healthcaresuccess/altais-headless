"use client";
import { gql } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";
import SearchIcon from "@/public/icons/search-icon-dark.svg";
import SearchWhiteIcon from "@/public/icons/search-icon-white.svg";
import { ChevronRight, AlignJustify, X } from "lucide-react";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";

// Recursive component to render menu items and their children
const MenuItem = ({ item, router }) => {
  const isActive = router.pathname === item.uri;
  const hasChildren = item.childItems?.nodes?.length > 0;

  return (
    <li className="relative group">
      <Link
        className={`block px-4 py-2 text-bluePrimary hover:text-secondary ${
          isActive ? "text-secondary" : ""
        }`}
        href={item.uri}
      >
        {item.label}
      </Link>
      {hasChildren && (
        <ul className="absolute left-full top-0 min-w-[180px] bg-white shadow-lg z-20 hidden group-hover:block">
          {item.childItems.nodes.map((child) => (
            <MenuItem key={child.id} item={child} router={router} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function Header({ siteTitle, siteDescription }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);
  const router = useRouter();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setIsOpenSearch(false);
  };

  const handleToggleSearch = () => {
    setIsOpenSearch((prev) => !prev);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpenSearch(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const siteDataQuery = useQuery(SITE_DATA_QUERY);
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY);

  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || [];

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content={siteDescription ? siteDescription : ""}
        />
        <link rel="stylesheet" href="https://use.typekit.net/uoi7ptf.css" />
      </Head>
      <header className="block py-4 lg:py-0 relative">
        <div className="container mx-auto bg-white">
          <div className="w-full flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src={BrandLogo}
                  alt="Altais"
                  width={180}
                  height={55}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Nav and Buttons */}
            <div className="flex items-center gap-2 md:gap-10 w-full justify-end">
              {/* Desktop Menu */}
              <nav className="hidden lg:flex items-end gap-6">
                <ul className="flex gap-6">
                  {menuItems.map((item, idx) => {
                    const isActive = router.pathname === item.uri;
                    const hasChildren = item.childItems?.nodes?.length > 0;
                    return (
                      <li
                        key={item.id}
                        className="relative group flex align-bottom items-end"
                      >
                        <Link
                          className={`flex flex-col py-8 text-bluePrimary text-sm leading-[18px] font-semibold ${
                            isActive ? "text-secondary" : "text-bluePrimary"
                          }`}
                          href={item.uri}
                        >
                          {idx < 3 ? (
                            <>
                              <span className="font-normal">For</span>{" "}
                              {item.label}
                            </>
                          ) : idx === 3 ? (
                            <>
                              <span className="font-normal">Our</span>{" "}
                              {item.label}
                            </>
                          ) : (
                            item.label
                          )}
                        </Link>
                        {hasChildren && (
                          <ul className="absolute left-0 top-full min-w-[230px] bg-greyF9 rounded-bl-normal box-shadow-custom3 z-50 py-6 hidden group-hover:block">
                            {item.childItems.nodes.map((child1) => (
                              <li key={child1.id} className="group">
                                <Link
                                  className="group py-2 px-6 flex items-center gap-1 text-sm leading-[18px] text-bluePrimary hover:text-secondary"
                                  href={child1.uri}
                                >
                                  {child1.label}
                                  {child1.childItems?.nodes?.length > 0 && (
                                    <ChevronRight className="w-[20px] h-[20px] text-bluePrimary group-hover:text-secondary md:w-[18px] md:h-[18px]" />
                                  )}
                                </Link>
                                {child1.childItems?.nodes?.length > 0 && (
                                  <ul className="absolute left-full top-0 min-w-[230px] bg-greyF9 rounded-b-normal box-shadow-custom3 z-50 py-6 hidden group-hover:block">
                                    {child1.childItems.nodes.map((child2) => (
                                      <li key={child2.id}>
                                        <Link
                                          className="block px-6 py-2 text-sm leading-[18px] text-bluePrimary hover:text-secondary"
                                          href={child2.uri}
                                        >
                                          {child2.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Find Care Button */}
              <Link
                href="/find-doctor"
                className="btn-gradient btn-action flex-center gap-1"
              >
                Find Care{" "}
                <ChevronRight className="w-[10px] h-[10px] md:w-[18px] md:h-[18px]" />
              </Link>

              {/* Search Toggle */}
              <div className="flex items-center">
                <button
                  onClick={handleToggleSearch}
                  type="button"
                  className="border border-primary rounded-normal md:w-9 w-[26px] md:h-9 h-[26px] flex-center"
                >
                  {isOpenSearch ? (
                    <X size={28} color="#008889" />
                  ) : (
                    <Image
                      src={SearchIcon}
                      className="w-[15px] md:w-[18px]"
                      alt="Search"
                    />
                  )}
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

          {/* Mobile Menu Content */}
          {isOpen && (
            <div className="lg:hidden absolute min-h-screen flex justify-end items-start top-[100%] h-full w-full bg-[#d9d9d9e6] z-50 right-0">
              <div
                ref={menuRef}
                className="w-[210px] bg-[#f9f9f9] pt-[32px] pb-[27px] relative z-50"
              >
                <nav className="flex flex-col text-sm font-medium text-gray-700">
                  {menuItems.map((item, idx) => {
                    const isActive = router.asPath === item.uri;
                    return (
                      <Link
                        key={item.id}
                        className={`flex flex-col text-bluePrimary text-sm px-9 py-2.5 leading-[18px] font-semibold ${
                          isActive ? "bg-[#d9d9d980]" : ""
                        }`}
                        href={item.uri}
                      >
                        {idx < 3 ? (
                          <>
                            <span className="font-normal">For</span>{" "}
                            {item.label}
                          </>
                        ) : idx === 3 ? (
                          <>
                            <span className="font-normal">Our</span>{" "}
                            {item.label}
                          </>
                        ) : (
                          item.label
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}
        </div>
        {/* Search Bar Content */}
        {isOpenSearch && (
          <div className="absolute bg-[#f9f9f9] py-5 px-6 top-[100%] left-0 right-0 z-50 w-full box-shadow-custom3">
            <form onSubmit={handleSearch} className="flex gap-3 max-w-full md:max-w-[340px] mx-auto">
              <div className="input-style flex gap-2 items-center w-full py-3 px-[14px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keyword, Insurance, Spec..."
                  className="ml-2 outline-none text-lg leading-[24px] bg-transparent w-full min-w-full md:min-w-[318px]"
                />
              </div>
              <button
                type="submit"
                className="bg-custom-gradient min-w-12 w-12 h-12 rounded-normal flex-center"
              >
                <Image src={SearchWhiteIcon} alt="search" />
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}

Header.fragments = {
  entry: gql`
    fragment HeaderFragment on RootQuery {
      generalSettings {
        title
        description
      }
    }
  `,
};
