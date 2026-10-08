"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SAMPLE_ARTICLES } from "@/data/articles";
import { LINKEDIN_URL } from "@/data/navigation";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import { Article } from "@/types";
import { getAllArticles, saveCustomArticle, updateArticle } from "@/lib/articleStorage";

export default function AviationTimesPage() {
  const [articles, setArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success">("idle");

  // ── Admin Auth State (Zero client-side credential exposure) ──
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");

  // ── Add/Edit Article Modal State ──
  const [addArticleOpen, setAddArticleOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDateIso, setNewDateIso] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [readMinutes, setReadMinutes] = useState<number>(6);
  const [newImage, setNewImage] = useState("");
  const [newFullText, setNewFullText] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const formatArticleDate = (isoStr: string) => {
    if (!isoStr) return "Oct 09, 2026";
    const parts = isoStr.split("-").map(Number);
    if (parts.length !== 3) return isoStr;
    const [year, month, day] = parts;
    if (!year || !month || !day) return isoStr;
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const parseDateToIso = (dateStr: string): string => {
    try {
      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) {
        const d = new Date(parsed);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      }
    } catch {
      // fallback
    }
    return new Date().toISOString().split("T")[0];
  };

  const parseReadMinutes = (timeStr: string): number => {
    const match = timeStr?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 6;
  };

  // Load any previously saved articles & admin session from storage on mount
  useEffect(() => {
    const all = getAllArticles();
    setArticles(all);
    try {
      const savedAdmin = sessionStorage.getItem("m1_admin_logged_in");
      if (savedAdmin) {
        setAdminLoggedIn(true);
        setLoggedInEmail(savedAdmin);
      }
    } catch {
      // ignore
    }
  }, []);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
    );
  }, [searchQuery, articles]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    setTimeout(() => {
      setSubStatus("success");
    }, 600);
  };

  // ── Secure Server-Side Admin Authentication Handler ──
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    setAdminLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: adminEmail.trim(),
          password: adminPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAdminError(
          data.error || "Authentication failed. Invalid administrator credentials."
        );
        setAdminLoading(false);
        return;
      }

      // Authentication successful - verified strictly on server
      const emailAuthed = data.email || adminEmail.trim();
      setAdminLoggedIn(true);
      setLoggedInEmail(emailAuthed);
      try {
        sessionStorage.setItem("m1_admin_logged_in", emailAuthed);
      } catch {
        // ignore
      }
      setAdminModalOpen(false);
      setAdminPassword("");
      setAdminError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setAdminError("Unable to reach authentication server. Please check your network connection.");
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    setLoggedInEmail("");
    setAddArticleOpen(false);
    try {
      sessionStorage.removeItem("m1_admin_logged_in");
    } catch {
      // ignore
    }
  };

  // ── Handle Local Image Upload via FileReader ──
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      setNewImage(dataUrl);
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // ── Open Modal for Creating New Dispatch ──
  const handleOpenCreateModal = () => {
    setEditingArticleId(null);
    setNewTitle("");
    setNewSummary("");
    setNewCategory("");
    setNewDateIso(new Date().toISOString().split("T")[0]);
    setReadMinutes(6);
    setNewImage("");
    setImagePreview("");
    setNewFullText("");
    setAddArticleOpen(true);
  };

  // ── Open Modal for Editing Any Current or Previous Dispatch ──
  const handleOpenEditModal = (article: Article) => {
    setEditingArticleId(article.id);
    setNewTitle(article.title);
    setNewSummary(article.summary);
    setNewCategory(article.category);
    setNewDateIso(parseDateToIso(article.date));
    setReadMinutes(parseReadMinutes(article.readTime));
    setNewImage(article.imageUrl || "");
    setImagePreview(article.imageUrl || "");

    const fullText =
      article.sections && article.sections.length > 0
        ? article.sections
            .map((s) => (s.heading && s.heading !== article.title ? `### ${s.heading}\n\n` : "") + s.content.join("\n\n"))
            .join("\n\n\n")
        : article.summary;
    setNewFullText(fullText);
    setAddArticleOpen(true);
  };

  // Check if redirected from an article page with ?edit=ID
  useEffect(() => {
    if (typeof window !== "undefined" && adminLoggedIn) {
      const urlParams = new URLSearchParams(window.location.search);
      const editId = urlParams.get("edit");
      if (editId) {
        const toEdit = articles.find((a) => a.id === editId);
        if (toEdit) {
          handleOpenEditModal(toEdit);
        }
      }
    }
  }, [adminLoggedIn, articles]);

  // ── Handle Publishing New or Updating Existing Article ──
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const finalDate = formatArticleDate(newDateIso);
    const finalReadTime = `${readMinutes} min read`;

    if (editingArticleId) {
      // ── Updating Existing Article ──
      const existing = articles.find((a) => a.id === editingArticleId);
      const existingSections = existing?.sections || [];
      const initialText = existingSections
        .map((s) => (s.heading && s.heading !== existing?.title ? `### ${s.heading}\n\n` : "") + s.content.join("\n\n"))
        .join("\n\n\n");
      const isTextUnchanged =
        newFullText.trim() === initialText.trim() || newFullText.trim() === existing?.summary.trim();

      let finalSections = existingSections;

      if (!isTextUnchanged) {
        if (newFullText.includes("### ") || newFullText.includes("## ")) {
          const blocks = newFullText.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
          const parsedSecs: typeof existingSections = [];
          let currentHeading = newTitle.trim();
          let currentContent: string[] = [];

          for (const block of blocks) {
            if (block.startsWith("### ") || block.startsWith("## ")) {
              if (currentContent.length > 0) {
                parsedSecs.push({ heading: currentHeading, content: currentContent });
                currentContent = [];
              }
              currentHeading = block.replace(/^#{2,3}\s+/, "").trim();
            } else {
              currentContent.push(block);
            }
          }
          if (currentContent.length > 0) {
            parsedSecs.push({ heading: currentHeading, content: currentContent });
          }

          // Retain images/captions from existing sections if available
          parsedSecs.forEach((sec, idx) => {
            const match =
              existingSections.find((es) => es.heading?.toLowerCase() === sec.heading?.toLowerCase()) ||
              existingSections[idx];
            if (match?.imageUrl) {
              sec.imageUrl = match.imageUrl;
              sec.imageCaption = match.imageCaption;
            }
            if (match?.quote) {
              sec.quote = match.quote;
            }
          });
          finalSections = parsedSecs;
        } else {
          // Standard paragraphs
          const paragraphs = newFullText.split("\n\n").map((p) => p.trim()).filter(Boolean);
          finalSections = [
            {
              heading: newTitle.trim(),
              content: paragraphs.length > 0 ? paragraphs : [newSummary.trim()],
              imageUrl: newImage || existingSections[0]?.imageUrl || undefined,
              imageCaption: existingSections[0]?.imageCaption || undefined,
            },
          ];
        }
      }

      const updatedArticle: Article = {
        id: editingArticleId,
        editionNumber: existing?.editionNumber || articles.length,
        title: newTitle.trim(),
        summary: newSummary.trim(),
        category: newCategory.trim() || existing?.category || "Editorial Dispatch",
        date: finalDate,
        readTime: finalReadTime,
        imageUrl: newImage || existing?.imageUrl || "/images/articles/article-3/card-thumb.png",
        accentColor:
          existing?.accentColor ||
          "border-zinc-400/50 bg-gradient-to-br from-zinc-800/40 via-zinc-950 to-black hover:border-zinc-300",
        thumbBg: existing?.thumbBg || "bg-zinc-800/40",
        sections: finalSections,
      };

      const updatedList = updateArticle(updatedArticle);
      setArticles(updatedList);
    } else {
      // ── Creating New Article ──
      const slug =
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`;

      const paragraphs = newFullText.split("\n\n").map((p) => p.trim()).filter(Boolean);

      let newSections: NonNullable<Article["sections"]> = [];
      if (newFullText.includes("### ") || newFullText.includes("## ")) {
        const blocks = newFullText.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
        let currentHeading = newTitle.trim();
        let currentContent: string[] = [];
        for (const block of blocks) {
          if (block.startsWith("### ") || block.startsWith("## ")) {
            if (currentContent.length > 0) {
              newSections.push({ heading: currentHeading, content: currentContent });
              currentContent = [];
            }
            currentHeading = block.replace(/^#{2,3}\s+/, "").trim();
          } else {
            currentContent.push(block);
          }
        }
        if (currentContent.length > 0) {
          newSections.push({ heading: currentHeading, content: currentContent });
        }
      } else {
        newSections = [
          {
            heading: newTitle.trim(),
            content: paragraphs.length > 0 ? paragraphs : [newSummary.trim()],
            imageUrl: newImage || undefined,
          },
        ];
      }

      const createdArticle: Article = {
        id: slug,
        editionNumber: articles.length + 1,
        title: newTitle.trim(),
        summary: newSummary.trim(),
        category: newCategory.trim() || "Industry Intelligence",
        date: finalDate,
        readTime: finalReadTime,
        imageUrl: newImage || "/images/articles/article-3/card-thumb.png",
        accentColor:
          "border-zinc-400/50 bg-gradient-to-br from-zinc-800/40 via-zinc-950 to-black hover:border-zinc-300",
        thumbBg: "bg-zinc-800/40",
        sections: newSections,
      };

      const updatedList = saveCustomArticle(createdArticle);
      setArticles(updatedList);
    }

    // Reset Form
    setEditingArticleId(null);
    setNewTitle("");
    setNewSummary("");
    setNewCategory("");
    setNewDateIso(new Date().toISOString().split("T")[0]);
    setReadMinutes(6);
    setNewFullText("");
    setNewImage("");
    setImagePreview("");
    setAddArticleOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 pt-24 pb-24 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* ── Admin Logged-In Top Bar: Sleek Silver & White Theme ── */}
        {adminLoggedIn && (
          <div
            className="w-full mb-10 p-[1.5px] transition-all shadow-xl"
            style={{
              clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(161, 161, 170, 0.4) 50%, rgba(255, 255, 255, 0.75) 100%)",
            }}
          >
            <div
              className="px-6 py-4 bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                clipPath: "polygon(13px 0%, 100% 0%, calc(100% - 13px) 100%, 0% 100%)",
              }}
            >
              <div className="flex items-center gap-3 text-xs font-mono">
                {/* <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" /> */}
                <span className="text-zinc-400">Authenticated Administrator:</span>
                <span className="text-white font-bold">{loggedInEmail}</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  + Add Article
                </button>

                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="text-xs font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 1. Search Bar at Top: Tilted Sharp Edged ── */}
        <div className="w-full max-w-xl mx-auto pt-2 mb-12">
          <div
            className="relative p-[1.5px] shadow-sm transition-all"
            style={{
              clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
              background: "linear-gradient(135deg, rgba(212, 212, 216, 0.95) 0%, rgba(161, 161, 170, 0.6) 100%)",
            }}
          >
            <div
              className="relative flex items-center bg-zinc-100 px-5 py-3.5"
              style={{
                clipPath: "polygon(13.5px 0%, 100% 0%, calc(100% - 13.5px) 100%, 0% 100%)",
              }}
            >
              <span className="text-zinc-500 text-sm mr-3">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search aviation editorial library..."
                className="w-full bg-transparent text-sm sm:text-base text-zinc-900 placeholder-zinc-500 focus:outline-none font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-mono text-zinc-500 hover:text-black cursor-pointer ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── 2. Editorial Heading & Subheading (CMS button moved to bottom) ── */}
        <div className="w-full text-center space-y-4 mb-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-zinc-950">
            Aviation Times:
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-normal text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            The Newsletter that covers the innovation and current affairs of business aviation.
          </p>
        </div>

        {/* ── 3. Article Cards Feed: Tilted Sharp Edged ── */}
        <section aria-label="Published Articles Feed" className="w-full space-y-12 mb-24">
          {filteredArticles.length === 0 ? (
            <div
              className="text-center py-20 p-[1.5px]"
              style={{
                clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
                background: "rgba(228, 228, 231, 0.9)",
              }}
            >
              <div
                className="p-12 bg-zinc-50"
                style={{
                  clipPath: "polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)",
                }}
              >
                <p className="text-base text-zinc-600">
                  No published dispatches matched &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-mono underline text-zinc-900 mt-3 hover:text-black cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="relative p-[1.5px] transition-all duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)] hover:-translate-y-1"
                style={{
                  clipPath: "polygon(22px 0%, 100% 0%, calc(100% - 22px) 100%, 0% 100%)",
                  background:
                    "linear-gradient(135deg, rgba(228, 228, 231, 1) 0%, rgba(161, 161, 170, 0.5) 50%, rgba(228, 228, 231, 0.9) 100%)",
                }}
              >
                <article
                  className="p-8 sm:p-10 md:p-12 lg:p-14 bg-zinc-50/90 hover:bg-white transition-all duration-300 flex flex-col md:flex-row gap-8 lg:gap-12 items-center"
                  style={{
                    clipPath: "polygon(21px 0%, 100% 0%, calc(100% - 21px) 100%, 0% 100%)",
                  }}
                >
                  {/* ── 1. Picture: Tilted Sharp Edged ── */}
                  <Link
                    href={`/aviation-times/${article.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-full md:w-[380px] lg:w-[440px] h-64 sm:h-72 lg:h-80 overflow-hidden relative shadow-md bg-zinc-100 group block cursor-pointer"
                    style={{
                      clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
                    }}
                  >
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 440px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200" />
                    )}
                    {/* Category Pill Tag Overlay: Tilted Sharp Edged */}
                    <div
                      className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/90 backdrop-blur-md text-white text-xs font-mono tracking-wider"
                      style={{
                        clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                      }}
                    >
                      {article.category}
                    </div>
                  </Link>

                  {/* ── Right Content ── */}
                  <div className="flex-1 space-y-4 w-full text-left">
                    {/* ── 2. Publishing Date: Tilted Sharp Edged ── */}
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-zinc-600">
                      <span
                        className="font-semibold text-zinc-900 bg-zinc-200/90 px-3 py-1"
                        style={{
                          clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                        }}
                      >
                        {article.date}
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-500">{article.readTime}</span>
                    </div>

                    {/* ── 3. Article Title ── */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-950 tracking-tight leading-snug hover:text-zinc-700 transition-colors">
                      <Link href={`/aviation-times/${article.id}`} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </Link>
                    </h2>

                    {/* ── 4. Small Description ── */}
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                      {article.summary}
                    </p>

                    {/* ── 5. Read Full Dispatch Button & Admin Edit Dispatch Button ── */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/aviation-times/${article.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-zinc-950 text-white hover:bg-zinc-800 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all shadow-md hover:shadow-lg hover:translate-x-1 cursor-pointer"
                        style={{
                          clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                        }}
                      >
                        <span>Read Full Dispatch</span>
                        <span>↗</span>
                      </Link>

                      {adminLoggedIn && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenEditModal(article);
                          }}
                          className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-100 text-black border border-zinc-300 hover:border-black text-xs sm:text-sm font-mono uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                          style={{
                            clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                          }}
                        >
                          <span>✎</span>
                          <span>Edit Dispatch</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))
          )}
        </section>

        {/* ── 4. Newsletter Subscription: Tilted Sharp Edged ── */}
        <section
          aria-label="Newsletter Subscription"
          className="w-full p-[1.5px] mb-16 shadow-2xl"
          style={{
            clipPath: "polygon(22px 0%, 100% 0%, calc(100% - 22px) 100%, 0% 100%)",
            background: "linear-gradient(135deg, rgba(63, 63, 70, 0.8) 0%, rgba(24, 24, 27, 0.9) 100%)",
          }}
        >
          <div
            className="w-full bg-zinc-950 p-10 sm:p-16 text-center text-white"
            style={{
              clipPath: "polygon(21px 0%, 100% 0%, calc(100% - 21px) 100%, 0% 100%)",
            }}
          >
            <div className="max-w-xl mx-auto space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                Bi-Weekly Executive Intel
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
                Subscribe to Aviation Times
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Direct briefings on aircraft valuations, autonomous avionics regulations, and sustainable fuels.
              </p>

              {subStatus === "success" ? (
                <div
                  className="p-4 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono max-w-md mx-auto"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  ✓ Added to executive dispatch roster. Confirmation dispatched.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="w-full px-5 py-4 bg-black border border-zinc-700 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-mono"
                    style={{
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={subStatus === "loading"}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold shrink-0 transition-colors shadow-md cursor-pointer"
                    style={{
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    {subStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── 5. LinkedIn CTA: Tilted Sharp Edged ── */}
        <div
          className="w-full p-[1.5px] shadow-sm mb-12"
          style={{
            clipPath: "polygon(18px 0%, 100% 0%, calc(100% - 18px) 100%, 0% 100%)",
            background: "linear-gradient(135deg, rgba(228, 228, 231, 1) 0%, rgba(161, 161, 170, 0.4) 100%)",
          }}
        >
          <div
            className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 bg-zinc-50"
            style={{
              clipPath: "polygon(17.5px 0%, 100% 0%, calc(100% - 17.5px) 100%, 0% 100%)",
            }}
          >
            <div className="text-center sm:text-left">
              <div className="text-base sm:text-lg font-light text-zinc-950">Follow Aviation Times on LinkedIn</div>
              <div className="text-xs sm:text-sm text-zinc-500 font-mono mt-1">
                Connect with our editorial council and fleet analysts
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <ParallelogramButton href={LINKEDIN_URL} isExternal={true} variant="gold" className="text-xs px-8 py-3.5">
                Follow on LinkedIn ↗
              </ParallelogramButton>

              <Link
                href="/#contact"
                className="text-xs sm:text-sm font-mono text-zinc-700 hover:text-black underline uppercase tracking-wider px-3 py-2 font-medium"
              >
                Contact Editorial
              </Link>
            </div>
          </div>
        </div>

        {/* ── 6. Admin Panel Access Button: Normal button size, centered on the page ── */}
        <div className="w-full flex justify-center pt-8 pb-10">
          <button
            type="button"
            onClick={() => setAdminModalOpen(true)}
            className="min-w-[120px] min-h-[38px] px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 border border-zinc-700/60 hover:border-zinc-500"
            style={{
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          >
            {/* <span
              className="w-2 h-2 bg-emerald-400 block shrink-0"
              style={{
                clipPath: "polygon(2px 0%, 100% 0%, calc(100% - 2px) 100%, 0% 100%)",
              }}
            /> */}
            {/* <span>Editorial CMS Access</span> */}
          </button>
        </div>

        {/* ── Admin Login Modal: Tilted Sharp Edged ── */}
        {adminModalOpen && (
          <div
            role="dialog"
            aria-label="Editorial Management Login"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <div
              className="w-full max-w-md p-[1.5px] shadow-2xl"
              style={{
                clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(100, 100, 100, 0.2) 100%)",
              }}
            >
              <div
                className="w-full bg-zinc-950 p-8 text-left space-y-6"
                style={{
                  clipPath: "polygon(15.5px 0%, 100% 0%, calc(100% - 15.5px) 100%, 0% 100%)",
                }}
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <h3 className="text-lg font-light text-white tracking-wide">Editorial CMS Authentication</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminModalOpen(false);
                      setAdminError("");
                    }}
                    className="text-zinc-500 hover:text-white cursor-pointer font-mono"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Enter authorized editorial credentials to manage and publish newsletter dispatches.
                  </p>

                  {adminError && (
                    <div className="p-3 bg-red-950/70 border border-red-800 text-red-300 text-xs font-mono leading-snug">
                      {adminError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Editorial Email
                    </label>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="Enter administrator email"
                      className="w-full px-4 py-3 bg-black border border-zinc-700 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Security Password
                    </label>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter security password"
                      className="w-full px-4 py-3 bg-black border border-zinc-700 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={adminLoading}
                      className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 disabled:opacity-60 font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer shadow-md"
                      style={{
                        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                      }}
                    >
                      {adminLoading ? "Verifying Credentials..." : "Authenticate Console"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ── Add Article Modal: Wide Executive Layout in Silver & White ── */}
        {addArticleOpen && (
          <div
            role="dialog"
            aria-label="Publish New Article Dispatch"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          >
            <div
              className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] my-6 p-[1.5px] shadow-2xl"
              style={{
                clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(161, 161, 170, 0.3) 50%, rgba(255, 255, 255, 0.75) 100%)",
              }}
            >
              <div
                className="w-full bg-zinc-950 p-6 sm:p-10 text-left space-y-6 max-h-[92vh] overflow-y-auto"
                style={{
                  clipPath: "polygon(19.5px 0%, 100% 0%, calc(100% - 19.5px) 100%, 0% 100%)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-wide">
                      {editingArticleId ? "Edit Editorial Dispatch" : "Publish New Editorial Dispatch"}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      Authenticated: <span className="text-white font-bold">{loggedInEmail}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAddArticleOpen(false)}
                    className="text-zinc-500 hover:text-white cursor-pointer font-mono text-xl p-1"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveArticle} className="space-y-6">
                  {/* Top Grid: 2 Columns (Title & Details on Left, Image & Preview on Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Left Column: Title + Metadata */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Supersonic Business Jet Aerodynamics & Market Outlook"
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Category */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Category (Optional)
                          </label>
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="e.g. Market Intel"
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                          />
                          {/* <span className="text-[10px] font-mono text-zinc-500 block truncate">
                            ↳ Optional
                          </span> */}
                        </div>

                        {/* Calendar Date Picker Feature */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Publishing Date
                          </label>
                          <input
                            type="date"
                            required
                            value={newDateIso}
                            onChange={(e) => setNewDateIso(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-xs text-white font-mono focus:outline-none focus:border-white cursor-pointer [color-scheme:dark]"
                          />
                          {/* <span className="text-[10px] font-mono text-zinc-400 block truncate">
                            ↳ {formatArticleDate(newDateIso)}
                          </span> */}
                        </div>

                        {/* Reading Time with Increment/Decrement and Auto 'min read' formatting */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Reading Time
                          </label>
                          <div className="flex items-center bg-zinc-900 border border-zinc-700 px-3 py-1.5 focus-within:border-white transition-colors">
                            <input
                              type="number"
                              min="1"
                              max="90"
                              value={readMinutes}
                              onChange={(e) => {
                                const v = parseInt(e.target.value, 10);
                                setReadMinutes(isNaN(v) ? 1 : Math.max(1, Math.min(90, v)));
                              }}
                              className="w-10 bg-transparent text-white font-mono font-bold text-xs text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-zinc-400 font-mono text-xs ml-1 select-none whitespace-nowrap">
                              min read
                            </span>
                            <div className="flex flex-col ml-auto pl-2 border-l border-zinc-700 gap-0.5">
                              <button
                                type="button"
                                onClick={() => setReadMinutes((prev) => Math.min(90, prev + 1))}
                                className="w-4 h-3 flex items-center justify-center text-[9px] text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer select-none leading-none"
                                title="Increase"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                onClick={() => setReadMinutes((prev) => Math.max(1, prev - 1))}
                                className="w-4 h-3 flex items-center justify-center text-[9px] text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer select-none leading-none"
                                title="Decrease"
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                          {/* <span className="text-[10px] font-mono text-zinc-400 block truncate">
                            ↳ Auto: {readMinutes} min read
                          </span> */}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Card Image & Preview */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                        Card Image (Upload from Computer or Paste URL)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2.5 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="w-full text-xs font-mono text-zinc-400 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={newImage.startsWith("data:") ? "" : newImage}
                          onChange={(e) => {
                            setNewImage(e.target.value);
                            setImagePreview(e.target.value);
                          }}
                          placeholder="Or enter image URL"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                        />
                      </div>

                      {imagePreview ? (
                        <div className="relative w-full h-24 mt-1 border border-zinc-700 overflow-hidden bg-black flex items-center justify-center">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-full h-24 mt-1 border border-dashed border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-600">
                          No image selected (editorial placeholder will be used)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Section: Small Description */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                      Small Description (Summary for Feed Card) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      placeholder="Brief overview of the article shown directly on the feed card..."
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white leading-relaxed font-sans"
                    />
                  </div>

                  {/* Lower Section: Full Article Text */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                      Full Article Text (Separated by double newlines for paragraphs) *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={newFullText}
                      onChange={(e) => setNewFullText(e.target.value)}
                      placeholder="Full editorial dispatch body. Paste paragraphs, quotes, and detailed analysis here..."
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white leading-relaxed font-sans"
                    />
                  </div>

                  {/* Action Buttons: Silver & White */}
                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-900">
                    <button
                      type="button"
                      onClick={() => setAddArticleOpen(false)}
                      className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                      style={{
                        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                      }}
                    >
                      {editingArticleId ? "Save Changes ↗" : "Publish Dispatch ↗"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
