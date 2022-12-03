import React from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { navVariants } from "../utils/motion";
import { ProjectContext } from "../context/projectcontext";
import { useContext } from "react";
import { shortenAddress } from "../utils/addressshortner";

export default function Navbar(){

    const { address } = useContext(ProjectContext);

  return (
    <div className="bg-black">
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
      >
        <div className="h-full py-3 flex justify-between items-center px-6 text-white w-full">
          <div className="mx-3">
              <h1 className="text-3xl sm:text-5xl leading-normal tracking-wider bg-gradient-to-r bg-clip-text  text-transparent 
            from-white via-purple-500 to-indigo-500
            animate-text">
                DAOCracy
              </h1>
          </div>
          <div>
            {!address && <ConnectButton />}
            {address && <button className="bg-gradient-to-r from-violet-300 via-purple-800 to-blue-400 text-white rounded-3xl px-5 py-1.5 sm:px-8 sm:py-2 md:px-9 md:py-2.5 lg:px-10 lg:py-3 hover:scale-110 transition ease-in-out delay-150 duration-150 font-semibold hover:ring-1 hover:ring-white">{shortenAddress(address)}</button> }
          </div>
        </div>
      </motion.div>
    </div>
  );
};


