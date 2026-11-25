import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Partner Alliance | Accredited Brokers, MROs & Operators | M1 Aviation",
  description:
    "Join the M1 Aviation Industry Partner Alliance. Verified business jet brokers, Part 145 repair stations, and charter operators collaborating on secure deal rooms, shared telemetry datasets, and priority transaction settlement.",
  keywords: [
    "aviation industry partners",
    "aircraft broker network",
    "Part 145 repair station alliance",
    "private jet charter alliance",
    "co-brokering business jets",
    "M1 Aviation partners",
    "Andrei Melentev ATM Jets",
    "Nicola Nobile BN Aviation",
    "Nolan Kiely",
    "Fortress Jide",
  ],
  alternates: {
    canonical: "/industry-partner",
  },
  openGraph: {
    title: "Industry Partner Alliance | M1 Aviation",
    description:
      "Global coalition of certified aircraft brokers, Part 145 MRO facilities, and charter operators.",
    url: "https://m1.rsinternational.net/industry-partner",
    siteName: "M1 Aviation",
    images: [
      {
        url: "/images/marketplace-card.jpg",
        width: 1200,
        height: 630,
        alt: "M1 Aviation Industry Partner Alliance",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Partner Alliance | M1 Aviation",
    description:
      "Connecting accredited aviation brokers and MROs with institutional deal rooms and verified datasets.",
  },
};

export default function IndustryPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
