"use client";
import React, { useState } from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function GlassInput({ label, ...props }: GlassInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="input-group">
      <input
        {...props}
        className="glass-input"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
      />
      <label className={`glass-label ${isFocused || hasValue ? "active" : ""}`}>
        {label}
      </label>
      <div className={`input-border ${isFocused ? "focused" : ""}`} />

      <style jsx>{`
        .input-group {
          position: relative;
          margin-bottom: 28px;
          width: 100%;
        }
        /* ... داخل GlassInput.tsx ... */
        .glass-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.5); /* تم التعديل لفاتح */
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 18px 16px;
          color: var(--text-primary);
          font-size: 16px;
          outline: none;
          transition: all 0.4s var(--spring-soft);
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.9);
          border-color: var(--neon-cyan);
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15); /* هالة تركيز زرقاء */
        }
        .glass-label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          pointer-events: none;
          transition: all 0.3s var(--spring-bouncy);
          font-size: 16px;
        }
        .glass-label.active {
          top: -10px;
          left: 12px;
          font-size: 13px;
          font-weight: 500;
          color: var(--neon-cyan);
          background: var(--bg-base);
          padding: 0 6px;
          border-radius: 4px;
        }
        .input-border {
          display: none; /* يمكن إخفاؤه في التصميم الفاتح لأنه أصبح لدينا تأثير Focus أوضح */
        }
          transform: scaleX(0);
          transition: transform 0.6s var(--ease-cinematic);
          opacity: 0;
        }
        .input-border.focused {
          transform: scaleX(1);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
