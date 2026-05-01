import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Particles({ tilt }: { tilt: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  const count = 1400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    const ty = tilt.x * 0.3;
    const tx = tilt.y * 0.2;
    ref.current.rotation.x += (tx - ref.current.rotation.x) * 0.04;
    ref.current.position.x += (tilt.x * 0.6 - ref.current.position.x) * 0.04;
    ref.current.position.y += (-tilt.y * 0.4 - ref.current.position.y) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} sizeAttenuation color="#ffffff" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function WireSphere({ tilt }: { tilt: { x: number; y: number } }) {
  const ref = useRef<THREE.LineSegments>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2 + tilt.y * 0.3;
    ref.current.rotation.z += delta * 0.01;
  });
  return (
    <lineSegments ref={ref} position={[0, 0, -2]}>
      <edgesGeometry args={[new THREE.IcosahedronGeometry(3.2, 1)]} />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
    </lineSegments>
  );
}

export default function ThreeBackground() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      const x = ((e.gamma ?? 0) / 45);
      const y = ((e.beta ?? 0) / 90);
      setTilt({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <Particles tilt={tilt} />
        <WireSphere tilt={tilt} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_85%)]" />
    </div>
  );
}