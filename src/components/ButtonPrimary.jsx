import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";

const ButtonPrimary = ({ href, size = "large", children, className = "" }) => {
  // Sætter en betingelse for tekststørrelsen og ikonet afhængig af size prop'en
  const isLarge = size === "large";

  const textSize = isLarge ? "text-4xl font-bold" : "text-2xl"; // Størrelse på teksten
  const iconSize = isLarge ? 75 : 24; // Størrelse på pilen

  const baseClasses = `group inline-block text-[#C4FF00] cursor-pointer ${className}`;

  return (
    <Link href={href} className={baseClasses}>
      <span className="inline-flex flex-col">
        <span className={`${textSize} px-8`}>{children}</span>
        <HiArrowLongRight size={iconSize} className="-mt-6 self-end transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default ButtonPrimary;
