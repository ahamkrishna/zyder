import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function Payout() {
  const [percent, setPercent] = useState(100);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (percent > 0) {
        setPercent(prev => prev - 1);
      }
    }, 30); // Adjust speed here
    
    controls.start({ 
      strokeDashoffset: (1 - percent / 100) * 440 
    });

    return () => clearTimeout(timer);
  }, [percent, controls]);

  return (
    <div className='w-full h-screen bg-zinc-900 flex justify-center items-center'>
      <div className="relative w-80 h-80">
        <motion.svg className="w-full h-full" viewBox="0 0 160 160">
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="#333"
            strokeWidth="10"
            fill="transparent"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="#7C3AED"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray="440"
            strokeDashoffset={0}
            animate={controls}
            transition={{ duration: 0.1, ease: "linear" }}
            transform="rotate(-90 80 80)"
          />
        </motion.svg>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-sans">
          <motion.span 
            className="text-[5vw] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {percent}%
          </motion.span>
          <span className="text-[2vw] text-zinc-400">Payout Errors</span>
        </div>
      </div>
    </div>
  );
}

export default Payout;
