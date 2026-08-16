"use client";

import { useState } from "react";

// ─── Modal ────────────────────────────────────────────────────────────────────
function NoteModal({ onClose }: { onClose: () => void }) {
  return (
    // Full-screen backdrop — click outside to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="glass relative animate-fade-up"
        style={{
          width: "min(360px, calc(100vw - 2.5rem))",
          borderRadius: 24,
          padding: "36px 32px 28px",
          animationDuration: "0.2s",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close — top-right, generous hit area */}
        <button
          id="note-modal-close"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Icon — centred, above text */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-dim))",
            boxShadow: "0 6px 20px var(--color-accent-glow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 20,
          }}
          aria-hidden="true"
        >
          🎶
        </div>

        {/* Message */}
        <p
          style={{
            fontFamily: "var(--font-inter, system-ui)",
            fontSize: 15,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.88)",
            margin: 0,
          }}
        >
          These are all misc songs stacked up in a playlist, I just wanted to
          show you this, I will later create separate playlists.{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>LY!</span>
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "20px 0 14px",
          }}
        />

        {/* Footer hint */}
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.28)",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Tap anywhere outside to close
        </p>
      </div>
    </div>
  );
}

// ─── Trigger button ───────────────────────────────────────────────────────────
export default function NoteButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        id="note-trigger"
        onClick={() => setOpen(true)}
        aria-label="A note from Bittu"
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "6px 16px 6px 11px",
          borderRadius: 9999,
          border: "none",
          cursor: "pointer",
          fontSize: 12,
          color: "rgba(255,255,255,0.6)",
          transition: "transform 0.15s, opacity 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        <span style={{ fontSize: 13 }}>🎶</span>
        <span>a note</span>
      </button>

      {open && <NoteModal onClose={() => setOpen(false)} />}
    </>
  );
}
