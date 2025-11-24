import React from 'react'
import Navbar from './components/Navbar.jsx'
import LandingPage from './components/LandingPage.jsx'
// import Transparency from './components/Transparency.jsx'
import Payout from './components/Payout.jsx'
import RealTimeTracking from './components/RealTimeTracking.jsx'
import AutomatedPayouts from './components/AutomatedPayouts.jsx'
import CodManagement from './components/CodManagement.jsx'
import DeliveryAgentManagement from './components/DeliveryAgentManagement.jsx'
import RealTimeDeliveryAnalytics from './components/RealTimeDeliveryAnalytics.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'

function App() {
  return (
    <div className="w-full h-screen text-white bg-zinc-900">
      <Navbar />
      <LandingPage />
      {/* <Transparency /> */}
      <Payout />
      <RealTimeTracking />
      <AutomatedPayouts />
      <CodManagement />
      <DeliveryAgentManagement />
      <RealTimeDeliveryAnalytics />
      <Testimonials />
      <Contact />
      {/* <Footer /> */}
      <About />

    </div>
  )
}

export default App
