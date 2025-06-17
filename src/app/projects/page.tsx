"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  Github,
  Mail,
  ArrowLeft,
  ExternalLink,
  Home,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import EnhancedProceduralPlanet from "@/components/EnhancedProceduralPlanet";

type PlanetType = "exotic" | "terrestrial" | "gas-giant" | "moon";

type Project = {
  id: string;
  name: string;
  url: string;
  description: string;
  longDescription: string;
  status: string;
  planetType: PlanetType;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  size: number;
  color: string;
  secondaryColor: string;
  tertiaryColor: string;
  hasRings: boolean;
  hasAtmosphere: boolean;
  tech: string[];
  stats: Record<string, string>;
  year: string;
};

const projects: Project[] = [
  {
    id: "paradigm",
    name: "Paradigm",
    url: "#",
    description: "AI video analysis platform",
    longDescription:
      "AI video analysis platform for sales teams. Tracks sentiment, AI chapters, AI note taking for videos and AI analyzing tools for videos in general.",
    status: "In Development",
    planetType: "exotic" as const,
    orbitRadius: 30,
    orbitSpeed: 0.032,
    startAngle: Math.PI * 1.2,
    size: 1.3,
    color: "#673ab7",
    secondaryColor: "#9c27b0",
    tertiaryColor: "#ba68c8",
    hasRings: true,
    hasAtmosphere: false,
    tech: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "TailwindCSS",
      "Radix UI",
      "Framer Motion",
      "Chart.js",
      "Recharts",
      "React Hook Form",
      "Lucide React",
      "FastAPI",
      "Python 3.9+",
      "Uvicorn",
      "Pydantic",
      "OpenAI",
      "Redis",
      "Supabase",
      "Turborepo",
      "pnpm",
      "Poetry",
      "ESLint",
      "Prettier",
      "Mintlify",
      "Jupyter Notebook",
      "Seaborn",
    ],
    stats: {
      concepts: "50+",
      prototypes: "12",
      patents: "3",
    },
    year: "2024",
  },
  {
    id: "dxb-hoops",
    name: "DXB Hoops",
    url: "https://dxbhoops.com",
    description: "DXB basketball tournaments",
    longDescription:
      "A comprehensive sports community platform that revolutionized how basketball players connect in Dubai. Built with modern React architecture and real-time WebSocket connections for instant messaging.",
    status: "Live",
    planetType: "terrestrial" as const,
    orbitRadius: 12,
    orbitSpeed: 0.08,
    startAngle: 0,
    size: 1.2,
    color: "#2196f3",
    secondaryColor: "#1976d2",
    tertiaryColor: "#bbdefb",
    hasRings: false,
    hasAtmosphere: true,
    tech: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Radix UI",
      "Tremor",
      "Prisma ORM",
      "Supabase",
      "Vercel Postgres",
      "NextAuth.js",
      "Vercel",
      "Resend",
    ],
    stats: {
      athletes: "100+",
      matches: "850+",
      uptime: "99.9%",
    },
    year: "2025",
  },
  {
    id: "time-to-copy",
    name: "Time to Copy",
    url: "https://timetocopy.vercel.app",
    description: "Get it because it copied the thing up",
    longDescription:
      "A sophisticated productivity application that transforms how users manage digital content. Features include intelligent text categorization and cross-device synchronization.",
    status: "Live",
    planetType: "terrestrial" as const,
    orbitRadius: 24,
    orbitSpeed: 0.04,
    startAngle: Math.PI * 0.8,
    size: 1.2,
    color: "#2196f3",
    secondaryColor: "#1976d2",
    tertiaryColor: "#bbdefb",
    hasRings: false,
    hasAtmosphere: true,
    tech: [
      "Next.js 15",
      "TypeScript",
      "SCSS/Sass",
      "ESLint",
      "Turbo",
      "Vercel",
      "SWC",
      "Next.js 15 API Routes",
      "Cloudinary",
    ],
    stats: {
      saves: "100K+",
      efficiency: "+45%",
      platforms: "5",
    },
    year: "2024",
  },
  {
    id: "examvault",
    name: "ExamVault",
    url: "https://examvault.app",
    description: "AI-powered study tool",
    longDescription:
      "An advanced educational technology platform leveraging artificial intelligence to personalize learning experiences. Features include AI flashcards, similarity searches and progress trackers.",
    status: "Live",
    planetType: "gas-giant" as const,
    orbitRadius: 18,
    orbitSpeed: 0.06,
    startAngle: Math.PI * 0.4,
    size: 1.4,
    color: "#2e7d32",
    secondaryColor: "#4caf50",
    tertiaryColor: "#81c784",
    hasRings: false,
    hasAtmosphere: true,
    tech: [
      "Next.js 15",
      "Supabase",
      "Trigger.dev",
      "Upstash",
      "GCP Vision",
      "OpenAI",
      "Sentry",
    ],
    stats: {
      questions: "50K+",
      accuracy: "94%",
      features: "AI-powered",
    },
    year: "2024",
  },
  {
    id: "domaindle",
    name: "Domaindle",
    url: "https://domaindle.vercel.app",
    description: "all of the Dle's basically",
    longDescription:
      "This was literally the first thing I ever made. Every morning at school, our teacher would put up games like Wordle and we'd all get stuck trying to find similar games to play. I got tired of the hunt, so one day I just decided to build a simple hub to make life easier for everyone.",
    status: "Live",
    planetType: "moon" as const,
    orbitRadius: 9,
    orbitSpeed: 0.1,
    startAngle: Math.PI * 1.6,
    size: 1.0,
    color: "#757575",
    secondaryColor: "#616161",
    tertiaryColor: "#bdbdbd",
    hasRings: false,
    hasAtmosphere: false,
    tech: ["Next.js 15", "TypeScript", "Vercel", "CSS Animations", "PWA"],
    stats: {
      players: "5K+",
      puzzles: "365",
      streak: "156 days",
    },
    year: "2024",
  },
];

