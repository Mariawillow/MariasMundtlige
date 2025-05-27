"use client";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const ButtonBack = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center gap-2 text-[#C4FF00] font-semibold hover:underline">
      <HiOutlineArrowLongLeft className="text-xl" />
      <span>Tilbage</span>
    </button>
  );
};

export default ButtonBack;
