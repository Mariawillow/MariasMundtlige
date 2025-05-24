// "use client";
// // Fortæller Next.js, at denne komponent skal køre i browseren (klientsiden).

// // Vi importerer nogle værktøjer og komponenter, som vi skal bruge i headeren
// import { useState } from "react"; // Bruges til at gemme og ændre "tilstand" i komponenten (f.eks. om noget er åbent eller ej)
// import { useRouter } from "next/navigation"; // Bruges til at skifte side ved klik
// import { usePathname } from "next/navigation"; // Bruges til at finde ud af hvilken side vi er på
// import Link from "next/link"; // En Next.js måde at lave links, som ikke genindlæser hele siden
// import Image from "next/image"; // Bruges til billeder, optimeret af Next.js
// import logoLime from "@/logos/smk_logo_lime.png"
// import logoBlack from "@/logos/smk_logo_sort.png"; // Vi henter et sort logo
// import { UserButton, SignIn, useUser } from "@clerk/nextjs"; // Clerk giver login-funktionalitet
// import BasketIcon from "./BasketIcon";

"use client";
import Image from "next/image"; // Bruges til billeder, optimeret af Next.js
import { SignIn, useUser } from "@clerk/nextjs"; // Clerk giver login-funktionalitet
import logoLime from "@/logos/smk_logo_lime.png";
import logoBlack from "@/logos/smk_logo_sort.png"; // Vi henter et sort logo
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

// // Selve header-komponenten
// const Header = ({ variant = "lime" }) => {
//   // Her gemmer vi information om:
//   const [isOpen, setIsOpen] = useState(false); // Om mobil-menuen er åben
//   const [showSignIn, setShowSignIn] = useState(false); // Om login-boksen vises
//   const router = useRouter(); // Bruges til at navigere til andre sider
//   const pathname = usePathname(); // Finder ud af hvilken side vi er på
//   const { user } = useUser(); // Checker om en bruger er logget ind
//   // Hvis brugeren har valgt 'lime' som variant, så skal tekst og streg være grønne
//   const isLime = variant === "lime";
//   const textColor = isLime ? "text-[#C4FF00]" : "text-black";
//   const lineColor = isLime ? "bg-[#C4FF00]" : "bg-black";

