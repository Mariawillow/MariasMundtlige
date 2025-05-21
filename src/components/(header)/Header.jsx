"use client";
// Fortæller Next.js, at denne komponent skal køre i browseren (klientsiden).

// Vi importerer nogle værktøjer og komponenter, som vi skal bruge i headeren
import { useState } from "react"; // Bruges til at gemme og ændre "tilstand" i komponenten (f.eks. om noget er åbent eller ej)
import { useRouter } from "next/navigation"; // Bruges til at skifte side ved klik
import { usePathname } from "next/navigation"; // Bruges til at finde ud af hvilken side vi er på
import Link from "next/link"; // En Next.js måde at lave links, som ikke genindlæser hele siden
import Image from "next/image"; // Bruges til billeder, optimeret af Next.js
import logoLime from "@/logos/smk_logo_lime.png"
import logoBlack from "@/logos/smk_logo_sort.png"; // Vi henter et sort logo
import { UserButton, SignIn, useUser } from "@clerk/nextjs"; // Clerk giver login-funktionalitet
import BasketIcon from "./BasketIcon";


// Selve header-komponenten
const Header = ({ variant = "lime" }) => {
  // Her gemmer vi information om:
  const [isOpen, setIsOpen] = useState(false); // Om mobil-menuen er åben
  const [showSignIn, setShowSignIn] = useState(false); // Om login-boksen vises
  const router = useRouter(); // Bruges til at navigere til andre sider
  const pathname = usePathname(); // Finder ud af hvilken side vi er på
  const { user } = useUser(); // Checker om en bruger er logget ind
  // Hvis brugeren har valgt 'lime' som variant, så skal tekst og streg være grønne
  const isLime = variant === "lime";
  const textColor = isLime ? "text-[#C4FF00]" : "text-black";
  const lineColor = isLime ? "bg-[#C4FF00]" : "bg-black";



  return (
    // Hele menuen (nav) - det øverste område af siden
    <nav className="relative z-50 flex flex-col sm:flex-row items-center justify-between mt-space-m px-4">

      {/* Logoet til venstre */}
      <Link href="/">
        <Image src={isLime ? logoLime : logoBlack} width={200} height={200} alt="SMK logo" />
      </Link>


      {/* Desktop-menuen (vises kun på større skærme, pga. 'sm:flex') */}
      <div className="hidden sm:flex gap-space-l items-center">
        {/* Link til "Events"-siden */}
        {!user && (
          <Link href="/events" className={`desktop_header_font_size hover:underline hover:decoration-3 hover:underline-offset-8 ${textColor} ${pathname === "/events" ? "underline decoration-3 underline-offset-8" : ""}`} onClick={() => router.push("/events")}>
            Events
          </Link>
        )}

        {/* Link til "Dashboard"-siden */}
        {user && (
          <Link href="/dashboard" className={`desktop_header_font_size hover:underline hover:decoration-3 hover:underline-offset-8 ${textColor} ${pathname === "/events" ? "underline decoration-3 underline-offset-8" : ""}`} onClick={() => router.push("/dashboard")}>
            Dashboard
          </Link>
        )}

        {/* ✅ Vis kun "Log ind"-knappen hvis brugeren IKKE er logget ind */}
        {!user && (
          <button onClick={() => setShowSignIn(!showSignIn)} className={`desktop_header_font_size hover:underline hover:decoration-3 hover:underline-offset-8 ${textColor} focus:outline-none`}>
            Log ind
          </button>
        )}

        {/* Kurv og brugerknap */}
        <div className="relative">
        <Link href="/basket">
          <BasketIcon />
        </Link>
        </div>

        <UserButton showName /> {/* Viser brugerens navn og menu, hvis man er logget ind */}
      </div>


      {/* "Burger"-ikonet til mobilmenuen */}
      <button
        className="flex flex-col justify-between w-8 h-6 sm:hidden"
        onClick={() => setIsOpen(!isOpen)} // Skifter om mobilmenuen er åben eller ej
      >
        {/* De tre streger i burger-menuen */}
        <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
        <span className={`h-0.75 w-full ${lineColor} transition-opacity duration-100 ease-linear ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
      </button>


      {/* Mobilmenuen (vises kun hvis isOpen er true) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-[#bab0bc] sm:hidden flex flex-col items-center gap-space-xl z-10">
          {/* Link til events */}
          {!user && (
            <Link
              href="/events"
              className={`mobile_header_font_size ${textColor}`}
              onClick={() => {
                setIsOpen(false); // Lukker menuen når man klikker
                router.push("/events");
              }}>
              Events
            </Link>
          )}

          {/* Link til Dashboard */}
          {user && (
            <Link
              href="/dashboard"
              className={`mobile_header_font_size ${textColor}`}
              onClick={() => {
                setIsOpen(false);
                router.push("/dashboard");
              }}>
              Dashboard
            </Link>
          )}

          {/*  Kun vis hvis ikke logget ind */}
          {/* if-sætning med && - hvis det til venstre er sandt (user ikke er logget ind) så fjernes knappen. */}
          {!user && (
            <button
              className={`mobile_header_font_size ${textColor}`}
              onClick={() => {
                setShowSignIn(!showSignIn);
                setIsOpen(false);
              }}>
              Log ind
            </button>
          )}

          {/* Kurv vises også i mobilmenuen */}
          <Basket variant={variant} />
        </div>
      )}

      {/* Login-boksen fra Clerk. Vises kun hvis showSignIn er true */}
      {showSignIn && (
        <div className="absolute top-full right-4 mt-4 bg-white shadow-lg border border-gray-200 z-50 p-4 rounded-xl">
<SignIn routing="hash" />
        </div>
      )}
    </nav>
  );
};

export default Header; // Gør det muligt at bruge Header andre steder i dit projekt
