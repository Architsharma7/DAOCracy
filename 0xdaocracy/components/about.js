import React, { useState } from "react";
import { ProjectContext } from "../context/projectcontext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";
import Form from "./form";

const About = () => {
  const [openForm, setOpenForm] = useState(false);
  const handleChange = () => {
    setOpenForm(true);
  };
  const { address } = useContext(ProjectContext);
  return (
    <div className="bg-black w-screen h-screen">
      <section className="sm:p-16 xs:p-8 px-6 relative z-10 justify-center">
        <div className="gradient-02 z-0" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="w-full mx-auto flex justify-center items-center flex-row"
        >
          <motion.p
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="mt-[2px] font-normal sm:text-[44px] text-[20px] text-center text-secondary-white sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5 align-top"
          >
            <span className="font-extrabold text-white">
              A DAO based Parliamentary system of a country with the more{" "}
              <span
                className="bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text"
              >
                transparency{" "}
              </span>
              and{" "}
              <span
                className="bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 to-green-400
            animate-text"
              >
                power
              </span>{" "}
              to the citizens{" "}
            </span>
          </motion.p>
          <motion.img
            variants={fadeIn("up", "tween", 0.3, 1)}
            src="/download2.png"
            alt="globe"
            className="sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5 h-128 float-right w-128"
          />
        </motion.div>
        <div className="justify-center z-10 sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5 flex">
          {address && (
            <button
              className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600 border border-indigo-500 hover:border-white hover:scale-110"
              onClick={handleChange}
            >
              <span className="pl-3 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                Get started &rarr;
              </span>
            </button>
          )}
        </div>
        {openForm ? <div><Form /></div> : <div></div>}
      </section>
    </div>
  );
};

export default About;