// Enhanced Central Sun Component with realistic Lava shader
function Sun({ onClick }: { onClick?: () => void }) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const [hovered, setHovered] = useState(false);

  // Lava shader
  const lavaVertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const lavaFragmentShader = `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Noise function
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Smooth noise
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Fractal noise
    float fractalNoise(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(st * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      
      return value;
    }
    
    void main() {
      vec2 st = vUv * 8.0;
      
      // Create flowing lava patterns
      vec2 flow1 = vec2(time * 0.1, time * 0.05);
      vec2 flow2 = vec2(-time * 0.08, time * 0.12);
      
      float noise1 = fractalNoise(st + flow1);
      float noise2 = fractalNoise(st * 1.5 + flow2);
      float noise3 = fractalNoise(st * 0.5 + flow1 * 0.5);
      
      // Combine noises to create lava texture
      float combined = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Create temperature-based color mapping
      float temperature = combined + 0.3;
      
      vec3 coolLava = vec3(0.2, 0.05, 0.05);      // Dark red/black
      vec3 warmLava = vec3(0.8, 0.2, 0.1);        // Dark orange-red
      vec3 hotLava = vec3(1.0, 0.4, 0.1);         // Bright orange
      vec3 moltenLava = vec3(1.0, 0.8, 0.3);      // Yellow-orange
      vec3 plasma = vec3(1.0, 1.0, 0.8);          // White-yellow
      
      vec3 color;
      if (temperature < 0.2) {
        color = mix(coolLava, warmLava, temperature * 5.0);
      } else if (temperature < 0.4) {
        color = mix(warmLava, hotLava, (temperature - 0.2) * 5.0);
      } else if (temperature < 0.6) {
        color = mix(hotLava, moltenLava, (temperature - 0.4) * 5.0);
      } else if (temperature < 0.8) {
        color = mix(moltenLava, plasma, (temperature - 0.6) * 5.0);
      } else {
        color = plasma;
      }
      
      // Add glow effect
      float glow = pow(temperature, 2.0) * intensity;
      color += vec3(glow * 0.3, glow * 0.1, 0.0);
      
      // Add surface bubbling effect
      float bubble = sin(time * 3.0 + noise1 * 10.0) * 0.1 + 0.9;
      color *= bubble;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.intensity.value = hovered ? 1.5 : 1.0;
    }
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
      sunRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Main Lava Sun with Shader */}
      <Sphere
        ref={sunRef}
        args={[2, 128, 128]}
        position={[0, 0, 0]}
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
        <shaderMaterial
          ref={materialRef}
          vertexShader={lavaVertexShader}
          fragmentShader={lavaFragmentShader}
          uniforms={{
            time: { value: 0 },
            intensity: { value: 1.0 },
          }}
        />
      </Sphere>

      {/* Heat Shimmer Layer */}
      <Sphere args={[2.3, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={hovered ? 0.3 : 0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer Heat Distortion */}
      <Sphere args={[2.6, 24, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ffaa44"
          transparent
          opacity={hovered ? 0.2 : 0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Corona Effect */}
      <Sphere args={[3.0, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ffdd88"
          transparent
          opacity={hovered ? 0.15 : 0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Hover indicator */}
      {hovered && (
        <Sphere args={[3.3, 16, 16]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </Sphere>
      )}

      {/* Enhanced Lighting for Lava */}
      <pointLight
        position={[0, 0, 0]}
        intensity={4.0}
        color="#ff4500"
        distance={120}
        decay={1}
      />

      <pointLight
        position={[0, 0, 0]}
        intensity={2.5}
        color="#ffaa00"
        distance={150}
        decay={1.5}
      />

      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        color="#ffdd44"
        distance={200}
        decay={2}
      />
    </group>
  );
}

// Enhanced Planet Component with Better Materials
function Planet({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const [, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
    const currentTime = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Orbital motion with starting angle offset
      const angle = currentTime * project.orbitSpeed + project.startAngle;
      groupRef.current.position.x = Math.cos(angle) * project.orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * project.orbitRadius;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle Orbit Trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry
          args={[project.orbitRadius - 0.01, project.orbitRadius + 0.01, 128]}
        />
        <meshBasicMaterial
          color="#444444"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Enhanced Procedural Planet */}
      <EnhancedProceduralPlanet
        radius={project.size}
        resolution={96}
        planetType={project.planetType}
        seed={project.id
          .split("")
          .reduce((a: number, b: string) => a + b.charCodeAt(0), 0)}
        position={[0, 0, 0]}
        onClick={onClick}
      >
        {/* Planet Rings (for gas giants and exotic) */}
        {project.hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[project.size * 1.3, project.size * 2.0, 64]} />
            <meshBasicMaterial
              color={project.secondaryColor}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Project Status Light */}
        <pointLight
          position={[0, project.size + 0.8, 0]}
          intensity={0.8}
          color={project.status === "Live" ? "#00ff00" : "#ffaa00"}
          distance={6}
        />
      </EnhancedProceduralPlanet>
    </group>
  );
}

// Enhanced BASSAM Constellation with connecting lines like real constellations
function ConstellationStars() {
  const groupRef = useRef<THREE.Group>(null!);
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
  });

  // Define star positions for each letter - stylish and flowing
  const starPositions = {
    // B letter - elegant curved style
    B: [
      [-10, 0, 0], // b1 - bottom left
      [-10, 1, 0], // b2 - middle left
      [-10, 2, 0], // b3 - top left
      [-9.3, 2.2, 0], // b4 - top curve
      [-8.8, 1.8, 0], // b5 - top right
      [-9.2, 1, 0], // b6 - middle curve
      [-8.7, 0.2, 0], // b7 - bottom right
      [-9.4, -0.1, 0], // b8 - bottom curve
    ],
    // A letter - elegant peak
    A: [
      [-6.5, 0, 0], // a1 - bottom left
      [-6.2, 0.8, 0], // a2 - left mid
      [-5.8, 1.6, 0], // a3 - left upper
      [-5.5, 2.3, 0], // a4 - peak
      [-5.2, 1.6, 0], // a5 - right upper
      [-4.8, 0.8, 0], // a6 - right mid
      [-4.5, 0, 0], // a7 - bottom right
      [-5.5, 1.2, 0], // a8 - crossbar left
      [-5.0, 1.2, 0], // a9 - crossbar right
    ],
    // S letter (first) - flowing curves
    S1: [
      [-2.8, 0, 0], // s1 - bottom left
      [-2.2, -0.1, 0], // s2 - bottom curve
      [-1.6, 0.1, 0], // s3 - bottom right
      [-1.8, 0.6, 0], // s4 - right mid
      [-2.2, 1, 0], // s5 - center
      [-2.6, 1.4, 0], // s6 - left mid
      [-2.8, 2, 0], // s7 - top left
      [-2.2, 2.1, 0], // s8 - top curve
      [-1.6, 1.9, 0], // s9 - top right
    ],
    // S letter (second) - flowing curves
    S2: [
      [0.7, 0, 0], // s2_1 - bottom left
      [1.3, -0.1, 0], // s2_2 - bottom curve
      [1.9, 0.1, 0], // s2_3 - bottom right
      [1.7, 0.6, 0], // s2_4 - right mid
      [1.3, 1, 0], // s2_5 - center
      [0.9, 1.4, 0], // s2_6 - left mid
      [0.7, 2, 0], // s2_7 - top left
      [1.3, 2.1, 0], // s2_8 - top curve
      [1.9, 1.9, 0], // s2_9 - top right
    ],
    // A letter (second) - elegant peak
    A2: [
      [4.0, 0, 0], // a2_1 - bottom left
      [4.3, 0.8, 0], // a2_2 - left mid
      [4.7, 1.6, 0], // a2_3 - left upper
      [5.0, 2.3, 0], // a2_4 - peak
      [5.3, 1.6, 0], // a2_5 - right upper
      [5.7, 0.8, 0], // a2_6 - right mid
      [6.0, 0, 0], // a2_7 - bottom right
      [4.5, 1.2, 0], // a2_8 - crossbar left
      [5.5, 1.2, 0], // a2_9 - crossbar right
    ],
    // M letter - flowing peaks
    M: [
      [8.8, 0, 0], // m1 - bottom left
      [8.9, 1, 0], // m2 - left mid
      [9.0, 2, 0], // m3 - left peak
      [9.5, 1.8, 0], // m4 - left valley
      [10.0, 2.2, 0], // m5 - center peak
      [10.5, 1.8, 0], // m6 - right valley
      [11.0, 2, 0], // m7 - right peak
      [11.1, 1, 0], // m8 - right mid
      [11.2, 0, 0], // m9 - bottom right
    ],
  };

  // Create connecting lines for each letter - flowing and elegant
  const createConstellationLines = () => {
    const linePoints = [];

    // B letter connections - elegant curves
    linePoints.push(
      // Main vertical spine
      ...starPositions.B[0],
      ...starPositions.B[1],
      ...starPositions.B[1],
      ...starPositions.B[2],
      // Top curve
      ...starPositions.B[2],
      ...starPositions.B[3],
      ...starPositions.B[3],
      ...starPositions.B[4],
      ...starPositions.B[4],
      ...starPositions.B[5],
      // Middle connection
      ...starPositions.B[1],
      ...starPositions.B[5],
      // Bottom curve
      ...starPositions.B[5],
      ...starPositions.B[6],
      ...starPositions.B[6],
      ...starPositions.B[7],
      ...starPositions.B[0],
      ...starPositions.B[7]
    );

    // A letter connections - flowing triangle
    linePoints.push(
      // Left side flow
      ...starPositions.A[0],
      ...starPositions.A[1],
      ...starPositions.A[1],
      ...starPositions.A[2],
      ...starPositions.A[2],
      ...starPositions.A[3],
      // Right side flow
      ...starPositions.A[3],
      ...starPositions.A[4],
      ...starPositions.A[4],
      ...starPositions.A[5],
      ...starPositions.A[5],
      ...starPositions.A[6],
      // Elegant crossbar
      ...starPositions.A[7],
      ...starPositions.A[8]
    );

    // S1 letter connections - smooth curves
    linePoints.push(
      // Bottom curve
      ...starPositions.S1[0],
      ...starPositions.S1[1],
      ...starPositions.S1[1],
      ...starPositions.S1[2],
      // Rising curve
      ...starPositions.S1[2],
      ...starPositions.S1[3],
      ...starPositions.S1[3],
      ...starPositions.S1[4],
      // Middle transition
      ...starPositions.S1[4],
      ...starPositions.S1[5],
      // Top curve
      ...starPositions.S1[5],
      ...starPositions.S1[6],
      ...starPositions.S1[6],
      ...starPositions.S1[7],
      ...starPositions.S1[7],
      ...starPositions.S1[8]
    );

    // S2 letter connections - smooth curves
    linePoints.push(
      // Bottom curve
      ...starPositions.S2[0],
      ...starPositions.S2[1],
      ...starPositions.S2[1],
      ...starPositions.S2[2],
      // Rising curve
      ...starPositions.S2[2],
      ...starPositions.S2[3],
      ...starPositions.S2[3],
      ...starPositions.S2[4],
      // Middle transition
      ...starPositions.S2[4],
      ...starPositions.S2[5],
      // Top curve
      ...starPositions.S2[5],
      ...starPositions.S2[6],
      ...starPositions.S2[6],
      ...starPositions.S2[7],
      ...starPositions.S2[7],
      ...starPositions.S2[8]
    );

    // A2 letter connections - flowing triangle
    linePoints.push(
      // Left side flow
      ...starPositions.A2[0],
      ...starPositions.A2[1],
      ...starPositions.A2[1],
      ...starPositions.A2[2],
      ...starPositions.A2[2],
      ...starPositions.A2[3],
      // Right side flow
      ...starPositions.A2[3],
      ...starPositions.A2[4],
      ...starPositions.A2[4],
      ...starPositions.A2[5],
      ...starPositions.A2[5],
      ...starPositions.A2[6],
      // Elegant crossbar
      ...starPositions.A2[7],
      ...starPositions.A2[8]
    );

    // M letter connections - flowing peaks
    linePoints.push(
      // Left side flow
      ...starPositions.M[0],
      ...starPositions.M[1],
      ...starPositions.M[1],
      ...starPositions.M[2],
      // Left peak flow
      ...starPositions.M[2],
      ...starPositions.M[3],
      ...starPositions.M[3],
      ...starPositions.M[4],
      // Right peak flow
      ...starPositions.M[4],
      ...starPositions.M[5],
      ...starPositions.M[5],
      ...starPositions.M[6],
      // Right side flow
      ...starPositions.M[6],
      ...starPositions.M[7],
      ...starPositions.M[7],
      ...starPositions.M[8]
    );

    return new Float32Array(linePoints);
  };

  // Create individual star meshes
  const createStar = (x: number, y: number, z: number, key: string) => (
    <mesh key={key} position={[x, y, z]}>
      {/* Tiny bright star - same size as background stars */}
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={1.0} />

      {/* Very small glow */}
      <mesh>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshBasicMaterial color="#e3f2fd" transparent opacity={0.4} />
      </mesh>

      {/* Point light for brightness */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.8}
        color="#ffffff"
        distance={2}
      />
    </mesh>
  );

  return (
    <group
      ref={groupRef}
      position={[0, 10, -18]}
      rotation={[0.1, 0, 0]}
      scale={[2, 2, 2]}
    >
      {/* Render all stars */}
      {Object.entries(starPositions).map(([letter, positions]) =>
        positions.map((pos, index) =>
          createStar(pos[0], pos[1], pos[2], `${letter}-${index}`)
        )
      )}

      {/* Constellation connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[createConstellationLines(), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.8}
          linewidth={3}
        />
      </lineSegments>

      {/* Additional ambient lighting for the constellation */}
      <pointLight
        position={[0, 0, 2]}
        intensity={0.4}
        color="#e3f2fd"
        distance={40}
      />
    </group>
  );
}

// Enhanced Background Star Field
function StarField() {
  return (
    <>
      {/* Reduced density main star field */}
      <Stars radius={500} depth={200} count={1500} factor={2} />

      {/* Medium distance stars */}
      <Stars radius={300} depth={150} count={800} factor={1.5} />

      {/* Closer subtle stars */}
      <Stars radius={200} depth={100} count={600} factor={1} />

      {/* Very distant dim stars */}
      <Stars radius={1000} depth={400} count={2000} factor={0.8} />

      {/* Minimal sparkle layer */}
      <Stars radius={150} depth={80} count={300} factor={1.2} />
    </>
  );
}

// Main Solar System Scene
function SolarSystem({
  projects,
  onPlanetClick,
}: {
  projects: Project[];
  onPlanetClick: (project: Project) => void;
}) {
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.15} color="#ffffff" />

      {/* Central Sun */}
      <Sun />

      {/* Planets */}
      {projects.map((project: Project) => (
        <Planet
          key={project.id}
          project={project}
          onClick={() => onPlanetClick(project)}
        />
      ))}

      {/* Enhanced Star Fields */}
      <StarField />

      {/* BASSAM constellation */}
      <ConstellationStars />

      {/* Space environment */}
      <Environment preset="night" />

      {/* Fog for depth */}
      <fog attach="fog" args={["#000000", 50, 200]} />
    </>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePlanetClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <Home size={20} />
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-6">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="text-sm">Guide</span>
          </button>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="/blog" className="hover:text-white transition">
              Blog
            </Link>
            <a
              href="https://www.linkedin.com/in/bassam-assaf-b2611b33b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Expandable Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-80 bg-black/80 backdrop-blur-xl border-r border-white/10 z-30 p-6 overflow-y-auto"
          >
            {/* Close button - now visible on all screen sizes */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <div className="mt-16 lg:mt-8">
              <h3 className="text-xl font-semibold text-[#B3B8FF] mb-6">
                Planet Guide
              </h3>
              <div className="space-y-4 text-sm">
                <motion.div
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Central Sun</div>
                    <div className="text-gray-400">Portfolio Hub</div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Paradigm</div>
                    <div className="text-gray-400">AI Video Platform</div>
                    <div className="text-xs text-purple-400">
                      In Development
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">DXB Hoops</div>
                    <div className="text-gray-400">Sports Platform</div>
                    <div className="text-xs text-green-400">
                      Live • 100+ athletes
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">ExamVault</div>
                    <div className="text-gray-400">AI Study Tool</div>
                    <div className="text-xs text-green-400">Live</div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Time to Copy</div>
                    <div className="text-gray-400">Productivity App</div>
                    <div className="text-xs text-green-400">
                      Live • 100K+ saves
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Domaindle</div>
                    <div className="text-gray-400">Game Hub</div>
                    <div className="text-xs text-green-400">
                      Live • 5K+ players
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-xs text-gray-500 space-y-2">
                  <p>🌌 BASSAM constellation visible above</p>
                  <p>🖱️ Click planets to explore</p>
                  <p>🎮 Drag to orbit • Scroll to zoom</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar Toggle (always visible on desktop) */}
      <div className="hidden lg:block">
        <button
          onClick={toggleSidebar}
          className="fixed top-24 left-6 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Instructions - moved to bottom right */}
      <div className="absolute bottom-6 right-6 z-20 text-gray-400 text-sm lg:hidden">
        <p>Tap menu for planet guide</p>
      </div>

      {/* 3D Solar System */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
          <Suspense fallback={null}>
            <SolarSystem
              projects={projects}
              onPlanetClick={handlePlanetClick}
            />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleBack}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={handleBack}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-medium text-white mb-4">
                {selectedProject.name}
              </h2>
              <p className="text-gray-300 mb-6">
                {selectedProject.longDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {Object.entries(selectedProject.stats).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">{key}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B3B8FF]/10 hover:bg-[#B3B8FF]/20 text-[#B3B8FF] rounded-full transition-all duration-300"
              >
                <ExternalLink size={16} />
                <span>Visit Project</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
