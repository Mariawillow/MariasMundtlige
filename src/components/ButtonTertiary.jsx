"use client";

import { motion } from "framer-motion";

const ButtonTertiary = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="border-3 border-[#C4FF00] px-8 py-2 cursor-pointer max-w-80 rounded"
      onClick={onClick}
    >
      <h4 className="font-semibold text-[#C4FF00]">Køb Billet</h4>
    </motion.button>
  );
};

export default ButtonTertiary;