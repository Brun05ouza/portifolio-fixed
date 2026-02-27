import { useEffect, useRef } from 'react';
// @ts-expect-error - three-globe has no types
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

(globalThis as typeof window & { THREE?: typeof THREE }).THREE = THREE;

interface GlobeAnimationProps {
  className?: string;
  size?: number;
  /** Aparência mais clara (mais luz e atmosfera suave) */
  light?: boolean;
}

export function GlobeAnimation({ className = '', size = 120, light = false }: GlobeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = size;
    const height = size;

    // Reduz carga no mobile
    const dpr = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : Math.min(2, window.devicePixelRatio);

    const atmosphereColor = light ? '#a5d8ff' : '#60a5fa';
    const ambientIntensity = light ? 1.8 : 1.2;
    const dirIntensity = light ? 1.6 : 1.2;
    const dirFillIntensity = light ? 0.7 : 0.4;
    const toneExposure = light ? 1.5 : 1.2;

    const Globe = new ThreeGlobe()
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-topology.png')
      .showAtmosphere(true)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(0.18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = toneExposure;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xffffff, ambientIntensity));
    scene.add(new THREE.DirectionalLight(0xffffff, dirIntensity));
    scene.add(new THREE.DirectionalLight(0x93c5fd, dirFillIntensity).position.set(5, 3, 5));

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    let animationId: number | null = null;
    let isVisible = true;

    function animate() {
      if (!isVisible) return;
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const nowVisible = e.isIntersecting;
          if (nowVisible && !isVisible) {
            isVisible = true;
            animate();
          } else {
            isVisible = nowVisible;
          }
        });
      },
      { threshold: 0, rootMargin: '50px' }
    );
    io.observe(renderer.domElement);
    animate();

    return () => {
      io.disconnect();
      if (animationId !== null) cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size, margin: '0 auto' }}
      aria-hidden
    />
  );
}
