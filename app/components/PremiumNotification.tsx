"use client";

import React, { useEffect, useState } from "react";
import "../styles/premium-notification.css";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

export interface PremiumNotificationProps {
  title: string;
  message: string;
  type: NotificationType;
  isVisible: boolean;
  duration?: number;
  onClose: () => void;
}

export default function PremiumNotification({
  title,
  message,
  type,
  isVisible,
  duration = 4000,
  onClose,
}: PremiumNotificationProps) {
  const [renderState, setRenderState] = useState<
    "unmounted" | "mounting" | "unmounting"
  >("unmounted");

  useEffect(() => {
    let unmountTimeout: NodeJS.Timeout;

    if (isVisible) {
      setRenderState("mounting");

      // Auto dismiss logic (only if not loading, or if specifically desired)
      if (type !== "loading" && duration > 0) {
        unmountTimeout = setTimeout(() => {
          onClose();
        }, duration);
      }
    } else if (renderState === "mounting") {
      setRenderState("unmounting");
      // Wait for exit animation to finish before removing from DOM
      setTimeout(() => {
        setRenderState("unmounted");
      }, 500);
    }

    return () => {
      clearTimeout(unmountTimeout);
    };
  }, [isVisible, duration, onClose, type, renderState]);

  if (renderState === "unmounted") return null;

  const Icons = {
    success: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    error: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    warning: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    info: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    loading: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Placeholder SVG for center, border ring does the spinning */}
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className="premium-notification-portal">
      <div
        className={`notification-wrapper state-${type} ${renderState}`}
        role="alert"
        aria-live="assertive"
      >
        {/* Soft bloom / ambient light behind the notification */}
        <div className="ambient-glow" />

        {/* Outer border mask that clips the rotating conic gradient */}
        <div className="border-mask">
          <div className="liquid-border" />

          {/* Main Frosted Glass Body */}
          <div className="glass-core">
            <div className="reflection-sweep" />

            <div className="content-layout">
              <div className="icon-container">
                {type === "loading" && <div className="spinner-ring" />}
                {Icons[type]}
              </div>

              <div className="text-container">
                <h4 className="notify-title">{title}</h4>
                <p className="notify-message">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
