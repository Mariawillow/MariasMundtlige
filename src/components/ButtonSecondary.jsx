"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ButtonSecondary = ({ href, onClick, children }) => {
  const buttonContent = (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="border-3 border-[#C4FF00] px-8 py-2 cursor-pointer max-w-80" onClick={onClick}>
      <h4 className="font-semibold text-[#C4FF00]">{children}</h4>
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
};

export default ButtonSecondary;
