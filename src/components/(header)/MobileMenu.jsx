import Link from "next/link";
import BasketIcon from "./BasketIcon";
import { useRouter } from "next/navigation";

const MobileMenu = ({ isOpen, user, setIsOpen, textColor, setShowSignIn }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full h-screen bg-[#bab0bc] sm:hidden flex flex-col items-center gap-space-xl z-10">
      {!user && (
        <Link
          href="/events"
          className={`mobile_header_font_size ${textColor}`}
          onClick={() => {
            setIsOpen(false);
            router.push("/events");
          }}
        >
          Events
        </Link>
      )}

      {user && (
        <Link
          href="/dashboard"
          className={`mobile_header_font_size ${textColor}`}
          onClick={() => {
            setIsOpen(false);
            router.push("/dashboard");
          }}
        >
          Dashboard
        </Link>
      )}

      {!user && (
        <button
          className={`mobile_header_font_size ${textColor}`}
          onClick={() => {
            setShowSignIn(true);
            setIsOpen(false);
          }}
        >
          Log ind
        </button>
      )}

      <Link href="/basket">
        <BasketIcon />
      </Link>
    </div>
  );
};

export default MobileMenu;
