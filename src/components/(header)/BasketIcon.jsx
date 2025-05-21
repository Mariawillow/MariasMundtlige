"use client";

import Basket from "../(kurv)/Basket"; // Kurv-komponent, som du selv har lavet
import useCartStore from "@/app/store/cartStore"




const BasketIcon = ({ variant = "lime" }) => {
    const { items } = useCartStore();
    return ( <div>
<Basket variant={variant} />
{items.length > 0 && 
<span className="absolute bottom-0 right-0 bg-[#C4FF00] text-white rounded-full text-xs px-2 py-1">
{items.reduce((total, item) => total + item.quantity, 0)}
</span>}

    </div> );
}
 
export default BasketIcon;


