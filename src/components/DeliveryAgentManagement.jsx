
import React, { useEffect, useState } from 'react';

function DeliveryAgentManagement() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-orange-900 via-yellow-800 to-red-700 py-8">
      <div className="delivery-agent-management relative rounded-3xl shadow-2xl p-10 bg-white/10 backdrop-blur-lg flex flex-col items-center animate-fade-in" style={{ minWidth: '350px', minHeight: '250px' }}>
        <span className="absolute top-4 right-4 animate-bounce">
          {/* Premium icon: animated delivery agent */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" fill="#fbbf24" />
            <rect x="7" y="13" width="10" height="7" rx="2" fill="#f87171" />
            <rect x="10" y="15" width="4" height="3" rx="1" fill="#fff" />
          </svg>
        </span>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-400 to-red-500 flex items-center justify-center mb-6 animate-spin-slow shadow-lg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <rect x="7" y="13" width="10" height="7" rx="2" />
          </svg>
        </div>
        <h2 className={`text-4xl font-extrabold text-white drop-shadow-lg transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Delivery Agent Management</h2>
        <p className={`mt-4 text-lg text-white/80 text-center transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Empower your delivery agents with smart assignment, live tracking, and performance analytics for efficient operations.
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

export default DeliveryAgentManagement;
