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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Environment Map (High-End Chrome & Cyan Reflections)
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const ctx = envCanvas.getContext('2d');
    if (ctx) {
      // Deep studio background with gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.35, '#07162c');
      bgGrad.addColorStop(0.55, '#021f3f');
      bgGrad.addColorStop(0.85, '#082f49');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Bright Studio Softbox 1 (Right Cyan Rim Highlight Strip)
      const softbox1 = ctx.createLinearGradient(640, 0, 880, 0);
      softbox1.addColorStop(0, 'rgba(0, 240, 255, 0)');
      softbox1.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      softbox1.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = softbox1;
      ctx.fillRect(640, 20, 240, 470);

      // Bright Studio Softbox 2 (Left Blue Rim Highlight Strip)
      const softbox2 = ctx.createLinearGradient(120, 0, 320, 0);
      softbox2.addColorStop(0, 'rgba(30, 58, 138, 0)');
      softbox2.addColorStop(0.5, 'rgba(59, 130, 246, 0.9)');
      softbox2.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = softbox2;
      ctx.fillRect(120, 40, 200, 430);

      // Top Specular Gleam
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(512, 90, 70, 0, Math.PI * 2);
      ctx.fill();
    }
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 4. Central Group
    const rootGroup = new THREE.Group();
    // Default slight isometric tilt to show off depth and metallic bevels
    rootGroup.rotation.y = -0.32;
    rootGroup.rotation.x = 0.16;
    scene.add(rootGroup);

    // Common Materials
    const darkTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0f172a),
      metalness: 0.92,
      roughness: 0.2,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      envMapIntensity: 2.0,
    });

    const polishedChromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xdbeafe),
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 2.6,
    });

    const deepSteelMat = new THREE.MeshStandardMaterial({
      color: 0x050b14,
      metalness: 0.85,
      roughness: 0.35,
      envMapIntensity: 1.2,
    });

    const cyanEmissiveMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    // 5. Heavy Outer Vault Bezel & Backplate
    // Outer Bezel Torus
    const outerBezelGeo = new THREE.TorusGeometry(2.35, 0.22, 28, 96);
    const outerBezel = new THREE.Mesh(outerBezelGeo, darkTitaniumMat);
    rootGroup.add(outerBezel);

    // Inner Bezel Lip
    const innerLipGeo = new THREE.TorusGeometry(2.15, 0.06, 16, 96);
    const innerLip = new THREE.Mesh(innerLipGeo, polishedChromeMat);
    innerLip.position.z = 0.12;
    rootGroup.add(innerLip);

    // Vault Rear Armor Backplate
    const backplateGeo = new THREE.CylinderGeometry(2.28, 2.28, 0.25, 64);
    const backplate = new THREE.Mesh(backplateGeo, deepSteelMat);
    backplate.rotation.x = Math.PI / 2;
    backplate.position.z = -0.15;
    rootGroup.add(backplate);

    // 12 Heavy Industrial Locking Bolts around the perimeter
    const boltGroup = new THREE.Group();
    const boltGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.18, 16);
    const boltHeadGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const boltCount = 12;

    for (let i = 0; i < boltCount; i++) {
      const angle = (i / boltCount) * Math.PI * 2;
      const x = Math.cos(angle) * 2.35;
      const y = Math.sin(angle) * 2.35;

      const bolt = new THREE.Mesh(boltGeo, polishedChromeMat);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(x, y, 0.12);

      const boltHead = new THREE.Mesh(boltHeadGeo, darkTitaniumMat);
      boltHead.position.set(x, y, 0.21);

      boltGroup.add(bolt);
      boltGroup.add(boltHead);
    }
    rootGroup.add(boltGroup);

    // 6. Primary Rotating Cryptographic Cipher Dial (Outer Ring)
    const dialOuterGroup = new THREE.Group();
    rootGroup.add(dialOuterGroup);

    const dialRingGeo = new THREE.TorusGeometry(1.88, 0.07, 16, 80);
    const dialRing = new THREE.Mesh(dialRingGeo, polishedChromeMat);
    dialRing.position.z = 0.18;
    dialOuterGroup.add(dialRing);

    // Engraved Hash Notches on Outer Dial
    const notchGeo = new THREE.BoxGeometry(0.04, 0.14, 0.05);
    const notchCount = 36;
    for (let i = 0; i < notchCount; i++) {
      const angle = (i / notchCount) * Math.PI * 2;
      const isMajor = i % 6 === 0;
      const notch = new THREE.Mesh(
        notchGeo,
        isMajor ? cyanEmissiveMat : polishedChromeMat
      );
      notch.position.set(Math.cos(angle) * 1.88, Math.sin(angle) * 1.88, 0.22);
      notch.rotation.z = angle;
      if (isMajor) notch.scale.set(1.4, 1.4, 1.4);
      dialOuterGroup.add(notch);
    }

    // 7. Middle Counter-Rotating Combination Disk
    const dialMidGroup = new THREE.Group();
    rootGroup.add(dialMidGroup);

    const midRingGeo = new THREE.TorusGeometry(1.42, 0.06, 16, 72);
    const midRing = new THREE.Mesh(midRingGeo, darkTitaniumMat);
    midRing.position.z = 0.26;
    dialMidGroup.add(midRing);

    // Cyan Neon Circuit Ring inside Middle Disk
    const circuitRingGeo = new THREE.TorusGeometry(1.3, 0.02, 16, 72);
    const circuitRing = new THREE.Mesh(circuitRingGeo, cyanEmissiveMat);
    circuitRing.position.z = 0.27;
    dialMidGroup.add(circuitRing);

    // 8. 4-Spoke Heavy Mechanical Vault Wheel Handle (Central Lock)
    const wheelGroup = new THREE.Group();
    wheelGroup.position.z = 0.32;
    rootGroup.add(wheelGroup);

    // Central Wheel Hub
    const hubGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.22, 32);
    const hub = new THREE.Mesh(hubGeo, polishedChromeMat);
    hub.rotation.x = Math.PI / 2;
    wheelGroup.add(hub);

    // 4 Heavy Spoke Grips
    const spokeGeo = new THREE.CylinderGeometry(0.055, 0.055, 1.25, 16);
    const handleGripGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16);
    const handleSphereGeo = new THREE.SphereGeometry(0.09, 16, 16);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const spoke = new THREE.Mesh(spokeGeo, darkTitaniumMat);
      spoke.rotation.z = angle;
      wheelGroup.add(spoke);

      const grip = new THREE.Mesh(handleGripGeo, polishedChromeMat);
      grip.position.set(Math.cos(angle) * 0.72, Math.sin(angle) * 0.72, 0.08);
      grip.rotation.x = Math.PI / 2;
      wheelGroup.add(grip);

      const sphere = new THREE.Mesh(handleSphereGeo, polishedChromeMat);
      sphere.position.set(Math.cos(angle) * 0.72, Math.sin(angle) * 0.72, 0.22);
      wheelGroup.add(sphere);
    }

    // 9. Core Shielded Liquidity Aperture (Inside Central Hub)
    // Translucent Glowing Blue Crystal Viewport
    const coreCrystalGeo = new THREE.IcosahedronGeometry(0.32, 1);
    const coreCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.1,
      roughness: 0.05,
      transmission: 0.65,
      thickness: 1.0,
      transparent: true,
      opacity: 0.95,
      metalness: 0.1,
    });
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, coreCrystalMat);
    coreCrystal.position.z = 0.18;
    wheelGroup.add(coreCrystal);

    // Glowing Aperture Ring
    const apertureRingGeo = new THREE.TorusGeometry(0.38, 0.025, 16, 48);
    const apertureRing = new THREE.Mesh(apertureRingGeo, cyanEmissiveMat);
    apertureRing.position.z = 0.16;
    wheelGroup.add(apertureRing);

    // 4 Hydraulic Radial Locking Bars extending to outer frame
    const pistonGroup = new THREE.Group();
    pistonGroup.position.z = 0.08;
    rootGroup.add(pistonGroup);

    const pistonGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.85, 16);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const piston = new THREE.Mesh(pistonGeo, polishedChromeMat);
      piston.position.set(Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, 0);
      piston.rotation.z = angle + Math.PI / 2;
      pistonGroup.add(piston);
    }

    // 10. Precision Orbital ZK Verification Rail
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const railGeo = new THREE.TorusGeometry(2.78, 0.016, 16, 120);
    const rail = new THREE.Mesh(railGeo, railMat);
    rail.rotation.x = Math.PI / 2.8;
    rootGroup.add(rail);

    // Orbiting Verification Satellite
    const satGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const sat = new THREE.Mesh(satGeo, cyanEmissiveMat);
    sat.position.set(2.78, 0, 0);
    rail.add(sat);

    // 11. Cinematic Lighting Setup (Cold Cyan & Royal Blue Rim Light)
    const ambientLight = new THREE.AmbientLight(0x050b14, 2.5);
    scene.add(ambientLight);

    // Sharp Electric Cyan Rim Light (Right & Top-Back)
    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 4.2);
    cyanRimLight.position.set(5.5, 4.0, 3.5);
    scene.add(cyanRimLight);

    // Royal Blue Counter Rim Light (Left-Back)
    const blueRimLight = new THREE.DirectionalLight(0x1d4ed8, 3.0);
    blueRimLight.position.set(-5.5, -3.5, -2.5);
    scene.add(blueRimLight);

    // Front-Top Specular Spotlight
    const frontSpot = new THREE.PointLight(0xffffff, 22, 14);
    frontSpot.position.set(1.5, 3.5, 5.5);
    scene.add(frontSpot);

    // Inner Core Pulsing Glow
    const corePointLight = new THREE.PointLight(0x00f0ff, 15, 5);
    corePointLight.position.set(0, 0, 0.4);
    wheelGroup.add(corePointLight);

    // 12. Interactive Drag to Orbit & Mouse Parallax
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

    // 13. Smooth Mechanical Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Lerping
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      if (!isDragging) {
        // Base Isometric Angle with Gentle Parallax Response
        rootGroup.rotation.y = -0.32 + mouseX * 0.6 + rotationVelocity.y;
        rootGroup.rotation.x = 0.16 + mouseY * 0.45 + rotationVelocity.x;
        rotationVelocity.x *= 0.94;
        rotationVelocity.y *= 0.94;
      }

      // Zero-Gravity Organic Floating
      rootGroup.position.y = Math.sin(elapsedTime * 1.3) * 0.09;

      // Mechanical Vault Rotations:
      // 1. Outer dial turns steadily clockwise
      dialOuterGroup.rotation.z = elapsedTime * 0.12;

      // 2. Middle dial turns counter-clockwise
      dialMidGroup.rotation.z = -elapsedTime * 0.18;

      // 3. Central wheel handle rotates with cadence
      wheelGroup.rotation.z = Math.sin(elapsedTime * 0.6) * 0.35;

      // 4. Inner crystal counter-spins & pulses
      coreCrystal.rotation.x = -elapsedTime * 0.5;
      coreCrystal.rotation.y = elapsedTime * 0.7;
      const crystalPulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.06;
      coreCrystal.scale.set(crystalPulse, crystalPulse, crystalPulse);

      // 5. Verification rail satellite turns
      rail.rotation.z = elapsedTime * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // 14. Cleanup on Unmount
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
      outerBezelGeo.dispose();
      innerLipGeo.dispose();
      backplateGeo.dispose();
      boltGeo.dispose();
      boltHeadGeo.dispose();
      dialRingGeo.dispose();
      notchGeo.dispose();
      midRingGeo.dispose();
      circuitRingGeo.dispose();
      hubGeo.dispose();
      spokeGeo.dispose();
      handleGripGeo.dispose();
      handleSphereGeo.dispose();
      coreCrystalGeo.dispose();
      apertureRingGeo.dispose();
      pistonGeo.dispose();
      railGeo.dispose();
      satGeo.dispose();

      darkTitaniumMat.dispose();
      polishedChromeMat.dispose();
      deepSteelMat.dispose();
      cyanEmissiveMat.dispose();
      coreCrystalMat.dispose();
      railMat.dispose();

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
        title="Midnight Cryptographic Vault: Drag to rotate"
      />

      {/* Atmospheric Cyan / Royal Blue Back-Glow (Direct Match to Reference Image) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/15 to-transparent rounded-full blur-[95px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Floating Minimalist Vault Status Badge */}
      <div
        className={`absolute bottom-3 right-6 z-20 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/75 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-200 font-medium">MIDNIGHT SHIELDED VAULT</span>
          <span className="text-zinc-600">/</span>
          <span className="text-cyan-400">0xDARKPOOL</span>
        </div>
      </div>
    </div>
  );
}
