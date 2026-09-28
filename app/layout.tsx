import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M1 Aviation | Business Aviation Digital Ecosystem",
  description:
    "The premier digital ecosystem for business aviation: M1 Marketplace, SAIOS operating intelligence, and industry partner network.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-black text-[#f5efeb] antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-black text-[#f5efeb] selection:bg-zinc-800 selection:text-white relative">
        <SmoothScroll>
          <CustomCursor />

          {/* Gentle white light shadow in the background of full website */}
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
          >
            {/* Upper diffused white light glow */}
            <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1300px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.045)_0%,_rgba(255,255,255,0.012)_45%,_transparent_75%)] rounded-full blur-3xl" />

            {/* Mid-page ambient soft white spotlight */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.038)_0%,_rgba(255,255,255,0.01)_50%,_transparent_75%)] rounded-full blur-3xl" />

            {/* Lower ambient soft white highlight */}
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1300px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.035)_0%,_rgba(255,255,255,0.008)_45%,_transparent_70%)] rounded-full blur-3xl" />

            {/* Soft vignette along outer perimeter for cinematic depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.45)_100%)]" />
          </div>

          <Navbar />
          <main className="flex-1 w-full flex flex-col relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
