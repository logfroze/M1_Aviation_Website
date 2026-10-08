"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SAMPLE_ARTICLES } from "@/data/articles";
import { Article } from "@/types";
import { findArticleById, getAllArticles } from "@/lib/articleStorage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function FullArticlePage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const [article, setArticle] = useState<Article | undefined>(() => {
    return SAMPLE_ARTICLES.find((a) => a.id === id);
  });
  const [allArticles, setAllArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = findArticleById(id);
    if (found) {
      setArticle(found);
    }
    const all = getAllArticles();
    setAllArticles(all);

    try {
      const saved = sessionStorage.getItem("m1_admin_logged_in");
      if (saved) {
        setAdminLoggedIn(true);
      }
    } catch {
      // ignore
    }
  }, [id]);

  if (!article) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-40 px-4 space-y-6">
          <div
            className="p-[1.5px] inline-block shadow-lg"
            style={{
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              background: "rgba(239, 68, 68, 0.7)",
            }}
          >
            <div
              className="px-6 py-2 bg-zinc-950 text-red-400 font-mono text-xs uppercase tracking-wider"
              style={{
                clipPath: "polygon(11px 0%, 100% 0%, calc(100% - 11px) 100%, 0% 100%)",
              }}
            >
              Dispatch Not Located
            </div>
          </div>
          <h1 className="text-3xl font-light text-white">Article could not be found.</h1>
          <p className="text-zinc-400 text-sm">
            The requested editorial dispatch may have been updated or moved.
          </p>
          <div>
            <Link
              href="/aviation-times"
              className="inline-flex px-8 py-3.5 bg-white text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-zinc-200"
              style={{
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              ← Return to Aviation Times
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Find previous and next articles
  const currentIndex = allArticles.findIndex((a) => a.id === id);
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="pt-28 pb-32">
        <article className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          {/* ── Breadcrumb & Navigation Bar: Tilted Sharp Edged ── */}
          <div className="flex items-center justify-between py-6 border-b border-zinc-800 text-xs font-mono text-zinc-400">
            <Link
              href="/aviation-times"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>Back to Aviation Times</span>
            </Link>
            <div className="flex items-center gap-3">
              {adminLoggedIn && (
                <Link
                  href={`/aviation-times?edit=${article.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  style={{
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  <span>✎</span>
                  <span>Edit Dispatch</span>
                </Link>
              )}
              <span
                className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-cyan-400 font-mono"
                style={{
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                Edition {article.editionNumber ? `0${article.editionNumber}` : "Dispatch"}
              </span>
              <span>{article.date}</span>
            </div>
          </div>

          {/* ── Editorial Header: Tilted Sharp Edged Badge & Expansive Typography ── */}
          <header className="py-12 sm:py-16 space-y-6 text-center sm:text-left">
            <div
              className="inline-block px-4 py-1.5 border border-zinc-700 bg-zinc-900/90 text-xs font-mono tracking-widest text-zinc-300 uppercase"
              style={{
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              {article.category}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.12]">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
              {article.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-mono text-zinc-500 border-t border-zinc-900">
              <span className="text-zinc-300 font-medium">Published by M1 Editorial Council</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* ── Hero Picture: Wide Tilted Sharp Edged ── */}
          {article.imageUrl && (
            <div
              className="relative p-[1.5px] mb-14 shadow-2xl"
              style={{
                clipPath: "polygon(18px 0%, 100% 0%, calc(100% - 18px) 100%, 0% 100%)",
                background: "linear-gradient(135deg, rgba(82, 82, 91, 0.7) 0%, rgba(39, 39, 42, 0.8) 100%)",
              }}
            >
              <div
                className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-zinc-900"
                style={{
                  clipPath: "polygon(17.5px 0%, 100% 0%, calc(100% - 17.5px) 100%, 0% 100%)",
                }}
              >
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1536px) 100vw, 1500px"
                  className="object-cover"
                  unoptimized={article.imageUrl.startsWith("data:")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* ── Article Content Sections: Tilted Sharp Edged Quotes & Figures ── */}
          <div className="space-y-14 text-zinc-300 leading-relaxed font-light text-base sm:text-lg md:text-xl">
            {article.sections?.map((section, idx) => (
              <section key={`sec-${idx}`} className="space-y-6">
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight pt-4 border-t border-zinc-900">
                    {section.heading}
                  </h2>
                )}

                {section.subheading && (
                  <h3 className="text-xl font-medium text-cyan-300 tracking-tight">
                    {section.subheading}
                  </h3>
                )}

                {section.quote && (
                  <blockquote
                    className="my-6 p-6 sm:p-8 border-l-4 border-cyan-400 bg-zinc-900/70 text-lg sm:text-xl italic font-serif text-white shadow-lg"
                    style={{
                      clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                    }}
                  >
                    {section.quote}
                  </blockquote>
                )}

                <div className="space-y-4">
                  {section.content.map((p, pIdx) => (
                    <p key={`p-${idx}-${pIdx}`} className="leading-relaxed text-zinc-300">
                      {p}
                    </p>
                  ))}
                </div>

                {section.imageUrl && (
                  <figure className="my-8 space-y-3">
                    <div
                      className="relative p-[1.5px] shadow-lg"
                      style={{
                        clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
                        background: "linear-gradient(135deg, rgba(82, 82, 91, 0.7) 0%, rgba(39, 39, 42, 0.8) 100%)",
                      }}
                    >
                      <div
                        className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-zinc-950"
                        style={{
                          clipPath: "polygon(13.5px 0%, 100% 0%, calc(100% - 13.5px) 100%, 0% 100%)",
                        }}
                      >
                        <Image
                          src={section.imageUrl}
                          alt={section.imageCaption || section.heading || "Article visual"}
                          fill
                          sizes="(max-width: 1536px) 100vw, 1500px"
                          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                          unoptimized={section.imageUrl.startsWith("data:")}
                        />
                      </div>
                    </div>
                    {section.imageCaption && (
                      <figcaption className="text-xs sm:text-sm font-mono text-zinc-400 text-center sm:text-left italic">
                        ↳ {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            ))}
          </div>

          {/* ── Author / Editorial Footer Sign-off: Tilted Sharp Edged ── */}
          <div
            className="mt-20 p-[1.5px] shadow-2xl"
            style={{
              clipPath: "polygon(18px 0%, 100% 0%, calc(100% - 18px) 100%, 0% 100%)",
              background: "linear-gradient(135deg, rgba(82, 82, 91, 0.7) 0%, rgba(39, 39, 42, 0.8) 100%)",
            }}
          >
            <div
              className="p-8 sm:p-10 bg-zinc-950 space-y-4 text-center sm:text-left"
              style={{
                clipPath: "polygon(17.5px 0%, 100% 0%, calc(100% - 17.5px) 100%, 0% 100%)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-medium text-white">Questions or feedback on this edition?</h4>
                  <p className="text-sm text-zinc-400 mt-1">
                    Send your thoughts, analysis, and partnership inquiries directly to our council.
                  </p>
                </div>
                <a
                  href="mailto:team@rsinternational.net"
                  className="px-7 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer shadow-md"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  team@rsinternational.net
                </a>
              </div>
            </div>
          </div>

          {/* ── Previous & Next Article Navigation: Tilted Sharp Edged ── */}
          <nav aria-label="Dispatch Pagination" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                href={`/aviation-times/${prevArticle.id}`}
                className="p-6 border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 transition-all text-left group"
                style={{
                  clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                }}
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-cyan-400">
                  ← Previous Dispatch
                </span>
                <div className="text-sm font-medium text-white mt-1 line-clamp-1">
                  {prevArticle.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/aviation-times/${nextArticle.id}`}
                className="p-6 border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 transition-all text-right group sm:col-start-2"
                style={{
                  clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                }}
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-cyan-400">
                  Next Dispatch →
                </span>
                <div className="text-sm font-medium text-white mt-1 line-clamp-1">
                  {nextArticle.title}
                </div>
              </Link>
            ) : null}
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  );
}
