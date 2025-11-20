import React from 'react'
import Navbar from './components/Navbar.jsx'
import LandingPage from './components/LandingPage.jsx'
import Transperancy from './components/Transperancy.jsx'
import Payout from './components/Payout.jsx'
import RealTimeTracking from './components/RealTimeTracking.jsx'
import AutomatedPayouts from './components/AutomatedPayouts.jsx'
import CodManagement from './components/CodManagement.jsx'
import DeliveryAgentManagement from './components/DeliveryAgentManagement.jsx'

function App() {
  return (
    <div className="w-full h-screen text-white bg-zinc-900">
      <Navbar />
      <LandingPage />
      <Transperancy />
      <Payout />
      <RealTimeTracking />
      <AutomatedPayouts />
      <CodManagement />
      <DeliveryAgentManagement />
    </div>
  )
}

export default App
