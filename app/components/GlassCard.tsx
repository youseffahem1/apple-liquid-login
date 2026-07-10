"use client";
import React, { ReactNode, useRef, useState } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`liquid-glass glass-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="mouse-glow"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />
      <div className="glass-content">{children}</div>
      <style jsx>{`
        .glass-card {
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          animation:
            slide-up-fade 1s var(--spring-soft) forwards,
            float 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .mouse-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 60%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.3s ease;
          opacity: 0;
        }
        .glass-card:hover .mouse-glow {
          opacity: 1;
        }
        .glass-content {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
