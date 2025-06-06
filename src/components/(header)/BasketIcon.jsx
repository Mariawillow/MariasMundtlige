"use client";

import { HiOutlineShoppingBag } from "react-icons/hi";
import useCartStore from "@/app/store/cartStore";

const BasketIcon = ({ variant = "black" }) => {
  const { items } = useCartStore();
  const isLime = variant === "lime";
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative inline-block">
      <HiOutlineShoppingBag aria-label="kurv ikon" size={40} className={`cursor-pointer ${isLime ? "text-[#C4FF00]" : "text-black"}`} />
      {itemCount > 0 && <span className={`absolute bottom-0 right-0 rounded-full text-xs font-bold px-2 py-0.5 bg-[#C4FF00]`}>{itemCount}</span>}
    </div>
  );
};

export default BasketIcon;
