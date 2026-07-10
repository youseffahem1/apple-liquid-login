"use client";
import React from "react";

export default function AuroraBackground() {
  return (
    <div className="aurora-container" aria-hidden="true">
      <div className="aurora-blob cyan-blob"></div>
      <div className="aurora-blob purple-blob"></div>
      <div className="noise-overlay"></div>
      <style jsx>{`
        .aurora-container {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background: var(--bg-base);
        }
        .aurora-blob {
          position: absolute;
          filter: blur(80px);
          opacity: 0.5;
          border-radius: 50%;
          animation: aurora-spin 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .cyan-blob {
          top: -10%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(
            circle,
            var(--neon-cyan) 0%,
            transparent 60%
          );
          animation-duration: 25s;
        }
        .purple-blob {
          bottom: -20%;
          right: -10%;
          width: 70vw;
          height: 70vw;
          background: radial-gradient(
            circle,
            var(--neon-purple) 0%,
            transparent 60%
          );
          animation-direction: reverse;
        }
        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
          opacity: 0.04;
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
}
