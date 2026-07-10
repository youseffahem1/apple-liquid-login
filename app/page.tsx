"use client";

import React, { useState } from "react";

import AuroraBackground from "./components/AuroraBackground";

import GlassCard from "./components/GlassCard";

import GlassInput from "./components/GlassInput";

import GlassButton from "./components/GlassButton";

import PremiumNotification, {
  NotificationType,
} from "./components/PremiumNotification";

export default function Page() {
  const [notify, setNotify] = useState<{
    show: boolean;

    title: string;

    message: string;

    type: NotificationType;
  }>({
    show: false,

    title: "",

    message: "",

    type: "info",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // إظهار حالة التحميل أولاً

    setNotify({
      show: true,

      title: "Authenticating...",

      message: "Verifying Apple ID credentials",

      type: "loading",
    });

    // محاكاة نجاح الدخول بعد ثانيتين

    setTimeout(() => {
      setNotify({
        show: true,

        title: "Access Granted",

        message: "Welcome to the Cinematic OS experience.",

        type: "success",
      });
    }, 2000);
  };

  return (
    <main className="layout-wrapper">
      <AuroraBackground />

      <PremiumNotification
        isVisible={notify.show}
        title={notify.title}
        message={notify.message}
        type={notify.type}
        duration={4000}
        onClose={() => setNotify((prev) => ({ ...prev, show: false }))}
      />

      <GlassCard>
        <div className="header-container">
          <div className="brand-logo" />

          <h1 className="title">System Access</h1>

          <p className="subtitle">Identify to continue</p>
        </div>

        <form onSubmit={handleLogin} className="form-container">
          <GlassInput type="email" label="Apple ID or Email" required />

          <GlassInput type="password" label="Password" required />

          <div className="action-container">
            <GlassButton type="submit">Authenticate</GlassButton>
          </div>
        </form>
      </GlassCard>

      <style jsx>{`
        .header-container {
          text-align: center;

          margin-bottom: 40px;
        }

        .brand-logo {
          width: 54px;

          height: 54px;

          margin: 0 auto 24px;

          background: var(--text-primary);

          border-radius: 16px;

          mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>')
            center/contain no-repeat;

          -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>')
            center/contain no-repeat;

          animation: float 4s ease-in-out infinite;
        }

        .title {
          font-size: 32px;

          font-weight: 700;

          letter-spacing: -1px;

          margin-bottom: 8px;

          color: var(--text-primary);
        }

        .subtitle {
          color: var(--text-secondary);

          font-size: 15px;

          font-weight: 400;
        }

        .form-container {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }

        .action-container {
          margin-top: 24px;
        }
      `}</style>
    </main>
  );
}
