// ─────────────────────────────────────────────────────────────────────────────
// Track data for "Songs that remind Bittu of Kush"
//
// HOW TO ADD / UPDATE A VIDEO ID — one-line change per song:
//   1. Find the OFFICIAL upload on YouTube (T-Series, Sony Music India, etc.)
//   2. Check embedding works: Share → Embed should be available.
//   3. Copy the 11-char ID from: youtube.com/watch?v=XXXXXXXXXXX
//   4. Paste it as the videoId value below and save — plays immediately.
//
// COPYRIGHT: Stream only from official rights-holder channels via YouTube IFrame API.
// ─────────────────────────────────────────────────────────────────────────────

export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number; // rough display value; actual length from YT API
  videoId: string;  // 11-char YouTube video ID — "" = not yet added
};

export type Playlist = {
  id: string;
  name: string;
  emoji: string;
  tracks: Track[];
};

// ─── Playlist 1: Dil Se — Romantic & Longing ─────────────────────────────────
const dilSe: Track[] = [
  { id: "darkhaast",      title: "Darkhaast",              artist: "Arijit Singh, Shreya Ghoshal", film: "Shivaay",            year: 2016, duration: 306, videoId: "e8TvhwwWBdY" },
  { id: "o-mere-dil",    title: "O Mere Dil Ke Chain",    artist: "Kishore Kumar",                film: "Mere Jeevan Saathi", year: 1972, duration: 277, videoId: "-Px0efU00uQ" },
  { id: "zara-sa",       title: "Zara Sa",                 artist: "KK",                          film: "Jannat",             year: 2008, duration: 303, videoId: "-8C_2BBVWk8" },
  { id: "guzarish",      title: "Guzarish",                artist: "Hrithik Roshan, Aishwarya",   film: "Guzaarish",          year: 2010, duration: 346, videoId: "rU4qEtDXfnM" },
  { id: "in-dino",       title: "In Dino",                 artist: "KK",                          film: "Life in a Metro",    year: 2007, duration: 281, videoId: "P7JyrhGnjhg" },
  { id: "laapata",       title: "Laapata",                 artist: "Atif Aslam",                  film: "Ek Tha Tiger",       year: 2012, duration: 320, videoId: "3PqxT1VqyNc" },
  { id: "phir-mohabbat", title: "Phir Mohabbat",           artist: "Arijit Singh",                film: "Murder 2",           year: 2011, duration: 274, videoId: "m1rcse8INWk" },
  { id: "o-meri-jaan",   title: "O Meri Jaan",             artist: "KK",                          film: "Life in a Metro",    year: 2007, duration: 260, videoId: "kuhdyHPEgN0" },
  { id: "mat-aazma-re",  title: "Mat Aazma Re",            artist: "Arijit Singh",                film: "Murder 3",           year: 2013, duration: 258, videoId: "f85c6kZ9H6g" },
  { id: "jaana",         title: "Jaana",                   artist: "Ali Zafar",                   film: "Tere Bin Laden",     year: 2010, duration: 237, videoId: "dxHODUOBkng" },
  { id: "teri-juhki",    title: "Teri Jhuki Nazar",        artist: "",                            film: "",                   year: 2000, duration: 240, videoId: "OgdjXYm-0is" },
];

// ─── Playlist 2: Raat Ke Rang — Night & Melancholy ───────────────────────────
const raatKeRang: Track[] = [
  { id: "behroopia",       title: "Behroopia",              artist: "Mohit Chauhan",               film: "Lootera",            year: 2013, duration: 292, videoId: "d0SIqaP9fLg" },
  { id: "gehra-hua",       title: "Gehra Hua",              artist: "Arijit Singh",                film: "Gehraiyaan",         year: 2022, duration: 244, videoId: "wf-nz-dQkd4" },
  { id: "adhoore",         title: "Adhoore",                artist: "Mohit Chauhan",               film: "Creature 3D",        year: 2014, duration: 275, videoId: "_-t-FcK_9mo" },
  { id: "haareya",         title: "Haareya",                artist: "Arijit Singh",                film: "Meri Pyaari Bindu",  year: 2017, duration: 239, videoId: "TyMUY2CDrjc" },
  { id: "kinaare",         title: "Kinaare",                artist: "Arijit Singh",                film: "Hamari Adhuri Kahani",year: 2015, duration: 297, videoId: "9uJ4tjQhNOg" },
  { id: "tu-he-meri-shab", title: "Tu Hi Meri Shab Hai",   artist: "Mithoon",                     film: "Gangster",           year: 2006, duration: 281, videoId: "cGNcjqXe87U" },
  { id: "dil-toh-baccha",  title: "Dil Toh Baccha Hai Ji", artist: "Rahat Fateh Ali Khan",        film: "Ishqiya",            year: 2010, duration: 300, videoId: "_TJZaE0FkKs" },
  { id: "agar-tum-kaho",   title: "Agar Tum Kaho",          artist: "Benny Dayal",                 film: "Faltu",              year: 2011, duration: 250, videoId: "NqpffCdUsY4" },
  { id: "daraaz-mein",     title: "Daraaz Mein",            artist: "Prateek Kuhad",               film: "",                   year: 2018, duration: 240, videoId: "qXNcrFshDNE" },
  { id: "kamikaze",        title: "Kamikaze",               artist: "Seedhe Maut",                 film: "",                   year: 2020, duration: 185, videoId: "W65IefaK_E0" },
  { id: "taaron-se",       title: "Taaron Se",              artist: "",                            film: "",                   year: 2000, duration: 240, videoId: "WrczwHORF60" },
];

