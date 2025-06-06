uniform int uPlanetType;
uniform float uTime;
uniform float uSeed;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vElevation;

// Simple noise for texture variation
float noise(vec2 p) {
    return sin(p.x * 12.9898 + p.y * 4.1414 + uSeed) * 43758.5453;
}

vec3 getTerrestrialColor() {
    float elevation = vElevation;
    vec3 color;
    
    if (elevation < 0.05) {
        // Ocean
        color = mix(vec3(0.1, 0.3, 0.7), vec3(0.2, 0.5, 0.9), elevation * 20.0);
    } else if (elevation < 0.08) {
        // Beach/Shore
        color = vec3(0.8, 0.7, 0.4);
    } else if (elevation < 0.12) {
        // Plains/Grassland
        color = mix(vec3(0.2, 0.6, 0.1), vec3(0.3, 0.7, 0.2), (elevation - 0.08) * 25.0);
    } else if (elevation < 0.16) {
        // Hills/Forest
        color = mix(vec3(0.1, 0.4, 0.1), vec3(0.2, 0.3, 0.1), (elevation - 0.12) * 25.0);
    } else {
        // Mountains/Snow
        color = mix(vec3(0.4, 0.3, 0.2), vec3(0.9, 0.9, 0.9), min((elevation - 0.16) * 12.5, 1.0));
    }
    
    // Add some texture variation
    float textureNoise = fract(noise(vUv * 50.0)) * 0.1;
    color += textureNoise;
    
    return color;
}

vec3 getGasGiantColor() {
    float bandPos = vPosition.y * 8.0 + uTime * 0.3;
    float bands = sin(bandPos) * 0.5 + 0.5;
    
    vec3 color1 = vec3(0.9, 0.6, 0.2); // Orange
    vec3 color2 = vec3(0.7, 0.4, 0.1); // Dark orange
    vec3 color3 = vec3(0.95, 0.8, 0.4); // Light yellow
    
    float bandSelector = fract(bandPos * 0.1);
    vec3 color;
    
    if (bandSelector < 0.33) {
        color = mix(color1, color2, bands);
    } else if (bandSelector < 0.66) {
        color = mix(color2, color3, bands);
    } else {
        color = mix(color3, color1, bands);
    }
    
    // Great red spot
    float spotDistance = distance(normalize(vPosition), vec3(0.8, 0.3, 0.0));
    if (spotDistance < 0.2) {
        color = mix(color, vec3(0.8, 0.2, 0.1), 1.0 - spotDistance * 5.0);
    }
    
    return color;
}

vec3 getMoonColor() {
    float elevation = vElevation;
    vec3 color = vec3(0.7, 0.7, 0.7); // Base gray
    
    // Darker craters
    if (elevation < -0.02) {
        color = mix(vec3(0.3, 0.3, 0.3), color, (elevation + 0.08) * 12.5);
    }
    
    // Highland material
    if (elevation > 0.01) {
        color = mix(color, vec3(0.9, 0.9, 0.8), elevation * 20.0);
    }
    
    // Add surface texture
    float surfaceNoise = fract(noise(vUv * 100.0)) * 0.2;
    color += surfaceNoise - 0.1;
    
    return color;
}

vec3 getExoticColor() {
    vec3 baseColor = vec3(0.3, 0.1, 0.5); // Purple base
    vec3 crystalColor = vec3(0.6, 0.3, 0.8); // Bright purple
    vec3 glowColor = vec3(0.4, 0.6, 1.0); // Blue glow
    
    float elevation = vElevation;
    float crystalFactor = smoothstep(0.1, 0.2, elevation);
    
    vec3 color = mix(baseColor, crystalColor, crystalFactor);
    
    // Add energy glow
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
    
    // Simple lighting
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float lighting = max(dot(vNormal, lightDir), 0.2);
    color *= lighting;
    
    gl_FragColor = vec4(color, 1.0);
} 