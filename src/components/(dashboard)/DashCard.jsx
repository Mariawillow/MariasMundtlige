import Image from "next/image";
import StatuePic from "@/images/statuePic.svg";

const DashCard = () => {
  return (
    <div className="group w-full max-w-xs cursor-pointer border border-transparent rounded-lg transition duration-300 hover:shadow-md group-hover:border-[#C4FF00]">
      {/* Billedet */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
        <Image
          src={StatuePic}
          alt="statuebillede"
          width={300}
          height={200}
          className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
        />
      </div>

      {/* Teksten UNDER billedet */}
      <div className="flex flex-col justify-center items-center text-center p-4">
        <h4 className="text-black font-semibold">Hans Egde</h4>
        <h3 className="text-black font-light">459 DKK</h3>
        <p className="text-black font-semibold">20/10-25</p>
      </div>
    </div>
  );
};

export default DashCard;
