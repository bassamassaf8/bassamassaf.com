import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bassam Assaf - Developer & Creator",
  description:
    "Portfolio of Bassam Assaf - Crafting digital experiences, building meaningful products, and pushing boundaries in web development.",
  keywords: [
    "Bassam Assaf",
    "developer",
    "portfolio",
    "web development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Bassam Assaf" }],
  creator: "Bassam Assaf",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Bassam Assaf - Developer & Creator",
    description:
      "Portfolio of Bassam Assaf - Crafting digital experiences, building meaningful products, and pushing boundaries in web development.",
    url: "https://bassamassaf.com",
    siteName: "Bassam Assaf Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bassam Assaf - Developer & Creator",
    description:
      "Portfolio of Bassam Assaf - Crafting digital experiences, building meaningful products, and pushing boundaries in web development.",
    creator: "@bassam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
