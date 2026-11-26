import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AVI Times | Business Aviation Research & Aerospace Intelligence | M1 Aviation",
  description:
    "Authoritative research publications, market intelligence, and macro economic analyses covering private jet manufacturing bottlenecks, VC investment in aviation tech, and autonomous avionics.",
  keywords: [
    "AVI Times",
    "aviation research",
    "business jet market intelligence",
    "aerospace supply chain",
    "aircraft manufacturing backlogs",
    "private aviation investments",
    "M1 Aviation publications",
    "Areez Rao aviation articles",
  ],
  alternates: {
    canonical: "/aviation-times",
  },
  openGraph: {
    title: "AVI Times | Business Aviation Research & Macro Insights",
    description:
      "Deep-dive research on aerospace bottlenecks, OEM delivery delays, and the autonomous future of business aviation.",
    url: "https://m1.rsinternational.net/aviation-times",
    siteName: "M1 Aviation",
    images: [
      {
        url: "/images/marketplace-card.jpg",
        width: 1200,
        height: 630,
        alt: "AVI Times – M1 Aviation Research",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVI Times | M1 Aviation Research Publication",
    description:
      "Market intelligence analyzing private aviation supply chains, VC trends, and autonomous operations.",
  },
};

const aviTimesHubJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Periodical",
      "@id": "https://m1.rsinternational.net/aviation-times/#periodical",
      "name": "AVI Times",
      "url": "https://m1.rsinternational.net/aviation-times",
      "description":
        "Monthly business aviation research, macroeconomic reports, and aerospace intelligence published by M1 Aviation.",
      "publisher": {
        "@type": "Organization",
        "name": "M1 Aviation",
        "url": "https://m1.rsinternational.net",
        "sameAs": [
          "https://ca.linkedin.com/company/m-onee",
          "https://www.linkedin.com/company/m-onee"
        ]
      }
    }
  ]
};

export default function AviationTimesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aviTimesHubJsonLd) }}
      />
      {children}
    </>
  );
}
