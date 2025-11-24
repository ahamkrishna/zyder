import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import amazonLogo from '../assets/amazon-com-logo-svgrepo-com.svg';
import flipkartLogo from '../assets/flipkart-logo-svgrepo-com.svg';
import myntraLogo from '../assets/myntra.svg';
import bigbasketLogo from '../assets/bigbasket.svg';

function LandingPage() {
  return (
    <div className='w-full h-screen bg-zinc-900 pt-1'>
        <div className="textStructure mt-32 px-20">
            {["One-Stop Solution", "for all your", "Last Mile Needs"].map((item, index) => {
              return (
                <div className="masker" key={index}>
                  <motion.h1 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                    className='uppercase text-[7vw] leading-[7vw] tracking-tighter font-sans font-bold'
                  >
                    {item}
                  </motion.h1>
                </div>
              );
            })}
        </div>
        <div className='border-t-[1px] border-zinc-700 mt-22'></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          className="brands flex justify-center items-center gap-16 mt-10"
        >
          <img src={amazonLogo} alt="Amazon Logo" className="w-44 h-34 object-contain bg-white" />
          <img src={flipkartLogo} className="w-44 h-34 object-contain bg-white" alt="Flipkart Logo" />
          <img src={myntraLogo} className="w-44 h-34 object-contain bg-white" alt="Myntra Logo" />
          <img src={bigbasketLogo} className="w-44 h-34 object-contain bg-white" alt="BigBasket Logo" />
        </motion.div>
    </div>
  )
}

export default LandingPage;
