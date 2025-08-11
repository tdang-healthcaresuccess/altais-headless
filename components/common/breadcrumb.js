"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({ items = [] }) {
  // `items` will be an array of objects like:
  // [{ label: "Home", link: "/" }, { label: "Find Doctor", link: "/find-doctor" }, { label: "Brittany Camille, FNP-C" }]
  
  return (
    <section className="hidden md:block py-2 box-shadow-custom5">
      <div className="container mx-auto">
        <ul className="flex flex-wrap items-center gap-1 text-sm text-gray-600 min-h-[50px]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center">
                {!isLast ? (
                  <Link
                    href={item.link || "#"}
                    className="hover:text-primary font-normal text-bluePrimary text-xs"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium text-xs">{item.label}</span>
                )}

                {!isLast && (
                  <ChevronRight className="w-4 h-4 mx-1 text-blurPrimary" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
