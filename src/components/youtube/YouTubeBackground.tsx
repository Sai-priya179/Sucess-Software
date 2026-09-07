import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { youtubeConfig } from '../../lib/youtube/youtubeConfig';

const AbstractMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || youtubeConfig.reducedMotionFallback) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t / 4) / 2;
    meshRef.current.rotation.y = t / 3;
    meshRef.current.position.y = Math.sin(t / 2) * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5} position={[0, 0, -3]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#1a1a1a" 
          wireframe 
          transparent 
          opacity={0.15}
          emissive="#222222"
        />
      </mesh>
    </Float>
  );
};

export const YouTubeBackground: React.FC = () => {
  if (!youtubeConfig.enableWebGL) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: false, alpha: true }}>
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#000000', 3, 15]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <AbstractMesh />
        
        {/* Deep background stars */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Foreground dust motes */}
        <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
      </Canvas>
    </div>
  );
};
