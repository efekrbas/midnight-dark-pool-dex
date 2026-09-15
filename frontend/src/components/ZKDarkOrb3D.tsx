"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Dual-State Cryptographic Wireframe Lattice (Public / Private boundary)
    const outerGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6, // Teal
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 2. Middle Shielded Energy Cage
    const middleGeo = new THREE.OctahedronGeometry(1.5, 2);
    const middleMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, // Blue / Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const middleMesh = new THREE.Mesh(middleGeo, middleMat);
    mainGroup.add(middleMesh);

    // 3. Inner Dense ZK Cryptographic Core (Glowing Shielded State)
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x06b6d4, // Cyan emissive
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 4. Floating Shielded Order Particles (Commitments in Dark Pool)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);

      particleSpeeds.push((Math.random() - 0.5) * 0.02);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x14b8a6, 4, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 3, 10);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = (y / rect.height) * 2;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = elapsed * 0.25 + targetX * 0.6;
      mainGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15 - targetY * 0.6;

      // Pulse inner core
      const pulse = 1 + Math.sin(elapsed * 2) * 0.04;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Counter-rotate middle cage
      middleMesh.rotation.x = -elapsed * 0.35;
      middleMesh.rotation.z = elapsed * 0.2;

      // Outer lattice slow drift
      outerMesh.rotation.y = -elapsed * 0.15;
      outerMesh.rotation.z = Math.cos(elapsed * 0.3) * 0.2;

      // Rotate particle cloud
      particles.rotation.y = elapsed * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      outerGeo.dispose();
      outerMat.dispose();
      middleGeo.dispose();
      middleMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-teal-400/70 tracking-wider uppercase pointer-events-none flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-teal-500/20 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
        Interactive ZK Cryptographic Lattice · Move Cursor
      </div>
    </div>
  );
}
