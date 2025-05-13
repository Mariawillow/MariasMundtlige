import Image from "next/image";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { getArtworkByObjectNumber } from "@/api/smk";

export default async function ArtSingleView({ params }) {
  const { object_number } = params;

  const artwork = await getArtworkByObjectNumber(object_number);

  if (!artwork) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold">Værket blev ikke fundet</h1>
        <p>Enten eksisterer det ikke, eller der opstod en fejl i API-kaldet.</p>
      </div>
    );
  }

  const imageUrl = artwork.image_thumbnail || "/fallback.jpg";
  const title = artwork.titles?.[0] || "Ingen titel";
  const date = artwork.production_date || "Ukendt årstal";
  const technique = artwork.techniques?.[0]?.name || "Ukendt teknik";
  const collection = artwork.collections?.[0]?.name || "Ukendt samling";
  const artist = artwork.creators?.[0]?.name || "Ukendt kunstner";
  const birth = artwork.creators?.[0]?.birth_year || "?";
  const death = artwork.creators?.[0]?.death_year || "?";
  const nationality = artwork.creators?.[0]?.nationality || "?";

  return (
    <div className="relative px-[var(--space-s)] py-[var(--space-l)] overflow-hidden">
      <div className="inline-block text-center mb-[var(--space-m)]">
        <p className="text-[#C4FF00] font-semibold inline-block">Tilbage</p>
        <div className="relative h-6 mt-1">
          <HiOutlineArrowLongLeft className="text-[#C4FF00] absolute left-0 top-0 w-full scale-x-100 scale-y-200" />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-l)] relative z-10">
        <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
          <div className="absolute w-1/3 h-1/3 -left-[10%] -top-[10%] bg-[#b6b442] -z-10" />
          <div className="absolute w-1/2 h-1/2 left-3/5 -bottom-[15%] bg-[#8b6b3a] -z-10" />
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        <div className="relative z-10">
          <h1 className="font-semibold text-[var(--step-4)]">{title}</h1>
          <h3 className="font-light text-[var(--step-2)]">{date}</h3>
          <p className="font-light mt-space-s">
            Værket er fremstillet med teknikken {technique}, og hører til {collection}.
          </p>
          <h4 className="font-semibold mt-space-m">Kunstner</h4>
          <p className="font-light">
            {artist}, {birth} – {death}, {nationality}
          </p>
        </div>
      </section>
    </div>
  );
}
