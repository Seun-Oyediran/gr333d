import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../../public/style/global.css";
import Provider from "@/state/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GR333D",
  description:
    "A boundless journey through the soundscapes of my favorite albums. Explore an infinite grid of musical masterpieces, each one a portal to memories, emotions, and timeless artistry. Dive in and let the music guide you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
