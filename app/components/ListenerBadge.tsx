// Server component — static listener badge (upgrade to real-time later)

// ─── Pulse dot — module scope ─────────────────────────────────────────────────
function PulseDot() {
  return (
    <span
      className="animate-pulse-dot inline-block w-2 h-2 rounded-full bg-emerald-400"
      aria-hidden="true"
    />
  );
}

// ─── ListenerBadge ────────────────────────────────────────────────────────────
export default function ListenerBadge({ count = 2 }: { count?: number }) {
  return (
    <div
      aria-label={`${count} people listening`}
      className="flex items-center gap-1.5 select-none"
    >
      <PulseDot />
      <span className="text-white/45 font-medium tracking-wide" style={{ fontSize: 11 }}>
        {count} listening
      </span>
    </div>
  );
}
