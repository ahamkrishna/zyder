import React, { useRef, useEffect, useState } from 'react';
import rider from '../assets/riderImage.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Transperancy({ animate = true }) {
  const [percent, setPercent] = useState(0);
  const riderRef = useRef(null);
  const boxRef = useRef(null);
  const emptyRef = useRef(null);

  useEffect(() => {
        // Animate percent from 0 to 100
        gsap.to({}, {
          duration: 2,
          onUpdate: function() {
            setPercent(Math.floor(this.progress() * 100));
          },
          onComplete: function() {
            setPercent(100);
          }
        });
    const rider = riderRef.current;
    const box = boxRef.current;
    const empty = emptyRef.current;
    if (!rider || !box || !empty) return;

    // Calculate the distance to move rider image from its initial position to the empty div
    const updateAnimation = () => {
      const riderRect = rider.getBoundingClientRect();
      const emptyRect = empty.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      // Calculate horizontal distance from rider to empty div
      const distance = emptyRect.left - riderRect.left;
      // Animate rider image horizontally
      gsap.to(rider, {
        x: distance,
        scrollTrigger: {
          trigger: box,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          pin: false,
        },
        ease: 'power1.inOut',
      });
    };

    // Initial animation setup
    updateAnimation();
    // Recalculate on resize
    window.addEventListener('resize', updateAnimation);
    return () => window.removeEventListener('resize', updateAnimation);
  }, []);

  return (
    <div className='w-full h-screen'>
      <div className="cod-operation w-full h-130 bg-zinc-900 flex flex-row justify-center items-center text-center px-20 gap-4 font-sans font-semibold text-white text-[2vw]">
            <div ref={riderRef} className="riderDiv w-40 h-35">
                <img className="w-full h-full" src={rider} alt="rider" />
            </div>
            <div ref={boxRef} className="box w-100 h-40 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-xl"></div>
            <div ref={emptyRef} className="empty w-40 h-35 bg-transperant"></div>
            <div className="w-[100px] h-[100px]">
                <svg
                    className={`w-full h-full rounded-full block stroke-2 stroke-green-500 
                    ${animate ? "shadow-inner" : ""}`}
                    width="100"
                    height="100"
                    viewBox="0 0 52 52"
                >
                    {/* Circle */}
                    <circle
                    className={`
                        fill-none stroke-green-500 stroke-2 
                        [stroke-dasharray:166] [stroke-dashoffset:166]
                        ${animate ? "animate-circle" : ""}
                    `}
                    cx="26"
                    cy="26"
                    r="25"
                    />

                    {/* Checkmark */}
                    <path
                    className={`
                        fill-none stroke-green-500 
                        [stroke-dasharray:48] [stroke-dashoffset:48]
                        [transform-origin:50%_50%]
                        ${animate ? "animate-check" : ""}
                    `}
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                </svg>
            </div>
      </div>
      <div className="transperancy-text flex flex-col justify-center items-center mt-0 font-sans font-semibold text-white text-[4vw]">
        <span className="text-[5vw] font-bold">{percent}%</span>
        <span className="text-[2vw]">COD Transperancy</span>
      </div>
    </div>
  )
}

export default Transperancy
