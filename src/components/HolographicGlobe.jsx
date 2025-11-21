import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const HolographicGlobe = forwardRef((props, ref) => {
  const mountRef = useRef(null);
  const globeRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerTransmission,
  }));

  const triggerTransmission = () => {
    const ripple = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 0.2, 32),
      new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
    );
    ripple.rotation.x = Math.PI / 2;
    globeRef.current.add(ripple);

    gsap.to(ripple.scale, {
      x: 10,
      y: 10,
      duration: 1,
      onComplete: () => {
        globeRef.current.remove(ripple);
      },
    });

    gsap.to(ripple.material, {
      opacity: 0,
      duration: 1,
    });
  };

  useEffect(() => {
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });
    const globe = new THREE.Mesh(geometry, material);
    globeRef.current = globe;
    scene.add(globe);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      if (!isDragging) {
        globe.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseDown = (e) => {
        isDragging = true;
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            globe.rotation.y += deltaMove.x * 0.01;
            globe.rotation.x += deltaMove.y * 0.01;
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    const mount = mountRef.current;
    mount.addEventListener('mousedown', handleMouseDown);
    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('mousedown', handleMouseDown);
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;
});

export default HolographicGlobe;


