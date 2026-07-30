import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://twins-spatial-intelligence.lin00786.chatgpt.site"),
  title: "TWINS — Towards Spatial Intelligence",
  description:
    "A research lab building intelligent systems that perceive, reason about, and interact with the spatial world.",
  openGraph: {
    title: "TWINS Lab",
    description: "Towards Spatial Intelligence",
    images: [{ url: "/og-pink.png", width: 1730, height: 909, alt: "TWINS Lab — Towards Spatial Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TWINS Lab",
    description: "Towards Spatial Intelligence",
    images: ["/og-pink.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
