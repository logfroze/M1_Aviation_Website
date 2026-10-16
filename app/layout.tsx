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
  metadataBase: new URL("https://m1-aviation-website.vercel.app"),
  title: {
    default: "M1 Aviation | Business Aviation Digital Ecosystem",
    template: "%s | M1 Aviation",
  },
  description:
    "The premier digital ecosystem for business aviation: M1 Marketplace, SIOS autonomous operating intelligence, and vetted industry partner alliance.",
  keywords: [
    "business aviation",
    "private jet marketplace",
    "aircraft acquisition",
    "SIOS",
    "pre-owned private jets",
    "aircraft maintenance intelligence",
    "aviation operating system",
    "M1 Aviation",
    "aircraft escrow",
    "business jet pre-purchase inspection",
  ],
  authors: [{ name: "M1 Aviation" }],
  creator: "M1 Aviation",
  publisher: "M1 Aviation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "M1 Aviation | Business Aviation Digital Ecosystem",
    description:
      "The premier digital ecosystem for business aviation: M1 Marketplace, SIOS autonomous operating intelligence, and vetted industry partner alliance.",
    url: "https://m1-aviation-website.vercel.app",
    siteName: "M1 Aviation",
    images: [
      {
        url: "/m1-logo.png",
        width: 1200,
        height: 630,
        alt: "M1 Aviation Digital Ecosystem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M1 Aviation | Business Aviation Digital Ecosystem",
    description:
      "The premier digital ecosystem for business aviation: M1 Marketplace, SIOS autonomous operating intelligence, and vetted industry partner alliance.",
    images: ["/m1-logo.png"],
    creator: "@m1_aviation",
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
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://m1-aviation-website.vercel.app/#organization",
      "name": "M1 Aviation",
      "url": "https://m1-aviation-website.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://m1-aviation-website.vercel.app/m1-logo.png",
      },
      "description":
        "M1 Aviation is the unified digital ecosystem for business aviation: verified aircraft marketplace, SIOS operating intelligence, and premier industry partner alliance.",
      "foundingDate": "2026",
      "founder": {
        "@type": "Person",
        "name": "Rayyan Shuja",
      },
      "sameAs": [
        "https://linkedin.com/company/m1-aviation",
        "https://x.com/m1_aviation",
        "https://instagram.com/m1_aviation",
        "https://app.m-1.tech",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@m-1.tech",
        "contactType": "Customer Support & Brokerage Inquiries",
        "url": "https://cal.com/m1-aviation",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://m1-aviation-website.vercel.app/#website",
      "url": "https://m1-aviation-website.vercel.app",
      "name": "M1 Aviation",
      "publisher": {
        "@id": "https://m1-aviation-website.vercel.app/#organization",
      },
      "description":
        "Verified business jet marketplace, 7-step assisted acquisition, and SIOS autonomous operating intelligence.",
    },
    {
      "@type": "Service",
      "@id": "https://m1-aviation-website.vercel.app/#marketplace",
      "name": "M1 Marketplace & 7-Step Assisted Acquisition",
      "provider": {
        "@id": "https://m1-aviation-website.vercel.app/#organization",
      },
      "serviceType": "Aircraft Brokerage & Transaction Advisory",
      "description":
        "Verified private aircraft marketplace offering 100% verified listings, neutral escrow protection, Part 145 inspection oversight, and a structured 7-step acquisition process.",
      "url": "https://m1-aviation-website.vercel.app/marketplace",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://m1-aviation-website.vercel.app/#sios",
      "name": "SIOS (Super Intelligent Operating System)",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Cloud / Avionics Telemetry Integration",
      "description":
        "Autonomous operating intelligence for business aviation that unifies telemetry, predictive maintenance, and digital provenance.",
      "url": "https://m1-aviation-website.vercel.app/saios",
      "creator": {
        "@id": "https://m1-aviation-website.vercel.app/#organization",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://m1-aviation-website.vercel.app/#faqs",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is M1 Aviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "M1 Aviation is a unified business aviation digital ecosystem uniting an AI-driven pre-owned aircraft marketplace, SIOS (Super Intelligent Operating System) for proactive maintenance and telemetry, and an accredited network of industry partners including BN Aviation, Velari Jets, and 7IVS.",
          },
        },
        {
          "@type": "Question",
          "name": "How does the M1 Marketplace 7-Step Assisted Acquisition work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The 7-step process guides buyers safely from preliminary mission fit assessment, logbook provenance audit, and secure escrow deposit, through to Part 145 pre-purchase inspection, Cape Town Convention legal clearing, acceptance flight, and post-delivery onboarding onto SIOS.",
          },
        },
        {
          "@type": "Question",
          "name": "What is SIOS in aviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "SIOS stands for Super Intelligent Operating System. It is an autonomous software intelligence layer for business jets that automatically captures flight telemetry, forecasts predictive maintenance, monitors FAA/EASA airworthiness directives, and maintains an immutable digital airframe provenance.",
          },
        },
        {
          "@type": "Question",
          "name": "How is M1 Aviation different from legacy aviation software like Flightdocs or TRAX?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Unlike legacy tools that rely on manual data entry and siloed maintenance binders, M1 provides a closed-loop ecosystem uniting marketplace transactions, autonomous operating intelligence (SIOS), and a collaborative partner deal room.",
          },
        },
      ],
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
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
