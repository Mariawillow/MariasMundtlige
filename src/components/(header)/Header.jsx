"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, SignIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import BasketIcon from "./BasketIcon";

import logoLime from "@/images/smk_logo_lime.png";
import logoBlack from "@/images/smk_logo_sort.png";

const Header = ({ variant = "black" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const signInRef = useRef(null);

  const isLime = variant === "lime";
  const textColor = isLime ? "text-[#C4FF00]" : "text-black";
  const lineColor = isLime ? "bg-[#C4FF00]" : "bg-black";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (signInRef.current && !signInRef.current.contains(e.target)) {
        setShowSignIn(false);
      }
    };
    if (showSignIn) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSignIn]);

  const navItems = (
    <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-8 sm:gap-space-l">
      <Link
        href="/events"
        className={`w-full text-center sm:w-auto sm:text-left border-b-3 sm:border-none border-${lineColor}
        pb-2 sm:pb-0 desktop_header_font_size sm:hover:underline sm:hover:underline-offset-10 sm:hover:decoration-3 hover:cursor-pointer 
        ${textColor} ${pathname === "/events" ? "sm:underline sm:underline-offset-10 sm:decoration-3" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        Events
      </Link>

      {user && (
        <Link href="/dashboard" className={`w-full text-center sm:w-auto sm:text-left border-b-3 sm:border-none border-${lineColor} pb-2 sm:pb-0 desktop_header_font_size sm:hover:underline sm:hover:underline-offset-10 sm:hover:decoration-3 hover:cursor-pointer ${textColor} ${pathname === "/dashboard" ? "sm:underline sm:underline-offset-10 sm:decoration-3" : ""}`} onClick={() => setIsOpen(false)}>
          Dashboard
        </Link>
      )}
      {!user && (
        <button
          onClick={() => {
            setShowSignIn(true);
            setIsOpen(false);
          }}
          className={`w-full text-center sm:w-auto border-b-3 sm:border-none border-${lineColor} pb-2 sm:pb-0 desktop_header_font_size sm:hover:underline sm:hover:underline-offset-10 sm:hover:decoration-3 hover:cursor-pointer ${textColor}`}
        >
          Log ind
        </button>
      )}

      <Link href="/basket" className="w-full text-center sm:w-auto sm:border-none border-${lineColor} pb-2 sm:pb-0" onClick={() => setIsOpen(false)}>
        <BasketIcon variant={variant} />
      </Link>

      {/* UserButton desktop */}
      {user && (
        <div className="hidden sm:block">
          <UserButton />
        </div>
      )}
    </div>
  );

  return (
    <nav className="mb-4 relative z-50 flex sm:flex-row items-center justify-between mt-space-m">
      {/* Logo */}
      <Link href="/" className="z-50">
        <Image src={isLime ? logoLime : logoBlack} width={200} height={200} alt="SMK logo" />
      </Link>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center z-50">{navItems}</div>

      {/* UserButton mobil */}
      <div className="flex items-center sm:hidden z-50">
        {user && <UserButton />}

        {/* Burger menu ikon */}
        <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col justify-between w-8 h-6 ml-4" aria-label="Toggle menu">
          <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`h-0.75 w-full ${lineColor} transition-opacity duration-100 ease-linear ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobilmenu – fuld baggrund og klikbare punkter med mellemrum */}
      {isOpen && <div className="fixed inset-0 bg-[var(--background)] flex flex-col justify-center items-center z-40 px-10 sm:hidden">{navItems}</div>}

      {/* Login-popup */}
      {showSignIn && (
        <div ref={signInRef} className="absolute top-full right-4 mt-4 bg-white shadow-lg border border-gray-200 z-50 p-4 rounded-xl">
          <SignIn routing="hash" />
        </div>
      )}
    </nav>
  );
};

export default Header;
