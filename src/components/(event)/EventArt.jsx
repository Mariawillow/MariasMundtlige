"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { firstArtImgHelper } from "@/lib/firstArtImgHelper";
import artPlaceholder from "@/images/artPlaceholder.png";

const EventArt = ({ art }) => {
  // State til billed-URL, start med placeholder
  const [imageUrl, setImageUrl] = useState(artPlaceholder.src || artPlaceholder);

  // Brug den første titel hvis tilgængelig, ellers fallback
  const title = art?.titles?.[0]?.title || "Ukendt Titel";

  useEffect(() => {
    // Asynkron funktion til at hente billed-URL via helperen
    async function fetchImage() {
      if (art?.object_number) {
        const url = await firstArtImgHelper([art.object_number]);
        setImageUrl(url);
      }
    }

    fetchImage();
  }, [art?.object_number]);

  // Render med next/image, og brug den hentede eller fallback URL
  return (
    <Link href={`/art/${art.object_number}`} className="relative aspect-[3/2] group w-full cursor-pointer">
      <Image src={imageUrl} alt={title} width={300} height={200} className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border-[3px] group-hover:border-[#C4FF00]" loading="lazy" />

      {/* Hover-overlay til desktop */}
      <div className="hidden sm:flex absolute inset-0 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h4 className="text-black font-semibold">{title}</h4>
      </div>

      {/* Titel synlig på mobil */}
      <div className="sm:hidden mt-3 mb-6">
        <h4 className="text-black font-semibold">{title}</h4>
      </div>
    </Link>
  );
};

export default EventArt;
