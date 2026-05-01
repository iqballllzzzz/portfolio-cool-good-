import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function StarField({ tilt }: { tilt: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  const count = 2500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;
    // gyro / mouse parallax
    ref.current.rotation.x += (tilt.y * 0.5 - ref.current.rotation.x * 0.02) * 0.02;
    ref.current.rotation.y += (tilt.x * 0.5 - ref.current.rotation.y * 0.02) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation color="#b794f6" transparent opacity={0.85} />
    </points>
  );
}

function GlowOrb({ position, color, tilt }: { position: [number, number, number]; color: string; tilt: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * 0.4) * 0.6 + tilt.x * 1.5;
    ref.current.position.y = position[1] + Math.cos(t * 0.5) * 0.6 + tilt.y * 1.5;
    ref.current.rotation.y = t * 0.2;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
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
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.4} />
        <StarField tilt={tilt} />
        <GlowOrb position={[-4, 1, -2]} color="#a855f7" tilt={tilt} />
        <GlowOrb position={[4, -1, -3]} color="#06b6d4" tilt={tilt} />
        <GlowOrb position={[0, 2.5, -4]} color="#ec4899" tilt={tilt} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/70" />
    </div>
  );
}