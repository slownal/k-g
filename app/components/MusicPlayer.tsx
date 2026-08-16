"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ALL_TRACKS, type Track } from "@/app/lib/tracks";

// ─── YouTube IFrame API types ─────────────────────────────────────────────────
declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { UNSTARTED: -1; ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  loadVideoById(id: string): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getDuration(): number;
  getCurrentTime(): number;
  destroy(): void;
}

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─── VinylRecord ──────────────────────────────────────────────────────────────
// Outer disc rotates; iframe label + spindle are stationary (not inside the
// rotating div, so the video never tilts).
interface VinylRecordProps {
  isPlaying: boolean;
  size: number;
  iframeRef: React.RefObject<HTMLDivElement | null>;
}

function VinylRecord({ isPlaying, size, iframeRef }: VinylRecordProps) {
  const labelSize = Math.round(size * 0.44);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Rotating outer disc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: "spin-vinyl 8s linear infinite",
          animationPlayState: isPlaying ? "running" : "paused",
          background: "radial-gradient(circle at 50% 50%, #202020 0%, #0a0a0a 65%, #050505 100%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 6px 24px rgba(0,0,0,0.6)",
        }}
      >
        {/* Groove rings */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "repeating-radial-gradient(circle, transparent 0px, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)",
          }}
        />
        {/* Sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0.06) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 100%)",
          }}
        />
      </div>

      {/* Stationary: YouTube iframe as label */}
      <div
        ref={iframeRef}
        className="absolute rounded-full overflow-hidden"
        style={{
          width: labelSize,
          height: labelSize,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          clipPath: "circle(50%)",
          background: "#161616",
          zIndex: 2,
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.1)",
        }}
      />

      {/* Spindle hole */}
      <div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#000",
          border: "1.5px solid rgba(255,255,255,0.28)",
          zIndex: 5,
        }}
      />
    </div>
  );
}

// ─── SeekBar ──────────────────────────────────────────────────────────────────
interface SeekBarProps {
  elapsed: number;
  duration: number;
  onSeek: (fraction: number) => void;
}

function SeekBar({ elapsed, duration, onSeek }: SeekBarProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const pct = duration > 0 ? Math.min((elapsed / duration) * 100, 100) : 0;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!railRef.current) return;
      const seek = (evt: PointerEvent | React.PointerEvent) => {
        const rect = railRef.current!.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (evt.clientX - rect.left) / rect.width));
        onSeek(fraction);
      };
      seek(e);
      const onMove = (ev: PointerEvent) => seek(ev);
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [onSeek]
  );

  return (
    <div
      className="seek-wrapper w-full"
      ref={railRef}
      onPointerDown={handlePointerDown}
      role="slider"
      aria-label="Seek"
      aria-valuenow={Math.round(elapsed)}
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
    >
      <div className="seek-rail w-full">
        <div className="seek-fill" style={{ width: `${pct}%` }}>
          <div className="seek-knob" />
        </div>
      </div>
    </div>
  );
}

// ─── TransportControls ────────────────────────────────────────────────────────
interface TransportProps {
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  isPlaying: boolean;
  mobile?: boolean;
}

