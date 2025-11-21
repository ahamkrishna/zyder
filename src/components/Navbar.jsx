import React from 'react'


import zyderLogo from '../assets/zyderLogo.jpg';

function Navbar() {
  return (
    <div className='fixed z-[999] w-full px-20 py-8 font-sans flex justify-between items-center'>
      <div className="logo w-32 h-5">
        {/* <img src={zyderLogo} alt="zyder logo" /> */}
        <svg width="150" height="40" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="zyderNavGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#0EA5E9"/>
            </linearGradient>
        </defs>

        {/* <!-- Transparent background --> */}
        <rect width="100%" height="100%" fill="transparent"/>

        {/* <!-- Navbar Logo Text --> */}
        <text
            x="0"
            y="55"
            fill="url(#zyderNavGradient)"
            fontSize="60"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fontWeight="600"
            letterSpacing="1"
        >
            Zyder
        </text>
        </svg>


      </div>
      <div className="links flex gap-10">
        {["Home", "Features", "Testimonials", "Contact"].map((item, index)=>(<a key={index} className='text-md capitalize font-semibold'>{item}</a>))}
      </div>
    </div>
  )
}

export default Navbar

