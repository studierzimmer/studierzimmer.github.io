import type { BookPage } from "@/types/books";

/** Decode only the original opening/warmup images, at most two at a time. A healthy
 * slow transfer has no arbitrary timeout; changing context can cancel it. */
export async function prepareBookDeckPages(pages: BookPage[], page: number, signal?: AbortSignal, makeImage: () => HTMLImageElement = () => new Image()): Promise<void> {
  const indices = [...new Set([page - 1, page, page + 1, ...(page === 0 ? [2] : [])])].filter((index) => index >= 0 && index < pages.length);
  let next = 0;
  const load = (item: BookPage) => new Promise<void>((resolve, reject) => {
    const image = makeImage(); let settled = false;
    const finish = (error?: Error) => {
      if (settled) return; settled = true;
      image.onload = null; image.onerror = null;
      signal?.removeEventListener("abort", abort);
      if (error) reject(error); else resolve();
    };
    const abort = () => { finish(new DOMException("Book selection cancelled", "AbortError")); image.src = ""; };
    if (signal?.aborted) { abort(); return; }
    signal?.addEventListener("abort", abort, { once: true });
    image.onload = () => { void (typeof image.decode === "function" ? image.decode() : Promise.resolve()).then(() => finish(), () => finish(new Error("L’immagine del libro non è leggibile. Riprova la selezione."))); };
    image.onerror = () => finish(new Error("Non è stato possibile caricare il libro. Il libro corrente resta aperto."));
    image.decoding = "async"; image.src = item.public_url;
  });
  await Promise.all(Array.from({ length: Math.min(2, indices.length) }, async () => {
    while (next < indices.length) {
      if (signal?.aborted) throw new DOMException("Book selection cancelled", "AbortError");
      await load(pages[indices[next++]]);
    }
  }));
}
