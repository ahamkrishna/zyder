import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

function Package({ position, color }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.position.x -= 0.02;
    if (ref.current.position.x < -6) {
        ref.current.position.x = 6;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <Box args={[1, 0.6, 0.8]}>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
      </Box>
    </mesh>
  );
}

function ConveyorBelt() {
  return (
    <Plane args={[14, 2]} rotation-x={-Math.PI / 2} position-y={-0.5}>
      <meshStandardMaterial color="#333" />
    </Plane>
  );
}

function Scanner() {
    const lightRef = useRef();
    useFrame((state) => {
        lightRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 2) * 4;
    });
  return (
    <group position={[0, 1.5, 0]}>
      <Box args={[0.2, 0.2, 8]}>
        <meshStandardMaterial color="black" />
      </Box>
      <spotLight ref={lightRef} position={[0, -0.5, 0]} angle={0.2} penumbra={0.5} intensity={5} color="red" distance={5} />
    </group>
  );
}


function CodManagement() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
  const packages = [
    { position: [-4, -0.2, 0], color: '#A0522D' },
    { position: [-1, -0.2, 0], color: '#8B4513' },
    { position: [2, -0.2, 0], color: '#D2691E' },
    { position: [5, -0.2, 0], color: '#A0522D' },

  ];

  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-900 overflow-hidden relative">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <ConveyorBelt />
          {packages.map((pkg, i) => (
             <Package key={i} {...pkg} />
          ))}
          <Scanner />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center p-10"
      >
        <motion.h2 variants={itemVariants} className="text-6xl font-extrabold text-white" style={{textShadow: '0 0 20px #38bdf8'}}>
          COD Management
        </motion.h2>

        <motion.p variants={itemVariants} className="mt-6 text-xl text-white/80 max-w-lg">
          Effortlessly manage Cash on Delivery with advanced tracking, automation, and analytics for every shipment.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default CodManagement;
