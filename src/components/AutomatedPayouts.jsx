
import React, { useEffect, useState } from 'react';

function AutomatedPayouts() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 py-8">
      <div className="automated-payouts relative rounded-3xl shadow-2xl p-10 bg-white/10 backdrop-blur-lg flex flex-col items-center animate-fade-in" style={{ minWidth: '350px', minHeight: '250px' }}>
        <span className="absolute top-4 right-4 animate-bounce">
          {/* Premium icon: animated money/checkmark */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-award">
            <circle cx="12" cy="8" r="7" fill="#a78bfa" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" fill="#f472b6" />
            <circle cx="12" cy="8" r="3" fill="#fff" />
          </svg>
        </span>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-500 flex items-center justify-center mb-6 animate-spin-slow shadow-lg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v22" />
            <path d="M1 12h22" />
          </svg>
        </div>
        <h2 className={`text-4xl font-extrabold text-white drop-shadow-lg transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Automated Payouts</h2>
        <p className={`mt-4 text-lg text-white/80 text-center transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Experience seamless, secure, and instant payouts with our premium automation. Enjoy reliability and speed, every time.
        </p>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.7s ease;
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 2.5s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

export default AutomatedPayouts;
