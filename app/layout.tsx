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
    title: "TWINS Lab — Intelligence has a place.",
    description: "Towards Intelligent Spatial Computing at Southern Illinois University Carbondale.",
    images: [{ url: "/og-twins.png", width: 1731, height: 909, alt: "TWINS Lab — Intelligence has a place" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TWINS Lab",
    description: "Towards Intelligent Spatial Computing",
    images: ["/og-twins.png"],
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
