import Link from "next/link";
import BasketIcon from "./BasketIcon";
import { UserButton } from "@clerk/nextjs";

const DesktopMenu = ({ user, pathname, router, textColor, setShowSignIn }) => (
  <div className="hidden sm:flex gap-space-l items-center">
    {!user ? (
      <Link
        href="/events"
        className={`desktop_header_font_size hover:underline ${textColor} ${pathname === "/events" ? "underline" : ""}`}
        onClick={() => router.push("/events")}
      >
        Events
      </Link>
    ) : (
      <Link
        href="/dashboard"
        className={`desktop_header_font_size hover:underline ${textColor} ${pathname === "/dashboard" ? "underline" : ""}`}
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </Link>
    )}

    {!user && (
      <button
        onClick={() => setShowSignIn(true)}
        className={`desktop_header_font_size hover:underline ${textColor}`}
      >
        Log ind
      </button>
    )}

    <Link href="/basket">
      <BasketIcon />
    </Link>

    <UserButton showName />
  </div>
);

export default DesktopMenu;
