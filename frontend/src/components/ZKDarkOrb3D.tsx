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
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // === 1. MIDNIGHT ECLIPSE CORE (Dark Moon) ===
    const moonGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x050a14,
      emissive: 0x0a1628,
      emissiveIntensity: 0.3,
      roughness: 0.9,
      metalness: 0.1,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    mainGroup.add(moonMesh);

    // === 2. CORONA GLOW (Privacy Shield Aura) ===
    // Inner corona ring
    const coronaGeo = new THREE.RingGeometry(1.05, 1.35, 128);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    mainGroup.add(corona);

    // Outer corona haze
    const hazeGeo = new THREE.RingGeometry(1.1, 1.8, 128);
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const haze = new THREE.Mesh(hazeGeo, hazeMat);
    mainGroup.add(haze);

    // === 3. DUAL-STATE ORBIT RINGS (Public / Private Ledger) ===
    const createOrbitRing = (radius: number, color: number, opacity: number, segments: number) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
      });
      return new THREE.Line(ringGeo, ringMat);
    };

    // Public state ring (teal - visible transactions)
    const publicRing = createOrbitRing(1.6, 0x14b8a6, 0.4, 120);
    publicRing.rotation.x = Math.PI * 0.35;
    publicRing.rotation.z = Math.PI * 0.1;
    mainGroup.add(publicRing);

    // Private/shielded state ring (indigo - hidden state)
    const privateRing = createOrbitRing(1.85, 0x6366f1, 0.25, 100);
    privateRing.rotation.x = Math.PI * 0.55;
    privateRing.rotation.z = -Math.PI * 0.15;
    mainGroup.add(privateRing);

    // ZK proof verification ring (cyan)
    const zkRing = createOrbitRing(2.1, 0x06b6d4, 0.2, 80);
    zkRing.rotation.x = Math.PI * 0.75;
    zkRing.rotation.z = Math.PI * 0.25;
    mainGroup.add(zkRing);

    // === 4. COMMITMENT PARTICLES (Shielded Orders in Dark Pool) ===
    // Teal particles — public state commitments
    const createParticleSystem = (count: number, color: number, minR: number, maxR: number, size: number) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        const radius = minR + Math.random() * (maxR - minR);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: 0.8,
      });
      return new THREE.Points(geo, mat);
    };

    // Public commitment particles (teal, closer)
    const publicParticles = createParticleSystem(60, 0x2dd4bf, 1.4, 2.0, 0.035);
    mainGroup.add(publicParticles);

    // Shielded commitment particles (indigo/purple, outer)
    const shieldedParticles = createParticleSystem(40, 0x818cf8, 2.0, 2.6, 0.03);
    mainGroup.add(shieldedParticles);

    // DUST gas particles (tiny cyan sparks, scattered)
    const dustParticles = createParticleSystem(80, 0x67e8f9, 1.2, 2.8, 0.02);
    mainGroup.add(dustParticles);

    // === 5. PROOF NODES (ZK Proof Verification Points) ===
    const proofNodes: THREE.Mesh[] = [];
    const proofNodeGeo = new THREE.SphereGeometry(0.04, 8, 8);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.6 + Math.sin(i * 1.5) * 0.3;
      const color = i % 2 === 0 ? 0x14b8a6 : 0x6366f1;
      const nodeMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
      });
      const node = new THREE.Mesh(proofNodeGeo, nodeMat);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.6,
        Math.sin(angle * 2) * 0.4
      );
      mainGroup.add(node);
      proofNodes.push(node);
    }

    // === 6. CRESCENT SHADOW (Midnight Eclipse Effect) ===
    const crescentGeo = new THREE.CircleGeometry(1.02, 64);
    const crescentMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.7,
    });
    const crescent = new THREE.Mesh(crescentGeo, crescentMat);
    crescent.position.set(0.3, 0.15, 1.01);
    mainGroup.add(crescent);

    // === LIGHTING ===
    const ambientLight = new THREE.AmbientLight(0x0a1628, 1.5);
    scene.add(ambientLight);

    // Teal privacy glow from behind (corona backlight)
    const coronaLight = new THREE.PointLight(0x14b8a6, 6, 12);
    coronaLight.position.set(-2, 1, -3);
    scene.add(coronaLight);

    // Subtle purple accent light
    const accentLight = new THREE.PointLight(0x6366f1, 2, 8);
    accentLight.position.set(3, -2, 2);
    scene.add(accentLight);

    // Cool white fill
    const fillLight = new THREE.PointLight(0xc4f0f5, 1.5, 10);
    fillLight.position.set(0, 3, 4);
    scene.add(fillLight);

    // === MOUSE INTERACTION ===
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

    // === RESIZE ===
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // === ANIMATION ===
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Main group gentle rotation + mouse parallax
      mainGroup.rotation.y = t * 0.12 + targetX * 0.5;
      mainGroup.rotation.x = Math.sin(t * 0.15) * 0.08 - targetY * 0.4;

      // Eclipse moon subtle breathing
      const breathe = 1 + Math.sin(t * 1.5) * 0.015;
      moonMesh.scale.set(breathe, breathe, breathe);

      // Corona pulse
      const coronaPulse = 0.12 + Math.sin(t * 2) * 0.05;
      coronaMat.opacity = coronaPulse;
      hazeMat.opacity = 0.04 + Math.sin(t * 1.8 + 1) * 0.025;

      // Orbit rings slow rotation
      publicRing.rotation.y = t * 0.3;
      privateRing.rotation.y = -t * 0.2;
      zkRing.rotation.y = t * 0.15;

      // Particle clouds orbit
      publicParticles.rotation.y = t * 0.25;
      publicParticles.rotation.x = Math.sin(t * 0.1) * 0.05;
      shieldedParticles.rotation.y = -t * 0.18;
      shieldedParticles.rotation.z = t * 0.08;
      dustParticles.rotation.y = t * 0.35;
      dustParticles.rotation.x = Math.cos(t * 0.15) * 0.04;

      // Proof nodes pulse and orbit
      proofNodes.forEach((node, i) => {
        const angle = (i / 8) * Math.PI * 2 + t * 0.4;
        const radius = 1.6 + Math.sin(t * 2 + i) * 0.15;
        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle) * radius * 0.6;
        node.position.z = Math.sin(angle * 2 + t) * 0.4;

        // Pulse glow
        const scale = 0.8 + Math.sin(t * 3 + i * 0.8) * 0.4;
        node.scale.set(scale, scale, scale);
      });

      // Crescent shadow slow drift
      crescent.position.x = 0.3 + Math.sin(t * 0.2) * 0.05;
      crescent.position.y = 0.15 + Math.cos(t * 0.25) * 0.03;

      // Corona backlight flicker
      coronaLight.intensity = 5 + Math.sin(t * 3) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // === CLEANUP ===
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose all geometries and materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry?.dispose();
          if (obj.material instanceof THREE.Material) {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-teal-400/70 tracking-wider uppercase pointer-events-none flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-teal-500/20 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
        Midnight Eclipse · Dual-State ZK Privacy Shield
      </div>
    </div>
  );
}
