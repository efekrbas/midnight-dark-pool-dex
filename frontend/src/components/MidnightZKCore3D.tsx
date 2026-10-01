"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function MidnightZKCore3D({ className = "w-full h-[520px]" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // 2. High-Performance WebGL Renderer with Filmic Tone Mapping
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

    // 3. Studio Lighting Environment Map (High-End Chrome & Cyan Sheen)
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const ctx = envCanvas.getContext('2d');
    if (ctx) {
      // Deep studio background with subtle dark navy gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.35, '#051329');
      bgGrad.addColorStop(0.65, '#011936');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Studio Softbox 1: Electric Cyan Rim Strip (Right)
      const softbox1 = ctx.createLinearGradient(650, 0, 900, 0);
      softbox1.addColorStop(0, 'rgba(0, 240, 255, 0)');
      softbox1.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      softbox1.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = softbox1;
      ctx.fillRect(650, 20, 250, 470);

      // Studio Softbox 2: Midnight Blue Rim Strip (Left)
      const softbox2 = ctx.createLinearGradient(100, 0, 320, 0);
      softbox2.addColorStop(0, 'rgba(30, 58, 138, 0)');
      softbox2.addColorStop(0.5, 'rgba(59, 130, 246, 0.85)');
      softbox2.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = softbox2;
      ctx.fillRect(100, 40, 220, 430);

      // Overhead Soft Light
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(512, 100, 80, 0, Math.PI * 2);
      ctx.fill();
    }
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 4. Central Cyber Vault Group
    const rootGroup = new THREE.Group();
    rootGroup.rotation.y = -0.25;
    rootGroup.rotation.x = 0.18;
    scene.add(rootGroup);

    // Common High-End Shader Materials
    const darkObsidianMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0a101d),
      metalness: 0.94,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      envMapIntensity: 2.2,
    });

    const polishedLiquidChromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xe2e8f0),
      metalness: 0.98,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
    });

    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    // 5. THE CORE: FLOATING ZERO-KNOWLEDGE HYPER-CUBE (Encrypted Private Ledger)
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // Inner Glowing Translucent ZK Data Matrix
    const innerCubeGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const innerCubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.85,
      roughness: 0.06,
      transmission: 0.75,
      thickness: 1.2,
      transparent: true,
      opacity: 0.9,
      metalness: 0.1,
    });
    const innerCube = new THREE.Mesh(innerCubeGeo, innerCubeMat);
    coreGroup.add(innerCube);

    // Inner Crystal Octahedron Heart (The Secret Commitment Seed)
    const heartGeo = new THREE.OctahedronGeometry(0.48, 0);
    const heartMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    coreGroup.add(heartMesh);

    // Outer Obsidian Exoskeleton Cage (Shielding the Inner Data)
    const outerCageGeo = new THREE.BoxGeometry(1.22, 1.22, 1.22);
    const outerCageWire = new THREE.WireframeGeometry(outerCageGeo);
    const outerCageMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      linewidth: 1.5,
    });
    const outerCage = new THREE.LineSegments(outerCageWire, outerCageMat);
    coreGroup.add(outerCage);

    // Corner Nodes on Exoskeleton (Titanium Nodes)
    const cornerGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const cornerMat = polishedLiquidChromeMat;
    const cornerOffsets = [-0.61, 0.61];
    cornerOffsets.forEach(x => {
      cornerOffsets.forEach(y => {
        cornerOffsets.forEach(z => {
          const corner = new THREE.Mesh(cornerGeo, cornerMat);
          corner.position.set(x, y, z);
          coreGroup.add(corner);
        });
      });
    });

    // 6. RING 1: INNER GYROSCOPIC CIPHER RING (Verification Proofs)
    const ring1Group = new THREE.Group();
    rootGroup.add(ring1Group);

    const ring1Geo = new THREE.TorusGeometry(1.72, 0.045, 16, 96);
    const ring1Mesh = new THREE.Mesh(ring1Geo, polishedLiquidChromeMat);
    ring1Group.add(ring1Mesh);

    // Neon Ticks around Ring 1
    const tickGeo = new THREE.BoxGeometry(0.025, 0.12, 0.03);
    const tickCount = 24;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const tick = new THREE.Mesh(tickGeo, i % 4 === 0 ? cyanGlowMat : polishedLiquidChromeMat);
      tick.position.set(Math.cos(angle) * 1.72, Math.sin(angle) * 1.72, 0);
      tick.rotation.z = angle;
      ring1Group.add(tick);
    }

    // 7. RING 2: MID SHIELDED LIQUIDITY VAULT BAND (Segmented Titanium)
    const ring2Group = new THREE.Group();
    ring2Group.rotation.x = Math.PI / 3.2;
    ring2Group.rotation.y = Math.PI / 6;
    rootGroup.add(ring2Group);

    const ring2Geo = new THREE.TorusGeometry(2.18, 0.05, 16, 96);
    const ring2Mesh = new THREE.Mesh(ring2Geo, darkObsidianMat);
    ring2Group.add(ring2Mesh);

    // Inset Cyan Neon Channel inside Ring 2
    const ring2ChannelGeo = new THREE.TorusGeometry(2.18, 0.015, 16, 96);
    const ring2Channel = new THREE.Mesh(ring2ChannelGeo, cyanGlowMat);
    ring2Group.add(ring2Channel);

    // 8. RING 3: OUTER FLOATING CYBER-SHIELD APERTURE (Aperture Iris Segments)
    const ring3Group = new THREE.Group();
    ring3Group.rotation.x = -Math.PI / 3.8;
    ring3Group.rotation.z = Math.PI / 4.5;
    rootGroup.add(ring3Group);

    const ring3Radius = 2.68;
    const arcCount = 4;
    const arcLength = (Math.PI * 2) / arcCount;

    for (let i = 0; i < arcCount; i++) {
      const startAngle = i * arcLength + 0.18;
      const arcGeo = new THREE.TorusGeometry(ring3Radius, 0.04, 16, 36, arcLength - 0.36);
      const arcMesh = new THREE.Mesh(arcGeo, polishedLiquidChromeMat);
      arcMesh.rotation.z = startAngle;
      ring3Group.add(arcMesh);

      // Neon Endpoint Beacon on Each Segment
      const beaconGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const beacon = new THREE.Mesh(beaconGeo, cyanGlowMat);
      const beaconAngle = startAngle;
      beacon.position.set(Math.cos(beaconAngle) * ring3Radius, Math.sin(beaconAngle) * ring3Radius, 0);
      ring3Group.add(beacon);
    }

    // 9. DISSOLVING ZERO-KNOWLEDGE PROOF PARTICLES (Volumetric Starfield)
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.4 + Math.random() * 2.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 10. CINEMATIC LIGHTING (Cold Electric Cyan Rim & Volumetric Core Light)
    const ambientLight = new THREE.AmbientLight(0x020817, 2.2);
    scene.add(ambientLight);

    // Key Light: Razor-Sharp Electric Cyan Rim Light (Right & Top-Back)
    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanRimLight.position.set(5.5, 4.5, 3.5);
    scene.add(cyanRimLight);

    // Counter Light: Deep Royal Blue (Left-Back)
    const blueRimLight = new THREE.DirectionalLight(0x1d4ed8, 2.8);
    blueRimLight.position.set(-5.5, -3.5, -2.5);
    scene.add(blueRimLight);

    // Front-Top Specular Glint Light
    const frontSpot = new THREE.PointLight(0xffffff, 20, 15);
    frontSpot.position.set(1.5, 3.5, 5.5);
    scene.add(frontSpot);

    // Volumetric Inner Core Glow (Illuminating the Vault Rings from Within)
    const coreLight = new THREE.PointLight(0x00f0ff, 18, 6.5);
    coreGroup.add(coreLight);

    // 11. INTERACTIVE MOUSE PARALLAX & DRAG TO ORBIT
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerPosition.x;
        const deltaY = clientY - previousPointerPosition.y;
        rotationVelocity.x = deltaY * 0.005;
        rotationVelocity.y = deltaX * 0.005;
        rootGroup.rotation.x += rotationVelocity.x;
        rootGroup.rotation.y += rotationVelocity.y;
        previousPointerPosition = { x: clientX, y: clientY };
      } else {
        const rect = container.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        targetX = x * 0.55;
        targetY = y * 0.45;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('resize', handleResize);

    // 12. SMOOTH TIER-1 ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped Mouse Parallax Lerping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!isDragging) {
        // Base Tilt with Organic Inertia
        rootGroup.rotation.y = -0.25 + mouseX * 0.5 + rotationVelocity.y;
        rootGroup.rotation.x = 0.18 + mouseY * 0.4 + rotationVelocity.x;
        rotationVelocity.x *= 0.94;
        rotationVelocity.y *= 0.94;
      }

      // Organic Zero-Gravity Floating
      rootGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.11;

      // 1. Core Hyper-Cube Tumbling
      coreGroup.rotation.y = elapsedTime * 0.35;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.25;
      coreGroup.rotation.z = Math.cos(elapsedTime * 0.4) * 0.15;

      // Subtle Pulsing of ZK Core
      const corePulse = 1.0 + Math.sin(elapsedTime * 2.2) * 0.04;
      innerCube.scale.set(corePulse, corePulse, corePulse);
      heartMesh.scale.set(corePulse * 1.05, corePulse * 1.05, corePulse * 1.05);

      // 2. Ring 1 (Inner Cipher Ring) Clockwise Rotation
      ring1Group.rotation.z = elapsedTime * 0.22;

      // 3. Ring 2 (Mid Shielded Ring) Counter-Clockwise Rotation
      ring2Group.rotation.z = -elapsedTime * 0.16;

      // 4. Ring 3 (Outer Iris Aperture) Gentle Drift
      ring3Group.rotation.z = elapsedTime * 0.1;

      // 5. Particles Gentle Cosmic Drift
      particles.rotation.y = -elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Comprehensive Disposal & Cleanup
    return () => {
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      envTexture.dispose();
      innerCubeGeo.dispose();
      innerCubeMat.dispose();
      heartGeo.dispose();
      heartMat.dispose();
      outerCageGeo.dispose();
      outerCageWire.dispose();
      outerCageMat.dispose();
      cornerGeo.dispose();
      ring1Geo.dispose();
      tickGeo.dispose();
      ring2Geo.dispose();
      ring2ChannelGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      darkObsidianMat.dispose();
      polishedLiquidChromeMat.dispose();
      cyanGlowMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative ${className} flex items-center justify-center select-none group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Institutional Cyber Vault: Drag to inspect cryptographic layers"
      />

      {/* Atmospheric Soft Cyan & Midnight Blue Glow (Seamless Page Integration) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Secondary Diffuse Outer Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Floating Minimalist Telemetry Pill */}
      <div
        className={`absolute bottom-3 right-6 z-20 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-200 font-medium">CYBER VAULT LOCK</span>
          <span className="text-zinc-600">/</span>
          <span className="text-cyan-400">ZK COMMITMENT ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
