"use client";

import { motion } from "framer-motion";

const ButtonSecondary = () => {
  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="border-3 border-lime-400 px-8 cursor-pointer">
      <h4 className="font-semibold text-lime-400">Køb billetter</h4>
    </motion.button>
  );
};

export default ButtonSecondary;
