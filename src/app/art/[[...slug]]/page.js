import Image from "next/image";
import Header from "@/components/(header)/Header";
import { getArtDetails } from "@/api/smk";
import ArtClient from "@/components/ButtonBackClient";
import { format, parseISO } from "date-fns";
import { da } from "date-fns/locale";
import { artImageHelper } from "@/lib/firstArtImgHelper";

export default async function ArtSingleView(props) {
  // const { object_number } = await (await props).params;
  const slug = props.params.slug || [];

  // slug[0] = object_number
  // slug[1] = part (kan være undefined hvis der ikke er nogen part)
  const object_number = slug[0];
  const part = slug[1] || null;

  // Hvis part findes, så bygger vi "object_number/part", ellers bare "object_number"
  const fullObjectNumber = part ? `${object_number}/${part}` : object_number;

  // Hent kunstværksdata fra SMK-API
  const artwork = await getArtDetails(fullObjectNumber);

  // Konstanter som opsamler information fra vores API
  // Vi bruger Optional chaining (?.) for at sikre, at vi ikke får en fejl, når vi prøver at tilgå noget, som muligvis ikke findes
  const primaryColor = artwork?.colors?.[0]; //Første farve i color arrayet
  const secondaryColor = artwork?.colors?.[1]; //Anden farve i color arrayet
  const imageUrl = artImageHelper(artwork);
  const title = artwork.titles?.[0]?.title || "Ukendt Titel";
  const periode = artwork?.production_date?.[0]?.period || "Ukendt periode";
  const techniques = artwork?.techniques || "ukendt teknik";
  const department = artwork?.responsible_department || "ukendt ansvarlig afdeling";
  const artist = artwork?.artist || "Ukendt kunstner";
  const artistDateOfBirth = artwork?.production?.[0]?.creator_date_of_birth;
  const artistDateOfDeath = artwork?.production?.[0]?.creator_date_of_death;
  const nationality = artwork?.production?.[0]?.creator_nationality || "ukendt nationalitet";

  return (
    <div className="relative px-[var(--space-s)] py-[var(--space-l)] overflow-hidden">
      <Header />
      <ArtClient />
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
            Værket er fremstillet med teknikken '{techniques}', og hører til {department}.
          </p>
          <h4 className="font-semibold mt-space-m">Kunstner</h4>
          <p className="font-light">
            {artist}, {artistDateOfBirth ? format(parseISO(artistDateOfBirth), "d. MMM yyyy", { locale: da }) : "Ukendt fødeår"} - {artistDateOfDeath ? format(parseISO(artistDateOfDeath), "d. MMM yyyy", { locale: da }) : "Ukendt dødsår"}, {nationality}
          </p>
        </aside>
      </section>
    </div>
  );
}
