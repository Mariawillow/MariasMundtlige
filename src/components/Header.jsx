"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoLime from "../logos/smk_logo_lime.png";
import logoBlack from "../logos/smk_logo_sort.png";
import Basket from "./Basket";

const Header = ({ variant = "lime" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLime = variant === "lime";
  const textColor = isLime ? "text-lime-400" : "text-black";
  const lineColor = isLime ? "bg-lime-400" : "bg-black";

  return (
    <nav className="relative z-50 flex items-center justify-between mt-space-m px-4">
      {/* Logo */}
      <Link href="/">
        <Image src={isLime ? logoLime : logoBlack} width={200} height={200} alt="SMK logo" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-space-l items-center">
        <Link href="/listView" className={`desktop_header_font_size hover:underline hover:decoration-3 hover:underline-offset-8 ${textColor} ${pathname === "/listView" ? "underline decoration-3 underline-offset-8" : ""}`} onClick={() => router.push("/listView")}>
          Events
        </Link>
        <Link href="/" className={`desktop_header_font_size ${textColor}`}>
          Log ind
        </Link>
        <Basket variant={variant} />
      </div>

      {/* Burger icon */}
      <button className="flex flex-col justify-between w-8 h-6 sm:hidden" onClick={() => setIsOpen(!isOpen)}>
        {/* OnClick funktionen toggler mellem at være åben og lukket */}
        <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
        <span className={`h-0.75 w-full ${lineColor} transition-opacity duration-100 ease-linear ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-[#bab0bc] sm:hidden flex flex-col items-center gap-space-xl z-10">
          <Link
            href="/listView"
            className={`mobile_header_font_size ${textColor}`}
            onClick={() => {
              setIsOpen(false);
              router.push("/listView");
            }}
          >
            Events
          </Link>
          <Link href="/" className={`mobile_header_font_size ${textColor}`} onClick={() => setIsOpen(false)}>
            Log ind
          </Link>
          <Basket variant={variant} />
        </div>
      )}
    </nav>
  );
};

export default Header;
