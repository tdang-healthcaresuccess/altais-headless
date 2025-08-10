"use client";
import { gql } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";
import SearchIcon from "@/public/media/search-icon.svg";
import { ChevronRight, Search } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { X } from "lucide-react";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Header({ siteTitle, siteDescription }) {
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
  const router = useRouter();
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content={siteDescription ? siteDescription : ""}
        />
        <link srel="stylesheet" href="https://use.typekit.net/uoi7ptf.css" />
      </Head>
      <header className="block relative">
        <div className="container mx-auto bg-white">
          <div className="w-full flex items-center justify-between pt-3 md:pt-4 pb-4 md:pb-7 px-4 md:px-0">
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

            {/* Desktop Nav */}
            <div className="flex items-center gap-2 md:gap-10 w-full justify-end">
              {/* Menu Items */}

              <nav className="hidden lg:flex items-end gap-6">
                {(Array.isArray(menuItems) ? menuItems : []).map(
                  (item, idx) => (
                    <div key={item.id}>
                      <Link
                        className="flex flex-col text-bluePrimary text-sm leading[18px] font-semibold"
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
                    </div>
                  )
                )}
              </nav>

              {/* Find Care Button */}
              <Link
                href="/find-doctor"
                className="btn-gradient btn-action flex-center gap-1"
              >
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

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden absolute min-h-screen flex justify-end items-start top-[100%] h-full w-full bg-[#d9d9d9e6] z-50 right-0">
              <div
                ref={menuRef}
                className="w-[210px] bg-[#f9f9f9] pt-[32px] pb-[27px]"
              >
                <nav className="flex flex-col text-sm font-medium text-gray-700">
                  {(Array.isArray(menuItems) ? menuItems : []).map(
                    (item, idx) => {
                      const isActive = router.asPath === item.uri;

                      return (
                        <div key={item.id}>
                          <Link
                            className={`flex flex-col text-bluePrimary text-sm px-9 py-2.5 leading-[18px] font-semibold ${
                              isActive
                                ? "bg-[#d9d9d980]"
                                : ""
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
                        </div>
                      );
                    }
                  )}
                </nav>
              </div>
            </div>
          )}
        </div>
        {isOpenSearch && (
          <div className="absolute bg-[#f9f9f9] py-5 px-6 top-[100%] left-0 right-0 z-50 w-full box-shadow-custom3">
            <div className="flex gap-3 max-w-full md:max-w-[340px] mx-auto">
              <div className="input-style flex gap-2 items-center w-full py-3 px-[14px]">
                <input
                  type="text"
                  placeholder="Keyword, Insurance, Spec..."
                  className="ml-2 outline-none text-lg leading-[24px] bg-transparent w-full min-w-full md:min-w-[318px]"
                />
              </div>
              <button
                type="button"
                className="bg-custom-gradient min-w-12 w-12 h-12 rounded-normal flex-center"
              >
                <Image src={SearchIcon} alt="search" />
              </button>
            </div>
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
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          uri
          path
          label
          parentId
          cssClasses
          menu {
            node {
              name
            }
          }
        }
      }
    }
  `,
};

const FIND_CARE_QUERY = gql`
  query FindCareQuery {
    globalthemeoptions {
      headerSettings {
        findCareUrl
      }
    }
  }
`;
