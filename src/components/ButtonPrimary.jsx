// function ButtonPrimary({ variant = "primary", children }) {
//     const baseStyles = "px-4 py-2 rounded text-white font-bold";
//     const variants = {
//         primary: "bg-blue-500 hover:bg-blue-600",
//         secondary: "bg-gray-500 hover:bg-gray-600",
//         danger: "bg-red-500 hover:bg-red-600",
//     };

//     return (
//         <a className={`${baseStyles} ${variants[variant]}`}>
//             {children}
//         </a >
//     );
// }
// export default ButtonPrimary;


import { ArrowRight } from "lucide-react";

const ButtonPrimary = ({ size = "large", children }) => {
    const isLarge = size === "large";

    const textSize = isLarge ? "text-[var(--step-5)] font-bold" : "text-[var(--step-2)]";
    const iconSize = isLarge ? 40 : 24;
    const lineHeight = isLarge ? "h-1" : "h-[2px]";

    return (
        <button className="cursor-pointer group inline-block text-[#C4FF00]">
            <div className="inline-flex flex-col items-start">
                {/* Text + pil */}
                <div className={`flex items-center gap-2 ${textSize}`}>
                    <span>{children}</span>
                    <ArrowRight size={iconSize} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </div>

                {/* Understreg det matcher text og pil længde*/}
                <div className={`w-full ${lineHeight} bg-[#C4FF00] mt-[0.25em]`} />
            </div>
        </button>
    );
};

export default ButtonPrimary;

