import React, { useState, useEffect, useMemo } from "react";

const colors = { 
  bg: ["#000000", "#000000", "#000000"],
  main: ["#0f3460", "#16537e", "#1f7a8c"],
  accent: ["#3d5af1", "#00d4ff", "#60a5fa"],
  glow: "#00d4ff"
};

export default function AIChipExperience() {
  const [time, setTime] = useState(0);
  const [intensity, setIntensity] = useState(1);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.02);
      setIntensity(prev => 0.7 + Math.sin(prev * 2) * 0.3);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({length: 150}, (_, i) => ({
      id: i,
      x: Math.random() * 1200,
      y: Math.random() * 800,
      z: Math.random() * 10,
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI * 2,
      size: Math.random() * 2 + 0.5
    }));
    setParticles(newParticles);
  }, []);

  const animatedParticles = useMemo(() => {
    return particles.map(p => ({
      ...p,
      x: p.x + Math.sin(time * p.speed + p.angle) * p.z,
      y: p.y + Math.cos(time * p.speed + p.angle) * p.z,
      opacity: 0.3 + Math.sin(time * 2 + p.id * 0.1) * 0.4
    }));
  }, [particles, time]);

  return (
    <div className="w-full h-screen relative overflow-hidden" style={{
      background: `radial-gradient(ellipse at center, ${colors.bg[2]} 0%, ${colors.bg[1]} 40%, ${colors.bg[0]} 100%)`
    }}>
      
      {/* Animated background particles */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {animatedParticles.map(p => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={colors.accent[Math.floor(p.id % 3)]}
            opacity={p.opacity * 0.6}
            filter="url(#particleGlow)"
          />
        ))}
      </svg>

      {/* Geometric background patterns */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <svg className="w-full h-full">
          <defs>
            <pattern id="hexGrid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon 
                points="30,4 48,15 48,37 30,48 12,37 12,15" 
                fill="none" 
                stroke={colors.main[1]} 
                strokeWidth="0.5" 
                opacity="0.3"
              />
            </pattern>
            <pattern id="circuitLines" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path 
                d="M0,60 L60,60 L60,0 M60,60 L120,60 L120,120 M60,60 L60,120" 
                stroke={colors.main[0]} 
                strokeWidth="1" 
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
          <rect width="100%" height="100%" fill="url(#circuitLines)" />
        </svg>
      </div>

      {/* Floating energy rings */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="absolute rounded-full border opacity-20"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              borderColor: colors.accent[i % 3],
              borderWidth: `${2 - i * 0.3}px`,
              transform: `rotate(${time * (i * 2)}rad)`
            }}
          />
        ))}
      </div>

      {/* Main AI chip visualization */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            <radialGradient id="chipCore" cx="50%" cy="50%">
              <stop offset="0%" stopColor={colors.accent[2]} stopOpacity="1" />
              <stop offset="30%" stopColor={colors.accent[1]} stopOpacity="0.9" />
              <stop offset="70%" stopColor={colors.accent[0]} stopOpacity="0.7" />
              <stop offset="100%" stopColor={colors.main[2]} stopOpacity="0.8" />
            </radialGradient>
            
            <linearGradient id="chipBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.main[2]} stopOpacity="0.9" />
              <stop offset="50%" stopColor={colors.main[1]} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.main[0]} stopOpacity="0.9" />
            </linearGradient>

            <filter id="mainGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer energy field */}
          <circle
            cx="500"
            cy="500"
            r={300 + Math.sin(time * 2) * 20}
            fill="none"
            stroke={colors.glow}
            strokeWidth="2"
            opacity={0.3 * intensity}
            filter="url(#mainGlow)"
          />

          {/* Main chip substrate */}
          <rect
            x="300"
            y="300"
            width="400"
            height="400"
            rx="50"
            fill="url(#chipBody)"
            stroke={colors.accent[1]}
            strokeWidth="3"
            filter="url(#mainGlow)"
            opacity={intensity}
          />

          {/* Chip connection pins */}
          {Array.from({length: 16}).map((_, i) => {
            const angle = (i * 22.5) * Math.PI / 180;
            const x1 = 500 + Math.cos(angle) * 220;
            const y1 = 500 + Math.sin(angle) * 220;
            const x2 = 500 + Math.cos(angle) * 280;
            const y2 = 500 + Math.sin(angle) * 280;
            
            return (
              <g key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={colors.accent[1]}
                  strokeWidth="4"
                  filter="url(#mainGlow)"
                />
                <circle
                  cx={x2} cy={y2} r="6"
                  fill={colors.accent[2]}
                  filter="url(#mainGlow)"
                  opacity={0.7 + Math.sin(time * 3 + i * 0.4) * 0.3}
                />
              </g>
            );
          })}

          {/* Circuit pathways */}
          {Array.from({length: 8}).map((_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const startX = 500 + Math.cos(angle) * 100;
            const startY = 500 + Math.sin(angle) * 100;
            const endX = 500 + Math.cos(angle) * 200;
            const endY = 500 + Math.sin(angle) * 200;
            
            return (
              <g key={i}>
                <path
                  d={`M ${startX},${startY} Q ${500 + Math.cos(angle + 0.5) * 150},${500 + Math.sin(angle + 0.5) * 150} ${endX},${endY}`}
                  fill="none"
                  stroke={colors.accent[0]}
                  strokeWidth="3"
                  filter="url(#mainGlow)"
                  opacity={0.6 + Math.sin(time * 2 + i * 0.8) * 0.4}
                />
                <circle
                  cx={startX} cy={startY} r="4"
                  fill={colors.accent[1]}
                  filter="url(#mainGlow)"
                  opacity={0.8 + Math.sin(time * 4 + i) * 0.2}
                />
              </g>
            );
          })}

          {/* Central processing core */}
          <circle
            cx="500"
            cy="500"
            r={80 + Math.sin(time * 3) * 10}
            fill="url(#chipCore)"
            filter="url(#strongGlow)"
            opacity={intensity}
          />

          {/* AI identifier */}
          <text
            x="500"
            y="520"
            textAnchor="middle"
            fontSize="40"
            fontWeight="bold"
            fill="white"
            filter="url(#strongGlow)"
            opacity={intensity}
          >
            NEHA
          </text>

          {/* Core Labels */}
          <g opacity={intensity * 0.9}>
            {/* Intelligent Core */}
            <g transform={`translate(${700 + Math.sin(time * 0.8) * 10}, ${350})`}>
              <rect x="-88" y="-20" width="180" height="45" rx="15" fill="rgba(61, 90, 241, 0.2)" stroke={colors.accent[0]} strokeWidth="1" filter="url(#mainGlow)" />
              <text x="0" y="6" textAnchor="middle" fontSize="17" fontWeight="900" fill={colors.accent[0]} filter="url(#mainGlow)">
                Intelligent Core
              </text>
              <circle cx="-70" cy="0" r="3" fill={colors.accent[0]} opacity={0.8 + Math.sin(time * 3) * 0.2} filter="url(#mainGlow)" />
              <line x1="-67" y1="0" x2="-85" y2="0" stroke={colors.accent[0]} strokeWidth="2" opacity="0.6" />
            </g>

            {/* Emotional Core */}
            <g transform={`translate(${300 + Math.sin(time * 1.2) * 8}, ${650 + Math.cos(time * 0.6) * 12})`}>
              <rect x="-88" y="-20" width="180" height="45" rx="15" fill="rgba(0, 212, 255, 0.2)" stroke={colors.accent[1]} strokeWidth="1" filter="url(#mainGlow)" />
              <text x="0" y="6" textAnchor="middle" fontSize="17" fontWeight="900" fill={colors.accent[1]} filter="url(#mainGlow)">
                Emotional Core
              </text>
              <circle cx="-65" cy="0" r="3" fill={colors.accent[1]} opacity={0.8 + Math.sin(time * 2.5) * 0.2} filter="url(#mainGlow)" />
              <line x1="-62" y1="0" x2="-80" y2="0" stroke={colors.accent[1]} strokeWidth="2" opacity="0.6" />
            </g>

            {/* Wisdom Core */}
            <g transform={`translate(${200 + Math.sin(time * 0.9) * 12}, ${180 + Math.cos(time * 1.1) * 8})`}>
              <rect x="-88" y="-20" width="180" height="45" rx="15" fill="rgba(96, 165, 250, 0.2)" stroke={colors.accent[2]} strokeWidth="1" filter="url(#mainGlow)" />
              <text x="0" y="6" textAnchor="middle" fontSize="17" fontWeight="900" fill={colors.accent[2]} filter="url(#mainGlow)">
                Wisdom Core
              </text>
              <circle cx="-60" cy="0" r="3" fill={colors.accent[2]} opacity={0.8 + Math.sin(time * 2.8) * 0.2} filter="url(#mainGlow)" />
              <line x1="-57" y1="0" x2="-75" y2="0" stroke={colors.accent[2]} strokeWidth="2" opacity="0.6" />
            </g>
          </g>

          {/* Connection lines to chip */}
          <g opacity="0.4">
            <path d="M 630,350 Q 580,380 520,400" fill="none" stroke={colors.accent[0]} strokeWidth="1.5" strokeDasharray="5,3" filter="url(#mainGlow)" />
            <path d="M 320,620 Q 380,580 450,520" fill="none" stroke={colors.accent[1]} strokeWidth="1.5" strokeDasharray="5,3" filter="url(#mainGlow)" />
            <path d="M 270,180 Q 350,250 420,300" fill="none" stroke={colors.accent[2]} strokeWidth="1.5" strokeDasharray="5,3" filter="url(#mainGlow)" />
          </g>

          {/* Inner processing rings */}
          {[1, 2, 3].map(i => (
            <circle
              key={i}
              cx="500"
              cy="500"
              r={120 + i * 30}
              fill="none"
              stroke={colors.accent[i-1]}
              strokeWidth="2"
              strokeDasharray="10 5"
              strokeDashoffset={-time * 20 * i}
              opacity="0.4"
              filter="url(#mainGlow)"
            />
          ))}

          {/* Data processing nodes */}
          {Array.from({length: 12}).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const radius = 160 + Math.sin(time * 2 + i * 0.5) * 20;
            const x = 500 + Math.cos(angle + time * 0.5) * radius;
            const y = 500 + Math.sin(angle + time * 0.5) * radius;
            
            return (
              <circle
                key={i}
                cx={x} cy={y} r="5"
                fill={colors.accent[2]}
                filter="url(#mainGlow)"
                opacity={0.6 + Math.sin(time * 3 + i * 0.7) * 0.4}
              />
            );
          })}
        </svg>
      </div>

      {/* Overlay atmospheric effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 30%, #00000020 70%)`,
          zIndex: 15
        }}
      />
    </div>
  );
}