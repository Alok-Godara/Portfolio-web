import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';

function Car({ modelUrl, startPosition, rotationDirection, radius }) {
  const carRef = useRef();
  const { scene } = useGLTF(modelUrl);
  const [progress, setProgress] = useState(0); // Progress based on scroll

  useFrame(() => {
    if (carRef.current) {
      const angle = Math.PI * progress * rotationDirection;
      
      carRef.current.position.x = Math.cos(angle) * radius + startPosition.x;
      carRef.current.position.z = Math.sin(angle) * radius;
      
      carRef.current.rotation.y = angle + (rotationDirection > 0 ? Math.PI / 2 : -Math.PI / 2);
    }
  });

  // Use GSAP for animation on completion
  useEffect(() => {
    if (progress >= 1) {
      gsap.to(carRef.current.position, { x: startPosition.x * 4, duration: 2 });
    }
  }, [progress]);

  return <primitive ref={carRef} object={scene} />;
}

function Scene() {
  const radius = 5; // Circle radius

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 1000; // Customize this based on the page height and animation range
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / maxScroll, 1); // Clamp between 0 and 1
      setCarProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [carProgress, setCarProgress] = useState(0); // Car animation progress based on scroll

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} />
      <OrbitControls />

      {/* Car 1 - coming from the left */}
      <Car modelUrl="/car1.glb" startPosition={{ x: -5, z: 0 }} rotationDirection={1} radius={radius} progress={carProgress} />

      {/* Car 2 - coming from the right */}
      <Car modelUrl="/car2.glb" startPosition={{ x: 5, z: 0 }} rotationDirection={-1} radius={radius} progress={carProgress} />
    </Canvas>
  );
}

export default function Animation() {
  return (
    <div style={{ height: '200vh' }}> {/* Ensure there's enough scroll height */}
      <Scene />
    </div>
  );
}