const Header = ({ variant = "lime" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const isLime = variant === "lime";
  const textColor = isLime ? "text-[#C4FF00]" : "text-black";
  const lineColor = isLime ? "bg-[#C4FF00]" : "bg-black";

  // Ref for SignIn-box
  const signInRef = useRef(null);


  // Luk SignIn hvis man klikker udenfor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        signInRef.current &&
        !signInRef.current.contains(event.target)
      ) {
        setShowSignIn(false);
      }
    };

    if (showSignIn) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignIn]);

  return (
    // Hele menuen (nav) - det øverste område af siden
    <nav className="mb-4 relative z-50 flex sm:flex-row items-center justify-between mt-space-m px-4">
      {/* Logoet til venstre */}
      <Link href="/">
        <Image src={isLime ? logoLime : logoBlack} width={200} height={200} alt="SMK logo" />
      </Link>

      <DesktopMenu user={user} pathname={pathname} router={router} textColor={textColor} setShowSignIn={setShowSignIn} />

      {/* "Burger"-ikonet til mobilmenuen */}
      <div className="relative sm:hidden">
        <button
          className="flex flex-col justify-between w-8 h-6 sm:hidden"
          onClick={() => setIsOpen(!isOpen)} // Skifter om mobilmenuen er åben eller ej
        >
          {/* De tre streger i burger-menuen */}
          <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`h-0.75 w-full ${lineColor} transition-opacity duration-100 ease-linear ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>

        <MobileMenu isOpen={isOpen} user={user} setIsOpen={setIsOpen} textColor={textColor} setShowSignIn={setShowSignIn} />
      </div>


      {/* Login-boksen fra Clerk. Vises kun hvis showSignIn er true */}
      {showSignIn && (
        <div
          ref={signInRef}
          className="absolute top-full right-4 mt-4 bg-white shadow-lg border border-gray-200 z-50 p-4 rounded-xl"
        >
          <SignIn routing="hash" />
        </div>
      )}
    </nav>
  );
};

export default Header; // Gør det muligt at bruge Header andre steder i dit projekt


//Bud på en ny Header der er samlet og fulde hele siden ud.
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useUser, SignIn, UserButton } from "@clerk/nextjs";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import BasketIcon from "./BasketIcon";
// import logoLime from "@/logos/smk_logo_lime.png";
// import logoBlack from "@/logos/smk_logo_sort.png";

// const Header = ({ variant = "lime" }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//   const { user } = useUser();
//   const pathname = usePathname();
//   const router = useRouter();
//   const signInRef = useRef(null);

//   const isLime = variant === "lime";
//   const textColor = isLime ? "text-[#C4FF00]" : "text-black";
//   const lineColor = isLime ? "bg-[#C4FF00]" : "bg-black";

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (signInRef.current && !signInRef.current.contains(e.target)) {
//         setShowSignIn(false);
//       }
//     };
//     if (showSignIn) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showSignIn]);

//   const navItems = (
//     <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-8 sm:gap-space-l">
//       <Link
//         href={user ? "/dashboard" : "/events"}
//         className={`w-full text-center sm:w-auto sm:text-left border-b-2 sm:border-none border-[#C4FF00] pb-2 sm:pb-0 desktop_header_font_size hover:underline ${textColor} ${pathname === (user ? "/dashboard" : "/events") ? "underline" : ""
//           }`}
//         onClick={() => setIsOpen(false)}
//       >
//         {user ? "Dashboard" : "Events"}
//       </Link>

//       {!user && (
//         <button
//           onClick={() => {
//             setShowSignIn(true);
//             setIsOpen(false);
//           }}
//           className={`w-full text-center sm:w-auto border-b-2 sm:border-none border-[#C4FF00] pb-2 sm:pb-0 desktop_header_font_size hover:underline ${textColor}`}
//         >
//           Log ind
//         </button>
//       )}

//       <Link
//         href="/basket"
//         className="w-full text-center sm:w-auto border-b-2 sm:border-none border-[#C4FF00] pb-2 sm:pb-0"
//         onClick={() => setIsOpen(false)}
//       >
//         <BasketIcon variant={variant} />
//       </Link>

//       {user && <UserButton showName />}
//     </div>
//   );

//   return (
//     <nav className="mb-4 relative z-50 flex sm:flex-row items-center justify-between mt-space-m px-4">
//       {/* Logo */}
//       <Link href="/" className="z-50">
//         <Image src={isLime ? logoLime : logoBlack} width={200} height={200} alt="SMK logo" />
//       </Link>

//       {/* Desktop menu */}
//       <div className="hidden sm:flex items-center z-50">{navItems}</div>

//       {/* Burger menu ikon – kun mobil */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="sm:hidden flex flex-col justify-between w-8 h-6 z-50"
//         aria-label="Toggle menu"
//       >
//         <span
//           className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "rotate-45 translate-y-2.5" : ""
//             }`}
//         />
//         <span
//           className={`h-0.75 w-full ${lineColor} transition-opacity duration-100 ease-linear ${isOpen ? "opacity-0" : "opacity-100"
//             }`}
//         />
//         <span
//           className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
//             }`}
//         />
//       </button>

//       {/* Mobilmenu – fuld baggrund og klikbare punkter med mellemrum */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-[#bab0bc] flex flex-col justify-center items-center z-40 px-10 sm:hidden">
//           {navItems}
//         </div>
//       )}

//       {/* Login-popup */}
//       {showSignIn && (
//         <div
//           ref={signInRef}
//           className="absolute top-full right-4 mt-4 bg-white shadow-lg border border-gray-200 z-50 p-4 rounded-xl"
//         >
//           <SignIn routing="hash" />
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Header;
