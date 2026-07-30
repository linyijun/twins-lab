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
  title: "TWINS LAB — Towards Intelligent Spatial Computing",
  description:
    "A research lab working at the intersection of AI, machine learning, and spatial sciences.",
  openGraph: {
    title: "TWINS Lab",
    description: "Towards Intelligent Spatial Computing",
    images: [{ url: "/og-dark.png", width: 1731, height: 909, alt: "TWINS Lab — Towards Intelligent Spatial Computing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TWINS Lab",
    description: "Towards Intelligent Spatial Computing",
    images: ["/og-dark.png"],
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
