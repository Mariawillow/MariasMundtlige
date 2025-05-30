"use client";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const ButtonBack = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center gap-2 text-[#C4FF00] font-semibold cursor-pointer mb-12 hover:underline hover:underline-offset-10 hover:decoration-3">
      <HiOutlineArrowLongLeft className="text-xl" />
      <span>Tilbage</span>
    </button>
  );
};

export default ButtonBack;
