"use client";

import { useEffect, useState } from "react";

// ─── Colon component — defined at module scope ────────────────────────────────
function BlinkingColon() {
  return <span className="animate-blink inline-block">:</span>;
}

// ─── ISTClock ─────────────────────────────────────────────────────────────────
export default function ISTClock() {
  const [time, setTime] = useState<{ h: string; m: string; period: string } | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const h = parts.find((p) => p.type === "hour")?.value ?? "";
      const m = parts.find((p) => p.type === "minute")?.value ?? "";
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
      setTime({ h, m, period: dayPeriod });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div
      aria-label="Current time in India"
      className="tabular text-white/80 text-sm font-medium tracking-wide select-none"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {time.h}
      <BlinkingColon />
      {time.m}{" "}
      <span className="text-xs text-white/50 uppercase tracking-widest">
        {time.period}
      </span>
    </div>
  );
}
