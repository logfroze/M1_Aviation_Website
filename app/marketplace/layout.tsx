import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M1 Marketplace | Verified Pre-Owned Business Jet Acquisition & 7-Step Escrow",
  description:
    "The premier digital marketplace for buying and selling private jets. 100% verified aircraft listings, transparent market intelligence, Part 145 inspection oversight, and a structured 7-step assisted acquisition process.",
  keywords: [
    "private jet marketplace",
    "buy business jet",
    "pre-owned private jet",
    "aircraft acquisition",
    "7-step assisted acquisition",
    "aircraft escrow",
    "Gulfstream for sale",
    "Bombardier Global 7500",
    "Citation CJ3+",
    "Embraer Phenom 300E",
    "M1 Aviation Marketplace",
  ],
  alternates: {
    canonical: "/marketplace",
  },
  openGraph: {
    title: "M1 Marketplace | Verified Business Jet Acquisition Platform",
    description:
      "Eliminating ghost listings with verified aircraft data, institutional escrow, and 7-step assisted acquisitions.",
    url: "https://m1.rsinternational.net/marketplace",
    siteName: "M1 Aviation",
    images: [
      {
        url: "/images/marketplace-card.jpg",
        width: 1200,
        height: 630,
        alt: "M1 Private Jet Marketplace",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M1 Marketplace | Verified Private Jet Transactions",
    description:
      "Buy or sell executive aircraft with verified serial numbers, Part 145 inspection oversight, and institutional escrow.",
  },
};

const marketplaceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://m1.rsinternational.net/marketplace/#service",
      "name": "M1 Marketplace & 7-Step Assisted Acquisition",
      "provider": {
        "@type": "Organization",
        "name": "M1 Aviation",
        "url": "https://m1.rsinternational.net"
      },
      "serviceType": "Aircraft Brokerage & Transaction Advisory",
      "description":
        "End-to-end verified private aircraft acquisition and sale with neutral escrow settlement, Part 145 inspection oversight, and Cape Town Convention title clearance.",
      "url": "https://m1.rsinternational.net/marketplace"
    },
    {
      "@type": "FAQPage",
      "@id": "https://m1.rsinternational.net/marketplace/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does M1 Marketplace ensure private jet listings are verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every airframe listed on M1 Marketplace undergoes a comprehensive serial number audit, maintenance logbook verification, and owner identity confirmation before public display, eliminating ghost listings and price misrepresentation."
          }
        },
        {
          "@type": "Question",
          "name": "What is the 7-Step Assisted Acquisition process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 7-step assisted acquisition process includes: 1. Mission fit assessment; 2. Comprehensive logbook and provenance audit; 3. Escrow structuring and deposit initiation; 4. Part 145 pre-purchase inspection (PPI); 5. Aircraft purchase agreement and Cape Town legal clearing; 6. Acceptance flight and title transfer; and 7. Post-delivery onboarding onto SIOS."
          }
        }
      ]
    }
  ]
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marketplaceJsonLd) }}
      />
      {children}
    </>
  );
}
