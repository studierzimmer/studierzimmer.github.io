import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import type { Book, BookPage } from "@/types/books";
import {
  listBookPages,
  listPublishedBooks,
} from "@/services/bookRepository";
import FoldingBookViewer from "@/components/books/FoldingBookViewer";
import {
  BOOK_INDEX_RETURN_KEY,
  BOOK_INTRO_RETURN_KEY,
  readBookSession,
  writeBookSession,
} from "@/components/books/bookSession";

const loadAdminPortal = () => import("@/components/admin/AdminPortal");
const AdminPortal = lazy(loadAdminPortal);

interface PublicBookLibraryProps {
  initialSlug?: string | null;
  onBack: () => void;
  onLogin: () => void;
  onThreeD: () => void;
  onBookChange?: (slug: string) => void;
}

type CenterMotion = "outside" | "entering" | "visible" | "leaving";

const BOOK_MOTION_DURATION = 1120;
const BOOK_ENTER_HOLD_DURATION = 180;
const BOOK_META_STAGGER_TAIL = 140;
const BOOK_LEAVE_TOTAL_DURATION =
  BOOK_MOTION_DURATION + BOOK_META_STAGGER_TAIL;
const BOOK_ENTER_TOTAL_DURATION =
  BOOK_ENTER_HOLD_DURATION + BOOK_LEAVE_TOTAL_DURATION;
const BOOK_SWITCH_MOTION_DURATION = 920;
const BOOK_SWITCH_ENTER_HOLD_DURATION = 120;
const BOOK_SWITCH_LEAVE_TOTAL_DURATION =
  BOOK_SWITCH_MOTION_DURATION + BOOK_META_STAGGER_TAIL;
const BOOK_BACKGROUND_MIX_DURATION = 1180;
const BOOK_VIEWER_READY_TIMEOUT = 1800;

