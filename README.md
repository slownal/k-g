# Nostalgia Music Site

A personal music player — **"Songs that remind Bittu of Kush"**

Built with Next.js 15 App Router · TypeScript · Tailwind CSS v4 · YouTube IFrame API

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Adding / verifying video IDs

All tracks are in [`app/lib/tracks.ts`](./app/lib/tracks.ts).

To add a video ID:
1. Find the **official rights-holder upload** on YouTube (T-Series, Sony Music, Zee Music, Saregama, etc.)
2. Confirm embedding is enabled: try **Share → Embed** in YouTube
3. Copy the 11-character `videoId` from the URL
4. Paste it in the `videoId: ""` field — that is the **only change needed**

> ⚠️ **Copyright**: These songs are streamed from official rights-holder channels via the YouTube IFrame API. Do not re-host audio or video files.

## Customising social links

Edit [`app/components/SocialLinks.tsx`](./app/components/SocialLinks.tsx) — update the `href` fields with your profile URLs.

## Background images

- `public/bg/scene-wide.png` — landscape (web/desktop)  
- `public/bg/scene-tall.png` — portrait (mobile)

The CSS in `app/globals.css` auto-swaps them via `@media (orientation: portrait)`.

## Deploy

```bash
npm run build
npx vercel deploy
```
