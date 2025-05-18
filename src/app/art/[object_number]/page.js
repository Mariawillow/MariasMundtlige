import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Image from "next/image";
import Header from "@/components/Header";
import { getArtDetails } from "@/api/smk";

//Hjælpe-funktion som bruges senere til at omsætte fødsels- og dødsdato fra ISO-format til dansk dato
const formatDate = (isoDateString) => {
  //Hvis isoDateString ikke findes, returnerer vi "Ukendt dato".
  if (!isoDateString) return "Ukendt dato";
  // Opretter et Date-objekt ud fra den givne ISO-dato
  const date = new Date(isoDateString);
  // Formaterer datoen
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric", // Vist som dag, f.eks. "18"
    month: "long", // Vist som fuld måned, f.eks. "maj"
    year: "numeric", // Vist som årstal, f.eks. "2025"
  }).format(date);
};

export default async function ArtSingleView({ params }) {
  const { object_number } = params;

  // Hent kunstværksdata fra SMK-API
  const artwork = await getArtDetails(object_number);

  // Konstanter som opsamler information fra vores API
  // Vi bruger Optional chaining (?.) for at sikre, at vi ikke får en fejl, når vi prøver at tilgå noget, som muligvis ikke findes
  const primaryColor = artwork?.colors?.[0]; //Første farve i color arrayet
  const secondaryColor = artwork?.colors?.[1]; //Anden farve i color arrayet
  const imageUrl = artwork?.image_thumbnail || "/images/statuePic.svg";
  const title = artwork.titles?.[0]?.title || "Ukendt Titel";
  const periode = artwork?.production_date?.[0]?.period || "Ukendt periode";
  const techniques = artwork?.techniques || "ukendt teknik";
  const department = artwork?.responsible_department || "ukendt ansvarlig afdeling";
  const artist = artwork?.artist || "Ukendt kunstner";
  const artistDateOfBirth = artwork?.production?.[0]?.creator_date_of_birth;
  const artistDateOfDeath = artwork?.production?.[0]?.creator_date_of_death;
  const formattedBirthDate = formatDate(artistDateOfBirth) || "Ukendt fødeår";
  const formattedDeathDate = formatDate(artistDateOfDeath) || "Ukendt dødsår";
  const nationality = artwork?.production?.[0]?.creator_nationality || "Ukendt nationalitet";

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
        <article className="relative w-full max-w-md mx-auto aspect-[4/3]">
          <div className="absolute w-1/3 h-1/3 -left-[10%] -top-[10%] -z-10" style={{ backgroundColor: primaryColor }} />
          <div className="absolute w-1/2 h-1/2 left-3/5 -bottom-[15%] bg-[#8b6b3a] -z-10" style={{ backgroundColor: secondaryColor }} />
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </article>

        {/* HØJRE: tekst */}
        <aside className="relative z-10">
          <h1 className="font-semibold">{title}</h1>
          <h3 className="font-light">{periode}</h3>
          <p className="font-light mt-space-s">
            Værket er fremstillet med teknikken {techniques}, og hører til {department}.
          </p>
          <h4 className="font-semibold mt-space-m">Kunstner</h4>
          <p className="font-light">
            {artist}, {formattedBirthDate} - {formattedDeathDate}, {nationality}
          </p>
        </aside>
      </section>
    </div>
  );
}
