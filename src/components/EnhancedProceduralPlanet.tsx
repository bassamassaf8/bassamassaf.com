"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Import shaders
const vertexShader = `
uniform float uRadius;
uniform float uSeed;
uniform int uPlanetType;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vElevation;

float noise(vec3 p) {
    return sin(p.x * 8.3 + uSeed) * cos(p.y * 7.1 + uSeed) * sin(p.z * 9.2 + uSeed) * 0.1 +
           sin(p.x * 4.7 + uSeed) * cos(p.y * 5.3 + uSeed) * sin(p.z * 6.1 + uSeed) * 0.2 +
           sin(p.x * 2.1 + uSeed) * cos(p.y * 3.7 + uSeed) * sin(p.z * 4.9 + uSeed) * 0.4;
}

float ridgedNoise(vec3 p) {
    return 1.0 - abs(noise(p));
}

void main() {
    vUv = uv;
    
    vec3 pos = position;
    vec3 normalizedPos = normalize(pos);
    float displacement = 0.0;
    
    if (uPlanetType == 0) {
        // Terrestrial
        float continentNoise = noise(normalizedPos * 4.0);
        continentNoise += noise(normalizedPos * 8.0) * 0.5;
        continentNoise += noise(normalizedPos * 16.0) * 0.25;
        displacement = max(0.0, continentNoise) * uRadius * 0.15;
        
        float ridges = ridgedNoise(normalizedPos * 12.0) * 0.05;
        if (continentNoise > 0.2) {
            displacement += ridges * uRadius;
        }
    }
    else if (uPlanetType == 1) {
        // Gas giant
        displacement = sin(normalizedPos.y * 12.0 + uSeed + uTime * 0.5) * 0.02 * uRadius;
        displacement += noise(normalizedPos * 2.0) * 0.01 * uRadius;
    }
    else if (uPlanetType == 2) {
        // Moon
        float craterNoise = abs(noise(normalizedPos * 6.0));
        displacement = -craterNoise * craterNoise * uRadius * 0.08;
        displacement += noise(normalizedPos * 12.0) * 0.05 * uRadius;
    }
    else if (uPlanetType == 3) {
        // Exotic
        float crystalNoise = abs(noise(normalizedPos * 10.0));
        crystalNoise += abs(noise(normalizedPos * 20.0)) * 0.5;
        displacement = crystalNoise * uRadius * 0.2;
    }
    
    vElevation = displacement / uRadius;
    
    vec3 displacedPosition = pos + normalizedPos * displacement;
    
    vPosition = displacedPosition;
    vNormal = normalizedPos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
`;

