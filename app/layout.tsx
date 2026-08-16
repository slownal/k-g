import type { Metadata, Viewport } from "next";
import { Inter, Yatra_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Songs that remind Bittu of Kush",
  description:
    "सोंग्स दैट रिमाइंड बिट्टू ऑफ़ कुस — A romantic music player.",
  openGraph: {
    title: "Songs that remind Bittu of Kush",
    description: "सोंग्स दैट रिमाइंड बिट्टू ऑफ़ कुस",
    type: "website",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${inter.variable} ${yatraOne.variable}`}>
      <body className="bg-black" suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
