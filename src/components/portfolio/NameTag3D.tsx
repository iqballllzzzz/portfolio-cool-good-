import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Tag({ drag }: { drag: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    const targetY = drag.x * 0.8;
    const targetX = -drag.y * 0.6;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 6);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 6);
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={group}>
        {/* lanyard string */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
        </mesh>
        {/* clip */}
        <mesh position={[0, 0.7, 0]}>
          <torusGeometry args={[0.18, 0.05, 12, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* card */}
        <RoundedBox args={[2.6, 1.4, 0.12]} radius={0.12} smoothness={4} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#0f0a1f" metalness={0.4} roughness={0.3} emissive="#3b1f6b" emissiveIntensity={0.4} />
        </RoundedBox>
        {/* accent stripe */}
        <mesh position={[0, 0.35, 0.07]}>
          <planeGeometry args={[2.6, 0.28]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <Text position={[0, 0.35, 0.08]} fontSize={0.16} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.05}>
          WIZARD · LV.13
        </Text>
        <Text position={[0, -0.05, 0.07]} fontSize={0.22} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={2.4}>
          Arkana Farras
        </Text>
        <Text position={[0, -0.32, 0.07]} fontSize={0.22} color="#06b6d4" anchorX="center" anchorY="middle" maxWidth={2.4}>
          Abiputra
        </Text>
        <Text position={[0, -0.6, 0.07]} fontSize={0.1} color="#94a3b8" anchorX="center" anchorY="middle">
          PROGRAMMER · ANIMATOR
        </Text>
      </group>
    </Float>
  );
}

export default function NameTag3D() {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const start = useRef({ x: 0, y: 0, dx: 0, dy: 0 });

  const onDown = (e: React.PointerEvent) => {
    setActive(true);
    start.current = { x: e.clientX, y: e.clientY, dx: drag.x, dy: drag.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!active) return;
    const dx = (e.clientX - start.current.x) / 120;
    const dy = (e.clientY - start.current.y) / 120;
    setDrag({ x: start.current.dx + dx, y: start.current.dy + dy });
  };
  const onUp = () => setActive(false);

  return (
    <div
      className="relative w-full h-[280px] sm:h-[340px] cursor-grab active:cursor-grabbing touch-none select-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#a855f7" />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#06b6d4" />
        <Tag drag={drag} />
      </Canvas>
    </div>
  );
}