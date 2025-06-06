"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simplified noise function for terrain generation
const noise = (x: number, y: number, z: number): number => {
  return (
    Math.sin(x * 8.3) * Math.cos(y * 7.1) * Math.sin(z * 9.2) * 0.1 +
    Math.sin(x * 4.7) * Math.cos(y * 5.3) * Math.sin(z * 6.1) * 0.2 +
    Math.sin(x * 2.1) * Math.cos(y * 3.7) * Math.sin(z * 4.9) * 0.4
  );
};

interface ProceduralPlanetProps {
  radius: number;
  resolution: number;
  planetType: "terrestrial" | "gas-giant" | "moon" | "exotic";
  seed: number;
  position: [number, number, number];
  onClick?: () => void;
  children?: React.ReactNode;
}

export function ProceduralPlanet({
  radius,
  resolution = 64,
  planetType,
  seed,
  position,
  onClick,
  children,
}: ProceduralPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Generate procedural geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(radius, resolution, resolution);
    const positionAttribute = geometry.getAttribute("position");
    const vertices = positionAttribute.array as Float32Array;

    // Apply noise-based displacement
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];

      // Normalize to get sphere surface point
      const length = Math.sqrt(x * x + y * y + z * z);
      const nx = x / length;
      const ny = y / length;
      const nz = z / length;

      // Apply noise based on planet type
      let noiseValue = 0;
      let displacement = 0;

      switch (planetType) {
        case "terrestrial":
          // Continent-like features
          noiseValue = noise(nx * 4 + seed, ny * 4 + seed, nz * 4 + seed);
          noiseValue +=
            noise(nx * 8 + seed, ny * 8 + seed, nz * 8 + seed) * 0.5;
          noiseValue +=
            noise(nx * 16 + seed, ny * 16 + seed, nz * 16 + seed) * 0.25;
          displacement = Math.max(0, noiseValue) * radius * 0.15;
          break;

        case "gas-giant":
          // Smooth atmospheric bands
          noiseValue = Math.sin(ny * 12 + seed) * 0.02;
          noiseValue +=
            noise(nx * 2 + seed, ny * 2 + seed, nz * 2 + seed) * 0.01;
          displacement = noiseValue * radius;
          break;

        case "moon":
          // Crater-like features
          const craterNoise = Math.abs(
            noise(nx * 6 + seed, ny * 6 + seed, nz * 6 + seed)
          );
          noiseValue = -craterNoise * craterNoise;
          noiseValue +=
            noise(nx * 12 + seed, ny * 12 + seed, nz * 12 + seed) * 0.1;
          displacement = noiseValue * radius * 0.08;
          break;

        case "exotic":
          // Crystal-like formations
          noiseValue = Math.abs(
            noise(nx * 10 + seed, ny * 10 + seed, nz * 10 + seed)
          );
          noiseValue +=
            Math.abs(noise(nx * 20 + seed, ny * 20 + seed, nz * 20 + seed)) *
            0.5;
          displacement = noiseValue * radius * 0.2;
          break;
      }

      // Apply displacement
      vertices[i] = nx * (radius + displacement);
      vertices[i + 1] = ny * (radius + displacement);
      vertices[i + 2] = nz * (radius + displacement);
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
  }, [radius, resolution, planetType, seed]);

  // Get material based on planet type
  const material = useMemo(() => {
    switch (planetType) {
      case "terrestrial":
        return new THREE.MeshStandardMaterial({
          color: "#4a5d23",
          roughness: 0.8,
          metalness: 0.1,
          map: createTerrainTexture(),
        });

      case "gas-giant":
        return new THREE.MeshStandardMaterial({
          color: "#d4a843",
          roughness: 0.3,
          metalness: 0.0,
          transparent: true,
          opacity: 0.9,
        });

      case "moon":
        return new THREE.MeshStandardMaterial({
          color: "#c0c0c0",
          roughness: 1.0,
          metalness: 0.0,
          bumpScale: 0.5,
        });

      case "exotic":
        return new THREE.MeshStandardMaterial({
          color: "#4b0082",
          roughness: 0.1,
          metalness: 0.8,
          emissive: "#2d1b5e",
          emissiveIntensity: 0.3,
        });

      default:
        return new THREE.MeshStandardMaterial({ color: "#888888" });
    }
  }, [planetType]);

  // Simple terrain texture generator
  function createTerrainTexture(): THREE.Texture {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;

    const imageData = context.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const idx = (i * size + j) * 4;
        const noiseVal = noise(i * 0.05, j * 0.05, seed) * 0.5 + 0.5;

        if (noiseVal > 0.6) {
          // Land - green/brown
          data[idx] = 100 + noiseVal * 50; // R
          data[idx + 1] = 150 + noiseVal * 50; // G
          data[idx + 2] = 50 + noiseVal * 30; // B
        } else {
          // Water - blue
          data[idx] = 30 + noiseVal * 50; // R
          data[idx + 1] = 80 + noiseVal * 50; // G
          data[idx + 2] = 200 + noiseVal * 55; // B
        }
        data[idx + 3] = 255; // A
      }
    }

    context.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "default";
        }
      }}
    >
      {/* Hover glow effect */}
      {hovered && (
        <mesh scale={[1.1, 1.1, 1.1]}>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      {children}
    </mesh>
  );
}

export default ProceduralPlanet;
