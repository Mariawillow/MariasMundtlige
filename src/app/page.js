"use client";

import Image from "next/image";
import Header from "@/components/(header)/Header";
import ButtonPrimary from "@/components/ButtonPrimary";
import statuePic from "@/images/statuePic.png";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const headingRef = useRef(null);

  useEffect(() => {
    // Overskriften glider op (y: 60 → 0) og fader ind (opacity: 0 → 1)
    gsap.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 2, //
      ease: "power2.out",
    });
  }, []); // Kører kun én gang ved første render

  return (
    <div className="bg-[url('/images/statuePic.png')] bg-cover bg-no-repeat">
      <Image src={statuePic} alt="Statue" fill style={{ objectFit: "cover" }} className="scale-x-[-1]" />
      <div className="col-start-2 bg-cover bg-no-repeat bg-center relative">
        <Header variant="lime" />

        <h1 ref={headingRef} className="text-3xl sm:text-m text-[#C4FF00] leading-relaxed font-light mt-space-2xl">
          Oplev Storartet Kunst <br /> På Flere Måder
        </h1>
        <h2>TEST</h2>

        <div className="flex justify-end mt-40">
          <ButtonPrimary href="/events">Se events</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
