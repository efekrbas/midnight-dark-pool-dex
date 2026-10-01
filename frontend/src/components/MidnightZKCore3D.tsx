"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Lock, Sparkles, Shield, Cpu } from 'lucide-react';

export default function MidnightZKCore3D({ className = "w-full h-[480px]" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Central Midnight Obsidian Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Geometry: Faceted Obsidian Monolith
    const coreGeometry = new THREE.IcosahedronGeometry(1.65, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x07090e),
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      ior: 1.52,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Inner Luminous ZK Wireframe Core
    const innerGeometry = new THREE.IcosahedronGeometry(1.05, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    rootGroup.add(innerMesh);

    // Glowing Inner Energy Point
    const pointCoreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const pointCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.7,
    });
    const pointCoreMesh = new THREE.Mesh(pointCoreGeo, pointCoreMat);
    rootGroup.add(pointCoreMesh);

    // 4. Gyroscopic Cryptographic Orbital Rings (Nullifier, Witness & Shielded Ledger)
    const ringMatChrome = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.12,
    });

    const ringMatCyan = new THREE.MeshStandardMaterial({
      color: 0x082f49,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Ring 1 - Inner Gyroscope
    const ring1Geo = new THREE.TorusGeometry(2.25, 0.028, 16, 120);
    const ring1 = new THREE.Mesh(ring1Geo, ringMatChrome);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    // Ring 2 - Mid Gyroscope
    const ring2Geo = new THREE.TorusGeometry(2.65, 0.022, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geo, ringMatCyan);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    rootGroup.add(ring2);

    // Ring 3 - Outer Orbital with Witness Nodes
    const ring3Geo = new THREE.TorusGeometry(3.05, 0.018, 16, 120);
    const ring3 = new THREE.Mesh(ring3Geo, ringMatChrome);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.y = Math.PI / 3;
    rootGroup.add(ring3);

    // Satellite Nodes orbiting Ring 3
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(Math.cos(angle) * 3.05, Math.sin(angle) * 3.05, 0);
      nodeGroup.add(nodeMesh);
    }
    ring3.add(nodeGroup);

    // 5. Floating ZK Proof Particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // 6. Cinematic Rim & Atmospheric Lighting (Exact Match to Cold Blue/Cyan Rim Light)
    const ambientLight = new THREE.AmbientLight(0x020408, 3.5);
    scene.add(ambientLight);

    // Primary Cyan Rim Light (Right & Top)
    const cyanRimLight = new THREE.PointLight(0x00d2ff, 32, 25);
    cyanRimLight.position.set(4.5, 3.8, 2.5);
    scene.add(cyanRimLight);

    // Secondary Royal Blue Rim Light (Back & Left)
    const blueRimLight = new THREE.PointLight(0x1d4ed8, 20, 25);
    blueRimLight.position.set(-4.0, -2.5, -2.0);
    scene.add(blueRimLight);

    // High Angle Specular Glint (Front Right)
    const frontGlint = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    frontGlint.position.set(2.0, 5.0, 5.0);
    scene.add(frontGlint);

    // Deep Indigo Shadow Fill
    const shadowFill = new THREE.PointLight(0x0f172a, 10, 15);
    shadowFill.position.set(0, -4.0, 3.0);
    scene.add(shadowFill);

    setIsLoaded(true);

    // 7. Interactive Mouse Tracking with Smooth Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.9;
      targetY = y * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Responsive Resize Listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 8. Render Loop (60 FPS Smooth Damped Animation)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Parallax Rotation
      rootGroup.rotation.y = elapsedTime * 0.12 + mouseX * 0.8;
      rootGroup.rotation.x = mouseY * 0.6 + Math.sin(elapsedTime * 0.8) * 0.05;

      // Floating Zero-G Oscillation
      rootGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.14;

      // Gyroscopic Ring Rotations
      ring1.rotation.x += 0.007;
      ring1.rotation.y += 0.004;

      ring2.rotation.y -= 0.006;
      ring2.rotation.z += 0.005;

      ring3.rotation.z += 0.005;
      ring3.rotation.x -= 0.004;

      // Subtle Pulsing of Inner Wireframe Core
      const pulseScale = 1.0 + Math.sin(elapsedTime * 2.2) * 0.04;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);
      pointCoreMesh.scale.set(pulseScale * 1.1, pulseScale * 1.1, pulseScale * 1.1);

      // Particle Field Gentle Drift
      particles.rotation.y = -elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      pointCoreGeo.dispose();
      pointCoreMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ringMatChrome.dispose();
      ringMatCyan.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative ${className} flex items-center justify-center select-none group`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />

      {/* Subtle Ambient Back-Glow (Cyan / Deep Night Blue) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Floating Micro-Telemetry Pill (Bottom Anchor) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[11px] font-mono text-zinc-400 pointer-events-none shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-white font-medium">OBSIDIAN ZK CORE</span>
        <span className="text-zinc-600">/</span>
        <span className="text-cyan-400/90">WASM PROVER ACTIVE</span>
      </div>
    </div>
  );
}
