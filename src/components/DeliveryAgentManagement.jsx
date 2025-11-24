import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaRoute } from "react-icons/fa";

const DeliveryAgentManagement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const agents = [
    { id: 1, status: "active", position: { x: "15%", y: "20%" } },
    { id: 2, status: "inactive", position: { x: "80%", y: "45%" } },
    { id: 3, status: "active", position: { x: "25%", y: "70%" } },
    { id: 4, status: "delivering", position: { x: "60%", y: "10%" } },
    { id: 5, status: "active", position: { x: "70%", y: "85%" } },
    { id: 6, status: "delivering", position: { x: "45%", y: "50%" } },
    { id: 7, status: "active", position: { x: "90%", y: "15%" } },
    { id: 8, status: "inactive", position: { x: "10%", y: "80%" } },
  ];

  const getAgentStyle = (status) => {
    const statusConfig = {
      active: { Icon: FaCheckCircle, color: "#2ecc71", shadow: "rgba(46, 204, 113, 0.5)" },
      inactive: { Icon: FaTimesCircle, color: "#e74c3c", shadow: "rgba(231, 76, 60, 0.5)" },
      delivering: { Icon: FaRoute, color: "#3498db", shadow: "rgba(52, 152, 219, 0.5)" },
    };
    return statusConfig[status];
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.15, duration: 0.01 },
      },
    }),
  };

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#0a0a0a] text-white overflow-hidden p-8"
    >
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-50">
            <div
            className="w-full h-full"
            style={{
                backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }}
            ></div>
             <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_20%,#0a0a0a)]"></div>
        </div>


      {/* Agent Network Visualization */}
      <div className="absolute inset-0 z-10">
        <svg className="w-full h-full" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <radialGradient id="center-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: "rgba(52, 152, 219, 0.2)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgba(52, 152, 219, 0)", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="40px" fill="url(#center-glow)" />
          {agents.map((agent, i) => (
            <motion.line
              key={`line-${agent.id}`}
              x1="50%"
              y1="50%"
              x2={agent.position.x}
              y2={agent.position.y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            />
          ))}
        </svg>

        {agents.map((agent, i) => {
          const { Icon, color, shadow } = getAgentStyle(agent.status);
          return (
            <motion.div
              key={agent.id}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ x: "-50%", y: "-50%" }}
              animate={isInView ? {
                top: agent.position.y,
                left: agent.position.x,
                transition: { delay: i * 0.15, duration: 1.2, ease: [0.4, 0, 0.2, 1] }
              } : {}}
            >
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${color} 50%, #1a1a1a 100%)`,
                  boxShadow: `0 0 15px 3px ${shadow}`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1, transition: { delay: i * 0.15 + 0.6, duration: 0.6 } } : {}}
                whileHover={{ scale: 1.5, zIndex: 50, boxShadow: `0 0 30px 8px ${shadow}`}}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Icon className="text-white text-lg" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-20 text-center flex flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          className="w-28 h-28 mb-8 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[0_0_60px_rgba(168,85,247,0.6)]"
        >
          <svg
            className="w-14 h-14 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.75a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1.5 12h3m15 0h3M12 1.5v3m0 15v3m-7.071-2.929l2.121-2.121m10.102 10.102l2.121-2.121M4.929 4.929l2.121 2.121m10.102 10.102l-2.121 2.121"
            />
          </svg>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 pb-3"
          style={{ textShadow: "0 5px 25px rgba(0,0,0,0.3)" }}
        >
          Delivery Agent Management
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="max-w-3xl text-lg md:text-xl text-gray-400"
        >
          Orchestrate your entire delivery fleet with unparalleled precision. 
          Gain access to real-time tracking, intelligent automated dispatching, 
          and in-depth performance analytics, all from a single, unified dashboard.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default DeliveryAgentManagement;