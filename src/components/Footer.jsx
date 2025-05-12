import Image from "next/image";
import SMKLogoSort from "@/images/SMK_FirkantLogo_Black.svg";

const Footer = () => {
    return (
        <div className="bg-[#6b5f6e] text-black py-[var(--space-s)] px-[var(--space-s)]">
            <div className="flex justify-between items-end">
                <p className="text-[var(--step--1)]">CVR: 3235671077458</p>
                <Image
                    src={SMKLogoSort}
                    alt="SMK Logo"
                    width={200}
                    height={60}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default Footer;
