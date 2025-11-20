
import React, { useState, useEffect } from 'react';

function Payout() {
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    if (percent > 0) {
      const timer = setTimeout(() => {
        setPercent(prev => prev - 1);
      }, 30); // Adjust speed here
      return () => clearTimeout(timer);
    }
  }, [percent]);

  return (
    <div className='w-full h-full bg-zinc-900'>
      <div className="payoutErrors w-full h-180 flex flex-col justify-center items-center text-center px-20 gap-4 font-sans font-semibold text-white">
        <span className="text-[5vw] font-bold">{percent}%</span>
        <span className="text-[2vw]">Payout Errors</span>
      </div>
    </div>
  );
}

export default Payout;
