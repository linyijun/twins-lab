import type { Metadata } from "next";
import { absoluteSiteUrl, sitePath, siteUrl } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TWINS Lab — Intelligent Spatial Computing",
  description:
    "TWINS Lab explores how artificial intelligence can understand, model, and shape the spatial world.",
  openGraph: {
    title: "TWINS Lab — Intelligent Spatial Computing",
    description: "Towards Intelligent Spatial Computing at Southern Illinois University Carbondale.",
    images: [{ url: absoluteSiteUrl("/twins-hero-spatial-lowered.png"), width: 1843, height: 853, alt: "TWINS Lab — Towards Intelligent Spatial Computing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TWINS Lab",
    description: "Towards Intelligent Spatial Computing",
    images: [absoluteSiteUrl("/twins-hero-spatial-lowered.png")],
  },
  icons: {
    icon: sitePath("/favicon.svg"),
    shortcut: sitePath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
