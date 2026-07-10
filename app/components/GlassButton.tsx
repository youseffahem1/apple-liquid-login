"use client";
import React, { ReactNode } from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function GlassButton({ children, ...props }: GlassButtonProps) {
  return (
    <button className="glass-button" {...props}>
      <div className="button-border-travel"></div>
      <span className="button-text">{children}</span>
      <style jsx>{`
        /* ... داخل GlassButton.tsx ... */
        .glass-button {
          position: relative;
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: #1d1d1f; /* زر أبل الأسود الكلاسيكي */
          color: #ffffff; /* نص أبيض */
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.4px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s var(--spring-soft);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        .glass-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          background: #000000;
        }
        .glass-button:active {
          transform: translateY(1px) scale(0.98);
        }
        .button-border-travel {
          display: none; /* نحذف إضاءة النيون المتحركة لكي يكون التصميم هادئ ومينيمال (Minimalist) */
        }
        .button-text {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </button>
  );
}
