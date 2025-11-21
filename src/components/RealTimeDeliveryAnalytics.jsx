import React from 'react'
import adminDashboardImage from '../assets/Admin-Dashboard.png';

function RealTimeDeliveryAnalytics() {
  return (
    <div className='w-full h-full bg-zinc-900 flex flex-col justify-center items-center py-20 px-10 '>
      <div className="realtime-delivery-analytics flex flex-col justify-center items-center gap-6 px-10 text-center font-sans font-semibold text-white text-[1.5vw]">
        <h2 className='w-full font-bold text-[3vw] text-center'>Real-time Delivery Analytics</h2>
        <p>Monitor delivery performance, COD collections, and agent productivity across all sites</p>
        <img className='h-120 w-full' src={adminDashboardImage} alt="admion dashboard" />
      </div>
    </div>
  )
}

export default RealTimeDeliveryAnalytics