const libraryStyles = `
.public-book-shell {
  height: 100vh;
  height: 100dvh;
}

.public-book-nav {
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  gap: clamp(5px, 1.8vw, 8px);
  max-width: calc(100vw - 24px);
}

.public-book-nav-icon {
  width: clamp(42px, 12vw, 48px);
  height: clamp(42px, 12vw, 48px);
}

.public-book-nav-text {
  height: clamp(42px, 12vw, 48px);
  padding-inline: clamp(12px, 3.8vw, 16px);
}

.public-book-main {
  padding-top: calc(env(safe-area-inset-top) + 5.25rem);
  padding-bottom: calc(env(safe-area-inset-bottom) + 0.9rem);
}

.public-book-viewport {
  width: min(96vw, 1400px);
  height: min(74dvh, 850px, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 13rem));
  min-height: 220px;
}

.public-book-title {
  margin-top: clamp(14px, 4dvh, 5rem);
}

.public-book-description {
  margin-top: clamp(8px, 2dvh, 1.25rem);
}

@media (max-width: 380px), (max-height: 700px) {
  .public-book-nav {
    left: 50%;
    top: max(8px, env(safe-area-inset-top));
    transform: translateX(-50%);
    gap: clamp(4px, 1.4vw, 6px);
    max-width: calc(100vw - 12px);
  }

  .public-book-nav-icon {
    width: 40px;
    height: 40px;
  }

  .public-book-nav-text {
    height: 40px;
    padding-inline: 11px;
    font-size: 12px;
  }

  .public-book-main {
    padding-top: calc(env(safe-area-inset-top) + 4.3rem);
    padding-bottom: calc(env(safe-area-inset-bottom) + 0.55rem);
  }

  .public-book-viewport {
    width: min(94vw, 1400px);
    height: min(66dvh, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 9.5rem));
    min-height: 190px;
  }

  .public-book-title,
  .public-book-description {
    font-size: 14px;
  }

  .public-book-label-wrap {
    display: none;
  }

  .public-book-balloon {
    top: calc(env(safe-area-inset-top) + 3.8rem);
    max-height: calc(100dvh - env(safe-area-inset-top) - 4.5rem);
  }
}

@media (max-height: 520px) {
  .public-book-description {
    display: none;
  }

  .public-book-title {
    margin-top: 8px;
  }
}

.public-book-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.public-book-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.public-book-background-layer {
  position: absolute;
  inset: -4%;
  transform-origin: 50% 50%;
  will-change: opacity, transform, filter, clip-path;
}

.public-book-background-layer.is-current {
  animation: public-book-background-mix-in ${BOOK_BACKGROUND_MIX_DURATION}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${BOOK_BACKGROUND_MIX_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes public-book-background-mix-in {
  0% {
    opacity: 0;
    transform: scale(1.08);
    filter: blur(30px) saturate(0.88);
    clip-path: circle(0% at 50% 50%);
  }
  52% {
    opacity: 0.72;
    filter: blur(12px) saturate(1.04);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0) saturate(1);
    clip-path: circle(150% at 50% 50%);
  }
}

@keyframes public-book-background-mix-out {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0) saturate(1);
  }
  62% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0) saturate(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.96);
    filter: blur(30px) saturate(0.86);
  }
}

.public-book-stage {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.public-book-meta {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.public-book-meta.is-outside {
  transform: scale(0);
  opacity: 0;
}

.public-book-meta.is-visible {
  transform: scale(1);
  opacity: 1;
}

.public-book-meta.is-entering,
.public-book-meta.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: ${BOOK_MOTION_DURATION}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${BOOK_SWITCH_MOTION_DURATION}ms;
}

.public-book-meta.is-entering { animation-direction: normal; }
.public-book-meta.is-leaving {
  animation-direction: reverse;
  pointer-events: none;
}

.public-book-meta.item-title { animation-delay: 70ms; }
.public-book-meta.item-description { animation-delay: 140ms; }

.public-book-stage.is-outside {
  transform: scale(0);
  opacity: 0;
}

.public-book-stage.is-visible {
  transform: scale(1);
  opacity: 1;
}

.public-book-stage.is-entering,
.public-book-stage.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: ${BOOK_MOTION_DURATION}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${BOOK_SWITCH_MOTION_DURATION}ms;
}

.public-book-stage.is-entering {
  animation-direction: normal;
}

.public-book-stage.is-leaving {
  pointer-events: none;
  animation-direction: reverse;
}

.public-login-stage {
  opacity: 0;
  transition: opacity 220ms ease;
}

.public-login-stage.is-outside {
  opacity: 0;
  pointer-events: none;
}

.public-login-stage.is-entering,
.public-login-stage.is-visible {
  opacity: 1;
}

.public-login-stage.is-leaving {
  opacity: 1;
}

.public-nav-item,
.public-book-label {
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter;
}

.public-nav-item.is-visible,
.public-book-label.is-visible {
  animation: public-nav-arrive 760ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: var(--public-nav-delay, 0ms);
}

.public-nav-item.is-leaving,
.public-book-label.is-leaving {
  animation: elastic-center-scale 720ms cubic-bezier(0.22, 0.88, 0.3, 1) reverse both;
  animation-delay: var(--public-nav-exit-delay, 0ms);
  pointer-events: none;
}

.public-nav-item.is-outside,
.public-book-label.is-outside {
  transform: translate3d(0, -72px, 0) scale(0);
  opacity: 0;
  filter: blur(8px);
  pointer-events: none;
}

@keyframes public-nav-arrive {
  0% { transform: translate3d(0, -72px, 0) scale(0); opacity: 0; filter: blur(8px); }
  58% { transform: translate3d(0, 7px, 0) scale(1.12); opacity: 1; filter: blur(0); }
  76% { transform: translate3d(0, -3px, 0) scale(0.94); }
  90% { transform: translate3d(0, 1px, 0) scale(1.025); }
  100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
  .public-book-stage.is-entering,
  .public-book-stage.is-leaving,
  .public-book-meta.is-entering,
  .public-book-meta.is-leaving,
  .public-login-stage.is-entering,
  .public-login-stage.is-leaving,
  .public-nav-item,
  .public-book-label {
    animation-duration: 1ms;
  }
}

.public-route-message {
  will-change: transform, opacity, filter;
  transition:
    transform 760ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 560ms ease,
    filter 560ms ease;
}

.public-route-message.is-outside {
  transform: translate3d(0, 105vh, 0) scale(0.86);
  opacity: 0;
  filter: blur(12px);
}

.public-route-message.is-visible {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .public-book-background-layer.is-current,
  .public-book-background-layer.is-previous {
    animation-duration: 1ms;
  }
}
`;

