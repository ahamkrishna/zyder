import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

const DeliveryAgentManagement = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        let scene, camera, renderer, composer;
        let font, textMesh;
        let tube, stars, wormhole, lights;
        let requestId;
        let mouseX = 0, mouseY = 0;
        const clock = new THREE.Clock();

        const init = () => {
            // Scene and Camera
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
            camera.position.z = 10;

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            mount.appendChild(renderer.domElement);

            // Post-processing
            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));

            const bloomPass = new UnrealBloomPass(new THREE.Vector2(mount.clientWidth, mount.clientHeight), 0.5, 0.8, 0.2);
            composer.addPass(bloomPass);
            
            const afterimagePass = new AfterimagePass();
            afterimagePass.uniforms.damp.value = 0.96;
            composer.addPass(afterimagePass);

            const vignettePass = new ShaderPass({
                uniforms: {
                    "tDiffuse": { value: null },
                    "darkness": { value: 1.5 },
                    "offset": { value: 1.0 }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                    }
                `,
                fragmentShader: `
                    uniform sampler2D tDiffuse;
                    uniform float darkness;
                    uniform float offset;
                    varying vec2 vUv;
                    void main() {
                        vec4 texel = texture2D( tDiffuse, vUv );
                        vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );
                        gl_FragColor = vec4( mix( texel.rgb, vec3( 0.0 ), dot( uv, uv ) * darkness ), texel.a );
                    }
                `
            });
            composer.addPass(vignettePass);

            composer.addPass(new ShaderPass(GammaCorrectionShader));


            // Objects
            lights = new Lights(scene);
            tube = new Tube(scene);
            stars = new Stars(scene);
            wormhole = new Wormhole(scene);

            // Load Font
            const fontLoader = new FontLoader();
            fontLoader.load('https://threejs.org/examples/fonts/gentilis_bold.typeface.json', (loadedFont) => {
                font = loadedFont;
                createText();
            });

            // Event Listeners
            window.addEventListener('resize', onResize);
            mount.addEventListener('mousemove', onMouseMove);
        };

        const createText = () => {
            const textGeometry = new TextGeometry('Zyder', {
                font: font,
                size: 2,
                height: 0.5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 5,
            });
            textGeometry.center();

            const textMaterial = new THREE.MeshStandardMaterial({
                color: 0x9400D3,
                metalness: 0.9,
                roughness: 0.2,
                emissive: 0x9400D3,
                emissiveIntensity: 0.6,
            });

            textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.z = 5;
            scene.add(textMesh);
        };

        const onResize = () => {
            const { clientWidth, clientHeight } = mount;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
            composer.setSize(clientWidth, clientHeight);
        };

        const onMouseMove = (event) => {
            const rect = mount.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / mount.clientWidth) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / mount.clientHeight) * 2 + 1;
        };

        const animate = () => {
            requestId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            const speed = 0.05;
            camera.position.z -= speed;

            if (textMesh) {
                textMesh.position.z = camera.position.z - 5;
                textMesh.rotation.y += 0.002;
                textMesh.rotation.x = Math.sin(time * 0.5) * 0.1;
                textMesh.position.y = Math.sin(time * 0.7) * 0.2;
            }

            lights.update(time, camera.position.z);
            tube.update(camera.position.z);
            stars.update(camera.position.z, delta);
            wormhole.update(time);

            camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.05;
            camera.lookAt(new THREE.Vector3(0, 0, camera.position.z - 10));

            composer.render();
        };

        init();
        animate();

        return () => {
            cancelAnimationFrame(requestId);
            window.removeEventListener('resize', onResize);
            mount.removeEventListener('mousemove', onMouseMove);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="delivery-agent-management-container">
            <div ref={mountRef} className="three-canvas"></div>
            <div className="content-overlay">
                <div className="info-pod">
                    <h1>Delivery Agent Management</h1>
                    <p>Interface with the core of your logistics network. Real-time data streams, predictive AI dispatch, and total command over your autonomous fleet.</p>
                </div>
            </div>
            <style jsx>{`
                .delivery-agent-management-container {
                    height: 100vh;
                    width: 100%;
                    background-color: #000;
                    position: relative;
                    overflow: hidden;
                }
                .three-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .content-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: none;
                }
                .info-pod {
                    text-align: center;
                    color: #fff;
                    max-width: 650px;
                    padding: 2.5rem;
                    background: rgba(0, 0, 0, 0.6);
                    border-radius: 12px;
                    border: 1px solid rgba(148, 0, 211, 0.4);
                    backdrop-filter: blur(12px);
                    animation: fadeIn 2.5s ease-in-out;
                }
                h1 {
                    font-size: 3rem;
                    font-weight: bold;
                    background: -webkit-linear-gradient(45deg, #7C3AED, #0EA5E9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1.5rem;
                    text-shadow: 0 0 12px rgba(124, 58, 237, 0.5), 0 0 24px rgba(14, 165, 233, 0.5);
                }
                p {
                    font-size: 1.2rem;
                    line-height: 1.7;
                    color: rgba(255, 255, 255, 0.9);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
};

class Lights {
    constructor(scene) {
        this.scene = scene;
        this.light1 = new THREE.PointLight(0x9400D3, 1, 50);
        this.light2 = new THREE.PointLight(0x00BFFF, 1, 50);
        this.scene.add(this.light1, this.light2);
    }
    update(time, cameraZ) {
        this.light1.position.set(Math.sin(time * 0.6) * 10, Math.cos(time * 0.8) * 10, cameraZ - 20);
        this.light2.position.set(Math.cos(time * 0.4) * 10, Math.sin(time * 0.5) * 10, cameraZ - 30);
    }
}


class Tube {
    constructor(scene) {
        const curve = new THREE.CatmullRomCurve3(
            Array.from({ length: 20 }, (_, i) => {
                const angle = i / 10 * Math.PI * 2;
                return new THREE.Vector3(Math.sin(angle) * 8, Math.cos(angle) * 8, -i * 10)
            })
        , true);
        const geometry = new THREE.TubeGeometry(curve, 256, 1, 16, false);
        const material = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normal;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    gl_FragColor = vec4(0.5, 0.2, 0.8, 1.0) * intensity * (sin(time * 10.0) * 0.1 + 0.9);
                }
            `,
            side: THREE.BackSide,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);
    }
    update(cameraZ) {
        this.mesh.position.z = cameraZ;
        this.mesh.material.uniforms.time.value += 0.01;
    }
}

class Stars {
    constructor(scene) {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const sizes = [];
        const opacities = [];
        for (let i = 0; i < 5000; i++) {
            positions.push(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 1) * 1000
            );
            sizes.push(Math.random() * 1.5 + 0.5);
            opacities.push(Math.random() * 0.5 + 0.2);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        geometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) },
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute float opacity;
                varying float vOpacity;
                void main() {
                    vOpacity = opacity;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float time;
                varying float vOpacity;
                void main() {
                    float twinkle = 0.5 * (1.0 + sin(time + gl_FragCoord.x * gl_FragCoord.y));
                    gl_FragColor = vec4(color, vOpacity * twinkle);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        this.mesh = new THREE.Points(geometry, material);
        scene.add(this.mesh);
    }
    update(cameraZ, delta) {
        this.mesh.material.uniforms.time.value += delta;
        if (this.mesh.position.z > cameraZ + 500) {
            this.mesh.position.z = cameraZ - 500;
        }
    }
}

class Wormhole {
    constructor(scene) {
        const geometry = new THREE.PlaneGeometry(200, 200, 100, 100);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x9400D3) },
                color2: { value: new THREE.Color(0x4B0082) },
                noiseScale: { value: 5.0 },
            },
            vertexShader: `
                uniform float time;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    float k = 1.0 + sin(length(pos.xy) * 0.05 + time * 0.5) * 0.2;
                    pos.xy *= k;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float noiseScale;
                varying vec2 vUv;
                
                // 2D Noise function
                float noise(vec2 p) {
                    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                }

                void main() {
                    vec2 uv = vUv - 0.5;
                    float d = length(uv);
                    float a = atan(uv.y, uv.x);
                    
                    float noiseFactor = noise(uv * noiseScale + time * 0.1);
                    float ripple = sin((d - time * 0.1) * 20.0) * 0.1;
                    
                    float colorMix = smoothstep(0.1, 0.5, d + ripple + noiseFactor * 0.1);
                    vec3 color = mix(color1, color2, colorMix);
                    
                    float alpha = 1.0 - smoothstep(0.4, 0.5, d);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.z = -100;
        scene.add(this.mesh);
    }
    update(time) {
        this.mesh.material.uniforms.time.value = time * 0.2;
    }
}

export default DeliveryAgentManagement;
