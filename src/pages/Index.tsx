import React, {
  useState,
  useEffect,
  useCallback,
  Suspense,
  useRef,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import LoadingLogo from "@/components/LoadingLogo";
import SkyOceanBackground from "@/components/SkyOceanBackground";
import { listPublishedBooks } from "@/services/bookRepository";
import { listVisibleArchiveSections } from "@/services/archiveSectionRepository";
import type { Book } from "@/types/books";
import {
  DEFAULT_ARCHIVE_SECTIONS,
  type ArchiveSection,
} from "@/types/archiveSections";
import {
  BOOK_INDEX_RETURN_KEY,
  BOOK_INTRO_RETURN_KEY,
  readBookSession,
} from "@/components/books/bookSession";

const globalStyles = `
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; background: transparent; }
.no-scrollbar::-webkit-scrollbar-track { background: transparent; }
.no-scrollbar::-webkit-scrollbar-thumb { background: transparent; border: none; }

input.search-input {
  background-color: transparent !important;
  -webkit-appearance: none;
  appearance: none;
}
input.search-input:-webkit-autofill,
input.search-input:-webkit-autofill:hover,
input.search-input:-webkit-autofill:focus,
input.search-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 10000px transparent inset !important;
  -webkit-text-fill-color: inherit !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

.reveal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  -webkit-tap-highlight-color: transparent;
}

.reveal-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.mask-circle {
  transform-origin: 50% 50%;
  transform-box: fill-box;
  transform: scale(0);
  will-change: transform;
}

.mask-circle.is-opening {
  animation: reveal-elastic 3s 1.5s forwards;
}

.mask-circle.is-closing {
  animation: reveal-elastic-out 5s 2s reverse both;
}

@keyframes reveal-elastic {
  0% { transform: scale(0); }
  50% { transform: scale(1.7); }
  72% { transform: scale(0.92); }
  88% { transform: scale(9); }
  100% { transform: scale(9); }
}

@keyframes reveal-elastic-out {
  0% { transform: scale(0); }
  50% { transform: scale(0); }
  72% { transform: scale(1.7); }
  88% { transform: scale(0.72); }
  100% { transform: scale(9); }
}

.reveal-overlay.fade-out {
  animation: overlay-fade 220ms forwards;
}
@keyframes overlay-fade {
  from { opacity: 1; pointer-events: all; }
  to   { opacity: 0; pointer-events: none; visibility: hidden; }
}

.intro-elastic-item,
.index-elastic-item {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.intro-elastic-item.is-outside,
.index-elastic-item.is-outside {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.intro-elastic-item.is-visible,
.index-elastic-item.is-visible {
  transform: scale(1);
  opacity: 1;
}

.intro-elastic-item.is-entering,
.intro-elastic-item.is-leaving,
.index-elastic-item.is-entering,
.index-elastic-item.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: 960ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.intro-elastic-item.is-entering,
.index-elastic-item.is-entering {
  animation-direction: normal;
}

.intro-elastic-item.is-leaving,
.index-elastic-item.is-leaving {
  animation-direction: reverse;
  pointer-events: none;
}

.intro-elastic-item.item-start {
  animation-delay: 90ms;
}

.intro-elastic-item.item-back {
  animation-delay: 180ms;
}

.index-elastic-item.item-list {
  animation-delay: 140ms;
}

.main-control-item,
.archive-elastic-item {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.main-control-item.is-outside,
.archive-elastic-item.is-outside {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.main-control-item.is-visible,
.archive-elastic-item.is-visible {
  transform: scale(1);
  opacity: 1;
}

.main-control-item.is-entering,
.main-control-item.is-leaving,
.archive-elastic-item.is-entering,
.archive-elastic-item.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: 960ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.main-control-item.is-entering,
.archive-elastic-item.is-entering {
  animation-direction: normal;
}

.main-control-item.is-leaving,
.archive-elastic-item.is-leaving {
  animation-direction: reverse;
  pointer-events: none;
}

.main-control-item.item-back { animation-delay: 0ms; }
.main-control-item.item-archive { animation-delay: 90ms; }
.main-control-item.item-about { animation-delay: 180ms; }
.main-control-item.item-play { animation-delay: 270ms; }

.archive-elastic-item.item-featured { animation-delay: 0ms; }
.archive-elastic-item.item-search { animation-delay: 70ms; }
.archive-elastic-item.item-objects { animation-delay: 140ms; }
.archive-elastic-item.item-graphics { animation-delay: 210ms; }
.archive-elastic-item.item-concepts { animation-delay: 280ms; }
.archive-elastic-item.item-search-field { animation-delay: 350ms; }

@media (max-height: 599px) {
  .index-main-control-row {
    min-height: 36px;
    font-size: 12px;
  }

  .index-main-control-row button {
    font-size: 12px;
  }

  .index-intro-copy,
  .index-intro-control {
    font-size: 12px;
  }

  .index-archive-panel {
    margin-top: 12px;
    line-height: 1.35;
  }

  .index-archive-featured,
  .index-archive-category-button,
  .index-archive-search-input {
    font-size: 12px;
  }

  .index-archive-featured {
    min-height: 22px;
  }

  .index-archive-search-field {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .index-list-panel {
    top: calc(50% + clamp(64px, 12dvh, 72px));
    bottom: max(6px, env(safe-area-inset-bottom));
    height: auto !important;
    padding-top: 4px !important;
    padding-bottom: 0 !important;
    overflow: hidden;
  }

  .index-list-panel.is-list-open {
    transform: translateY(0) !important;
  }

  .index-list-panel.is-list-closed {
    transform: translateY(calc(100dvh + 100%)) !important;
  }

  .index-list-header,
  .index-list-row {
    font-size: 12px;
  }

  .index-list-scroll {
    max-height: none !important;
    height: calc(100% - 22px);
    overscroll-behavior: contain;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mask-circle.is-opening,
  .mask-circle.is-closing,
  .intro-elastic-item.is-entering,
  .intro-elastic-item.is-leaving,
  .index-elastic-item.is-entering,
  .index-elastic-item.is-leaving,
  .main-control-item.is-entering,
  .main-control-item.is-leaving,
  .archive-elastic-item.is-entering,
  .archive-elastic-item.is-leaving {
    animation-duration: 1ms;
    animation-delay: 0ms;
  }
}

.index-route-shell {
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter, border-radius;
  transition:
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 650ms ease,
    filter 650ms ease,
    border-radius 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.index-route-shell.is-entering {
  transform: translate3d(0, 110vh, 0) scale(0.82);
  opacity: 0;
  filter: blur(14px);
  border-radius: 50%;
}

.index-route-shell.is-entered {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
  border-radius: 0;
}

.index-route-shell.is-returning-from-book {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
  border-radius: 0;
  transition: none;
}

.index-route-shell.is-leaving {
  pointer-events: none;
  animation: index-route-balloon-out 400ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes index-route-balloon-out {
  0% {
    transform: translate3d(0, 0, 0) scale(1, 1);
    opacity: 1;
    filter: blur(0);
    border-radius: 0;
  }
  38% {
    transform: translate3d(0, -2vh, 0) scale(1.08, 1.08);
    opacity: 1;
    filter: blur(0);
    border-radius: 16%;
  }
  68% {
    transform: translate3d(0, -3vh, 0) scale(1.4, 0.72);
    opacity: 0.9;
    filter: blur(2px);
    border-radius: 48%;
  }
  100% {
    transform: translate3d(0, -6vh, 0) scale(3.2, 0.05);
    opacity: 0;
    filter: blur(18px);
    border-radius: 50%;
  }
}
`;

const STORAGE_KEYS = {
  splash: "splashShown",
  stage: "appStage",
  activeButton: "activeButton",
  searchOpen: "searchOpen",
  searchQuery: "searchQuery",
  returnFlag: "returnFromExample",
  snapshot: "listSnapshot",
  listScroll: "listScroll",
  exploreMode: "exploreMode",
};

type Stage = "intro" | "main" | "list" | "exiting";

type Item = {
  id: string;
  category: string;
  name: string;
  link: string;
  isFeatured: boolean;
};

type ListSnapshot = {
  activeButton?: string | null;
  searchOpen?: boolean;
  searchQuery?: string;
  stage?: Stage;
  introVisible?: boolean;
  archiveOpen?: boolean;
};

const ABOUT_TEXT =
  "Gabriel Dell'Aiuto. b. 1996. TEXT 2";

const Index = () => {
  const navigate = useNavigate();

  const returningToIntroRef = useRef(
    sessionStorage.getItem(BOOK_INTRO_RETURN_KEY) === "true"
  );
  const returningToIntro = returningToIntroRef.current;
  const returningFromBookRef = useRef(
    sessionStorage.getItem(BOOK_INDEX_RETURN_KEY) === "true" ||
      returningToIntro ||
      sessionStorage.getItem("bookOpenedFromStartup") === "true"
  );
  const returningFromBook = returningFromBookRef.current;
  const returningToIndexContentRef = useRef(
    returningFromBook &&
      sessionStorage.getItem(STORAGE_KEYS.returnFlag) === "true"
  );
  const returningToIndexContent = returningToIndexContentRef.current;
  const [returnBookSession] = useState(() => readBookSession());

  const [routeEntered, setRouteEntered] = useState(returningFromBook);

  const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState<string | null>(null);
  const [archiveSections, setArchiveSections] = useState<ArchiveSection[]>(
    DEFAULT_ARCHIVE_SECTIONS
  );
  const [archiveSectionsManaged, setArchiveSectionsManaged] = useState(false);

  const loadPublishedBooks = useCallback(async () => {
    setBooksLoading(true);

    try {
      const nextBooks = await listPublishedBooks();
      setPublishedBooks(nextBooks);
      setBooksError(null);
    } catch (error) {
      console.error("Unable to load published books", error);
      setBooksError(
        error instanceof Error ? error.message : "Unable to load the published books."
      );
    } finally {
      setBooksLoading(false);
    }
  }, []);

  const loadArchiveSections = useCallback(async () => {
    try {
      const nextSections = await listVisibleArchiveSections();
      setArchiveSections(nextSections);
      setArchiveSectionsManaged(true);
    } catch {
      setArchiveSections(DEFAULT_ARCHIVE_SECTIONS);
      setArchiveSectionsManaged(false);
    }
  }, []);

  useEffect(() => {
    void loadPublishedBooks();
    void loadArchiveSections();

    const refreshWhenFocused = () => {
      void loadPublishedBooks();
      void loadArchiveSections();
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        void loadPublishedBooks();
      }
    };

    window.addEventListener("focus", refreshWhenFocused);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.removeEventListener("focus", refreshWhenFocused);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [loadArchiveSections, loadPublishedBooks]);

  const featuredBook = useMemo(
    () => publishedBooks.find((book) => book.is_featured) ?? publishedBooks[0] ?? null,
    [publishedBooks]
  );

  const displayedArchiveSections = useMemo(() => {
    if (archiveSectionsManaged) return archiveSections;

    const nextSections = [...archiveSections];
    publishedBooks.forEach((book) => {
      if (nextSections.some((section) => section.slug === book.category)) return;
      nextSections.push({
        id: `fallback-${book.category}`,
        slug: book.category,
        name: book.category.replace(/-/g, " "),
        code: book.category.slice(0, 4).toUpperCase(),
        sort_order: nextSections.length,
        is_visible: true,
        created_at: "",
        updated_at: "",
      });
    });
    return nextSections;
  }, [archiveSections, archiveSectionsManaged, publishedBooks]);

  const archives = useMemo<Record<string, Item[]>>(() => {
    const sectionMap = new Map(
      displayedArchiveSections.map((section) => [section.slug, section])
    );
    const toItem = (book: Book): Item => ({
      id: book.id,
      category:
        sectionMap.get(book.category)?.code ?? book.category.slice(0, 4).toUpperCase(),
      name: book.title,
      link: `/book/${encodeURIComponent(book.slug)}`,
      isFeatured: book.is_featured,
    });

    return displayedArchiveSections.reduce<Record<string, Item[]>>(
      (result, section) => {
        result[section.slug] = publishedBooks
          .filter((book) => book.category === section.slug)
          .map(toItem);
        return result;
      },
      {}
    );
  }, [displayedArchiveSections, publishedBooks]);

  const allItems = useMemo<Item[]>(() => Object.values(archives).flat(), [archives]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const KEY = "__GLOBAL_SKY_OCEAN_BG_ROOT__";
    const windowWithBackgroundRoot = window as typeof window & Record<string, unknown>;
    const existingHost = document.getElementById("global-sky-ocean-bg");

    if (windowWithBackgroundRoot[KEY]) {
      if (existingHost) {
        existingHost.style.display = "block";
        existingHost.style.zIndex = "0";
      }

      return;
    }

    const host = document.createElement("div");
    host.id = "global-sky-ocean-bg";
    Object.assign(host.style, {
      position: "fixed",
      inset: "0",
      zIndex: "0",
      pointerEvents: "none",
    });

    document.body.prepend(host);

    const root = createRoot(host);
    root.render(
      <Suspense fallback={null}>
        <SkyOceanBackground />
      </Suspense>
    );

    windowWithBackgroundRoot[KEY] = root;
  }, []);

  const initialStage = returningToIntro
    ? "intro"
    : (sessionStorage.getItem(STORAGE_KEYS.stage) as Stage) || "intro";
  const initialActiveButton = sessionStorage.getItem(STORAGE_KEYS.activeButton) || null;
  const initialSearchOpen = sessionStorage.getItem(STORAGE_KEYS.searchOpen) === "true";
  const initialSearchQuery = sessionStorage.getItem(STORAGE_KEYS.searchQuery) || "";
  const initialExploreMode = sessionStorage.getItem(STORAGE_KEYS.exploreMode) === "true";

  const [stage, setStage] = useState<Stage>(initialStage);
  const [activeButton, setActiveButton] = useState<string | null>(initialActiveButton);
  const [searchOpen, setSearchOpen] = useState(initialSearchOpen);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [exploreMode, setExploreMode] = useState<boolean>(initialExploreMode);
  const initiallyArchiveOpen =
    initialStage === "list" || Boolean(initialActiveButton) || initialSearchOpen;
  const [archiveControlsMounted, setArchiveControlsMounted] = useState(
    initiallyArchiveOpen
  );
  const [aboutOpen, setAboutOpen] = useState(false);

  const [showSplash, setShowSplash] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [hasCheckedSplash, setHasCheckedSplash] = useState(false);

  useEffect(() => {
    if (!hasCheckedSplash || showSplash) {
      return;
    }

    if (returningFromBook) {
      setRouteEntered(true);
      return;
    }

    setRouteEntered(false);

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setRouteEntered(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [hasCheckedSplash, returningFromBook, showSplash]);

  const [revealPlaying, setRevealPlaying] = useState(false);
  const [revealClosing, setRevealClosing] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [introItemsEntered, setIntroItemsEntered] = useState(false);
  const [indexContentEntered, setIndexContentEntered] = useState(
    !returningToIndexContent
  );
  const introTransitionTimerRef = useRef<number | null>(null);
  const [revealDone, setRevealDone] = useState<boolean>(() => {
    if (returningFromBook) {
      return false;
    }

    try {
      return sessionStorage.getItem("revealDone") === "true";
    } catch {
      return false;
    }
  });

  const revealRef = useRef<HTMLDivElement | null>(null);
  const pendingBookDestinationRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (introTransitionTimerRef.current) {
        window.clearTimeout(introTransitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      !introVisible ||
      stage !== "intro" ||
      introLeaving ||
      revealClosing ||
      !revealDone
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIntroItemsEntered(true);
      window.dispatchEvent(new Event("mousemove"));
    }, 1160);

    return () => {
      window.clearTimeout(timer);
    };
  }, [introLeaving, introVisible, revealClosing, revealDone, stage]);

  useEffect(() => {
    if (
      (stage !== "main" && stage !== "list") ||
      revealClosing ||
      !revealDone ||
      indexContentEntered
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIndexContentEntered(true);
      window.dispatchEvent(new Event("mousemove"));
    }, 1160);

    return () => {
      window.clearTimeout(timer);
    };
  }, [indexContentEntered, revealClosing, revealDone, stage]);

  const [inactive, setInactive] = useState(false);
  const inactivityTimer = useRef<number | null>(null);

  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const [pendingReentryRestore, setPendingReentryRestore] = useState(false);

  useEffect(() => {
    if (!returningFromBook) return;

    sessionStorage.removeItem("bookOpenedFromStartup");
    sessionStorage.removeItem(BOOK_INDEX_RETURN_KEY);
    sessionStorage.removeItem(BOOK_INTRO_RETURN_KEY);
    sessionStorage.removeItem("revealDone");

    setRevealDone(false);
    setRevealPlaying(false);

    document.documentElement.style.background = "";
    document.body.style.background = "";

    const bg = document.getElementById("global-sky-ocean-bg");
    if (bg) {
      bg.style.display = "block";
      bg.style.zIndex = "0";
    }
  }, [returningFromBook]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.exploreMode, String(exploreMode));
    } catch {
      // The UI still works when session storage is unavailable.
    }

    window.dispatchEvent(new CustomEvent("explore-mode", { detail: { enabled: exploreMode } }));

    const host = document.getElementById("global-sky-ocean-bg");
    if (host) host.setAttribute("data-explore", exploreMode ? "1" : "0");
  }, [exploreMode]);

  useEffect(() => {
    const audioActive = hasCheckedSplash && !showSplash && !revealClosing;
    const host = document.getElementById("global-sky-ocean-bg");
    host?.setAttribute("data-audio-active", audioActive ? "1" : "0");

    const timer = window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("skyocean-audio", {
          detail: { active: audioActive },
        })
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [hasCheckedSplash, revealClosing, showSplash]);

  useEffect(() => {
    return () => {
      document
        .getElementById("global-sky-ocean-bg")
        ?.setAttribute("data-audio-active", "0");
      window.dispatchEvent(
        new CustomEvent("skyocean-audio", { detail: { active: false } })
      );
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.stage, stage);
    sessionStorage.setItem(STORAGE_KEYS.activeButton, activeButton ?? "");
    sessionStorage.setItem(STORAGE_KEYS.searchOpen, String(searchOpen));
    sessionStorage.setItem(STORAGE_KEYS.searchQuery, searchQuery);
  }, [stage, activeButton, searchOpen, searchQuery]);

  useEffect(() => {
    const splashAlreadyShown = sessionStorage.getItem(STORAGE_KEYS.splash);

    if (!splashAlreadyShown && stage === "intro" && !returningFromBook) {
      setShowSplash(true);
    } else {
      setIntroVisible(true);
    }

    setHasCheckedSplash(true);
  }, [returningFromBook, stage]);

  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEYS.splash, "true");
    sessionStorage.setItem("bookOpenedFromStartup", "true");
    sessionStorage.removeItem("revealDone");

    document.documentElement.style.background = "white";
    document.body.style.background = "white";

    const bg = document.getElementById("global-sky-ocean-bg");

    if (bg) {
      bg.style.display = "none";
    }

    setShowSplash(false);

    if (featuredBook) {
      navigate(`/book/${encodeURIComponent(featuredBook.slug)}`);
    } else {
      navigate("/books");
    }
  }, [featuredBook, navigate]);

  useEffect(() => {
    if (
      (introVisible || returningFromBook) &&
      !revealDone &&
      !revealPlaying &&
      !revealClosing
    ) {
      setRevealPlaying(true);
    }
  }, [introVisible, returningFromBook, revealClosing, revealDone, revealPlaying]);

  const onRevealEnd = useCallback(() => {
    // The aperture can outlast the idle timer. Treat its completion as fresh
    // activity so the following element choreography remains visible.
    window.dispatchEvent(new Event("mousemove"));

    try {
      sessionStorage.setItem("revealDone", "true");
    } catch {
      // The reveal still completes when session storage is unavailable.
    }

    if (revealRef.current) {
      revealRef.current.classList.add("fade-out");

      setTimeout(() => {
        setRevealPlaying(false);
        setRevealDone(true);
      }, 240);
    } else {
      setRevealPlaying(false);
      setRevealDone(true);
    }
  }, []);

  const beginBookNavigation = useCallback(
    (destination: string) => {
      if (revealClosing) {
        return;
      }

      pendingBookDestinationRef.current = destination;
      setRevealPlaying(false);
      setRevealClosing(true);
    },
    [revealClosing]
  );

  const finishBookNavigation = useCallback(() => {
    const destination = pendingBookDestinationRef.current;

    if (!destination) {
      return;
    }

    document.documentElement.style.background = "white";
    document.body.style.background = "white";

    const bg = document.getElementById("global-sky-ocean-bg");

    if (bg) {
      bg.style.display = "none";
    }

    navigate(destination);
  }, [navigate]);

  const resetState = useCallback(() => {
    setActiveButton(null);
    setSearchOpen(false);
    setSearchQuery("");
    setStage("main");
  }, []);

  const dismissArchiveControls = useCallback(() => {
    setArchiveControlsMounted(false);
  }, []);

  const handleArchiveToggle = useCallback(() => {
    setAboutOpen(false);
    if (archiveControlsMounted) {
      resetState();
    }

    setArchiveControlsMounted((open) => !open);
    window.dispatchEvent(new Event("mousemove"));
  }, [archiveControlsMounted, resetState]);

  const handleAboutToggle = useCallback(() => {
    if (aboutOpen) {
      setAboutOpen(false);
      return;
    }

    resetState();
    setArchiveControlsMounted(false);
    setAboutOpen(true);
    window.dispatchEvent(new Event("mousemove"));
  }, [aboutOpen, resetState]);

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [allItems, searchQuery]
  );

  const getDisplayedItems = useCallback((): Item[] => {
    if (activeButton && activeButton !== "search" && !searchQuery) {
      const sorted = archives[activeButton] || [];

      const others = allItems.filter(
        (item) => !sorted.some((sortedItem) => sortedItem.id === item.id)
      );

      return [...sorted, ...others];
    }

    if (activeButton === "search" && searchQuery) {
      const sorted = filteredItems;

      const others = allItems.filter(
        (item) => !sorted.some((sortedItem) => sortedItem.id === item.id)
      );

      return [...sorted, ...others];
    }

    return allItems;
  }, [activeButton, searchQuery, archives, allItems, filteredItems]);

  const displayedItems = getDisplayedItems();

  const handleArchiveClick = useCallback(
    (buttonName: string) => {
      if (activeButton === buttonName) {
        resetState();
      } else {
        setActiveButton(buttonName);
        setStage("list");
        setSearchOpen(false);
        setSearchQuery("");
      }
    },
    [activeButton, resetState]
  );

  const handleRowClick = useCallback(
    (link: string) => {
      const scrollTop = listScrollRef.current ? listScrollRef.current.scrollTop : 0;

      sessionStorage.setItem(STORAGE_KEYS.listScroll, String(scrollTop));

      const snapshot = {
        activeButton,
        searchOpen,
        searchQuery,
        stage,
        introVisible,
        archiveOpen: archiveControlsMounted,
      };

      try {
        sessionStorage.setItem(STORAGE_KEYS.snapshot, JSON.stringify(snapshot));
      } catch {
        // Navigation can continue without a restorable list snapshot.
      }

      sessionStorage.setItem(STORAGE_KEYS.returnFlag, "true");

      beginBookNavigation(link);
    },
    [
      activeButton,
      archiveControlsMounted,
      beginBookNavigation,
      introVisible,
      searchOpen,
      searchQuery,
      stage,
    ]
  );

  const handleBackToIntro = useCallback(() => {
    resetState();
    dismissArchiveControls();
    setAboutOpen(false);
    setIntroLeaving(false);
    setIntroItemsEntered(false);
    setStage("intro");
  }, [dismissArchiveControls, resetState]);

  const handleStart = useCallback(() => {
    if (introLeaving || revealClosing) {
      return;
    }

    setIntroLeaving(true);
    setIndexContentEntered(false);
    dismissArchiveControls();
    setAboutOpen(false);

    introTransitionTimerRef.current = window.setTimeout(() => {
      setStage("main");
      setIntroLeaving(false);
    }, 1160);
  }, [dismissArchiveControls, introLeaving, revealClosing]);

  const handleReturnToBook = useCallback(() => {
    if (!returnBookSession || revealClosing) {
      return;
    }

    beginBookNavigation(`/book/${encodeURIComponent(returnBookSession.slug)}`);
  }, [beginBookNavigation, returnBookSession, revealClosing]);

  const handleSearchClick = useCallback(() => {
    if (activeButton === "search") {
      resetState();
    } else {
      setSearchOpen(true);
      setStage("list");
      setActiveButton("search");
    }
  }, [activeButton, resetState]);

  const resetInactivityTimer = useCallback(() => {
    setInactive(false);

    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = window.setTimeout(() => {
      setInactive(true);
    }, 5000);
  }, []);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "touchstart", "touchmove", "keydown"];

    events.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer);
      });

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetInactivityTimer]);

  useEffect(() => {
    if (!hasCheckedSplash) return;

    const shouldReturn = sessionStorage.getItem(STORAGE_KEYS.returnFlag) === "true";

    if (!shouldReturn) return;

    let restored: ListSnapshot | null = null;

    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.snapshot);
      restored = raw ? (JSON.parse(raw) as ListSnapshot) : null;
    } catch {
      // Ignore malformed or unavailable session snapshots.
    }

    if (restored) {
      setActiveButton(restored.activeButton ?? null);
      setSearchOpen(Boolean(restored.searchOpen));
      setSearchQuery(restored.searchQuery ?? "");

      if (restored.archiveOpen || restored.stage === "list") {
        setArchiveControlsMounted(true);
      } else {
        setArchiveControlsMounted(false);
      }

      if (restored.stage) {
        setStage(restored.stage as Stage);
      }

      setIntroVisible(Boolean(restored.introVisible));

      if (restored.stage === "list") {
        setPendingReentryRestore(true);
      }

      sessionStorage.removeItem(STORAGE_KEYS.returnFlag);

      return;
    }

    setIntroVisible(true);
    setStage("main");
    setArchiveControlsMounted(true);

    window.setTimeout(() => {
      setStage("list");
      setPendingReentryRestore(true);
      sessionStorage.removeItem(STORAGE_KEYS.returnFlag);
    }, 700);
  }, [hasCheckedSplash]);

  useEffect(() => {
    if (stage !== "list" || !pendingReentryRestore) return;

    const saved = Number(sessionStorage.getItem(STORAGE_KEYS.listScroll) || "0");

    const timeout = window.setTimeout(() => {
      if (listScrollRef.current) {
        listScrollRef.current.scrollTop = Number.isNaN(saved) ? 0 : saved;
      }

      setPendingReentryRestore(false);
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [stage, pendingReentryRestore]);

  const joyBaseRef = useRef<HTMLDivElement | null>(null);
  const joyKnobRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const joystickTapEligibleRef = useRef(false);
  const joystickMovedRef = useRef(false);
  const pointerOriginRef = useRef({ x: 0, y: 0 });

  const startRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const radius = 60;

  const sendJoystick = useCallback((x: number, z: number) => {
    window.dispatchEvent(
      new CustomEvent("explore-joystick", {
        detail: { x, z },
      })
    );
  }, []);

  const sendJump = useCallback(() => {
    window.dispatchEvent(new CustomEvent("explore-jump"));
  }, []);

  useEffect(() => {
    if (!exploreMode) {
      return;
    }

    const stopSpaceDefault = (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    const handleSpaceDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      stopSpaceDefault(event);

      if (!event.repeat) {
        sendJump();
      }
    };

    window.addEventListener("keydown", handleSpaceDown, true);
    window.addEventListener("keyup", stopSpaceDefault, true);

    return () => {
      window.removeEventListener("keydown", handleSpaceDown, true);
      window.removeEventListener("keyup", stopSpaceDefault, true);
    };
  }, [exploreMode, sendJump]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!exploreMode) return;

      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);

      const rect = event.currentTarget.getBoundingClientRect();

      startRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      pointerOriginRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      joystickMovedRef.current = false;
      joystickTapEligibleRef.current =
        Math.hypot(
          event.clientX - startRef.current.x,
          event.clientY - startRef.current.y
        ) <= 34;
    },
    [exploreMode]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current || !joyKnobRef.current) return;

      const dx = event.clientX - startRef.current.x;
      const dy = event.clientY - startRef.current.y;

      if (
        Math.hypot(
          event.clientX - pointerOriginRef.current.x,
          event.clientY - pointerOriginRef.current.y
        ) > 8
      ) {
        joystickMovedRef.current = true;
      }

      const length = Math.hypot(dx, dy);
      const clampedLength = length > radius ? radius : length;

      const normalizedX = (dx / (length || 1)) * clampedLength;
      const normalizedY = (dy / (length || 1)) * clampedLength;

      joyKnobRef.current.style.transform = `translate(${normalizedX}px, ${normalizedY}px)`;

      const movementX = normalizedX / radius;
      const movementZ = -normalizedY / radius;

      sendJoystick(movementX, movementZ);
    },
    [sendJoystick]
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;

      draggingRef.current = false;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (joyKnobRef.current) {
        joyKnobRef.current.style.transform = "translate(0px, 0px)";
      }

      sendJoystick(0, 0);

      if (
        event.type !== "pointercancel" &&
        joystickTapEligibleRef.current &&
        !joystickMovedRef.current
      ) {
        sendJump();
      }

      joystickTapEligibleRef.current = false;
      joystickMovedRef.current = false;
    },
    [sendJoystick, sendJump]
  );

  const isItemActive = useCallback(
    (item: Item): boolean =>
      Boolean(
        (activeButton &&
          activeButton !== "search" &&
          archives[activeButton]?.some((archiveItem) => archiveItem.id === item.id)) ||
          (activeButton === "search" &&
            searchQuery &&
            filteredItems.some((filteredItem) => filteredItem.id === item.id))
      ),
    [activeButton, archives, filteredItems, searchQuery]
  );

  const introItemMotionClass =
    introVisible && stage === "intro"
      ? revealClosing || introLeaving
        ? "is-leaving"
        : !revealDone
          ? "is-outside"
        : introItemsEntered
          ? "is-visible"
          : "is-entering"
      : "is-outside";

  const indexContentMotionClass =
    (stage === "main" || stage === "list") && revealClosing
      ? "is-leaving"
      : !revealDone
        ? "is-outside"
      : !indexContentEntered
        ? "is-entering"
        : "is-visible";

  const mainControlMotionClass =
    stage === "main" || stage === "list"
      ? indexContentMotionClass
      : "is-outside";

  const menuLift =
    stage === "list"
      ? "-15vh"
      : archiveControlsMounted || aboutOpen
        ? "-42px"
        : "0px";

  const archivePieceCount = displayedArchiveSections.length + 3;

  const mainControlTranslation = (index: number) => ({
    animate: {
      y: stage === "main" || stage === "list" ? menuLift : "0px",
    },
    transition: {
      type: "spring" as const,
      stiffness: 270,
      damping: 25,
      mass: 0.74,
      delay: index * 0.025,
    },
  });

  const archivePieceMotion = (index: number, totalPieces = archivePieceCount) => {
    const enterDelay = index * 0.055;
    const leaveDelay = Math.max(0, totalPieces - 1 - index) * 0.035;
    const hidden = {
      scale: 0,
      opacity: 0,
      filter: "blur(8px)",
      y: menuLift,
    };

    return {
      initial: hidden,
      animate: revealClosing
        ? {
            ...hidden,
            transition: {
              scale: {
                type: "spring" as const,
                stiffness: 460,
                damping: 25,
                mass: 0.62,
                delay: leaveDelay,
              },
              opacity: { duration: 0.16, delay: leaveDelay },
              filter: { duration: 0.2, delay: leaveDelay },
              y: {
                type: "spring" as const,
                stiffness: 270,
                damping: 25,
                mass: 0.74,
                delay: leaveDelay,
              },
            },
          }
        : {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: menuLift,
          },
      exit: {
        ...hidden,
        transition: {
          scale: {
            type: "spring" as const,
            stiffness: 460,
            damping: 25,
            mass: 0.62,
            delay: leaveDelay,
          },
          opacity: { duration: 0.16, delay: leaveDelay },
          filter: { duration: 0.2, delay: leaveDelay },
          y: {
            type: "spring" as const,
            stiffness: 270,
            damping: 25,
            mass: 0.74,
            delay: leaveDelay,
          },
        },
      },
      transition: {
        scale: {
          type: "spring" as const,
          stiffness: 430,
          damping: 20,
          mass: 0.7,
          delay: enterDelay,
        },
        opacity: { duration: 0.2, delay: enterDelay },
        filter: { duration: 0.25, delay: enterDelay },
        y: {
          type: "spring" as const,
          stiffness: 270,
          damping: 25,
          mass: 0.74,
          delay: index * 0.025,
        },
      },
    };
  };

  if (!hasCheckedSplash) return null;

  return (
    <>
      <style>{globalStyles}</style>

      {showSplash ? (
        <LoadingLogo onComplete={handleLoadingComplete} />
      ) : (
        <div
          className={`index-route-shell fixed inset-0 overflow-hidden z-10 ${
            returningFromBook
              ? "is-returning-from-book"
              : routeEntered
                ? "is-entered"
                : "is-entering"
          }`}
        >
          <div
            className="fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in"
            style={{
              opacity: inactive ? 0 : 1,
            }}
            >
              <div
              className={`absolute inset-x-0 flex flex-col items-center justify-center text-black ${
                introVisible && stage === "intro" ? "" : "pointer-events-none"
              } ${exploreMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <p
                className={`index-intro-copy intro-elastic-item ${introItemMotionClass} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`}
                onClick={handleBackToIntro}
              >
                TEXT 1
                <br />
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleReturnToBook}
                  disabled={!introItemsEntered || introLeaving}
                  className={`index-intro-control intro-elastic-item item-start ${introItemMotionClass} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`}
                >
                  <span className="animate-bounce">BACK</span>
                </button>

                {returnBookSession && (
                  <button
                    type="button"
                    onClick={handleStart}
                    disabled={!introItemsEntered || revealClosing}
                    className={`index-intro-control intro-elastic-item item-back ${introItemMotionClass} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`}
                  >
                    START
                  </button>
                )}
              </div>
            </div>

            <div
              className={`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${
                stage === "intro" ? "pointer-events-none" : ""
              }`}
              style={{ top: "calc(50% - 24px)" }}
            >
              <div className="index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] md:gap-10 md:text-[16px]">
                <motion.div {...mainControlTranslation(0)}>
                  <div className={`main-control-item item-back ${mainControlMotionClass}`}>
                    <button
                      onClick={handleBackToIntro}
                      className={`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${
                        exploreMode ? "pointer-events-none opacity-0" : "opacity-100"
                      }`}
                    >
                      BACK
                    </button>
                  </div>
                </motion.div>

                <motion.div {...mainControlTranslation(1)}>
                  <div className={`main-control-item item-archive ${mainControlMotionClass}`}>
                    <button
                      type="button"
                      onClick={handleArchiveToggle}
                      aria-expanded={archiveControlsMounted}
                      className={`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${
                        archiveControlsMounted ? "animate-bounce" : ""
                      } ${exploreMode ? "pointer-events-none opacity-0" : "opacity-100"}`}
                    >
                      ARCHIVE
                    </button>
                  </div>
                </motion.div>

                <motion.div {...mainControlTranslation(2)}>
                  <div className={`main-control-item item-about ${mainControlMotionClass}`}>
                    <button
                      type="button"
                      onClick={handleAboutToggle}
                      aria-expanded={aboutOpen}
                      className={`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${
                        aboutOpen ? "animate-bounce" : ""
                      } ${exploreMode ? "pointer-events-none opacity-0" : "opacity-100"}`}
                    >
                      BIO
                    </button>
                  </div>
                </motion.div>

                <motion.div {...mainControlTranslation(3)}>
                  <div className={`main-control-item item-play ${mainControlMotionClass}`}>
                    <button
                      onClick={(event) => {
                        event.currentTarget.blur();
                        setExploreMode((currentValue) => !currentValue);
                      }}
                      title={exploreMode ? "Exit Explore" : "Explore"}
                      className={`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${
                        exploreMode
                          ? "translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in"
                          : "bg-alpha hover:border-none active:border-none transition-all"
                      }`}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={`w-6 h-6 spin-slow select-none ${
                        exploreMode
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0 transition-all"
                      }`}
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                    </svg>

                    <span
                      className={`transition-all text-bold whitespace-nowrap ${
                        exploreMode ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                      }`}
                    >
                      PLAY
                    </span>
                    </button>
                  </div>
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
              {archiveControlsMounted && (
                <motion.div
                  key="archive-controls"
                  initial={false}
                  className={`index-archive-panel mx-auto mt-10 pb-0 text-center leading-[2] transition-opacity duration-500 ${
                    exploreMode ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <motion.div
                    {...archivePieceMotion(0, archivePieceCount)}
                    className="index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[14px] md:text-[16px]"
                  >
                    {featuredBook ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleRowClick(`/book/${encodeURIComponent(featuredBook.slug)}`)
                        }
                        className="inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105"
                      >
                        <span className="shrink-0 text-black">COVER</span> <br /> <br />
                        <span className="truncate">{featuredBook.title}</span>
                      </button>
                    ) : booksLoading ? (
                      <span className="text-black/50">...</span>
                    ) : booksError ? (
                      <button
                        type="button"
                        onClick={() => void loadPublishedBooks()}
                        className="text-black/60 bounce"
                      >
                        RETRY BOOK LIST
                      </button>
                    ) : (
                      <span className="text-black/50">NO PUBLISHED BOOKS</span>
                    )}
                  </motion.div>

                  <div className="index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3">
                    <motion.div
                      {...archivePieceMotion(1, archivePieceCount)}
                      className="archive-elastic-item item-search"
                    >
                      <button
                        onClick={handleSearchClick}
                        className={`index-archive-category-button z-10 flex items-center text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${
                          activeButton === "search" ? "animate-bounce" : "bg-alpha"
                        }`}
                      >
                        search
                      </button>
                    </motion.div>

                    {displayedArchiveSections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        {...archivePieceMotion(index + 2, archivePieceCount)}
                        className={`archive-elastic-item item-${section.slug}`}
                      >
                        <button
                          onClick={() => {
                            handleArchiveClick(section.slug);
                          }}
                          className={`index-archive-category-button text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${
                            activeButton === section.slug ? "animate-bounce" : "bg-alpha"
                          }`}
                        >
                          {section.name}
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    {...archivePieceMotion(archivePieceCount - 1, archivePieceCount)}
                    className="index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2"
                  >
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        searchOpen
                          ? "w-full opacity-100 scale-100"
                          : "w-0 opacity-0 scale-0"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(event) => {
                          setSearchQuery(event.target.value);
                        }}
                        className="index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]"
                        autoComplete="off"
                        inputMode="text"
                        spellCheck={false}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {aboutOpen && (
                  <motion.div
                    key="about-panel"
                    initial={false}
                    className={`mx-auto mt-7 max-w-xl pb-0 text-center leading-[1.55] ${
                      exploreMode ? "pointer-events-none opacity-0" : "opacity-100"
                    }`}
                  >
                    <motion.div
                      {...archivePieceMotion(0, 2)}
                      className="archive-elastic-item px-2 text-[14px] md:text-[16px]"
                    >

                      <p>{ABOUT_TEXT}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className={`index-list-panel ${stage === "list" ? "is-list-open" : "is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] md:text-[16px] ease-in-out ${
                stage === "list" ? "translate-y-[45vh]" : "translate-y-[100vh]"
              } ${exploreMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              style={{
                height: "75vh",
              }}
            >
              <div
                className={`index-elastic-item item-list ${indexContentMotionClass}`}
              >
              <div className="index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] md:text-[16px] font-light">
                <div className="py-[0.5px]">TAG</div>
                <div className="py-[0.5px]">TITLE</div>
              </div>

              {!booksLoading && !booksError && allItems.length === 0 ? (
                <div className="py-5 text-center text-[14px] text-black/50">
                  Publish a book in the backend to make it appear here.
                </div>
              ) : (
                <div
                  ref={listScrollRef}
                  className="index-list-scroll overflow-y-auto no-scrollbar"
                  style={{
                    maxHeight: "calc(30vh - 2rem)",
                  }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                  {displayedItems.map((item, index) => {
                    const isActiveCategory = isItemActive(item);

                    return (
                      <motion.div
                        key={`${activeButton ?? "all"}:${item.id}`}
                        initial={{ scale: 0, opacity: 0, filter: "blur(7px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        exit={{ scale: 0, opacity: 0, filter: "blur(7px)" }}
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          scale: {
                            type: "spring",
                            stiffness: 430,
                            damping: 23,
                            mass: 0.68,
                            delay: index * 0.022,
                          },
                          opacity: { duration: 0.18, delay: index * 0.022 },
                          filter: { duration: 0.22, delay: index * 0.022 },
                        }}
                        className={`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${
                          isActiveCategory
                            ? "text-black"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          handleRowClick(item.link);
                        }}
                      >
                        <div className="py-[0.5px] tracking-normal">{item.category}</div>

                        <div className="py-[0.5px] tracking-normal leading-tight">
                          {item.name}
                          {item.isFeatured ? " *" : ""}
                        </div>
                      </motion.div>
                    );
                  })}
                  </AnimatePresence>
                </div>
              )}
              </div>
            </div>
          </div>

          {exploreMode && (
            <div
              ref={joyBaseRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              role="button"
              aria-label="Move player; tap the center to jump"
              tabIndex={-1}
              className="fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center"
              style={{
                touchAction: "none",
                zIndex: 20,
              }}
            >
              <div
                ref={joyKnobRef}
                className="pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]"
                style={{
                  transform: "translate(0px, 0px)",
                  transition: "transform 120ms ease-out",
                }}
              >
                <span aria-hidden="true">↑</span>
              </div>
            </div>
          )}

          {((!revealDone && (revealPlaying || returningFromBook)) ||
            revealClosing) && (
            <div ref={revealRef} className="reveal-overlay" aria-hidden="true">
              <svg
                className="reveal-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                role="presentation"
              >
                <defs>
                  <mask id="hole-mask">
                    <rect x="0" y="0" width="100" height="100" fill="white" />

                    <circle
                      className={`mask-circle ${
                        revealClosing ? "is-closing" : "is-opening"
                      }`}
                      cx="50"
                      cy="50"
                      r="10"
                      fill="black"
                      onAnimationEnd={
                        revealClosing ? finishBookNavigation : onRevealEnd
                      }
                    />
                  </mask>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="white"
                  mask="url(#hole-mask)"
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
