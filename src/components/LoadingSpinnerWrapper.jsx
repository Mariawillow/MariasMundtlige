"use client";
import React, { useEffect, useState, memo } from "react"; // Sørg for at importere React
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

// Omsluttende LoadingSpinnerWrapper i React.memo for at undgå unødvendige genrenderinger
// memo bruges til at optimere da den forhindre unødvendige genrenderinger af LoadingSpinnerWrapper, medmindre children eller pathname ændrer sig.
const LoadingSpinnerWrapper = memo(({ children }) => {
  const [loading, setLoading] = useState(false); //Holder styr på om loading spinneren skal vises eller ej
  const pathname = usePathname();

  // Kører en funktion hver gang pathname ændrer sig
  useEffect(() => {
    setLoading(true); // Spinneren aktiveres, når ruten ændres
    const timer = setTimeout(() => {
      setLoading(false); // Spinneren deaktiveres efter 400 ms
    }, 400);

    // Når komponenten unmountes eller pathname ændres, rydder vi op (hvis man skifter side hurtigt efter hinanden)
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <LoadingSpinner />} {/* Når loading er true vises LoadingSpinner */}
      {/* Itererer over siden indhold/children */}
      {React.Children.map(
        children,
        (child) => React.cloneElement(child, { key: pathname }) // Tilføjer unik key til hvert barn baseret på den aktuelle pathname. Dette hjælper React med at genkende, når children ændrer sig.
      )}
    </>
  );
});

export default LoadingSpinnerWrapper;
