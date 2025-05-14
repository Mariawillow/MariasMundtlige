import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Image from "next/image";
import Header from "@/components/Header";
import { getArtDetails } from "@/api/smk"; // Din API-funktion

export default async function ArtSingleView({ params }) {
  const { object_number } = params;

  // Hent kunstværksdata fra din API
  const artwork = await getArtDetails(object_number);

  const title = artwork.titles?.[0]?.title || "Ukendt Titel";
  const imageUrl = artwork?.image_thumbnail || "/images/statuePic.svg";
  const description = artwork?.description || "Ingen beskrivelse tilgængelig.";
  const artist = artwork?.artist || "Ukendt kunstner";
  const periode = artwork?.production_date?.[0]?.period || "Ukendt periode";

  return (
    <div className="relative px-[var(--space-s)] py-[var(--space-l)] overflow-hidden">
      <Header variant="black" />

      {/* Tilbage-knap */}
      <div className="inline-block text-center mb-[var(--space-m)]">
        {/* Du kan evt. bruge next/navigation her hvis du vil gøre knappen interaktiv */}
        <p className="text-[#C4FF00] font-semibold inline-block">Tilbage</p>
        <div className="relative h-6 mt-1">
          <HiOutlineArrowLongLeft className="text-[#C4FF00] absolute left-0 top-0 w-full scale-x-100 scale-y-200" />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-l)] relative z-10">
        {/* VENSTRE: billede */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
          <div className="absolute w-1/3 h-1/3 -left-[10%] -top-[10%] bg-[#b6b442] -z-10" />
          <div className="absolute w-1/2 h-1/2 left-3/5 -bottom-[15%] bg-[#8b6b3a] -z-10" />
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        {/* HØJRE: tekst */}
        <div className="relative z-10">
          <h1 className="font-semibold text-[var(--step-4)]">{title}</h1>
          <h3 className="font-light text-[var(--step-2)]">{periode}</h3>
          <p className="font-light mt-space-s">{description}</p>
          <h4 className="font-semibold mt-space-m">Kunstner</h4>
          <p className="font-light">{artist}</p>
        </div>
      </section>
    </div>
  );
}
