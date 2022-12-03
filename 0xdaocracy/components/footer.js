import React from "react";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";

const Footer = () => {
  return (
    <div>
        <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
      >
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Made with 💜 by LW3Husters 
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://github.com/Architsharma7/DAOCracy" className="mr-4 hover:underline md:mr-6 ">
              Github
            </a>
          </li>
        </ul>
      </footer>
      </motion.div>
    </div>
  );
};

export default Footer;
