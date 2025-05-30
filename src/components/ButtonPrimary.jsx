import Link from "next/link";
import Image from "next/image";
import arrowLong from "@/images/arrowLong.svg";

const ButtonPrimary = ({ href, children }) => (
  <Link href={href} className="group inline-block text-[#C4FF00] cursor-pointer">
    <span className="inline-flex flex-col">
      <span className="text-2xl sm:text-4xl font-bold px-4 sm:px-8">{children}</span>
      <Image src={arrowLong} alt="pil" className="self-end transition-transform group-hover:translate-x-1" loading="lazy"></Image>
    </span>
  </Link>
);

export default ButtonPrimary;
