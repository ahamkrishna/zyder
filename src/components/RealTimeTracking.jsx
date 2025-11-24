import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

function RealTimeTracking() {
  const [showText, setShowText] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          setTimeout(() => setShowText(true), 2500);
        } else {
          controls.start("hidden");
          setShowText(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.3
      }
    },
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({ 
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: i * 0.2
      }
    }),
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const text = "24/7";

  return (
    <div ref={containerRef} className="w-full h-screen bg-zinc-900 flex flex-col justify-center items-center text-white font-sans overflow-hidden">
      <motion.div 
        className="realtime-tracking flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="relative w-64 h-64">
          {!showText ? (
            <motion.svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Glow effect */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Circles */}
              <motion.circle cx="100" cy="100" r="80" stroke="url(#zyderNavGradient)" strokeWidth="4" fill="transparent" filter="url(#glow)"
                custom={0} variants={circleVariants} />
              <motion.circle cx="100" cy="100" r="60" stroke="#7C3AED" strokeWidth="2" fill="transparent" 
                custom={1} variants={circleVariants} />
              <motion.circle cx="100" cy="100" r="90" stroke="#0EA5E9" strokeWidth="1" fill="transparent" 
                custom={2} variants={circleVariants} 
                animate={{ rotate: 360, transition: { duration: 10, repeat: Infinity, ease: "linear" } }}
              />
               <motion.circle cx="100" cy="100" r="70" stroke="#0EA5E9" strokeWidth="1" fill="transparent" 
                custom={3} variants={circleVariants} 
                animate={{ rotate: -360, transition: { duration: 15, repeat: Infinity, ease: "linear" } }}
              />

            </motion.svg>
          ) : (
            <motion.div variants={textContainerVariants} initial="hidden" animate="visible" className="flex justify-center items-center text-[8vw] font-bold" style={{ filter: 'drop-shadow(0 0 10px #7C3AED)' }}>
              {text.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
        <motion.span 
          className="text-[2vw] text-zinc-400 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Real-time Tracking
        </motion.span>
      </motion.div>
      <svg width="0" height="0">
        <defs>
            <linearGradient id="zyderNavGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#0EA5E9"/>
            </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default RealTimeTracking;
