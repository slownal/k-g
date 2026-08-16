import ISTClock from "@/app/components/ISTClock";
import ListenerBadge from "@/app/components/ListenerBadge";
import MusicPlayer from "@/app/components/MusicPlayer";
import NoteButton from "@/app/components/NoteButton";

export default function Home() {
  return (
    <main
      className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden"
      style={{ fontFamily: "var(--font-inter, system-ui)" }}
    >
      {/* ── 1. Fixed hero background ─────────────────────────────────────── */}
      <div
        className="hero-bg fixed inset-0 -z-20"
        aria-hidden="true"
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.80) 100%)",
          }}
        />
      </div>

      {/* ── 2. Fixed grain overlay ───────────────────────────────────────── */}
      <div
        className="grain-overlay fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 3. Top bar — clock only ──────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-10 flex items-center"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        {/* Clock + listener count — stacked top-left */}
        <div className="flex flex-col gap-1">
          <ISTClock />
          <ListenerBadge count={2} />
        </div>
      </header>

      {/* ── Hero title — upper third of screen ──────────────────────────── */}
      <div className="flex-1 flex items-start justify-center pointer-events-none select-none pt-28">
        <h1
          aria-label="Songs that remind Bittu of Kush"
          className="text-center px-6 leading-tight drop-shadow-2xl"
          style={{
            fontFamily: "var(--font-yatra, 'Yatra One', system-ui)",
            fontSize: "clamp(1.5rem, 5vw, 3rem)",
            color: "#fdf6ec",
            textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.7)",
            letterSpacing: "0.5px",
          }}
        >
          सोंग्स दैट रिमाइंड बिट्टू ऑफ़ कुस
        </h1>
      </div>

      {/* ── 4. Player — bottom anchored ──────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-2"
        style={{
          paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <NoteButton />
        <div className="w-full max-w-xl">
          <MusicPlayer />
        </div>
      </div>
    </main>
  );
}
