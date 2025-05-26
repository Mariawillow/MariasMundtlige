"use client";

import Image from "next/image";
import Header from "@/components/(header)/Header";
import ButtonPrimary from "@/components/ButtonPrimary";
import statuePic from "@/images/statuePic.svg";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Opret en GSAP-timeline med standardvarighed og easing
    const tl = gsap.timeline({
      defaults: {
        duration: 2, // Hver animation varer 1 sekund
        ease: "power2.out", // Giver en blød og naturlig bevægelse
      },
    });

    // Første animation: Overskriften glider op (y: 60 → 0) og fader ind (opacity: 0 → 1)
    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
    })

      // Anden animation: Knappen glider lidt op og fader ind
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
        },
        "-=0.2" // "-=0.5" betyder at den starter 0.5 sekunder før den forrige animation er færdig (overlap)
      );
  }, []); // Kører kun én gang ved første render

  return (
    <div className="bg-[url('/images/statuePic.svg')] bg-cover bg-no-repeat">
      <Image src={statuePic} alt="Statue" layout="fill" objectFit="cover" className="scale-x-[-1]" />
      <div className="col-start-2 bg-cover bg-no-repeat bg-center relative">
        <Header variant="lime" />

        <h1 ref={headingRef} className="text-[#C4FF00] leading-relaxed font-light mt-space-2xl">
          Oplev Storartet Kunst <br /> På Flere Måder
        </h1>

        <div className="justify-self-end mt-65" ref={buttonRef}>
          <ButtonPrimary href="/events">Se events</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
