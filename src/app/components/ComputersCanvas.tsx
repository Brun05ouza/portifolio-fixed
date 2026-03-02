import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Component, Suspense, useEffect, useState } from 'react';

/** Evita quebra quando o modelo GLTF não existe (404 retorna HTML). */
class ModelErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/** Luzes iguais ao projeto 3d-portfolio-website — sem alterar cores do modelo. */
function SceneLights() {
  return (
    <>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
    </>
  );
}

const CanvasLoader = () => (
  <>
    <SceneLights />
  </>
);

type ComputersProps = {
  isMobile: boolean;
  modelUrl: string;
};

/** Modelo exatamente como no 3d-portfolio-website: cores originais do GLTF, mesma iluminação e posição. */
function Computers({ isMobile, modelUrl }: ComputersProps) {
  const { scene } = useGLTF(modelUrl);

  return (
    <mesh>
      <SceneLights />
      <primitive
        object={scene}
        scale={isMobile ? 0.95 : 1.05}
        position={isMobile ? [0, -0.5, -2.2] : [0, -1.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

export type ComputersCanvasProps = {
  /** URL do modelo GLTF. Coloque em public/desktop_pc/scene.gltf ou use URL absoluta. */
  modelUrl?: string;
  /** Largura do container. Default: "100%" */
  width?: string | number;
  /** Altura do container. Default: "100%" */
  height?: string | number;
  /** Classe CSS opcional do container. */
  className?: string;
};

const DEFAULT_MODEL_URL = '/desktop_pc/scene.gltf';

export default function ComputersCanvas({
  modelUrl = DEFAULT_MODEL_URL,
  width = '100%',
  height = '100%',
  className,
}: ComputersCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  useEffect(() => {
    if (modelUrl !== DEFAULT_MODEL_URL) {
      setModelExists(true);
      return;
    }
    fetch(modelUrl, { method: 'HEAD' })
      .then((r) => {
        if (!r.ok) {
          setModelExists(false);
          return;
        }
        const ct = r.headers.get('content-type') ?? '';
        setModelExists(!ct.includes('text/html'));
      })
      .catch(() => setModelExists(false));
  }, [modelUrl]);

  const shouldRenderCanvas = modelExists === true;

  return (
    <div style={{ width, height }} className={className}>
      {shouldRenderCanvas && (
      <ModelErrorBoundary>
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile} modelUrl={modelUrl} />
          </Suspense>
          <Preload all />
        </Canvas>
      </ModelErrorBoundary>
      )}
    </div>
  );
}
