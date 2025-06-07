"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  Github,
  Mail,
  Rocket,
  ArrowLeft,
  ExternalLink,
  Info,
  Sun as SunIcon,
} from "lucide-react";
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
    color: "#673ab7", // Deep purple
    secondaryColor: "#9c27b0", // Purple formations
    tertiaryColor: "#ba68c8", // Light purple glow
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
    color: "#2196f3", // Blue
    secondaryColor: "#1976d2", // Darker blue terrain
    tertiaryColor: "#bbdefb", // Light blue atmosphere
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
      users: "2.5K+",
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
    color: "#2196f3", // Blue (same as DXB Hoops)
    secondaryColor: "#1976d2", // Darker blue terrain
    tertiaryColor: "#bbdefb", // Light blue atmosphere
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
    color: "#2e7d32", // Deep green gas
    secondaryColor: "#4caf50", // Lighter green bands
    tertiaryColor: "#81c784", // Light green atmosphere
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
      users: "15K+",
      questions: "50K+",
      accuracy: "94%",
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
    color: "#757575", // Gray
    secondaryColor: "#616161", // Darker gray craters
    tertiaryColor: "#bdbdbd", // Light gray highlights
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
  onSunClick,
}: {
  projects: Project[];
  onPlanetClick: (project: Project) => void;
  onSunClick: () => void;
}) {
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.15} color="#ffffff" />

      {/* Central Sun */}
      <Sun onClick={onSunClick} />

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

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<
    (typeof projects)[0] | null
  >(null);
  const [mounted, setMounted] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlanetClick = (project: (typeof projects)[0]) => {
    setSelectedPlanet(project);
  };

  const handleBack = () => {
    setSelectedPlanet(null);
  };

  const handleSunClick = () => {
    // Navigate to about page
    window.location.href = "/about";
  };

  if (!mounted) return null;

  return (
    <>
      {/* Global CSS for gradient animation */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Top Notification Bar */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              className="fixed top-0 left-0 right-0 z-[110] bg-gradient-to-r from-yellow-900/80 to-orange-900/80 backdrop-blur-md border-b border-yellow-700/50"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-2 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Info size={16} className="text-yellow-300 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-yellow-100">
                    <span className="hidden sm:inline">
                      For something more serious,{" "}
                    </span>
                    <span className="font-medium text-yellow-200">
                      click on the Sun ☀️
                    </span>
                    <span className="hidden sm:inline"> to learn about me</span>
                  </p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-yellow-300 hover:text-yellow-100 transition-colors p-1"
                  aria-label="Close notification"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Space Background */}
        <div className="fixed inset-0">
          {/* Subtle space gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 30% 70%, rgba(15, 15, 45, 0.4) 0%, transparent 70%),
                radial-gradient(ellipse 100% 60% at 70% 30%, rgba(25, 25, 80, 0.3) 0%, transparent 60%),
                linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)
              `,
            }}
          />

          {/* Three.js Solar System */}
          <div className="absolute inset-0 z-10">
            <Canvas
              camera={{ position: [0, 15, 30], fov: 60 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "none",
              }}
              onCreated={(state) => {
                state.gl.domElement.style.outline = "none";
              }}
            >
              <Suspense fallback={null}>
                <SolarSystem
                  projects={projects}
                  onPlanetClick={handlePlanetClick}
                  onSunClick={handleSunClick}
                />
                <OrbitControls
                  makeDefault
                  enableZoom={true}
                  enablePan={true}
                  enableRotate={true}
                  enableDamping={true}
                  dampingFactor={0.05}
                  minDistance={8}
                  maxDistance={100}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI - Math.PI / 6}
                  autoRotate={false}
                  zoomSpeed={1.0}
                  panSpeed={1.0}
                  rotateSpeed={0.8}
                  target={[0, 0, 0]}
                  screenSpacePanning={false}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* Navigation */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 sm:py-6 pointer-events-none transition-all duration-300 ${
            showNotification ? "mt-10 sm:mt-12" : ""
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* No return button here anymore */}
          </div>
        </motion.nav>

        {/* Top Social Links - Adjusted for notification */}
        <motion.div
          className={`fixed top-4 sm:top-8 right-4 sm:right-8 z-50 pointer-events-none transition-all duration-300 ${
            showNotification ? "mt-10 sm:mt-12" : ""
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 bg-black/20 backdrop-blur-xl rounded-full border border-gray-700/50 pointer-events-auto">
            <motion.a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 bg-gray-900/30"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={14} className="sm:w-4 sm:h-4" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/bassam-assaf-b2611b33b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 bg-gray-900/30"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width={14}
                height={14}
                className="sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:bassamassaf32@gmail.com"
              className="p-2 rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 bg-gray-900/30"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={14} className="sm:w-4 sm:h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Side Planet Info Panel - Fully Responsive */}
        <motion.div
          className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 w-72 sm:w-80 lg:w-96 pointer-events-auto hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-light text-white mb-4 tracking-wide">
              Exploration Guide
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {/* Add Sun/About Me as first item */}
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-600/30 hover:border-yellow-500/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={handleSunClick}
              >
                <div className="w-4 h-4 rounded-full flex-shrink-0 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate flex items-center gap-2">
                    <SunIcon size={14} />
                    About Me
                  </div>
                  <div className="text-xs text-yellow-200/80 truncate">
                    Learn more about my background
                  </div>
                </div>
              </motion.div>

              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-600/30 hover:border-gray-500/50 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handlePlanetClick(project)}
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {project.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {project.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-700/50">
              <p className="text-xs text-gray-400 text-center">
                Click any item above to explore details
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Bottom Sheet Navigation */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden pointer-events-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-black/90 backdrop-blur-xl border-t border-gray-700/50 p-4">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-light text-white mb-4 text-center tracking-wide">
                Explore Projects
              </h3>

              {/* Mobile grid layout */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Sun/About Me */}
                <motion.div
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border border-yellow-600/30 active:scale-95 transition-transform cursor-pointer"
                  onClick={handleSunClick}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg flex items-center justify-center">
                    <SunIcon size={12} className="text-black" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">About</div>
                    <div className="text-xs text-yellow-200/80">Learn more</div>
                  </div>
                </motion.div>

                {/* Projects - First 3 visible, rest in "More" */}
                {projects.slice(0, 3).map((project) => (
                  <motion.div
                    key={project.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800/40 border border-gray-600/30 active:scale-95 transition-transform cursor-pointer"
                    onClick={() => handlePlanetClick(project)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="w-6 h-6 rounded-full shadow-lg"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="text-center">
                      <div className="text-sm font-medium text-white truncate max-w-[80px]">
                        {project.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[80px]">
                        {project.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show remaining projects */}
              {projects.length > 3 && (
                <div className="grid grid-cols-2 gap-3">
                  {projects.slice(3).map((project) => (
                    <motion.div
                      key={project.id}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800/40 border border-gray-600/30 active:scale-95 transition-transform cursor-pointer"
                      onClick={() => handlePlanetClick(project)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-lg"
                        style={{ backgroundColor: project.color }}
                      />
                      <div className="text-center">
                        <div className="text-sm font-medium text-white truncate max-w-[80px]">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-[80px]">
                          {project.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <p className="text-xs text-gray-400 text-center">
                  Tap any item to explore details
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!selectedPlanet ? (
            // Solar System View
            <motion.div
              key="solar-system"
              className={`relative min-h-screen pt-16 sm:pt-24 px-4 sm:px-8 pointer-events-none transition-all duration-300 pb-0 md:pb-0 ${
                showNotification ? "mt-10 sm:mt-12" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[80vh] md:h-[80vh] max-w-6xl mx-auto flex items-center justify-center pb-32 md:pb-0">
                {/* Enhanced Instructions - Mobile Responsive */}
                <motion.div
                  className="absolute bottom-4 md:bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs sm:text-sm z-20 pointer-events-auto px-4 max-w-full mb-20 md:mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <div className="bg-black/60 backdrop-blur-md px-4 sm:px-6 py-3 rounded-lg border border-gray-600/50 max-w-2xl mx-auto">
                    <p className="mb-1 text-white text-xs sm:text-sm">
                      ✨ <strong>Hover planets</strong> to see them glow • 🖱️{" "}
                      <strong>Click planets</strong> for details
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">
                      🖱️ Drag to rotate • 🔍 Scroll to zoom • Auto-rotation
                      enabled
                    </p>
                    <p className="text-xs text-gray-400 sm:hidden">
                      Touch to rotate • Pinch to zoom • Use bottom menu
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // Enhanced Planet Detail View - Fully Responsive
            <motion.div
              key="planet-detail"
              className="fixed left-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 z-40 overflow-y-auto"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 opacity-100"
                  style={{
                    background: `conic-gradient(from 0deg, #ff6b35, #f9ca24, #6c5ce7, #a29bfe, #fd79a8, #e84393, #00b894, #00cec9, #74b9ff, #0984e3, #ff6b35)`,
                    animation: "spin 4s linear infinite",
                  }}
                />
              </div>

              {/* Main content container with much darker gray styling */}
              <div className="relative m-2 h-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                {/* Inner border for clean edges */}
                <div className="absolute inset-1 bg-gray-900 rounded-lg"></div>

                <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col text-gray-100">
                  {/* Enhanced Header - Responsive */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 shadow-lg border-2"
                        style={{
                          backgroundColor: selectedPlanet.color,
                          borderColor: selectedPlanet.secondaryColor,
                          boxShadow: `0 0 15px ${selectedPlanet.color}40`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h1 className="text-xl sm:text-2xl font-thin text-white tracking-wide mb-1">
                          {selectedPlanet.name}
                        </h1>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-300 mb-2">
                          {selectedPlanet.name === "ExamVault" ? (
                            <span className="text-blue-300 font-medium">
                              Co-founder
                            </span>
                          ) : selectedPlanet.name === "Paradigm" ? (
                            <span className="text-blue-300 font-medium">
                              Co-founder
                            </span>
                          ) : (
                            <span className="text-green-300 font-medium">
                              Founder
                            </span>
                          )}
                          <span>•</span>
                          <span>{selectedPlanet.year}</span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            selectedPlanet.status === "Live"
                              ? "bg-green-800 text-green-200 border-green-600"
                              : selectedPlanet.name === "Paradigm"
                              ? "bg-purple-800 text-purple-200 border-purple-600"
                              : "bg-amber-800 text-amber-200 border-amber-600"
                          }`}
                        >
                          {selectedPlanet.name === "Paradigm"
                            ? "Development"
                            : selectedPlanet.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed font-light mb-3">
                      {selectedPlanet.longDescription}
                    </p>
                  </div>

                  {/* Technology Stack - Responsive Grid */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {selectedPlanet.tech.map((tech, i) => (
                        <motion.div
                          key={i}
                          className="px-2 py-1 rounded-lg text-xs border text-gray-200 font-mono text-center relative overflow-hidden group bg-gray-800"
                          style={{
                            borderColor: `${selectedPlanet.color}60`,
                          }}
                          whileHover={{
                            scale: 1.02,
                            borderColor: selectedPlanet.color + "80",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="relative z-10">{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons - Responsive */}
                  <div className="mt-auto space-y-2">
                    <motion.button
                      onClick={handleBack}
                      className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl font-medium text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 border border-gray-600 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft size={16} />
                      <span>Return to System</span>
                    </motion.button>

                    {selectedPlanet.url !== "#" && (
                      <motion.a
                        href={selectedPlanet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl font-medium text-white shadow-2xl text-sm relative overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${selectedPlanet.color}, ${selectedPlanet.secondaryColor})`,
                        }}
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Rocket size={16} className="relative z-10" />
                        <span className="relative z-10">Explore Project</span>
                        <ExternalLink size={14} className="relative z-10" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
