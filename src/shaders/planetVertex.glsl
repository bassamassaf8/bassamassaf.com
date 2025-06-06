uniform float uRadius;
uniform float uSeed;
uniform int uPlanetType; // 0: terrestrial, 1: gas-giant, 2: moon, 3: exotic
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vElevation;

// Noise function
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
        // Terrestrial planet - continent features
        float continentNoise = noise(normalizedPos * 4.0);
        continentNoise += noise(normalizedPos * 8.0) * 0.5;
        continentNoise += noise(normalizedPos * 16.0) * 0.25;
        displacement = max(0.0, continentNoise) * uRadius * 0.15;
        
        // Add mountain ridges
        float ridges = ridgedNoise(normalizedPos * 12.0) * 0.05;
        if (continentNoise > 0.2) {
            displacement += ridges * uRadius;
        }
    }
    else if (uPlanetType == 1) {
        // Gas giant - atmospheric bands
        displacement = sin(normalizedPos.y * 12.0 + uSeed + uTime * 0.5) * 0.02 * uRadius;
        displacement += noise(normalizedPos * 2.0) * 0.01 * uRadius;
    }
    else if (uPlanetType == 2) {
        // Moon - crater features
        float craterNoise = abs(noise(normalizedPos * 6.0));
        displacement = -craterNoise * craterNoise * uRadius * 0.08;
        displacement += noise(normalizedPos * 12.0) * 0.05 * uRadius;
    }
    else if (uPlanetType == 3) {
        // Exotic - crystal formations
        float crystalNoise = abs(noise(normalizedPos * 10.0));
        crystalNoise += abs(noise(normalizedPos * 20.0)) * 0.5;
        displacement = crystalNoise * uRadius * 0.2;
    }
    
    vElevation = displacement / uRadius;
    
    // Apply displacement
    vec3 displacedPosition = pos + normalizedPos * displacement;
    
    vPosition = displacedPosition;
    vNormal = normalizedPos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
} 