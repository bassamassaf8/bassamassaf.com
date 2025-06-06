# 3D Planet Implementation Instructions

## Current Limitations with CSS

The current planets use CSS gradients and box-shadows to simulate 3D effects, but they're fundamentally 2D. To achieve true 3D planets, we need to implement WebGL or use a 3D library.

## Option 1: Three.js Implementation (Recommended)

### Step 1: Install Three.js

```bash
npm install three @types/three
npm install @react-three/fiber @react-three/drei
```

### Step 2: Create 3D Planet Component

Create `src/components/Planet3D.tsx`:

```typescript
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

interface Planet3DProps {
  position: [number, number, number];
  size: number;
  planetType: string;
  color: any;
  name: string;
}

export function Planet3D({
  position,
  size,
  planetType,
  color,
  name,
}: Planet3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  const getTexture = () => {
    switch (planetType) {
      case "mars":
        return "/textures/mars.jpg";
      case "earth":
        return "/textures/earth.jpg";
      case "jupiter":
        return "/textures/jupiter.jpg";
      case "moon":
        return "/textures/moon.jpg";
      default:
        return "/textures/generic.jpg";
    }
  };

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <meshStandardMaterial
          map={useTexture(getTexture())}
          normalMap={useTexture("/textures/normal.jpg")}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere args={[size * 1.1, 32, 32]}>
        <meshBasicMaterial
          color={color.base}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      <Text
        position={[0, -size * 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}
```

### Step 3: Create Solar System Component

Create `src/components/SolarSystem3D.tsx`:

```typescript
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import { Planet3D } from "./Planet3D";

export function SolarSystem3D({ projects, onPlanetClick }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1} />

      <Stars radius={300} depth={60} count={20000} factor={7} />

      {/* Central Sun */}
      <Sphere position={[0, 0, 0]} args={[1, 32, 32]}>
        <meshBasicMaterial color="#ffaa00" />
      </Sphere>

      {/* Planets */}
      {projects.map((project, index) => {
        const angle = (index * 72 * Math.PI) / 180;
        const x = Math.cos(angle) * project.orbitRadius * 0.1;
        const z = Math.sin(angle) * project.orbitRadius * 0.1;

        return (
          <Planet3D
            key={project.id}
            position={[x, 0, z]}
            size={project.size * 0.02}
            planetType={project.planetType}
            color={project.color}
            name={project.name}
          />
        );
      })}

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <Environment preset="space" />
    </Canvas>
  );
}
```

### Step 4: Texture Assets Needed

Download and place in `public/textures/`:

- `mars.jpg` - Red/orange rocky texture
- `earth.jpg` - Blue/green with clouds
- `jupiter.jpg` - Gas giant bands
- `moon.jpg` - Gray crater texture
- `generic.jpg` - Purple/mysterious texture for Paradigm
- `normal.jpg` - Normal map for surface details

### Step 5: Replace Current Planet System

In your main component, replace the 2D planet system with:

```typescript
import { SolarSystem3D } from "./components/SolarSystem3D";

// Replace the current planet div with:
<div className="relative h-[80vh] w-full">
  <SolarSystem3D projects={projects} onPlanetClick={handlePlanetClick} />
</div>;
```

## Option 2: CSS 3D Transforms (Enhanced Current Approach)

If you prefer to stay with CSS, here are improvements:

### Enhanced Planet Component

```typescript
const Planet3DEnhanced = ({ project, position }) => {
  return (
    <div
      className="planet-container"
      style={{
        position: "absolute",
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Planet sphere */}
      <div
        className="planet-sphere"
        style={{
          width: project.size,
          height: project.size,
          borderRadius: "50%",
          position: "relative",
          transform: "rotateX(75deg)",
          transformStyle: "preserve-3d",
          background: `
            conic-gradient(from 0deg, ${project.color.base}, ${project.color.highlight}, ${project.color.shadow}, ${project.color.base}),
            radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.8), transparent 70%),
            radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.6), transparent 40%)
          `,
          boxShadow: `
            inset -${project.size / 4}px -${project.size / 4}px ${
            project.size / 2
          }px rgba(0,0,0,0.8),
            inset ${project.size / 6}px ${project.size / 6}px ${
            project.size / 3
          }px rgba(255,255,255,0.3),
            0 0 ${project.size}px ${project.color.base}66
          `,
        }}
      >
        {/* Multiple sphere layers for depth */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: `${i * 2}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle at ${30 + i * 10}% ${
                30 + i * 10
              }%, transparent ${20 + i * 10}%, ${project.color.base}${
                20 + i * 10
              } ${40 + i * 10}%, transparent ${60 + i * 10}%)`,
              transform: `rotateY(${i * 120}deg) translateZ(${i * 2}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

## Option 3: Spline 3D Integration

### Step 1: Create 3D models in Spline

1. Go to spline.design
2. Create 5 planet models with realistic textures
3. Export as React components

### Step 2: Import Spline components

```typescript
import { Spline } from "@splinetool/react-spline";

// In your component:
<Spline scene="https://prod.spline.design/your-scene-url" />;
```

## Recommended Implementation Order:

1. **Start with Option 2** (Enhanced CSS) - Immediate improvement
2. **Move to Option 1** (Three.js) - For true 3D
3. **Consider Option 3** (Spline) - For highest quality but requires external tool

## Performance Considerations:

- **Three.js**: Use LOD (Level of Detail) for distant planets
- **CSS**: Limit animations and use transform3d for hardware acceleration
- **Spline**: May have larger bundle size

## Next Steps:

1. Choose your preferred option
2. I'll help implement whichever approach you select
3. We can start with basic shapes and add textures/details progressively

Would you like me to implement any of these options? Option 1 (Three.js) would give the most impressive results!
