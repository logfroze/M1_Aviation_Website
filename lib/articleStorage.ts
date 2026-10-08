import { Article } from "@/types";
import { SAMPLE_ARTICLES } from "@/data/articles";

export const LOCAL_STORAGE_KEY = "m1_custom_articles";
export const OVERRIDES_KEY = "m1_article_overrides";

export function getCustomArticles(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse custom articles from localStorage", e);
    return [];
  }
}

export function getArticleOverrides(): Record<string, Article> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (e) {
    console.error("Failed to parse article overrides from localStorage", e);
    return {};
  }
}

export function getAllArticles(): Article[] {
  const custom = getCustomArticles();
  const overrides = getArticleOverrides();
  const mergedSamples = SAMPLE_ARTICLES.map((s) => overrides[s.id] || s);
  return [...custom, ...mergedSamples];
}

export function saveCustomArticle(article: Article): Article[] {
  if (typeof window === "undefined") return [article, ...SAMPLE_ARTICLES];
  try {
    const existing = getCustomArticles();
    const updated = [article, ...existing.filter((a) => a.id !== article.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return getAllArticles();
  } catch (e) {
    console.error("Failed to save custom article", e);
    return getAllArticles();
  }
}

export function updateArticle(article: Article): Article[] {
  if (typeof window === "undefined") return getAllArticles();
  try {
    const custom = getCustomArticles();
    const isCustom = custom.some((a) => a.id === article.id);

    if (isCustom) {
      const updatedCustom = custom.map((a) => (a.id === article.id ? article : a));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustom));
    } else {
      const overrides = getArticleOverrides();
      overrides[article.id] = article;
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
    }
    return getAllArticles();
  } catch (e) {
    console.error("Failed to update article", e);
    return getAllArticles();
  }
}

export function findArticleById(id: string): Article | undefined {
  const all = getAllArticles();
  return all.find((a) => a.id === id);
}
