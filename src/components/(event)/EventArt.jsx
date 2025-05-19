import Image from "next/image";
import Link from "next/link";

const EventArt = ({ art }) => {
  // Hent den første titel fra 'titles' arrayet
  const title = art?.titles?.[0]?.title || "Ukendt Titel"; // Fallback til "Ukendt Titel" hvis ikke findes

  // Hent billede (hvis der findes et)
  const imageUrl = art?.image_thumbnail || "StatuePic"; // Fallback til standard billede

  return (
    <Link href={`/art/${art.object_number}`} className="relative aspect-[3/2] group w-full cursor-pointer">
      <Image
        src={imageUrl} // Brug kunstværkets billede
        alt={title} // Brug kunstværkets titel som alt-tekst
        width={300}
        height={200}
        className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border-[3px] group-hover:border-[#C4FF00]"
      />
        <div className="hidden sm:flex absolute inset-0 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h4 className="text-black font-semibold">{title}</h4>
      </div>

      <div className="sm:hidden mb-6  mt-3 text-center">
        <h4 className="text-black font-semibold">{title}</h4>
        </div>
    </Link>
  );
};

export default EventArt;

//  {/* Overlay text (hidden on small screens) */}
//  <div className="hidden sm:flex absolute inset-0 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
//  <h4 className="text-black font-semibold">{event.title}</h4>
//  <h3 className="text-black font-light">459 DKK</h3>
//  <p className="text-black font-semibold">{event.date}</p>
// </div>
