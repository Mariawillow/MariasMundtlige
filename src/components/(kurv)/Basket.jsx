import { HiOutlineShoppingBag } from "react-icons/hi";

const Basket = ({ variant = "lime" }) => {
  const isLime = variant === "lime";

  return <HiOutlineShoppingBag size={30} className={`cursor-pointer ${isLime ? "text-lime-400" : "text-black"}`} />;
};

export default Basket;
