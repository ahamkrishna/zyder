import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Coin() {
  const ref = useRef();
  let textures;
  try {
    // IMPORTANT: Create a 'public' folder in your project root and place your textures there.
    // You can find free PBR textures for coins online.
    textures = useTexture([
      '/coin_texture.png',       // Color map
      '/coin_displacement.png',  // Displacement map
      '/coin_normal.png',        // Normal map
      '/coin_roughness.png'      // Roughness map
    ]);
  } catch (e) {
    textures = null;
  }
  const [colorMap, displacementMap, normalMap, roughnessMap] = textures || [];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    ref.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <mesh ref={ref} scale={2.5}>
      <cylinderGeometry args={[1, 1, 0.1, 64]} />
      {textures ? (
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap}
          displacementMap={displacementMap}
          displacementScale={0.05}
          roughnessMap={roughnessMap}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      ) : (
        <meshStandardMaterial 
          color="#FFD700" // Gold color as a fallback
          metalness={0.8}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      )}
    </mesh>
  );
}


function AutomatedPayouts() {
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
  
  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-900 overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Coin />
          <Sparkles count={100} scale={5} size={2} speed={0.4} color="#A78BFA" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center p-10"
      >
        <motion.h2 variants={itemVariants} className="text-6xl font-extrabold text-white" style={{textShadow: '0 0 20px #A78BFA'}}>
          Automated Payouts
        </motion.h2>

        <motion.p variants={itemVariants} className="mt-6 text-xl text-white/80 max-w-md">
          Experience the future of transactions with our seamless, secure, and instant automated payout system.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AutomatedPayouts;
