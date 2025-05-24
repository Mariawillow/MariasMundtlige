import Image from "next/image";
import Link from "next/link";

const EventArt = ({ art }) => {
  // Brug den første titel hvis tilgængelig, ellers fallback
  const title = art?.titles?.[0]?.title || "Ukendt Titel";

  // Brug thumbnail hvis tilgængelig, ellers fallback til placeholder (StatuePic skal være defineret/importeret)
  const imageUrl = art?.image_thumbnail || "StatuePic";

  return (
    <Link
      href={`/art/${art.object_number}`}
      className="relative aspect-[3/2] group w-full cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border-[3px] group-hover:border-[#C4FF00]"
      />

      {/* Hover-overlay til desktop */}
      <div className="hidden sm:flex absolute inset-0 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h4 className="text-black font-semibold">{title}</h4>
      </div>

      {/* Titel synlig på mobil */}
      <div className="sm:hidden mt-3 mb-6 text-center">
        <h4 className="text-black font-semibold">{title}</h4>
      </div>
    </Link>
  );
};

export default EventArt;
