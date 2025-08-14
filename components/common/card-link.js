import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CardLink({ link, linkText, linkTheme }) {
  return (
    <Link
      href={link}
      className={`pt-4 flex justify-end md:justify-start gap-1 font-medium  border-t border-lightPrimary text-[18px] leading-[24px] ${linkTheme == "secondary" ? "btn-link-secondary" : "btn-link-primary"}`}
    >
      {linkText}
      <ChevronRight className="w-[20px] h-[20px]" />
    </Link>
  );
}
