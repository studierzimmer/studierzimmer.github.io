export interface BookSessionSnapshot {
  slug: string;
  pageIndex: number;
}

export const BOOK_SESSION_KEY = "publicBookSession";
export const BOOK_INDEX_RETURN_KEY = "publicBookReturningToIndex";
export const BOOK_INTRO_RETURN_KEY = "publicBookReturningToIntro";

export function readBookSession(): BookSessionSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSnapshot = window.sessionStorage.getItem(BOOK_SESSION_KEY);

    if (!rawSnapshot) {
      return null;
    }

    const snapshot = JSON.parse(rawSnapshot) as Partial<BookSessionSnapshot>;

    if (
      typeof snapshot.slug !== "string" ||
      snapshot.slug.length === 0 ||
      typeof snapshot.pageIndex !== "number" ||
      !Number.isFinite(snapshot.pageIndex)
    ) {
      return null;
    }

    return {
      slug: snapshot.slug,
      pageIndex: Math.max(0, Math.floor(snapshot.pageIndex)),
    };
  } catch {
    return null;
  }
}

export function writeBookSession(slug: string, pageIndex: number): void {
  if (typeof window === "undefined") {
    return;
  }

  const snapshot: BookSessionSnapshot = {
    slug,
    pageIndex: Math.max(0, Math.floor(pageIndex)),
  };

  try {
    window.sessionStorage.setItem(BOOK_SESSION_KEY, JSON.stringify(snapshot));
  } catch {
    // The animation should continue even when storage is unavailable.
  }
}
