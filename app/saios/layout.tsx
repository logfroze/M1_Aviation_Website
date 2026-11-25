import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIOS | Super Intelligent Operating System for Business Aviation",
  description:
    "SIOS (Super Intelligent Operating System) by M1 Aviation: autonomous avionics neural architecture unifying real-time flight telemetry, 6 core avionics functions, 30+ aviation tools matrix, and predictive MRO maintenance.",
  keywords: [
    "SIOS",
    "Super Intelligent Operating System",
    "aviation neural architecture",
    "predictive aircraft maintenance",
    "avionics telemetry software",
    "CAMP alternative",
    "Flightdocs replacement",
    "business jet operating system",
    "M1 Aviation SIOS",
    "Areez Rao SIOS",
  ],
  alternates: {
    canonical: "/saios",
  },
  openGraph: {
    title: "SIOS | Super Intelligent Operating System – M1 Aviation",
    description:
      "Autonomous avionics neural architecture and 30+ unified aviation tools matrix for private aircraft fleets.",
    url: "https://m1.rsinternational.net/saios",
    siteName: "M1 Aviation",
    images: [
      {
        url: "/images/marketplace-card.jpg",
        width: 1200,
        height: 630,
        alt: "SIOS Avionics Neural Architecture",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIOS | Super Intelligent Operating System",
    description:
      "Autonomous business jet telemetry, predictive maintenance, and avionics intelligence by M1 Aviation.",
  },
};

const saiosJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://m1.rsinternational.net/saios/#software",
      "name": "SIOS (Super Intelligent Operating System)",
      "operatingSystem": "Cloud, Avionics Bus Telemetry, Web",
      "applicationCategory": "BusinessApplication",
      "description":
        "Autonomous operating intelligence for business aviation that unifies aircraft telemetry, predictive maintenance (MRO), regulatory compliance, and a 30+ tool aviation software matrix.",
      "url": "https://m1.rsinternational.net/saios",
      "author": {
        "@type": "Person",
        "name": "Areez Rao",
        "jobTitle": "Founder, M1 Aviation & SIOS"
      },
      "creator": {
        "@type": "Organization",
        "name": "M1 Aviation",
        "url": "https://m1.rsinternational.net"
      },
      "featureList": [
        "Extreme compute density for flight envelope telemetry",
        "Autonomous decision heuristics across airframe fleets",
        "Ultra-low-latency core interfacing avionics buses",
        "Connected global grid linking aircraft, crews & MROs",
        "Top 30 Unified Aviation Tools Curved Matrix",
        "Predictive component wear and automated maintenance scheduling"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://m1.rsinternational.net/saios/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is SIOS by M1 Aviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SIOS (Super Intelligent Operating System), founded by Areez Rao, is an autonomous operating intelligence system connecting aircraft telemetry, predictive maintenance, and 30+ essential aviation tools into one unified avionics dashboard."
          }
        },
        {
          "@type": "Question",
          "name": "What are the 6 Core Functions of SIOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 6 core functions of SIOS are: 1. Extreme compute density for flight envelope telemetry; 2. Autonomous fleet-level decision heuristics; 3. Ultra-low-latency avionics bus interfacing; 4. Connected global grid linking aircraft, crews & Part 145 MROs; 5. Tamper-proof digital airframe provenance; and 6. Proactive airworthiness compliance."
          }
        }
      ]
    }
  ]
};

export default function SaiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(saiosJsonLd) }}
      />
      {children}
    </>
  );
}
