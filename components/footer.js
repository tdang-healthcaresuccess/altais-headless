import BrandLogo from "@/public/media/altais-logo-white.svg";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="block">
      <div className="block bg-[#111638]">
        <div className="container mx-auto">
          <div className="block pt-10 pb-12">
            <div className="block md:flex justify-between gap-4">
              <div className="flex items-center md:block w-full md:w-auto md:border-none border-b border-primary pb-8 md:pb-0 mb-8 md:mb-0 ">
                <Link href="/" className="flex-center">
                  <Image
                    src={BrandLogo}
                    alt="Altais"
                    width={180}
                    height={55}
                    priority
                  />
                </Link>
                <div className="flex md:hidden w-full justify-end gap-4">
                  <Link
                    href="https://www.facebook.com/"
                    type="button"
                    className="btn btn-social"
                  >
                    <Facebook size={16} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    type="button"
                    className="btn btn-social"
                  >
                    <Instagram size={16} />
                  </Link>
                  <Link
                    href="https://linkedin.com/"
                    type="button"
                    className="btn btn-social"
                  >
                    {" "}
                    <Linkedin size={16} />
                  </Link>
                </div>
              </div>
              <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full md:w-[80%]">
                <div className="block pt-5">
                  <div className="flex flex-col gap-5">
                    <Link
                      href="/services/"
                      className="flex flex-col text-white text-sm leading[18px] font-semibold"
                    >
                      <span className="font-normal">For</span> Patients
                    </Link>
                    <Link
                      href="/for-providers/"
                      className="flex flex-col text-white text-sm leading[18px] font-semibold"
                    >
                      <span className="font-normal">For</span> Providers
                    </Link>
                    <Link
                      href="/for-partners/"
                      className="flex flex-col text-white text-sm leading[18px] font-semibold"
                    >
                      <span className="font-normal">For</span> Partners
                    </Link>
                    <Link
                      href="/for-providers/amg-locations/"
                      className="flex flex-col text-white text-sm leading[18px] font-semibold"
                    >
                      <span className="font-normal">Our</span> Clinics
                    </Link>
                  </div>
                </div>
                <div className="block pt-5 order-3 sm:order-3 md:order-3 lg:order-2">
                  <ul className="flex flex-col gap-5">
                    <li>
                      <Link
                        href="/about/"
                        className="text-white text-[15px] leading-[19px] font-semibold"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources/"
                        className="text-white text-[15px] leading-[19px] font-semibold"
                      >
                        Resources
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us/"
                        className="text-white text-[15px] leading-[19px] font-semibold"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="row-span-2 md:row-span-1 col-span-1 md:col-span-2 lg:col-span-2 gap-4 order-2 sm:order-2 lg:order-3">
                  <div className="block md:grid grid-cols-2 gap-4">
                    <div className="block pt-5">
                      <ul className="flex flex-col gap-5">
                        <li>
                          <Link
                            href="/blog/"
                            className="text-[#FAA61A] text-[15px] leading-[19px] font-semibold"
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/news/"
                            className="text-[#FAA61A] text-[15px] leading-[19px] font-semibold"
                          >
                            News
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/careers/"
                            className="text-[#FAA61A] text-[15px] leading-[19px] font-semibold"
                          >
                            Careers
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="block pt-5">
                      <ul className="flex flex-col gap-3">
                        <li>
                          <Link
                            href="/website-privacy"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Website Privacy{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/patient-privacy"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Patient Privacy{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/cookies/"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Cookies{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/terms-of-use/"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Terms of Use{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/patient-bill-of-rights/"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Patient Bill of Rights{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/non-discrimination-notice/"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Non-Discrimination Notice{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/consent-preferences/"
                            className="text-white text-xs leading-[16px] font-normal"
                          >
                            {" "}
                            Consent Preferences{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex gap-4 pt-7 order-4">
                  <Link
                    href="https://www.facebook.com/profile.php?id=100054693853136"
                    type="button"
                    className="btn btn-social"
                  >
                    <Facebook size={16} />
                  </Link>
                  <Link
                    href="https://twitter.com/AltaisHealth"
                    type="button"
                    className="btn btn-social"
                  >
                    <X size={16} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/altaishealth/"
                    type="button"
                    className="btn btn-social"
                  >
                    {" "}
                    <Linkedin size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="block pt-4 pb-7 md:pb-8 border-t border-[#84D0D2]">
            <p className="flex justify-start md:justify-end text-white text-xs">
              © 2025 Copyright Altais Inc. All rights reserved. <span>&nbsp;| &nbsp;</span><Link href="/sitemap" className="text-[#FAA61A] hover:underline"> Sitemap</Link>
            </p>
           
          </div>
        </div>
      </div>
      <div className="block bg-custom-gradient w-full h-[15px] border-t-[3px] border-white"></div>
    </footer>
  );
}
