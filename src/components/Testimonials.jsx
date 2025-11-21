
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const stats = [
  {
    value: '100%',
    title: 'Payout Accuracy',
    desc: 'Error free calculations',
  },
  {
    value: '1500+',
    title: 'Active Delivery Agents',
    desc: 'Using Zyder daily',
  },
  {
    value: '100%',
    title: 'COD Transparency',
    desc: 'Real-time tracking',
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const [limitBreak, setLimitBreak] = useState(null);

  const handleCardClick = (stat) => {
    setLimitBreak(stat.value);
    // Optional: Add sound effect for explosion here
    // const audio = new Audio('/path/to/explosion.mp3');
    // audio.play();

    gsap.to(containerRef.current, {
      backgroundColor: '#fff',
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  useEffect(() => {
    if (limitBreak) {
      const timeout = setTimeout(() => {
        setLimitBreak(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [limitBreak]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div className="w-full h-full absolute top-0 left-0" id="particle-container"></div>
      {limitBreak && (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <h1 className="text-9xl font-bold text-white animate-pulse">{limitBreak}</h1>
        </div>
      )}
      <div className="testimonials w-full flex flex-col justify-center items-center gap-12 px-6 text-center font-sans text-white" style={{ zIndex: 2 }}>
        <h2 className="font-bold text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          Trusted by Industry Leaders
        </h2>
        <p className="text-xl font-normal mb-8 max-w-3xl">
          See how leading delivery vendors across India are transforming their operations with Zyder's comprehensive platform.
        </p>
        <div className="testimonial-cards w-full flex flex-wrap justify-center items-center gap-12 px-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl shadow-lg p-8 min-w-[250px] flex flex-col items-center glassmorphism cursor-pointer"
              style={{ transition: 'all 0.2s ease', zIndex: limitBreak ? 0 : 2 }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
                  duration: 0.2,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
                  duration: 0.2,
                });
              }}
              onClick={() => handleCardClick(stat)}
            >
              <h3 className="text-5xl font-extrabold mb-2 text-white drop-shadow-lg">{stat.value}</h3>
              <h4 className="text-xl font-bold mb-1 text-white">{stat.title}</h4>
              <p className="text-lg font-normal text-gray-300">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;





