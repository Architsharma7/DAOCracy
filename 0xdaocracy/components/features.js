import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import dynamic from 'next/dynamic';

const Features = () => {
  const cards = [
    {
      title: 'Power',
      desc: 'In DAOCRACY citizen of countries will have more power over the affairs of country.',
    },
    {
      title: 'Transperency',
      desc: 'Government functioning will be more transparent in the aspect of the Voting, Passing of bills and funds.',
    },
    {
      title: 'Freedom',
      desc: 'Decentralised in nature citizen will not need to fear the limitation, restriction on there human rights.',
    },
  ];
  return (
    <div className="mb-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mt-7 flex justify-center mb-12">
          <motion.p
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="mt-[2px] sm:text-[44px] text-[20px] text-center text-secondary-white sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5 align-top text-white text-4xl font-semibold"
          >
            The Future Of Governance
          </motion.p>
        </div>
        <div className="grid gap-x-6 gap-y-5 lg:grid-cols-3 md:grid-cols-3 w-4/5 h-[430px] mx-auto">
          {cards.map((items, key) => {
            return (
              <div
                className="w-full h-full rounded-lg shadow-md bg-gradient-to-b from-cyan-400 to-indigo-600"
                key={key}
              >
                <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
                  <div className="p-4">
                    <h4 className="text-4xl font font-semibold text-white font-Roboto leading-normal tracking-normal">
                      {items.title}
                    </h4>
                    <p className=" mt-3 text-2xl tracking-wide leading-normal font-semibold text-indigo-900">
                      {items.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Features), { ssr: false });
