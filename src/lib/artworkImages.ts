import type { ArtworkItem } from "@/types/siteContent";

function imageSource(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const source = value.trim();
  if (source.startsWith("local-asset:") && source.length > "local-asset:".length) return source;
  if (source.startsWith("blob:") && source.length > "blob:".length) return source;
  if (source.startsWith("/") && !source.startsWith("//")) return source;
  try {
    const protocol = new URL(source).protocol;
    return protocol === "http:" || protocol === "https:" ? source : null;
  } catch {
    return null;
  }
}

/** Original URLs in reading order. Never resize, re-encode, or rewrite them. */
export function artworkImageSources(
  item: Pick<ArtworkItem, "kind" | "media_url" | "additional_images">,
): string[] {
  if (item.kind !== "image") return [];
  const extras: unknown[] = Array.isArray(item.additional_images) ? item.additional_images : [];
  const sources = [item.media_url, ...extras].map(imageSource).filter((source): source is string => source !== null);
  return [...new Set(sources)];
}
