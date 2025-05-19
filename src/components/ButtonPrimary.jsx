import { ArrowRight } from "lucide-react";

const ButtonPrimary = ({ size = "large", children, onClick, disabled }) => {
  const isLarge = size === "large";

  const textSize = isLarge ? "text-[var(--step-5)] font-bold" : "text-[var(--step-2)]";
  const iconSize = isLarge ? 40 : 24;
  const lineHeight = isLarge ? "h-1" : "h-[2px]";

  return (
    <button onClick={onClick} disabled={disabled} className={`cursor-pointer group inline-block text-[#C4FF00] disabled:opacity-40`}>
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
