import type { Book } from "@/types/books";
import type { BookSessionSnapshot } from "./bookSession";

export type BookDeckDirection = -1 | 1;
export type BookPageMemory = Record<string, number>;
export interface BookDeckMomentum { direction: BookDeckDirection; velocity: number; releasedAt: number }
export const BOOK_DECK_MEMORY_KEY = "studierzimmer:book-pages:v1";

function deckSessionStorage(): Storage | null {
  try { return typeof window === "undefined" ? null : window.sessionStorage; }
  catch { return null; }
}

export function readBookPageMemory(legacy: BookSessionSnapshot | null, storage: Pick<Storage, "getItem"> | null = deckSessionStorage()): BookPageMemory {
  const memory: BookPageMemory = {};
  try {
    const stored: unknown = JSON.parse(storage?.getItem(BOOK_DECK_MEMORY_KEY) ?? "null");
    if (stored && typeof stored === "object" && !Array.isArray(stored)) {
      Object.entries(stored).forEach(([slug, page]) => {
        if (slug && typeof page === "number" && Number.isFinite(page) && page >= 0) Object.defineProperty(memory, slug, { value: Math.floor(page), enumerable: true, configurable: true, writable: true });
      });
    }
  } catch { /* Session memory is optional. */ }
  if (legacy) Object.defineProperty(memory, legacy.slug, { value: Math.max(0, Math.floor(legacy.pageIndex)), enumerable: true, configurable: true, writable: true });
  return memory;
}

export function rememberBookPage(memory: BookPageMemory, slug: string, page: number, storage: Pick<Storage, "setItem"> | null = deckSessionStorage()): BookPageMemory {
  const next = { ...memory, [slug]: Math.max(0, Math.floor(Number.isFinite(page) ? page : 0)) };
  try { storage?.setItem(BOOK_DECK_MEMORY_KEY, JSON.stringify(next)); } catch { /* Do not interrupt the book on storage failure. */ }
  return next;
}

export function bookDeckEntry(memory: BookPageMemory, slug: string, pageCount: number) {
  const visited = Object.prototype.hasOwnProperty.call(memory, slug);
  return { page: Math.min(Math.max(0, pageCount - 1), visited ? memory[slug] : 0), autoOpen: !visited && pageCount > 1 };
}

export function adjacentDeckBook(books: Book[], activeId: string, direction: BookDeckDirection): Book | null {
  const index = books.findIndex((book) => book.id === activeId);
  return index < 0 ? null : books[index + direction] ?? null;
}

export function commitsBookDeckSwipe(distance: number, width: number, velocity = 0) {
  return Math.abs(distance) >= Math.min(120, Math.max(44, width * .18)) || (Math.abs(distance) > 24 && Math.abs(velocity) > .6 && distance * velocity > 0);
}

export function bookDeckReleaseVelocity(pixelsPerMillisecond: number, width: number, idleMilliseconds: number) {
  const velocity = pixelsPerMillisecond * 1000 / Math.max(1, width) * Math.exp(-Math.max(0, idleMilliseconds) / 120);
  return Number.isFinite(velocity) ? Math.max(-3.5, Math.min(3.5, velocity)) : 0;
}

export function bookDeckResumeVelocity(momentum: BookDeckMomentum | null, direction: BookDeckDirection, now: number) {
  if (!momentum || momentum.direction !== direction || now - momentum.releasedAt >= 600) return 0;
  return momentum.velocity * Math.exp(-Math.max(0, now - momentum.releasedAt) / 180);
}

export function consumeBookDeckBeckon(once: { current: boolean }, enabled: boolean, ready: boolean, reduced: boolean, hidden: boolean) {
  if (once.current || !enabled || !ready) return false;
  once.current = true;
  return !reduced && !hidden;
}

export interface BookPageRect { left: number; right: number; top: number; bottom: number }
export function clipBookPageRect(page: BookPageRect, clips: BookPageRect[]): BookPageRect | null {
  const visible = clips.reduce((rect, clip) => ({ left: Math.max(rect.left, clip.left), right: Math.min(rect.right, clip.right), top: Math.max(rect.top, clip.top), bottom: Math.min(rect.bottom, clip.bottom) }), { left: page.left, right: page.right, top: page.top, bottom: page.bottom });
  return visible.right > visible.left && visible.bottom > visible.top ? visible : null;
}

export function bookDeckHit(point: { x: number; y: number }, rects: BookPageRect[]): "page" | "previous" | "next" | "outside" {
  const pages = rects.filter((rect) => rect.right > rect.left && rect.bottom > rect.top);
  if (pages.some((rect) => point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom)) return "page";
  if (!pages.length) return "outside";
  if (point.x < Math.min(...pages.map((rect) => rect.left))) return "previous";
  if (point.x > Math.max(...pages.map((rect) => rect.right))) return "next";
  return "outside";
}