function TransportControls({ onPrev, onPlayPause, onNext, isPlaying, mobile = false }: TransportProps) {
  const skip = mobile ? 44 : 32;
  const skipIcon = mobile ? 20 : 16;
  const play = mobile ? 52 : 42;
  const playIcon = mobile ? 22 : 18;

  return (
    <div className="flex items-center gap-1.5">
      <button id={`btn-prev${mobile ? "-m" : ""}`} onClick={onPrev} className="transport-btn" aria-label="Previous" style={{ width: skip, height: skip }}>
        <svg width={skipIcon} height={skipIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
        </svg>
      </button>

      <button
        id={`btn-play${mobile ? "-m" : ""}`}
        onClick={onPlayPause}
        className="transport-btn"
        aria-label={isPlaying ? "Pause" : "Play"}
        style={{
          width: play, height: play, borderRadius: "50%",
          background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-dim))",
          boxShadow: "0 4px 20px var(--color-accent-glow)",
          color: "#1a0e00",
        }}
      >
        {isPlaying ? (
          <svg width={playIcon} height={playIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg width={playIcon} height={playIcon} viewBox="0 0 24 24" fill="currentColor" style={{ transform: "translateX(1px)" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <button id={`btn-next${mobile ? "-m" : ""}`} onClick={onNext} className="transport-btn" aria-label="Next" style={{ width: skip, height: skip }}>
        <svg width={skipIcon} height={skipIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
        </svg>
      </button>
    </div>
  );
}

// ─── DesktopPlayer ────────────────────────────────────────────────────────────
interface PlayerPanelProps {
  track: Track;
  trackIndex: number;
  totalTracks: number;
  isPlaying: boolean;
  elapsed: number;
  duration: number;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  onSeek: (fraction: number) => void;
  iframeRef: React.RefObject<HTMLDivElement | null>;
}

function DesktopPlayer({
  track, trackIndex, totalTracks,
  isPlaying, elapsed, duration,
  onPrev, onPlayPause, onNext, onSeek, iframeRef,
}: PlayerPanelProps) {
  return (
    <div
      className="hidden sm:flex items-center gap-4 glass rounded-full w-full"
      style={{ padding: "10px 20px 10px 10px" }}
      role="region"
      aria-label="Music player"
    >
      {/* Vinyl */}
      <VinylRecord isPlaying={isPlaying} size={84} iframeRef={iframeRef} />

      {/* Middle: title + seek */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {/* Title row */}
        <div className="flex items-baseline justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <p className="truncate font-semibold text-white leading-tight" style={{ fontSize: 14 }} title={track.title}>
              {track.title}
            </p>
            <p className="truncate text-white/55 leading-tight mt-0.5" style={{ fontSize: 11.5 }} title={track.artist}>
              {track.artist}
            </p>
          </div>
          <span className="shrink-0 tabular text-white/30 select-none" style={{ fontSize: 10 }}>
            {trackIndex + 1}/{totalTracks}
          </span>
        </div>
        {/* Seek */}
        <SeekBar elapsed={elapsed} duration={duration} onSeek={onSeek} />
      </div>

      {/* Time */}
      <div className="tabular text-white/40 select-none shrink-0 flex gap-1" style={{ fontSize: 10.5 }}>
        <span>{fmt(elapsed)}</span>
        <span>/</span>
        <span>{fmt(duration)}</span>
      </div>

      {/* Transport */}
      <TransportControls onPrev={onPrev} onPlayPause={onPlayPause} onNext={onNext} isPlaying={isPlaying} />
    </div>
  );
}

// ─── MobilePlayer ─────────────────────────────────────────────────────────────
function MobilePlayer({
  track, trackIndex, totalTracks,
  isPlaying, elapsed, duration,
  onPrev, onPlayPause, onNext, onSeek, iframeRef,
}: PlayerPanelProps) {
  return (
    <div
      className="sm:hidden glass w-full flex flex-col gap-3 p-4"
      style={{ borderRadius: 24 }}
      role="region"
      aria-label="Music player"
    >
      {/* Row 1: Vinyl + title */}
      <div className="flex items-center gap-3">
        <VinylRecord isPlaying={isPlaying} size={72} iframeRef={iframeRef} />
        <div className="flex-1 min-w-0">
          <p className="truncate font-semibold text-white leading-tight" style={{ fontSize: 14 }} title={track.title}>
            {track.title}
          </p>
          <p className="truncate text-white/55 leading-tight mt-0.5" style={{ fontSize: 11.5 }} title={track.artist}>
            {track.artist}
          </p>
          <p className="tabular text-white/30 mt-0.5 select-none" style={{ fontSize: 10 }}>
            {trackIndex + 1} / {totalTracks}
          </p>
        </div>
      </div>

      {/* Row 2: Seek */}
      <SeekBar elapsed={elapsed} duration={duration} onSeek={onSeek} />

      {/* Row 3: Time | Transport */}
      <div className="flex items-center justify-between">
        <div className="tabular text-white/40 select-none flex gap-1" style={{ fontSize: 10.5 }}>
          <span>{fmt(elapsed)}</span>
          <span>/</span>
          <span>{fmt(duration)}</span>
        </div>
        <TransportControls onPrev={onPrev} onPlayPause={onPlayPause} onNext={onNext} isPlaying={isPlaying} mobile />
        {/* balance spacer */}
        <div style={{ width: 40 }} aria-hidden="true" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MusicPlayer
// ─────────────────────────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const tracks = ALL_TRACKS;

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [elapsed, setElapsed]       = useState(0);
  const [duration, setDuration]     = useState(0);

  const playerRef   = useRef<YTPlayer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const desktopSlot = useRef<HTMLDivElement | null>(null);
  const mobileSlot  = useRef<HTMLDivElement | null>(null);

  const track = tracks[trackIndex];

  const startPoll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      try {
        const cur = p.getCurrentTime();
        const dur = p.getDuration();
        if (!isNaN(cur)) setElapsed(cur);
        if (!isNaN(dur) && dur > 0) setDuration(dur);
      } catch { /* not ready */ }
    }, 250);
  }, []);

  const stopPoll = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => {
    const getSlot = () => {
      if (!desktopSlot.current || !mobileSlot.current) return null;
      return window.getComputedStyle(desktopSlot.current).display !== "none"
        ? desktopSlot.current : mobileSlot.current;
    };

    const initPlayer = () => {
      const slot = getSlot();
      if (!slot) return;
      const mount = document.createElement("div");
      mount.id = "yt-mount";
      slot.appendChild(mount);

      playerRef.current = new window.YT.Player(mount, {
        width: "100%", height: "100%",
        videoId: track.videoId || "",
        playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1, playsinline: 1, iv_load_policy: 3, cc_load_policy: 0 },
        events: {
          onStateChange: (e: { data: number }) => {
            const S = window.YT.PlayerState;
            if (e.data === S.PLAYING) { setIsPlaying(true); startPoll(); }
            else if (e.data === S.PAUSED || e.data === S.BUFFERING) { setIsPlaying(false); stopPoll(); }
            else if (e.data === S.ENDED) { setIsPlaying(false); stopPoll(); setTrackIndex(i => (i + 1) % tracks.length); }
          },
          onError: (e: { data: number }) => {
            console.warn("[YT Error]", e.data, track.videoId);
            if (!track.videoId) return;
            try { (window as unknown as Record<string, (s: string, d: unknown) => void>).va?.("event", { name: "yt_error", data: { code: e.data, videoId: track.videoId } }); } catch {}
            setTrackIndex(i => (i + 1) % tracks.length);
          },
        },
      });
    };

    if (window.YT?.Player) initPlayer();
    else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => { stopPoll(); try { playerRef.current?.destroy(); } catch {} playerRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setElapsed(0); setDuration(track.duration); setIsPlaying(false); stopPoll();
    const p = playerRef.current;
    if (!p) return;
    if (!track.videoId) { try { p.pauseVideo(); } catch {} return; }
    p.loadVideoById(track.videoId);
    setTimeout(() => { try { p.playVideo(); } catch {} }, 300);
  }, [track, stopPoll]);

  const handlePlayPause = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    isPlaying ? p.pauseVideo() : p.playVideo();
  }, [isPlaying]);

  const handlePrev = useCallback(() => setTrackIndex(i => i === 0 ? tracks.length - 1 : i - 1), [tracks.length]);
  const handleNext = useCallback(() => setTrackIndex(i => (i + 1) % tracks.length), [tracks.length]);
  const handleSeek = useCallback((fraction: number) => {
    const p = playerRef.current;
    const dur = duration || track.duration;
    if (!p || !dur) return;
    const secs = fraction * dur;
    p.seekTo(secs, true);
    setElapsed(secs);
  }, [duration, track.duration]);

  const panelProps: PlayerPanelProps = {
    track, trackIndex, totalTracks: tracks.length,
    isPlaying, elapsed, duration: duration || track.duration,
    onPrev: handlePrev, onPlayPause: handlePlayPause, onNext: handleNext, onSeek: handleSeek,
    iframeRef: desktopSlot,
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <DesktopPlayer {...panelProps} iframeRef={desktopSlot} />
      <MobilePlayer  {...panelProps} iframeRef={mobileSlot}  />
    </div>
  );
}
