import Image from "next/image";
import StatuePic from "@/images/statuePic.svg";
import Link from "next/link";

const EventArt = ({ art }) => {
  return (
    <Link href={`/`} className="relative aspect-[3/2] group w-full cursor-pointer">
      <Image src={StatuePic} alt="statuebillede" width={300} height={200} className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border group-hover:border-[#C4FF00]" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h4 className="text-black font-semibold">Kort</h4>
      </div>
    </Link>
  );
};

export default EventArt;