const fragmentShader = `
uniform int uPlanetType;
uniform float uTime;
uniform float uSeed;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vElevation;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 4.1414)) + uSeed) * 43758.5453);
}

vec3 getTerrestrialColor() {
    float elevation = vElevation;
    vec3 color;
    
    if (elevation < 0.05) {
        color = mix(vec3(0.1, 0.3, 0.7), vec3(0.2, 0.5, 0.9), elevation * 20.0);
    } else if (elevation < 0.08) {
        color = vec3(0.8, 0.7, 0.4);
    } else if (elevation < 0.12) {
        color = mix(vec3(0.2, 0.6, 0.1), vec3(0.3, 0.7, 0.2), (elevation - 0.08) * 25.0);
    } else if (elevation < 0.16) {
        color = mix(vec3(0.1, 0.4, 0.1), vec3(0.2, 0.3, 0.1), (elevation - 0.12) * 25.0);
    } else {
        color = mix(vec3(0.4, 0.3, 0.2), vec3(0.9, 0.9, 0.9), min((elevation - 0.16) * 12.5, 1.0));
    }
    
    float textureNoise = noise(vUv * 50.0) * 0.1;
    color += textureNoise;
    
    return color;
}

vec3 getGasGiantColor() {
    float bandPos = vPosition.y * 8.0 + uTime * 0.3;
    float bands = sin(bandPos) * 0.5 + 0.5;
    
    vec3 color1 = vec3(0.9, 0.6, 0.2);
    vec3 color2 = vec3(0.7, 0.4, 0.1);
    vec3 color3 = vec3(0.95, 0.8, 0.4);
    
    float bandSelector = fract(bandPos * 0.1);
    vec3 color;
    
    if (bandSelector < 0.33) {
        color = mix(color1, color2, bands);
    } else if (bandSelector < 0.66) {
        color = mix(color2, color3, bands);
    } else {
        color = mix(color3, color1, bands);
    }
    
    float spotDistance = distance(normalize(vPosition), vec3(0.8, 0.3, 0.0));
    if (spotDistance < 0.2) {
        color = mix(color, vec3(0.8, 0.2, 0.1), 1.0 - spotDistance * 5.0);
    }
    
    return color;
}

vec3 getMoonColor() {
    float elevation = vElevation;
    vec3 color = vec3(0.7, 0.7, 0.7);
    
    if (elevation < -0.02) {
        color = mix(vec3(0.3, 0.3, 0.3), color, (elevation + 0.08) * 12.5);
    }
    
    if (elevation > 0.01) {
        color = mix(color, vec3(0.9, 0.9, 0.8), elevation * 20.0);
    }
    
    float surfaceNoise = noise(vUv * 100.0) * 0.2;
    color += surfaceNoise - 0.1;
    
    return color;
}

vec3 getExoticColor() {
    vec3 baseColor = vec3(0.3, 0.1, 0.5);
    vec3 crystalColor = vec3(0.6, 0.3, 0.8);
    vec3 glowColor = vec3(0.4, 0.6, 1.0);
    
    float elevation = vElevation;
    float crystalFactor = smoothstep(0.1, 0.2, elevation);
    
    vec3 color = mix(baseColor, crystalColor, crystalFactor);
    
    float glow = sin(vPosition.x * 10.0 + uTime * 2.0) * 
                 cos(vPosition.y * 8.0 + uTime * 1.5) * 
                 sin(vPosition.z * 12.0 + uTime * 3.0);
    glow = abs(glow) * 0.3;
    
    color += glowColor * glow;
    
    return color;
}

void main() {
    vec3 color;
    
    if (uPlanetType == 0) {
        color = getTerrestrialColor();
    } else if (uPlanetType == 1) {
        color = getGasGiantColor();
    } else if (uPlanetType == 2) {
        color = getMoonColor();
    } else if (uPlanetType == 3) {
        color = getExoticColor();
    } else {
        color = vec3(0.5, 0.5, 0.5);
    }
    
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float lighting = max(dot(vNormal, lightDir), 0.2);
    color *= lighting;
    
    gl_FragColor = vec4(color, 1.0);
}
`;

interface EnhancedProceduralPlanetProps {
  radius: number;
  resolution?: number;
  planetType: "terrestrial" | "gas-giant" | "moon" | "exotic";
  seed: number;
  position: [number, number, number];
  onClick?: () => void;
  children?: React.ReactNode;
}

const planetTypeMap = {
  terrestrial: 0,
  "gas-giant": 1,
  moon: 2,
  exotic: 3,
};

export function EnhancedProceduralPlanet({
  radius,
  resolution = 128,
  planetType,
  seed,
  position,
  onClick,
  children,
}: EnhancedProceduralPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uRadius: { value: radius },
        uSeed: { value: seed },
        uPlanetType: { value: planetTypeMap[planetType] },
        uTime: { value: 0 },
      },
      wireframe: false,
    });
  }, [radius, seed, planetType]);

  // Create geometry
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius, resolution, resolution);
  }, [radius, resolution]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
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
      />

      {/* Atmosphere for terrestrial and gas giants */}
      {(planetType === "terrestrial" || planetType === "gas-giant") && (
        <mesh scale={[1.08, 1.08, 1.08]}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={planetType === "terrestrial" ? "#87ceeb" : "#f4a460"}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Hover glow effect */}
      {hovered && (
        <>
          <mesh scale={[1.15, 1.15, 1.15]}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
          <mesh scale={[1.3, 1.3, 1.3]}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial color="#87ceeb" transparent opacity={0.2} />
          </mesh>
        </>
      )}

      {children}
    </group>
  );
}

export default EnhancedProceduralPlanet;
