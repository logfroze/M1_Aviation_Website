import type { Metadata } from "next";
import { SAMPLE_ARTICLES } from "@/data/articles";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = SAMPLE_ARTICLES.find((a) => a.id === id);

  if (!article) {
    return {
      title: "Article Not Found | AVI Times – M1 Aviation",
      description: "Business aviation research article by M1 Aviation.",
    };
  }

  const articleUrl = `https://m1.rsinternational.net/aviation-times/${article.id}`;
  const rawImage = article.imageUrl || "/images/marketplace-card.jpg";
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `https://m1.rsinternational.net${rawImage}`;

  return {
    title: `${article.title} | AVI Times Edition ${article.editionNumber} – M1 Aviation`,
    description: article.summary,
    keywords: [
      article.category,
      "AVI Times",
      "M1 Aviation",
      "Areez Rao",
      "business aviation research",
      "private jet market intelligence",
    ],
    alternates: {
      canonical: `/aviation-times/${article.id}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: articleUrl,
      type: "article",
      publishedTime: article.date,
      authors: ["https://ca.linkedin.com/in/areez-rao"],
      siteName: "M1 Aviation",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [imageUrl],
    },
  };
}

export default async function ArticleLayout({ params, children }: Props) {
  const { id } = await params;
  const article = SAMPLE_ARTICLES.find((a) => a.id === id);

  const articleJsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": `https://m1.rsinternational.net/aviation-times/${article.id}/#article`,
        "headline": article.title,
        "description": article.summary,
        "image": [
          (article.imageUrl && article.imageUrl.startsWith("http"))
            ? article.imageUrl
            : `https://m1.rsinternational.net${article.imageUrl || "/images/marketplace-card.jpg"}`,
        ],
        "datePublished": article.date,
        "dateModified": "2026-11-27",
        "author": [
          {
            "@type": "Person",
            "name": "Areez Rao",
            "jobTitle": "Founder, M1 Aviation & SIOS",
            "url": "https://ca.linkedin.com/in/areez-rao",
            "sameAs": [
              "https://ca.linkedin.com/in/areez-rao",
              "https://www.linkedin.com/in/areez-rao"
            ]
          },
          {
            "@type": "Organization",
            "name": "M1 Aviation",
            "url": "https://m1.rsinternational.net",
            "sameAs": [
              "https://ca.linkedin.com/company/m-onee",
              "https://www.linkedin.com/company/m-onee"
            ]
          }
        ],
        "publisher": {
          "@type": "Organization",
          "name": "M1 Aviation",
          "url": "https://m1.rsinternational.net",
          "logo": {
            "@type": "ImageObject",
            "url": "https://m1.rsinternational.net/m1-logo.png"
          }
        },
        "mainEntityOfPage": `https://m1.rsinternational.net/aviation-times/${article.id}`,
        "articleSection": article.category,
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