// ─── Playlist 3: Yaadein — Nostalgia & Classics ──────────────────────────────
const yaadein: Track[] = [
  { id: "pal-pal",       title: "Pal Pal Dil Ke Paas",    artist: "Kishore Kumar",               film: "Blackmail",          year: 1973, duration: 270, videoId: "AMuRRXCuy-4" },
  { id: "ye-kahaan",     title: "Yeh Kahaan Aa Gaye Hum", artist: "Lata Mangeshkar, Amitabh",    film: "Silsila",            year: 1981, duration: 368, videoId: "43wT0xhvfsA" },
  { id: "yeh-vada-raha", title: "Yeh Wada Raha",          artist: "Kishore Kumar, Lata",         film: "Yeh Wada Raha",      year: 1982, duration: 298, videoId: "wc19NBL-Xis" },
  { id: "jaanisaar",     title: "Jaanisaar",               artist: "Rahat Fateh Ali Khan",        film: "Jaanisaar",          year: 2015, duration: 310, videoId: "FXMWQmTeyC0" },
  { id: "sajni-jal",     title: "Sajni",                   artist: "JAL",                         film: "",                   year: 2007, duration: 301, videoId: "IDOghyqFA8s" },
  { id: "pyar-encore",   title: "Pyaar Encore",            artist: "Benny Dayal",                 film: "",                   year: 2013, duration: 220, videoId: "s4DJTSFJkT8" },
  { id: "tujhe-sochta",  title: "Tujhe Sochta Hoon",       artist: "Mohit Chauhan",               film: "Jannat 2",           year: 2012, duration: 263, videoId: "psqZYRRb22U" },
  { id: "tu-he-mera",    title: "Tu Hi Mera",              artist: "Atif Aslam",                  film: "Creature 3D",        year: 2014, duration: 291, videoId: "d2qdSzqD3p8" },
  { id: "ishq-hulaare",  title: "Ishq Hulaarey",           artist: "Salim-Sulaiman",              film: "Love Aaj Kal",       year: 2009, duration: 231, videoId: "QtfHL7WfVCo" },
  { id: "haal-ae-dil",   title: "Haal-E-Dil",             artist: "KK, Salim Merchant",          film: "Murder 2",           year: 2011, duration: 253, videoId: "ZuMLl7BI6D4" },
  { id: "thagyaan",      title: "Thagyaan",                artist: "Rabbi Shergill",              film: "",                   year: 2014, duration: 280, videoId: "nNZvaMoiATE" },
  { id: "rakhlo-tum",    title: "Rakh Lo Tum Chupaake",   artist: "Shilpa Rao",                  film: "",                   year: 2016, duration: 264, videoId: "slN2QlYr_-c" }, // stripped stray leading "/" from your ID
  { id: "kali-kali",     title: "Kali Kali Zulfon Ke…",   artist: "Nusrat Fateh Ali Khan",       film: "",                   year: 1994, duration: 395, videoId: "lsqsggtTZfs" },
];

export const PLAYLISTS: Playlist[] = [
  { id: "dil-se",       name: "Dil Se",       emoji: "💛", tracks: dilSe      },
  { id: "raat-ke-rang", name: "Raat Ke Rang", emoji: "🌙", tracks: raatKeRang  },
  { id: "yaadein",      name: "Yaadein",      emoji: "🎞️", tracks: yaadein    },
];

// Flat list of every song — used when playlist tabs are hidden
export const ALL_TRACKS: Track[] = [
  ...dilSe,
  ...raatKeRang,
  ...yaadein,
];

