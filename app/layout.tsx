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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://m1-aviation-website.vercel.app"
  ),
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
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": "https://m1-aviation-website.vercel.app/#organization",
      "name": "M1 Aviation",
      "alternateName": ["M1", "M1 Aviation Ecosystem", "M1 Private Jet Marketplace"],
      "legalName": "M1 Aviation Inc.",
      "url": "https://m1-aviation-website.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://m1-aviation-website.vercel.app/#logo",
        "url": "https://m1-aviation-website.vercel.app/m1-logo.png",
        "caption": "M1 Aviation Logo"
      },
      "image": [
        "https://m1-aviation-website.vercel.app/m1-logo.png",
        "https://m1-aviation-website.vercel.app/images/marketplace-card.jpg",
        "https://m1-aviation-website.vercel.app/images/jet-evolution-7.png"
      ],
      "description":
        "M1 Aviation is the unified digital ecosystem for business aviation: verified aircraft marketplace with 7-step assisted acquisition, SIOS autonomous operating intelligence, and global industry partner alliance.",
      "telephone": "+1-800-612-3760",
      "email": "contact@m-1.tech",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Brock Road",
        "addressLocality": "Pickering",
        "addressRegion": "Ontario",
        "postalCode": "L1V 2P8",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.8384,
        "longitude": -79.0868
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "priceRange": "$$$$",
      "currenciesAccepted": "USD, EUR, GBP, CAD",
      "paymentAccepted": "Bank Wire, Escrow Deposit, Certified Funds",
      "areaServed": [
        "Worldwide",
        "North America",
        "Europe",
        "Middle East",
        "Asia-Pacific"
      ],
      "department": [
        {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "name": "M1 Aviation Global Operations & Advisory",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Brock Road",
            "addressLocality": "Pickering",
            "addressRegion": "Ontario",
            "postalCode": "L1V 2P8",
            "addressCountry": "CA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.8384,
            "longitude": -79.0868
          },
          "telephone": "+1-800-612-3760",
          "email": "contact@m-1.tech"
        },
        {
          "@type": ["LocalBusiness", "ResearchOrganization"],
          "name": "M1 Aviation Technology & Research Center",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2nd Floor, Hall No. 2, WWIC, UOS, University Road",
            "addressLocality": "Sargodha",
            "addressRegion": "Punjab",
            "postalCode": "40100",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.0740,
            "longitude": 72.6861
          },
          "telephone": "+1-800-612-3760",
          "email": "contact@m-1.tech"
        }
      ],
      "foundingDate": "2026",
      "founder": {
        "@type": "Person",
        "name": "Rayyan Shuja",
        "jobTitle": "Founder & CEO"
      },
      "sameAs": [
        "https://linkedin.com/company/m1-aviation",
        "https://x.com/m1_aviation",
        "https://instagram.com/m1_aviation",
        "https://app.m-1.tech"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-800-612-3760",
          "email": "contact@m-1.tech",
          "contactType": "Customer Support & Aircraft Brokerage Inquiries",
          "areaServed": "Worldwide",
          "availableLanguage": ["English"]
        },
        {
          "@type": "ContactPoint",
          "email": "contact@m-1.tech",
          "contactType": "Executive Consultation & Flight Operations",
          "url": "https://cal.com/m1-aviation"
        }
      ],
      "knowsAbout": [
        "Business Aviation",
        "Private Jet Marketplace",
        "Aircraft Acquisition Advisory",
        "Pre-Owned Business Jets",
        "Part 145 Pre-Purchase Inspection (PPI)",
        "Aircraft Escrow and Title Clearance",
        "SIOS (Super Intelligent Operating System)",
        "Predictive Maintenance for Business Jets",
        "Gulfstream G650 / G700 / G800 Fleet Transactions",
        "Bombardier Global 7500 / Challenger Management",
        "Cessna Citation Latitude and CJ3+ Brokerage",
        "Embraer Phenom 300E Acquisitions",
        "Modern Alternatives to Flightdocs and TRAX",
        "Ramco Aviation and Swiss-AS AMOS Replacement",
        "Digital Airframe Provenance and Logbook Auditing",
        "Vetted Aviation Industry Partner Deal Rooms"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "M1 Aviation Solutions Catalog",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "M1 Marketplace 7-Step Assisted Acquisition",
              "description": "End-to-end verified pre-owned aircraft transaction advisory including logbook audit, escrow structuring, Part 145 PPI, and Cape Town title clearance."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "SoftwareApplication",
              "name": "SIOS Operating Intelligence",
              "description": "Autonomous AI platform for real-time telemetry ingestion, predictive maintenance forecasting, and compliance tracking for private aircraft."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Industry Partner Alliance Deal Room",
              "description": "Accredited broker and operator network for co-brokered aircraft sales, shared telemetry, and institutional escrow settlement."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://m1-aviation-website.vercel.app/#website",
      "url": "https://m1-aviation-website.vercel.app",
      "name": "M1 Aviation",
      "publisher": {
        "@id": "https://m1-aviation-website.vercel.app/#organization"
      },
      "description":
        "Verified business jet marketplace, 7-step assisted acquisition, and SIOS autonomous operating intelligence.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://m1-aviation-website.vercel.app/aviation-times?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Service",
      "@id": "https://m1-aviation-website.vercel.app/#marketplace",
      "name": "M1 Marketplace & 7-Step Assisted Acquisition",
      "provider": {
        "@id": "https://m1-aviation-website.vercel.app/#organization"
      },
      "serviceType": "Aircraft Brokerage & Transaction Advisory",
      "description":
        "Verified private aircraft marketplace offering 100% verified listings, neutral escrow protection, Part 145 inspection oversight, and a structured 7-step acquisition process.",
      "url": "https://m1-aviation-website.vercel.app/marketplace"
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
        "@id": "https://m1-aviation-website.vercel.app/#organization"
      }
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
              "M1 Aviation is a unified business aviation digital ecosystem uniting an AI-driven pre-owned aircraft marketplace, SIOS (Super Intelligent Operating System) for proactive maintenance and telemetry, and an accredited network of industry partners including BN Aviation, Velari Jets, and 7IVS."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I buy or sell a business jet safely with verified escrow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "M1 Marketplace (https://m1-aviation-website.vercel.app/marketplace) provides a verified airframe transaction platform with institutional third-party escrow and a structured 7-step assisted acquisition process to eliminate ghost listings and transactional fraud."
          }
        },
        {
          "@type": "Question",
          "name": "How does the M1 Marketplace 7-Step Assisted Acquisition work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The 7-step process guides buyers safely from preliminary mission fit assessment, logbook provenance audit, and secure escrow deposit, through to Part 145 pre-purchase inspection, Cape Town Convention legal clearing, acceptance flight, and post-delivery onboarding onto SIOS."
          }
        },
        {
          "@type": "Question",
          "name": "What is SIOS in aviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "SIOS stands for Super Intelligent Operating System. It is an autonomous software intelligence layer for business jets that automatically captures flight telemetry, forecasts predictive maintenance, monitors FAA/EASA airworthiness directives, and maintains an immutable digital airframe provenance."
          }
        },
        {
          "@type": "Question",
          "name": "How is M1 Aviation different from legacy aviation software like Flightdocs, TRAX, or Ramco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Unlike legacy tools (Flightdocs, TRAX, Ramco, Swiss-AS) that require manual data entry and siloed maintenance binders, M1 provides an autonomous, closed-loop ecosystem uniting live marketplace acquisitions, predictive telemetry intelligence (SIOS), and an accredited partner deal room."
          }
        },
        {
          "@type": "Question",
          "name": "How does M1 Aviation compare to traditional aircraft brokerages like Jetcraft?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Traditional brokerages rely on manual email/phone negotiations and static PDF spec sheets. M1 Aviation combines digital verification, real-time telemetry from SIOS, automated provenance logbook auditing, and institutional escrow settlement for faster, transparent closings."
          }
        },
        {
          "@type": "Question",
          "name": "Where is M1 Aviation located and what are its operational hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "M1 Aviation operates globally with headquarters on Brock Road in Pickering, Ontario, Canada, and a Technology & Research Center in Sargodha, Pakistan. Flight advisory and transaction escrow support operate 24/7 globally via contact@m-1.tech and cal.com/m1-aviation."
          }
        },
        {
          "@type": "Question",
          "name": "How can I book an aircraft acquisition or fleet intelligence consultation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Prospective buyers, sellers, and operators can schedule a direct consultation with the M1 Aviation executive team via https://cal.com/m1-aviation or explore live listings on the terminal at https://app.m-1.tech."
          }
        }
      ]
    }
  ]
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
