import React from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { navVariants } from "../utils/motion";
import { ProjectContext } from "../context/projectcontext";
import { useContext } from "react";
import { shortenAddress } from "../utils/addressshortner";
import styles from "./styles";
import dynamic from "next/dynamic";


/// TODO: Solve the hydration error (prob bc while changing connect wallet button to address shortner, not using correct way)

function Navbar(){

    const { address } = useContext(ProjectContext);

  return (
    <div className="bg-black border-b-2 border-slate-800 border-solid">
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
      >
        <div className="h-full py-4 flex justify-between items-center px-6 text-white w-full">
          <div className="mx-3">
              <p className={`${styles.fontFamily} text-lg sm:text-5xl leading-normal font-semibold 
            text-white`}>DAOCracy</p>
          </div>
          <div>
            {!address && <ConnectButton />}
            {address && <button className="bg-white text-black rounded-xl px-3 py-1 sm:px-6 sm:py-1.5 md:px-9 md:py-2.5 lg:px-10 lg:py-3 hover:scale-110 hover:bg-sky-500 hover:text-white transition ease-in-out delay-150 duration-150 font-semibold hover:ring-1 hover:ring-white">{shortenAddress(address)}</button>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default dynamic (() => Promise.resolve(Navbar), {ssr: false})
