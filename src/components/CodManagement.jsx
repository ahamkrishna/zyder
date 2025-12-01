import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Cone } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// A single rotating ring for the sanctum
const SanctumRing = ({ position, rotationSpeed, args, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.z += delta * rotationSpeed;
  });

  return (
    <Torus ref={ref} position={position} args={args} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
    </Torus>
  );
};

// The central pulsating core
const EnergyCore = () => {
  const ref = useRef();
  const lightRef = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_intensity: { value: 0.7 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1; // Pulsating effect
    ref.current.scale.set(scale, scale, scale);
    lightRef.current.intensity = 2 + Math.sin(clock.getElapsedTime() * 2) * 1.5; // Pulsating light
  });

  return (
    <group>
      <pointLight ref={lightRef} color="#7C3AED" intensity={2} distance={10} />
      <Icosahedron ref={ref} args={[0.8, 5]}>
        <shaderMaterial
          fragmentShader={`
            varying vec3 v_normal;
            uniform float u_time;
            uniform float u_intensity;

            // 2D Random function
            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }

            // 2D Noise function
            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
            }
            
            void main() {
              float noise_val = noise(v_normal.xy * 3.0 + u_time * 0.2);
              vec3 color = mix(vec3(0.5, 0.2, 0.9), vec3(0.0, 0.8, 1.0), v_normal.z);
              float intensity = 1.0 - dot(v_normal, vec3(0.0, 0.0, 1.0));
              vec3 final_color = color * (intensity * u_intensity + noise_val);
              gl_FragColor = vec4(final_color, 1.0);
            }
          `}
          vertexShader={`
            varying vec3 v_normal;
            void main() {
              v_normal = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </Icosahedron>
    </group>
  );
};

// The main 3D scene component
const SanctumScene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    // Gentle rotation of the entire scene
    groupRef.current.rotation.y += 0.001;
    // Cinematic camera movement
    state.camera.position.lerp(new THREE.Vector3(0, 2, 8 + Math.sin(state.clock.getElapsedTime() * 0.2)), 0.01);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} color="#ffffff" />
      <EnergyCore />
      {/* Rotating rings of the sanctum structure */}
      <SanctumRing position={[0, 0, 0]} rotationSpeed={0.1} args={[3, 0.1, 64]} color="#0EA5E9" />
      <SanctumRing position={[0, 0, 0]} rotationSpeed={-0.08} args={[4, 0.05, 64]} color="#7C3AED" />
      <SanctumRing position={[0, 0, 0]} rotationSpeed={0.06} args={[5, 0.02, 64]} color="#ffffff" />
      {/* Static outer structure */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Cone
          key={i}
          position={[
            Math.sin((i / 12) * Math.PI * 2) * 5.5,
            1.5,
            Math.cos((i / 12) * Math.PI * 2) * 5.5,
          ]}
          rotation={[Math.PI/2, 0, (i / 12) * Math.PI * 2]}
          args={[0.1, 3, 4]}
        >
          <meshStandardMaterial color="#4A5568" metalness={0.9} roughness={0.2} />
        </Cone>
      ))}
    </group>
  );
};


const CodManagement = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <SanctumScene />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} intensity={0.8} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#0EA5E9] mb-4" style={{ textShadow: '0 0 15px rgba(14, 165, 233, 0.4), 0 0 10px rgba(124, 58, 237, 0.4)' }}>
          COD Management
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          Secure, streamlined, and fully automated. Our platform provides unparalleled security and efficiency for all your Cash On Delivery transactions, safeguarded by a state-of-the-art digital infrastructure.
        </p>
      </div>
    </div>
  );
};

export default CodManagement;