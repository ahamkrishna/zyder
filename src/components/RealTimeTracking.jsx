
import React, { useState, useEffect } from 'react';


function RealTimeTracking() {
  const [showText, setShowText] = useState(false);
  const [startAnim, setStartAnim] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnim(true);
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
  }, []);

  useEffect(() => {
    if (startAnim) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 1500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [startAnim]);

  return (
    <div ref={containerRef} className="w-full h-full bg-zinc-900 flex flex-col justify-center items-center">
      <div className="realtime-tracking flex flex-col items-center justify-center">
        {!showText ? (
          <span className="clock-icon" style={{
            display: 'inline-block',
            width: '5vw',
            height: '5vw',
            borderRadius: '50%',
            border: '0.4vw solid #333',
            position: 'relative',
            animation: startAnim ? 'spin 1.5s linear' : 'none',
          }}>
            <span style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '0.3vw',
              height: '2vw',
              background: '#333',
              transform: 'translate(-50%, -100%)',
              borderRadius: '0.2vw',
            }} />
            <span style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '0.3vw',
              height: '1vw',
              background: '#333',
              transform: 'translate(-50%, -50%) rotate(60deg)',
              borderRadius: '0.2vw',
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </span>
        ) : (
          <span className="text-[5vw] font-bold">24/7</span>
        )}
        <span className="text-[2vw]">Real-time Tracking</span>
      </div>
    </div>
  );
}

export default RealTimeTracking;
