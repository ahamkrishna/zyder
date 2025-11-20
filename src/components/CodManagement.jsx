
import React, { useEffect, useState } from 'react';

function CodManagement() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-green-900 via-teal-800 to-blue-700 py-8">
      <div className="cod-management relative rounded-3xl shadow-2xl p-10 bg-white/10 backdrop-blur-lg flex flex-col items-center animate-fade-in" style={{ minWidth: '350px', minHeight: '250px' }}>
        <span className="absolute top-4 right-4 animate-bounce">
          {/* Premium icon: animated package/box */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="13" rx="2" fill="#38bdf8" />
            <rect x="7" y="3" width="10" height="4" rx="1" fill="#34d399" />
            <path d="M3 7l9 6 9-6" stroke="#fff" strokeWidth="2" />
          </svg>
        </span>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-400 via-blue-400 to-teal-500 flex items-center justify-center mb-6 animate-spin-slow shadow-lg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <rect x="7" y="3" width="10" height="4" rx="1" />
          </svg>
        </div>
        <h2 className={`text-4xl font-extrabold text-white drop-shadow-lg transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Cod Management</h2>
        <p className={`mt-4 text-lg text-white/80 text-center transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Effortlessly manage your Cash on Delivery operations with advanced tracking, automation, and analytics for every shipment.
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

export default CodManagement;
