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
  title: "TWINS Lab — Intelligent Spatial Computing",
  description:
    "TWINS Lab explores how artificial intelligence can understand, model, and shape the spatial world.",
  openGraph: {
    title: "TWINS Lab — Intelligent Spatial Computing",
    description: "Towards Intelligent Spatial Computing at Southern Illinois University Carbondale.",
    images: [{ url: "/twins-hero-spatial-light.png", width: 1843, height: 853, alt: "TWINS Lab — Towards Intelligent Spatial Computing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TWINS Lab",
    description: "Towards Intelligent Spatial Computing",
    images: ["/twins-hero-spatial-light.png"],
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
