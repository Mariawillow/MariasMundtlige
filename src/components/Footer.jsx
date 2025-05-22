import Image from "next/image";
import SMKLogoSort from "@/images/SMK_FirkantLogo_Black.svg";

const Footer = () => {
  return (
    <footer className="mt-screen col-span-full bg-[#6b5f6e] text-black py-[var(--space-s)] px-[var(--space-s)] mt-space-2xl">
      <div className="flex flex-col max-w-[var(--content-width)] mx-auto sm:flex-row sm:justify-between sm:items-end">
        <p className="order-2 mt-space-m sm:-order-1">CVR: 3235671077458</p>
        <Image src={SMKLogoSort} alt="SMK Logo" width={200} height={60} />
      </div>
    </footer>
  );
};

export default Footer;
