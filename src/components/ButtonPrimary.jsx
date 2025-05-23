import Link from "next/link";
import Image from "next/image";
import arrowLong from "@/images/arrowLong.svg";

const ButtonPrimary = ({ href, children }) => (
  <Link href={href} className="group inline-block text-[#C4FF00] cursor-pointer">
    <span className="inline-flex flex-col">
      <span className="text-4xl font-bold px-8">{children}</span>
      <Image src={arrowLong} alt="pil" className="self-end transition-transform group-hover:translate-x-1"></Image>
    </span>
  </Link>
);

export default ButtonPrimary;
