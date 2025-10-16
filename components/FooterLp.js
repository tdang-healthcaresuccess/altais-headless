import BrandLogo from "@/public/media/altais-logo-white.svg";
import { X } from "lucide-react";
import Facebook from "@/public/icons/fb.svg";
import LinkedIn from "@/public/icons/linkedin.svg";
import Instagram from "@/public/icons/instagram.svg";
import Image from "next/image";
import Link from "next/link";
import CareAward from "@/public/media/CareExcellence.png";

export default function Footer() {
  return (
    <footer className="block">
      <div className="block bg-[#111638]">
        <div className="container mx-auto">
         
          <div className="block pt-4 pb-7 md:pb-8 border-t border-[#84D0D2]">
            <p className="flex justify-start md:justify-end text-white text-xs">
              © 2025 Copyright Altais Inc. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
      <div className="block bg-custom-gradient w-full h-[15px] border-t-[3px] border-white"></div>
    </footer>
  );
}