const CATEGORY_LABELS: Record<Book["category"], string> = {
  objects: "OBJ",
  graphics: "GRPH",
  concepts: "CNCP",
};

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : "Unable to load the books.";
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

function bookBackgroundColor(book: Book | null): string {
  const channel = (value: number | undefined) =>
    Number.isFinite(value)
      ? Math.min(255, Math.max(0, Math.round(value ?? 255)))
      : 255;

  return `rgb(${channel(book?.background_r)} ${channel(book?.background_g)} ${channel(book?.background_b)})`;
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      resolve();
    };

    const timeout = window.setTimeout(finish, 5000);

    image.onload = () => {
      if (typeof image.decode === "function") {
        void image.decode().catch(() => undefined).finally(finish);
        return;
      }

      finish();
    };
    image.onerror = finish;
    image.src = url;
  });
}

async function preloadBookOpening(pages: BookPage[]): Promise<void> {
  await Promise.all(pages.slice(0, 2).map((page) => preloadImage(page.public_url)));
}

export default function PublicBookLibrary({
  initialSlug,
  onBack,
  onLogin,
  onThreeD,
  onBookChange,
}: PublicBookLibraryProps) {
  void onLogin;

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [pages, setPages] = useState<BookPage[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingPages, setLoadingPages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookBalloonOpen, setBookBalloonOpen] = useState(false);
  const [loginMounted, setLoginMounted] = useState(false);
  const [loginMotion, setLoginMotion] = useState<CenterMotion>("outside");
  const [barVisible, setBarVisible] = useState(false);
  const [viewerMotion, setViewerMotion] =
    useState<CenterMotion>("outside");
  const [viewerFastMotion, setViewerFastMotion] = useState(false);
  const [viewerPage, setViewerPage] = useState(0);
  const [transitionBusy, setTransitionBusy] = useState(false);
  const [navigationLeaving, setNavigationLeaving] = useState(false);

  const mountedRef = useRef(true);
  const transitionBusyRef = useRef(false);
  const selectedBookIdRef = useRef<string | null>(null);
  const pendingBookSwitchRef = useRef<{
    book: Book;
    updateRoute: boolean;
  } | null>(null);
  const switchToBookRef = useRef<
    ((book: Book, updateRoute: boolean) => void) | null
  >(null);
  const initialBookLoadingRef = useRef(false);
  const savedBookSessionRef = useRef(readBookSession());
  const viewerAnimationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backgroundLayerIdRef = useRef(0);
  const backgroundColorRef = useRef("rgb(255 255 255)");
  const backgroundCleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewerReadyBookIdRef = useRef<string | null>(null);
  const viewerReadyWaiterRef = useRef<{
    bookId: string;
    finish: () => void;
    timeout: ReturnType<typeof setTimeout>;
  } | null>(null);
  const [backgroundLayers, setBackgroundLayers] = useState([
    { id: 0, color: backgroundColorRef.current },
  ]);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) ?? null,
    [books, selectedBookId]
  );

  useEffect(() => {
    const nextColor = bookBackgroundColor(selectedBook);
    if (nextColor === backgroundColorRef.current) return;

    backgroundColorRef.current = nextColor;
    const nextLayer = {
      id: ++backgroundLayerIdRef.current,
      color: nextColor,
    };

    setBackgroundLayers((current) => [
      current[current.length - 1],
      nextLayer,
    ]);

    if (backgroundCleanupTimerRef.current) {
      window.clearTimeout(backgroundCleanupTimerRef.current);
    }

    backgroundCleanupTimerRef.current = window.setTimeout(() => {
      setBackgroundLayers((current) => current.slice(-1));
      backgroundCleanupTimerRef.current = null;
    }, BOOK_BACKGROUND_MIX_DURATION);
  }, [
    selectedBook,
    selectedBook?.background_b,
    selectedBook?.background_g,
    selectedBook?.background_r,
  ]);

  const waitForViewerReady = useCallback((bookId: string): Promise<void> => {
    if (viewerReadyBookIdRef.current === bookId) {
      return Promise.resolve();
    }

    const previousWaiter = viewerReadyWaiterRef.current;
    if (previousWaiter) {
      previousWaiter.finish();
    }

    return new Promise((resolve) => {
      let settled = false;

      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);

        if (viewerReadyWaiterRef.current?.finish === finish) {
          viewerReadyWaiterRef.current = null;
        }

        resolve();
      };

      const timeout = window.setTimeout(finish, BOOK_VIEWER_READY_TIMEOUT);
      viewerReadyWaiterRef.current = { bookId, finish, timeout };
    });
  }, []);

  const handleViewerReady = useCallback((bookId: string) => {
    viewerReadyBookIdRef.current = bookId;

    const waiter = viewerReadyWaiterRef.current;
    if (waiter?.bookId === bookId) {
      waiter.finish();
    }
  }, []);

  useEffect(() => {
    selectedBookIdRef.current = selectedBookId;
  }, [selectedBookId]);

  const cancelViewerAnimation = useCallback(() => {
    if (viewerAnimationTimerRef.current) {
      window.clearTimeout(viewerAnimationTimerRef.current);
      viewerAnimationTimerRef.current = null;
    }
  }, []);

  const revealViewer = useCallback((fast = false) => {
    cancelViewerAnimation();

    const enterHoldDuration = fast
      ? BOOK_SWITCH_ENTER_HOLD_DURATION
      : BOOK_ENTER_HOLD_DURATION;
    const motionDuration = fast
      ? BOOK_SWITCH_MOTION_DURATION
      : BOOK_MOTION_DURATION;

    setViewerFastMotion(fast);
    setViewerMotion("outside");

    viewerAnimationTimerRef.current = window.setTimeout(() => {
      if (mountedRef.current) {
        setViewerMotion("entering");

        viewerAnimationTimerRef.current = window.setTimeout(() => {
          if (mountedRef.current) {
            setViewerMotion("visible");
            setViewerFastMotion(false);
            viewerAnimationTimerRef.current = null;
          }
        }, motionDuration + BOOK_META_STAGGER_TAIL);
      }
    }, enterHoldDuration);
  }, [cancelViewerAnimation]);

  useEffect(() => {
    mountedRef.current = true;

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (mountedRef.current) {
          setBarVisible(true);
        }
      });
    });

    return () => {
      mountedRef.current = false;
      window.cancelAnimationFrame(firstFrame);

      if (viewerAnimationTimerRef.current) {
        window.clearTimeout(viewerAnimationTimerRef.current);
      }

      if (backgroundCleanupTimerRef.current) {
        window.clearTimeout(backgroundCleanupTimerRef.current);
      }

      if (viewerReadyWaiterRef.current) {
        window.clearTimeout(viewerReadyWaiterRef.current.timeout);
        viewerReadyWaiterRef.current.finish();
      }
    };
  }, []);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoadingBooks(true);
      setError(null);

      try {
        const nextBooks = await listPublishedBooks();

        if (!active) {
          return;
        }

        setBooks(nextBooks);
      } catch (loadError) {
        if (active) {
          setError(messageFrom(loadError));
        }
      } finally {
        if (active) {
          setLoadingBooks(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const loadFirstVisibleBook = useCallback(
    async (book: Book) => {
      if (initialBookLoadingRef.current) {
        return;
      }

      initialBookLoadingRef.current = true;
      setLoadingPages(true);
      setError(null);

      try {
        const nextPages = await listBookPages(book.id);
        await preloadBookOpening(nextPages);

        if (!mountedRef.current) {
          return;
        }

        const savedSnapshot = savedBookSessionRef.current;
        const restoredPage =
          savedSnapshot?.slug === book.slug
            ? Math.min(savedSnapshot.pageIndex, Math.max(0, nextPages.length - 1))
            : 0;

        viewerReadyBookIdRef.current = null;
        const viewerReady = waitForViewerReady(book.id);

        flushSync(() => {
          setViewerFastMotion(false);
          setViewerMotion("outside");
          setSelectedBookId(book.id);
          setPages(nextPages);
          setViewerPage(restoredPage);
        });

        writeBookSession(book.slug, restoredPage);
        setLoadingPages(false);

        await viewerReady;

        if (!mountedRef.current) {
          return;
        }

        revealViewer();
      } catch (loadError) {
        if (mountedRef.current) {
          setError(messageFrom(loadError));
          setLoadingPages(false);
        }
      } finally {
        initialBookLoadingRef.current = false;
      }
    },
    [revealViewer, waitForViewerReady]
  );

  const switchToBook = useCallback(
    async (book: Book, updateRoute: boolean) => {
      if (!mountedRef.current) {
        return;
      }

      if (transitionBusyRef.current) {
        pendingBookSwitchRef.current = { book, updateRoute };
        setBookBalloonOpen(false);
        return;
      }

      if (selectedBookIdRef.current === book.id) {
        setBookBalloonOpen(false);
        return;
      }

      transitionBusyRef.current = true;
      setTransitionBusy(true);
      setLoadingPages(true);
      setBookBalloonOpen(false);
      setError(null);

      try {
        // Preload first. The current book stays visible while the request runs,
        // so a slow network never produces a blank white frame.
        const nextPages = await listBookPages(book.id);

        if (!mountedRef.current) {
          return;
        }

        await preloadBookOpening(nextPages);

        if (!mountedRef.current) {
          return;
        }

        cancelViewerAnimation();
        setViewerFastMotion(true);
        setViewerMotion("leaving");
        await wait(BOOK_SWITCH_LEAVE_TOTAL_DURATION);

        if (!mountedRef.current) {
          return;
        }

        // Commit the incoming book while the viewer is explicitly collapsed.
        // flushSync plus two painted frames prevents React from batching the
        // replacement together with the entering state, which made the new
        // book appear instantly during consecutive selections.
        viewerReadyBookIdRef.current = null;
        const viewerReady = waitForViewerReady(book.id);

        flushSync(() => {
          setViewerFastMotion(true);
          setViewerMotion("outside");
          setSelectedBookId(book.id);
          selectedBookIdRef.current = book.id;
          setPages(nextPages);
          setViewerPage(0);
          setLoadingPages(false);
        });

        savedBookSessionRef.current = { slug: book.slug, pageIndex: 0 };
        writeBookSession(book.slug, 0);

        if (updateRoute) {
          onBookChange?.(book.slug);
        }

        await nextFrame();
        await nextFrame();
        await viewerReady;
        await wait(BOOK_SWITCH_ENTER_HOLD_DURATION);

        if (!mountedRef.current) {
          return;
        }

        setViewerMotion("entering");
        await wait(BOOK_SWITCH_LEAVE_TOTAL_DURATION);

        if (mountedRef.current) {
          setViewerMotion("visible");
          setViewerFastMotion(false);
        }
      } catch (loadError) {
        if (mountedRef.current) {
          setError(messageFrom(loadError));
          setLoadingPages(false);
          setViewerFastMotion(false);
          setViewerMotion("visible");
        }
      } finally {
        transitionBusyRef.current = false;

        if (mountedRef.current) {
          setTransitionBusy(false);

          const pendingSwitch = pendingBookSwitchRef.current;
          pendingBookSwitchRef.current = null;

          if (
            pendingSwitch &&
            pendingSwitch.book.id !== selectedBookIdRef.current
          ) {
            window.setTimeout(() => {
              switchToBookRef.current?.(
                pendingSwitch.book,
                pendingSwitch.updateRoute
              );
            }, 24);
          }
        }
      }
    },
    [cancelViewerAnimation, onBookChange, waitForViewerReady]
  );

  useEffect(() => {
    switchToBookRef.current = (book, updateRoute) => {
      void switchToBook(book, updateRoute);
    };
  }, [switchToBook]);

  useEffect(() => {
    if (loadingBooks || books.length === 0) {
      return;
    }

    const requestedBook = initialSlug
      ? books.find((book) => book.slug === initialSlug)
      : null;

    if (!selectedBookId) {
      const featuredBook = books.find((book) => book.is_featured);
      const firstBook = requestedBook ?? featuredBook ?? books[0];

      void loadFirstVisibleBook(firstBook);
      return;
    }

    if (
      requestedBook &&
      requestedBook.id !== selectedBookId &&
      !transitionBusyRef.current
    ) {
      void switchToBook(requestedBook, false);
    }
  }, [
    books,
    initialSlug,
    loadFirstVisibleBook,
    loadingBooks,
    selectedBookId,
    switchToBook,
  ]);

  const closeLogin = useCallback(async () => {
    if (!loginMounted || transitionBusyRef.current) {
      return;
    }

    transitionBusyRef.current = true;
    setTransitionBusy(true);
    setLoginMotion("leaving");

    await wait(BOOK_LEAVE_TOTAL_DURATION);

    if (!mountedRef.current) {
      return;
    }

    setLoginMounted(false);
    setLoginMotion("outside");
    revealViewer();

    await wait(BOOK_ENTER_TOTAL_DURATION);

    transitionBusyRef.current = false;

    if (mountedRef.current) {
      setTransitionBusy(false);
    }
  }, [loginMounted, revealViewer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (loginMounted) {
        void closeLogin();
        return;
      }

      setBookBalloonOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLogin, loginMounted]);

  const toggleLogin = async () => {
    if (transitionBusyRef.current) {
      return;
    }

    setBookBalloonOpen(false);

    if (loginMounted) {
      await closeLogin();
      return;
    }

    transitionBusyRef.current = true;
    setTransitionBusy(true);
    void loadAdminPortal();

    if (selectedBook) {
      cancelViewerAnimation();
      setViewerMotion("leaving");
      await wait(BOOK_LEAVE_TOTAL_DURATION);

      if (!mountedRef.current) {
        return;
      }
    }

    setLoginMounted(true);
    setLoginMotion("outside");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (mountedRef.current) {
          setLoginMotion("entering");
        }
      });
    });

    await wait(BOOK_LEAVE_TOTAL_DURATION);

    transitionBusyRef.current = false;

    if (mountedRef.current) {
      setLoginMotion("visible");
      setTransitionBusy(false);
    }
  };

  const handleBack = async () => {
    if (loginMounted) {
      await closeLogin();
      return;
    }

    if (transitionBusyRef.current) {
      return;
    }

    transitionBusyRef.current = true;
    setTransitionBusy(true);
    setBookBalloonOpen(false);
    setBarVisible(false);
    cancelViewerAnimation();
    setViewerMotion("leaving");

    if (selectedBook) {
      writeBookSession(selectedBook.slug, viewerPage);
    }

    window.sessionStorage.setItem(BOOK_INDEX_RETURN_KEY, "true");
    window.sessionStorage.removeItem("revealDone");

    if (window.sessionStorage.getItem("returnFromExample") !== "true") {
      window.sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
    } else {
      window.sessionStorage.removeItem(BOOK_INTRO_RETURN_KEY);
    }

    await wait(BOOK_LEAVE_TOTAL_DURATION);

    if (mountedRef.current) {
      onBack();
    }
  };

  const handleThreeD = async () => {
    if (transitionBusyRef.current || loginMounted) {
      return;
    }

    transitionBusyRef.current = true;
    setTransitionBusy(true);
    setNavigationLeaving(true);
    setBookBalloonOpen(false);
    setBarVisible(false);
    cancelViewerAnimation();
    setViewerMotion("leaving");

    if (selectedBook) {
      writeBookSession(selectedBook.slug, viewerPage);
    }

    await wait(BOOK_LEAVE_TOTAL_DURATION);

    if (mountedRef.current) {
      onThreeD();
    }
  };

  const selectBook = (book: Book) => {
    void switchToBook(book, true);
  };

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      setViewerPage(pageIndex);

      if (selectedBook) {
        savedBookSessionRef.current = {
          slug: selectedBook.slug,
          pageIndex,
        };
        writeBookSession(selectedBook.slug, pageIndex);
      }
    },
    [selectedBook]
  );

  const viewerMotionClass =
    viewerMotion === "entering"
      ? "is-entering"
      : viewerMotion === "visible"
        ? "is-visible"
        : viewerMotion === "leaving"
          ? "is-leaving"
          : "is-outside";
  const viewerStageClass = `${viewerMotionClass}${
    viewerFastMotion ? " is-fast" : ""
  }`;

  const loginMotionClass =
    loginMotion === "entering"
      ? "is-entering"
      : loginMotion === "visible"
        ? "is-visible"
        : loginMotion === "leaving"
          ? "is-leaving"
          : "is-outside";
  const navMotionClass = barVisible
    ? "is-visible"
    : transitionBusy || navigationLeaving
      ? "is-leaving"
      : "is-outside";

  return (
    <div
      className="public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black"
      style={{ backgroundColor: backgroundLayers[0]?.color ?? "rgb(255 255 255)" }}
    >
      <style>{libraryStyles}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {backgroundLayers.map((layer, index) => (
          <div
            key={layer.id}
            className={`public-book-background-layer ${
              index === backgroundLayers.length - 1
                ? "is-current"
                : "is-previous"
            }`}
            style={{ backgroundColor: layer.color }}
          />
        ))}
      </div>

      {bookBalloonOpen && !loginMounted && (
        <button
          type="button"
          aria-label="Close book list"
          className="fixed inset-0 z-[141] cursor-default bg-transparent"
          onClick={() => setBookBalloonOpen(false)}
        />
      )}

      <div
        className="public-book-nav fixed z-[170] flex items-center"
      >
        <div
          className={`public-nav-item ${navMotionClass}`}
          style={{
            "--public-nav-delay": "0ms",
            "--public-nav-exit-delay": "180ms",
          } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => void handleBack()}
            disabled={transitionBusy}
            className="public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
            aria-label={loginMounted ? "Back to book" : "Back"}
            title={loginMounted ? "Back to book" : "Back"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div
          className={`public-nav-item ${navMotionClass}`}
          style={{
            "--public-nav-delay": "70ms",
            "--public-nav-exit-delay": "120ms",
          } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => setBookBalloonOpen((open) => !open)}
            disabled={loginMounted}
            className={`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${
              bookBalloonOpen
                ? "border-black text-black"
                : "border-black/35 text-black"
            }`}
            aria-label="Choose a book"
            aria-expanded={bookBalloonOpen}
            aria-controls="public-book-balloon"
            title="Choose a book"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
              <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
            </svg>
          </button>
        </div>

        <div
          className={`public-nav-item ${navMotionClass}`}
          style={{
            "--public-nav-delay": "140ms",
            "--public-nav-exit-delay": "60ms",
          } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => void toggleLogin()}
            disabled={transitionBusy}
            className={`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${
              loginMounted
                ? "border-black text-black"
                : "border-black/35 text-black"
            }`}
            aria-expanded={loginMounted}
          >
            LOGIN
          </button>
        </div>

        <div
          className={`public-nav-item ${navMotionClass}`}
          style={{
            "--public-nav-delay": "210ms",
            "--public-nav-exit-delay": "0ms",
          } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => void handleThreeD()}
            disabled={transitionBusy || loginMounted}
            className="public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            3D
          </button>
        </div>
      </div>

      <aside
        id="public-book-balloon"
        className={`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${
          bookBalloonOpen && !loginMounted
            ? "pointer-events-auto scale-100 opacity-100 blur-0"
            : "pointer-events-none scale-0 opacity-0 blur-[10px]"
        }`}
        aria-hidden={!bookBalloonOpen || loginMounted}
      >
        <div className="absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white" />

        <div className="relative mb-4 flex items-start justify-between gap-5">
          <div>
            <p className="text-[12px] tracking-[0.18em] text-black/45">
              LIBRARY
            </p>
            <h1 className="mt-1 text-[22px] font-light">CHOOSE A BOOK</h1>
          </div>

          <button
            type="button"
            onClick={() => setBookBalloonOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95"
            aria-label="Close book list"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15">
          {loadingBooks ? (
            <p className="py-6 text-center text-[14px] text-black/50">
              LOADING...
            </p>
          ) : books.length === 0 ? (
            <p className="py-6 text-center text-[14px] leading-relaxed text-black/55">
              No published books are available yet.
            </p>
          ) : (
            books.map((book) => {
              const selected = book.id === selectedBookId;

              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => selectBook(book)}
                  className={`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${
                    selected
                      ? "translate-x-1 text-black"
                      : "text-black/60 hover:translate-x-1 hover:text-black"
                  }`}
                >
                  <span className="text-[12px] tracking-wide">
                    {CATEGORY_LABELS[book.category]}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-[16px]">
                      {book.title}
                    </span>

                    {book.description && (
                      <span className="mt-1 block truncate text-[12px] text-black/45">
                        {book.description}
                      </span>
                    )}
                  </span>

                  <span className="flex min-w-[18px] justify-end text-[13px]">
                    {book.is_featured ? "*" : selected ? ">" : ""}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <p className="relative mt-3 text-[11px] text-black/40">
          * Featured
        </p>
      </aside>

      <div
        className="public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7"
      >
        {selectedBook && (
          <p
            className={`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${navMotionClass}`}
            style={{
              "--public-nav-delay": "280ms",
              "--public-nav-exit-delay": "0ms",
            } as React.CSSProperties}
          >
            {selectedBook.is_featured ? "FEATURED - " : ""}
          </p>
        )}
      </div>

      <main className="public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5">
        {loadingBooks || (loadingPages && !selectedBook) ? (
          <div
            className={`public-route-message ${
              barVisible ? "is-visible" : "is-outside"
            }`}
          >
            LOADING...
          </div>
        ) : error ? (
          <div
            className={`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${
              barVisible ? "is-visible" : "is-outside"
            }`}
          >
            {error}
          </div>
        ) : books.length === 0 ? (
          <div
            className={`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${
              barVisible ? "is-visible" : "is-outside"
            }`}
          >
            No books are public yet.
          </div>
        ) : selectedBook ? (
          <div className="h-full w-full">
            <div
              className={`flex h-full w-full items-center justify-center transition-[transform,opacity,filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                loginMounted
                  ? "scale-[0.94] opacity-25 blur-[9px]"
                  : "scale-100 opacity-100 blur-0"
              }`}
            >
              <FoldingBookViewer
                key={selectedBook.id}
                book={selectedBook}
                pages={pages}
                initialPage={viewerPage}
                bookMotionClassName={viewerStageClass}
                onPageChange={handlePageChange}
                onReady={handleViewerReady}
              />
            </div>
          </div>
        ) : null}
      </main>

      {loginMounted && (
        <div
          className={`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${loginMotionClass}`}
          aria-hidden={loginMotion === "outside" || loginMotion === "leaving"}
        >
          <Suspense fallback={null}>
            <AdminPortal
              embedded
              surfaceReady={
                loginMotion === "entering" || loginMotion === "visible"
              }
              onBack={() => void closeLogin()}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
