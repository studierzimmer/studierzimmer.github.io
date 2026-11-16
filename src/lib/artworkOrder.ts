import type { ArtworkItem } from "@/types/siteContent";

type GalleryKey = "artworks" | "jewelry";

function orderIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === "string" && Boolean(id.trim()) && id.length <= 240).map((id) => id.trim()))];
}

/** Presentation preferences only: never convert or rewrite artwork records. */
export function normalizeGalleryItemOrder(value: unknown): Partial<Record<GalleryKey, string[]>> {
  const result: Partial<Record<GalleryKey, string[]>> = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  for (const key of ["artworks", "jewelry"] as const) {
    const order = Object.prototype.hasOwnProperty.call(value, key) ? (value as Record<string, unknown>)[key] : undefined;
    if (Array.isArray(order)) result[key] = orderIds(order);
  }
  return result;
}

const yearOf = (item: ArtworkItem): number => Number.isFinite(item.year) ? item.year : 0;

export function orderGalleryArtworks(items: readonly ArtworkItem[], order?: readonly string[]): ArtworkItem[] {
  const ranks = new Map(orderIds(order).map((id, index) => [id, index]));
  return items.map((item, index) => ({ item, index })).sort((first, second) => {
    const byYear = yearOf(second.item) - yearOf(first.item);
    if (byYear) return byYear;
    const firstRank = ranks.get(first.item.id), secondRank = ranks.get(second.item.id);
    if (firstRank !== undefined && secondRank !== undefined) return firstRank - secondRank;
    if (firstRank !== undefined) return -1;
    if (secondRank !== undefined) return 1;
    return first.index - second.index;
  }).map(({ item }) => item);
}

export function reorderGalleryArtwork(items: readonly ArtworkItem[], order: readonly string[] | undefined, sourceId: string, targetId: string): { order: string[]; changed: boolean; reason?: "different-year" | "missing" } {
  const previous = orderIds(order);
  const source = items.find((item) => item.id === sourceId), target = items.find((item) => item.id === targetId);
  if (!source || !target) return { order: previous, changed: false, reason: "missing" };
  if (yearOf(source) !== yearOf(target)) return { order: previous, changed: false, reason: "different-year" };
  if (sourceId === targetId) return { order: previous, changed: false };
  const peers = orderGalleryArtworks(items, previous).filter((item) => yearOf(item) === yearOf(source)).map((item) => item.id);
  const from = peers.indexOf(sourceId), to = peers.indexOf(targetId);
  peers.splice(from, 1);
  peers.splice(to, 0, sourceId);
  const changedYear = new Set(peers);
  // Keep references to hidden/unpublished/other-year entries. This setting is
  // not an instruction to delete anything from the catalogue or another grid.
  return { order: [...peers, ...previous.filter((id) => !changedYear.has(id))], changed: true };
}
