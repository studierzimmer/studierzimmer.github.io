import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate as animateMotion,
  motion,
  useMotionValue,
} from "framer-motion";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import type { Book, BookPage, BookPageFormat } from "@/types/books";
import type { BookComment } from "@/types/bookComments";

interface CreatePageCommentRequest {
  bookPageId: string;
  body: string;
  anchorX: number;
  anchorY: number;
}

interface FoldingBookViewerProps {
  book: Book;
  pages: BookPage[];
  comments?: BookComment[];
  commentMode?: boolean;
  canManageComments?: boolean;
  initialPage?: number;
  bookMotionClassName?: string;
  onPageChange?: (pageIndex: number) => void;
  onReady?: (bookId: string) => void;
  onCreateComment?: (input: CreatePageCommentRequest) => Promise<void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
}

type PageOrientation = "portrait" | "landscape";
type PageFlipState = "read" | "user_fold" | "fold_corner" | "flipping";
type GestureMode = "page" | "pan" | "zoom-slider";

interface PageFlipBounds {
  pageWidth: number;
}

interface PageFlipApi {
  flipNext: () => void;
  flipPrev: () => void;
  getBoundsRect: () => PageFlipBounds;
  getCurrentPageIndex: () => number;
  getOrientation: () => PageOrientation;
}

interface FlipBookHandle {
  pageFlip: () => PageFlipApi | undefined;
}

interface FlipEvent<T = unknown> {
  data: T;
  object: PageFlipApi;
}

interface PageFaceProps {
  page: BookPage;
  isCover: boolean;
  comments: BookComment[];
  commentsHidden: boolean;
  commentMode: boolean;
  canManageComments: boolean;
  activeDraft: CommentDraft | null;
  draftBody: string;
  commentBusy: boolean;
  commentError: string | null;
  onImageReady?: () => void;
  onPlaceComment: (
    pageId: string,
    anchorX: number,
    anchorY: number
  ) => void;
  onDraftBodyChange: (body: string) => void;
  onSubmitDraft: () => void;
  onCancelDraft: () => void;
  onDeleteComment: (commentId: string) => void;
}

interface CommentDraft {
  pageId: string;
  anchorX: number;
  anchorY: number;
}

interface TapSnapshot {
  time: number;
  x: number;
  y: number;
  pointerType: string;
}

interface ActiveGesture {
  pointerId: number;
  pointerType: string;
  mode: GestureMode;
  startedZoomed: boolean;
  startX: number;
  startY: number;
  startPanX: number;
  startPanY: number;
  startScale: number;
  anchorX: number;
  anchorY: number;
  stageCenterX: number;
  moved: boolean;
}

const PAGE_FORMAT_METRICS: Record<
  BookPageFormat,
  {
    width: number;
    height: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
  }
> = {
  a4_long_edge: {
    width: 480,
    height: 679,
    minWidth: 90,
    maxWidth: 600,
    minHeight: 127,
    maxHeight: 849,
  },
  a4_short_edge: {
    width: 679,
    height: 480,
    minWidth: 110,
    maxWidth: 680,
    minHeight: 78,
    maxHeight: 481,
  },
  square: {
    width: 560,
    height: 560,
    minWidth: 96,
    maxWidth: 620,
    minHeight: 96,
    maxHeight: 620,
  },
};

const BOOK_INNER_GAP = 8;
const TAP_MOVEMENT_TOLERANCE = 8;
const DOUBLE_TAP_DELAY = 360;
const DOUBLE_TAP_DISTANCE = 42;
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const COMMENT_EMOJIS = ["☺︎", "♥", "★", "🌊"];

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function fitOpenSpread(
  metrics: (typeof PAGE_FORMAT_METRICS)[BookPageFormat],
  availableWidth: number,
  availableHeight: number
) {
  const safeWidth = Math.max(2, availableWidth - BOOK_INNER_GAP * 2);
  const safeHeight = Math.max(1, availableHeight - BOOK_INNER_GAP * 2);
  const aspectRatio = metrics.width / metrics.height;
  const heightFromWidth = safeWidth / 2 / aspectRatio;
  const height = Math.max(
    1,
    Math.min(safeHeight, heightFromWidth, metrics.maxHeight)
  );
  const width = Math.max(1, Math.min(height * aspectRatio, metrics.maxWidth));

  return {
    width: Math.floor(width),
    height: Math.floor(width / aspectRatio),
  };
}

function commentBubbleTransform(_anchorX: number): string {
  return "translate(-50%, -100%)";
}

const PageFace = forwardRef<HTMLDivElement, PageFaceProps>(function PageFace(
  {
    page,
    isCover,
    comments,
    commentsHidden,
    commentMode,
    canManageComments,
    activeDraft,
    draftBody,
    commentBusy,
    commentError,
    onImageReady,
    onPlaceComment,
    onDraftBodyChange,
    onSubmitDraft,
    onCancelDraft,
    onDeleteComment,
  },
  ref
) {
  const placeComment = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!commentMode || !canManageComments) return;
    if (
      event.target instanceof Element &&
      event.target.closest("[data-book-comment-ui]")
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    onPlaceComment(
      page.id,
      clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1),
      clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1)
    );
  };

  return (
    <div
      ref={ref}
      data-density={isCover ? "hard" : "soft"}
      className="h-full w-full overflow-visible bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]"
    >
      <div
        data-book-page-face="true"
        onPointerDown={placeComment}
        className={`relative h-full w-full overflow-visible ${
          commentMode ? "cursor-crosshair" : ""
        }`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0.01px)",
          WebkitTransform: "translateZ(0.01px)",
        }}
      >
        <img
          src={page.public_url}
          alt={`Page ${page.page_number}: ${page.file_name}`}
          draggable={false}
          decoding="sync"
          onLoad={onImageReady}
          onError={onImageReady}
          className="pointer-events-none h-full w-full select-none object-cover object-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        />

        <div
          className={`book-comment-layer absolute inset-0 z-20 ${
            commentsHidden ? "is-hidden" : ""
          }`}
          aria-hidden={commentsHidden}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              data-book-comment-ui="true"
              className="book-comment-balloon absolute"
              style={{
                left: `${comment.anchor_x * 100}%`,
                top: `${comment.anchor_y * 100}%`,
                transform: commentBubbleTransform(comment.anchor_x),
              }}
            >
              {canManageComments && (
                <button
                  type="button"
                  className="book-comment-delete"
                  aria-label="Delete comment"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onDeleteComment(comment.id);
                  }}
                >
                  ×
                </button>
              )}
              <p>{comment.body}</p>
            </div>
          ))}

          {activeDraft?.pageId === page.id && (
            <form
              data-book-comment-ui="true"
              className="book-comment-balloon book-comment-editor absolute"
              style={{
                left: `${activeDraft.anchorX * 100}%`,
                top: `${activeDraft.anchorY * 100}%`,
                transform: commentBubbleTransform(activeDraft.anchorX),
              }}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
              onSubmit={(event) => {
                event.preventDefault();
                onSubmitDraft();
              }}
            >
              <button
                type="button"
                className="book-comment-delete"
                aria-label="Cancel comment"
                onClick={onCancelDraft}
              >
                ×
              </button>
              <textarea
                autoFocus
                value={draftBody}
                maxLength={600}
                placeholder="WRITE A COMMENT…"
                onChange={(event) => onDraftBodyChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") onCancelDraft();
                  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                    event.preventDefault();
                    onSubmitDraft();
                  }
                }}
              />
              <div className="book-comment-editor-actions">
                <div className="book-comment-emojis" aria-label="Add emoji">
                  {COMMENT_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => onDraftBodyChange(`${draftBody}${emoji}`)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={commentBusy || !draftBody.trim()}
                >
                  {commentBusy ? "…" : "SEND"}
                </button>
              </div>
              {commentError && (
                <p className="book-comment-editor-error">{commentError}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
});

export default function FoldingBookViewer({
  book,
  pages,
  comments = [],
  commentMode = false,
  canManageComments = false,
  initialPage = 0,
  bookMotionClassName = "is-visible",
  onPageChange,
  onReady,
  onCreateComment,
  onDeleteComment,
}: FoldingBookViewerProps) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const sizeObserverTargetRef = useRef<HTMLDivElement | null>(null);
  const activeBookIdRef = useRef(book.id);
  const currentPageRef = useRef(0);
  const magnifierOpenRef = useRef(false);
  const zoomClosingRef = useRef(false);
  const pageFlipBusyRef = useRef(false);
  const suppressPageFlipRef = useRef(false);
  const activeGestureRef = useRef<ActiveGesture | null>(null);
  const lastTapRef = useRef<TapSnapshot>({
    time: 0,
    x: 0,
    y: 0,
    pointerType: "",
  });
  const tapTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const zoomAnimationsRef = useRef<Array<{ stop: () => void }>>([]);
  const viewportSizeRef = useRef({ width: 1, height: 1 });
  const zoomImagePromisesRef = useRef(new Map<string, Promise<void>>());

  const pageFormat = book.page_format ?? "a4_long_edge";
  const pageMetrics = PAGE_FORMAT_METRICS[pageFormat];
  const safeInitialPage = Math.min(
    Math.max(0, Math.floor(initialPage)),
    Math.max(0, pages.length - 1)
  );
  const flipInitializedRef = useRef(false);
  const readyNotifiedRef = useRef(false);
  const readyPageIndicesRef = useRef(new Set<number>());
  const initialVisiblePageIndicesRef = useRef(
    new Set(
      [safeInitialPage - 1, safeInitialPage, safeInitialPage + 1].filter(
        (index) => index >= 0 && index < pages.length
      )
    )
  );

  if (activeBookIdRef.current !== book.id) {
    activeBookIdRef.current = book.id;
    currentPageRef.current = safeInitialPage;
  }

  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [magnifierOpen, setMagnifierOpen] = useState(false);
  const [zoomClosing, setZoomClosing] = useState(false);
  const [commentsHeldHidden, setCommentsHeldHidden] = useState(false);
  const [zoomCommentsHidden, setZoomCommentsHidden] = useState(false);
  const [commentDraft, setCommentDraft] = useState<CommentDraft | null>(null);
  const [commentDraftBody, setCommentDraftBody] = useState("");
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [foldShadowActive, setFoldShadowActive] = useState(false);
  const [layoutMeasured, setLayoutMeasured] = useState(false);
  const [pageSize, setPageSize] = useState(() =>
    fitOpenSpread(pageMetrics, 640, 480)
  );
  const zoomScale = useMotionValue(1);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const commentsByPage = useMemo(() => {
    const grouped = new Map<string, BookComment[]>();
    comments.forEach((comment) => {
      const pageComments = grouped.get(comment.book_page_id) ?? [];
      pageComments.push(comment);
      grouped.set(comment.book_page_id, pageComments);
    });
    return grouped;
  }, [comments]);
  const hasComments = comments.length > 0;

  const notifyReadyWhenPaintable = useCallback(() => {
    if (
      readyNotifiedRef.current ||
      !flipInitializedRef.current ||
      ![...initialVisiblePageIndicesRef.current].every((index) =>
        readyPageIndicesRef.current.has(index)
      )
    ) {
      return;
    }

    readyNotifiedRef.current = true;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => onReady?.(book.id));
    });
  }, [book.id, onReady]);

  const handlePageImageReady = useCallback(
    (pageIndex: number) => {
      if (!initialVisiblePageIndicesRef.current.has(pageIndex)) return;

      readyPageIndicesRef.current.add(pageIndex);
      notifyReadyWhenPaintable();
    },
    [notifyReadyWhenPaintable]
  );

  const prepareZoomImages = useCallback(() => {
    const pageIndex = currentPageRef.current;
    const visibleIndices =
      pageIndex === 0 || pageIndex >= pages.length - 1
        ? [pageIndex]
        : [pageIndex, Math.min(pageIndex + 1, pages.length - 1)];

    return Promise.all(
      visibleIndices.map((index) => {
        const page = pages[index];
        if (!page) return Promise.resolve();

        const existing = zoomImagePromisesRef.current.get(page.public_url);
        if (existing) return existing;

        const promise = new Promise<void>((resolve) => {
          const image = new Image();
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            resolve();
          };
          image.onload = () => {
            if (typeof image.decode === "function") {
              void image.decode().catch(() => undefined).finally(finish);
            } else {
              finish();
            }
          };
          image.onerror = finish;
          image.decoding = "async";
          image.src = page.public_url;
          window.setTimeout(finish, 5000);
        });

        zoomImagePromisesRef.current.set(page.public_url, promise);
        return promise;
      })
    ).then(() => undefined);
  }, [pages]);

  const placeComment = useCallback(
    (pageId: string, anchorX: number, anchorY: number) => {
      if (!commentMode || !canManageComments) return;
      setCommentError(null);
      setCommentDraftBody("");
      setCommentDraft({ pageId, anchorX, anchorY });
    },
    [canManageComments, commentMode]
  );

  const cancelCommentDraft = useCallback(() => {
    if (commentBusy) return;
    setCommentDraft(null);
    setCommentDraftBody("");
    setCommentError(null);
  }, [commentBusy]);

  const submitCommentDraft = useCallback(async () => {
    if (
      !commentDraft ||
      !commentDraftBody.trim() ||
      !onCreateComment ||
      commentBusy
    ) {
      return;
    }

    setCommentBusy(true);
    setCommentError(null);
    try {
      await onCreateComment({
        bookPageId: commentDraft.pageId,
        body: commentDraftBody,
        anchorX: commentDraft.anchorX,
        anchorY: commentDraft.anchorY,
      });
      setCommentDraft(null);
      setCommentDraftBody("");
    } catch (error) {
      setCommentError(
        error instanceof Error ? error.message : "Unable to save the comment."
      );
    } finally {
      setCommentBusy(false);
    }
  }, [commentBusy, commentDraft, commentDraftBody, onCreateComment]);

  const deleteComment = useCallback(
    async (commentId: string) => {
      if (!onDeleteComment || commentBusy) return;
      setCommentBusy(true);
      setCommentError(null);
      try {
        await onDeleteComment(commentId);
      } catch (error) {
        setCommentError(
          error instanceof Error
            ? error.message
            : "Unable to delete the comment."
        );
      } finally {
        setCommentBusy(false);
      }
    },
    [commentBusy, onDeleteComment]
  );

  const stopZoomAnimations = useCallback(() => {
    zoomAnimationsRef.current.forEach((animation) => animation.stop());
    zoomAnimationsRef.current = [];
  }, []);

  const visibleBookSize = useCallback(() => {
    const singlePage =
      currentPageRef.current === 0 ||
      currentPageRef.current >= pages.length - 1;

    return {
      width: pageSize.width * (singlePage ? 1 : 2),
      height: pageSize.height,
    };
  }, [pageSize.height, pageSize.width, pages.length]);

  const clampPan = useCallback(
    (scale: number, nextX: number, nextY: number) => {
      const viewport = viewportSizeRef.current;
      const bookSize = visibleBookSize();
      const maxX = Math.max(0, (bookSize.width * scale - viewport.width) / 2);
      const maxY = Math.max(0, (bookSize.height * scale - viewport.height) / 2);

      return {
        x: clamp(nextX, -maxX, maxX),
        y: clamp(nextY, -maxY, maxY),
      };
    },
    [visibleBookSize]
  );

  const zoomAroundPoint = useCallback(
    (
      nextScale: number,
      anchorX: number,
      anchorY: number,
      fromScale = zoomScale.get(),
      fromPanX = panX.get(),
      fromPanY = panY.get()
    ) => {
      const viewport = viewportSizeRef.current;
      const safeScale = clamp(nextScale, MIN_ZOOM, MAX_ZOOM);
      const ratio = safeScale / Math.max(0.0001, fromScale);
      const localAnchorX = anchorX - viewport.width / 2;
      const localAnchorY = anchorY - viewport.height / 2;
      const nextPan = clampPan(
        safeScale,
        localAnchorX - (localAnchorX - fromPanX) * ratio,
        localAnchorY - (localAnchorY - fromPanY) * ratio
      );

      zoomScale.set(safeScale);
      panX.set(nextPan.x);
      panY.set(nextPan.y);

      return { scale: safeScale, ...nextPan };
    },
    [clampPan, panX, panY, zoomScale]
  );

  const entryZoomScale = useCallback(() => {
    const viewport = viewportSizeRef.current;
    const bookSize = visibleBookSize();
    const fittedScale = Math.min(
      (viewport.width - 24) / Math.max(1, bookSize.width),
      (viewport.height - 24) / Math.max(1, bookSize.height)
    );

    return clamp(fittedScale, 1.25, 3.6);
  }, [visibleBookSize]);

  const openMagnifier = useCallback(
    (anchorX: number, anchorY: number, animateEntry: boolean) => {
      stopZoomAnimations();
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      const viewport = {
        width: Math.max(1, window.innerWidth),
        height: Math.max(1, window.innerHeight),
      };
      viewportSizeRef.current = viewport;
      magnifierOpenRef.current = true;
      zoomClosingRef.current = false;
      setZoomClosing(false);
      setZoomCommentsHidden(true);
      setCommentDraft(null);
      setMagnifierOpen(true);
      zoomScale.set(1);
      panX.set(0);
      panY.set(0);

      const target = zoomAroundPoint(
        entryZoomScale(),
        anchorX,
        anchorY,
        1,
        0,
        0
      );

      if (!animateEntry) return target;

      zoomScale.set(1);
      panX.set(0);
      panY.set(0);
      window.requestAnimationFrame(() => {
        zoomAnimationsRef.current = [
          animateMotion(zoomScale, target.scale, {
            type: "spring",
            stiffness: 260,
            damping: 24,
            mass: 0.74,
          }),
          animateMotion(panX, target.x, {
            type: "spring",
            stiffness: 280,
            damping: 27,
            mass: 0.72,
          }),
          animateMotion(panY, target.y, {
            type: "spring",
            stiffness: 280,
            damping: 27,
            mass: 0.72,
          }),
        ];
      });

      return target;
    },
    [
      entryZoomScale,
      panX,
      panY,
      stopZoomAnimations,
      zoomAroundPoint,
      zoomScale,
    ]
  );

  const closeMagnifier = useCallback(() => {
    if (!magnifierOpenRef.current || zoomClosingRef.current) return;

    stopZoomAnimations();
    zoomClosingRef.current = true;
    setZoomClosing(true);
    zoomAnimationsRef.current = [
      animateMotion(zoomScale, 1, {
        type: "spring",
        stiffness: 330,
        damping: 28,
        mass: 0.7,
      }),
      animateMotion(panX, 0, {
        type: "spring",
        stiffness: 330,
        damping: 28,
        mass: 0.7,
      }),
      animateMotion(panY, 0, {
        type: "spring",
        stiffness: 330,
        damping: 28,
        mass: 0.7,
      }),
    ];

    closeTimerRef.current = window.setTimeout(() => {
      magnifierOpenRef.current = false;
      zoomClosingRef.current = false;
      setMagnifierOpen(false);
      setZoomClosing(false);
      zoomScale.set(1);
      panX.set(0);
      panY.set(0);
      closeTimerRef.current = null;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setZoomCommentsHidden(false));
      });
    }, 430);
  }, [panX, panY, stopZoomAnimations, zoomScale]);

  const synchronizeSinglePageCenter = useCallback(
    (eventObject?: PageFlipApi) => {
      window.requestAnimationFrame(() => {
        const pageFlip = eventObject ?? bookRef.current?.pageFlip();
        if (!pageFlip) return;

        const pageIndex = pageFlip.getCurrentPageIndex();
        const bounds = pageFlip.getBoundsRect();
        currentPageRef.current = pageIndex;
        setCurrentPage(pageIndex);
        onPageChange?.(pageIndex);

        if (pageFlip.getOrientation() !== "landscape") {
          setHorizontalOffset(0);
        } else if (pageIndex === 0) {
          setHorizontalOffset(-(bounds.pageWidth / 2));
        } else if (pageIndex >= pages.length - 1) {
          setHorizontalOffset(bounds.pageWidth / 2);
        } else {
          setHorizontalOffset(0);
        }
      });
    },
    [onPageChange, pages.length]
  );

  useLayoutEffect(() => {
    const element = sizeObserverTargetRef.current;
    if (!element) return;

    const update = () => {
      const styles = window.getComputedStyle(element);
      const horizontalPadding =
        Number.parseFloat(styles.paddingLeft) +
        Number.parseFloat(styles.paddingRight);
      const verticalPadding =
        Number.parseFloat(styles.paddingTop) +
        Number.parseFloat(styles.paddingBottom);
      const width = Math.max(1, element.clientWidth - horizontalPadding);
      const height = Math.max(1, element.clientHeight - verticalPadding);
      viewportSizeRef.current = { width, height };

      if (!magnifierOpenRef.current) {
        const nextPageSize = fitOpenSpread(pageMetrics, width, height);
        setPageSize((existing) =>
          existing.width === nextPageSize.width &&
          existing.height === nextPageSize.height
            ? existing
            : nextPageSize
        );
        setLayoutMeasured(true);
      }

      synchronizeSinglePageCenter();
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [magnifierOpen, pageMetrics, synchronizeSinglePageCenter]);

  useEffect(() => {
    currentPageRef.current = safeInitialPage;
    setCurrentPage(safeInitialPage);
    setHorizontalOffset(0);
    magnifierOpenRef.current = false;
    zoomClosingRef.current = false;
    setMagnifierOpen(false);
    setZoomClosing(false);
    setCommentsHeldHidden(false);
    setZoomCommentsHidden(false);
    setCommentDraft(null);
    setCommentDraftBody("");
    setCommentError(null);
    zoomScale.set(1);
    panX.set(0);
    panY.set(0);
    lastTapRef.current.time = 0;
    activeGestureRef.current = null;
    suppressPageFlipRef.current = false;
  }, [book.id, panX, panY, safeInitialPage, zoomScale]);

  useEffect(() => {
    setCommentDraft(null);
    setCommentDraftBody("");
    setCommentError(null);
    void prepareZoomImages();
  }, [currentPage, prepareZoomImages]);

  useEffect(() => {
    if (!commentMode) {
      suppressPageFlipRef.current = false;
      setCommentDraft(null);
      setCommentDraftBody("");
      setCommentError(null);
    }
  }, [commentMode]);

  useEffect(() => {
    if (!magnifierOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [magnifierOpen]);

  const clearTapTimer = useCallback(() => {
    if (!tapTimerRef.current) return;
    window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = null;
  }, []);

  const beginGesture = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("[data-book-comment-ui]")
      ) {
        return;
      }
      if (
        commentMode &&
        target instanceof Element &&
        target.closest("[data-book-page-face]")
      ) {
        suppressPageFlipRef.current = true;
        return;
      }
      if (
        zoomClosingRef.current ||
        !event.isPrimary ||
        (event.pointerType === "mouse" && event.button !== 0)
      ) {
        return;
      }

      void prepareZoomImages();
      if (hasComments && !commentMode) {
        setCommentsHeldHidden(true);
      }

      const now = window.performance.now();
      const previousTap = lastTapRef.current;
      const isSecondTap =
        now - previousTap.time > 0 &&
        now - previousTap.time < DOUBLE_TAP_DELAY &&
        previousTap.pointerType === event.pointerType &&
        Math.hypot(
          event.clientX - previousTap.x,
          event.clientY - previousTap.y
        ) < DOUBLE_TAP_DISTANCE;
      const startedZoomed = magnifierOpenRef.current;
      const stageRect = event.currentTarget.getBoundingClientRect();

      if (isSecondTap) {
        clearTapTimer();
        lastTapRef.current.time = 0;
        suppressPageFlipRef.current = true;
        stopZoomAnimations();
      } else {
        suppressPageFlipRef.current = startedZoomed;
      }

      activeGestureRef.current = {
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        mode: isSecondTap
          ? "zoom-slider"
          : startedZoomed
            ? "pan"
            : "page",
        startedZoomed,
        startX: event.clientX,
        startY: event.clientY,
        startPanX: panX.get(),
        startPanY: panY.get(),
        startScale: zoomScale.get(),
        anchorX: event.clientX,
        anchorY: event.clientY,
        stageCenterX: stageRect.left + stageRect.width / 2,
        moved: false,
      };
    },
    [
      clearTapTimer,
      commentMode,
      hasComments,
      panX,
      panY,
      prepareZoomImages,
      stopZoomAnimations,
      zoomScale,
    ]
  );

  const schedulePageTurn = useCallback(
    (x: number, stageCenterX: number) => {
      clearTapTimer();
      tapTimerRef.current = window.setTimeout(() => {
        tapTimerRef.current = null;
        if (
          magnifierOpenRef.current ||
          pageFlipBusyRef.current ||
          activeGestureRef.current
        ) {
          return;
        }

        const pageFlip = bookRef.current?.pageFlip();
        if (x < stageCenterX) pageFlip?.flipPrev();
        else pageFlip?.flipNext();
      }, DOUBLE_TAP_DELAY);
    },
    [clearTapTimer]
  );

  const handleGlobalPointerMove = useCallback(
    (event: PointerEvent) => {
      const gesture = activeGestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;

      const distance = Math.hypot(
        event.clientX - gesture.startX,
        event.clientY - gesture.startY
      );
      if (distance > TAP_MOVEMENT_TOLERANCE) gesture.moved = true;

      if (gesture.mode === "page") return;
      event.preventDefault();

      if (gesture.mode === "pan") {
        if (!gesture.moved) return;
        const nextPan = clampPan(
          zoomScale.get(),
          gesture.startPanX + event.clientX - gesture.startX,
          gesture.startPanY + event.clientY - gesture.startY
        );
        panX.set(nextPan.x);
        panY.set(nextPan.y);
        return;
      }

      if (!gesture.moved) return;

      if (!magnifierOpenRef.current) {
        const opened = openMagnifier(
          gesture.anchorX,
          gesture.anchorY,
          false
        );
        gesture.startScale = opened.scale;
        gesture.startPanX = opened.x;
        gesture.startPanY = opened.y;
      }

      const nextScale =
        gesture.startScale *
        Math.exp((gesture.startY - event.clientY) * 0.006);
      zoomAroundPoint(
        nextScale,
        gesture.anchorX,
        gesture.anchorY,
        gesture.startScale,
        gesture.startPanX,
        gesture.startPanY
      );
    },
    [clampPan, openMagnifier, panX, panY, zoomAroundPoint, zoomScale]
  );

  const handleGlobalPointerEnd = useCallback(
    (event: PointerEvent) => {
      const gesture = activeGestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;

      activeGestureRef.current = null;
      suppressPageFlipRef.current = false;
      setCommentsHeldHidden(false);

      if (event.type === "pointercancel") {
        lastTapRef.current.time = 0;
        return;
      }

      if (gesture.mode === "zoom-slider") {
        if (!gesture.moved) {
          if (gesture.startedZoomed) {
            closeMagnifier();
          } else {
            openMagnifier(gesture.anchorX, gesture.anchorY, true);
          }
        } else {
          lastTapRef.current.time = 0;
        }
        return;
      }

      if (gesture.moved) {
        lastTapRef.current.time = 0;
        clearTapTimer();
        return;
      }

      lastTapRef.current = {
        time: window.performance.now(),
        x: event.clientX,
        y: event.clientY,
        pointerType: gesture.pointerType,
      };

      if (gesture.mode === "page") {
        schedulePageTurn(event.clientX, gesture.stageCenterX);
      }
    },
    [clearTapTimer, closeMagnifier, openMagnifier, schedulePageTurn]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handleGlobalPointerMove, {
      passive: false,
    });
    window.addEventListener("pointerup", handleGlobalPointerEnd);
    window.addEventListener("pointercancel", handleGlobalPointerEnd);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerEnd);
      window.removeEventListener("pointercancel", handleGlobalPointerEnd);
    };
  }, [handleGlobalPointerEnd, handleGlobalPointerMove]);

  useEffect(() => {
    return () => {
      clearTapTimer();
      stopZoomAnimations();
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [clearTapTimer, stopZoomAnimations]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!magnifierOpenRef.current || zoomClosingRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      stopZoomAnimations();

      const rect = event.currentTarget.getBoundingClientRect();
      const factor = Math.exp(-event.deltaY * 0.0015);
      zoomAroundPoint(
        zoomScale.get() * factor,
        event.clientX - rect.left,
        event.clientY - rect.top
      );
    },
    [stopZoomAnimations, zoomAroundPoint, zoomScale]
  );

  useEffect(() => {
    if (pages.length === 0) onReady?.(book.id);
  }, [book.id, onReady, pages.length]);

  if (pages.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55">
        This published book does not contain any JPG pages yet.
      </div>
    );
  }

  const bookStage = (
    <div
      className={`public-book-stage ${bookMotionClassName} ${
        magnifierOpen ? "is-magnified" : ""
      } ${zoomClosing ? "is-zoom-closing" : ""}`}
    >
      <div
        ref={sizeObserverTargetRef}
        className={`public-book-viewport relative flex items-center justify-center overflow-hidden ${
          magnifierOpen
            ? "is-magnified cursor-grab active:cursor-grabbing"
            : "cursor-default"
        } ${foldShadowActive ? "is-page-folding" : ""}`}
        data-page={currentPage}
        data-zoomed={magnifierOpen ? "true" : "false"}
        onPointerDownCapture={beginGesture}
        onMouseDownCapture={(event) => {
          if (suppressPageFlipRef.current || magnifierOpenRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onTouchStartCapture={(event) => {
          if (suppressPageFlipRef.current || magnifierOpenRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onWheel={handleWheel}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center"
          style={{
            x: panX,
            y: panY,
            scale: zoomScale,
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              transform: `translate3d(${horizontalOffset}px, 0, 0)`,
              transition: "transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
              pointerEvents: magnifierOpen ? "none" : "auto",
            }}
          >
            {layoutMeasured && (
              <HTMLFlipBook
                ref={bookRef}
                key={`${book.id}-${pageFormat}-${pageSize.width}x${pageSize.height}`}
                className="mx-auto"
                style={{ margin: "0 auto" }}
                width={pageSize.width}
                height={pageSize.height}
                minWidth={1}
                maxWidth={pageMetrics.maxWidth}
                minHeight={1}
                maxHeight={pageMetrics.maxHeight}
                size="fixed"
                startPage={
                  activeBookIdRef.current === book.id
                    ? currentPageRef.current
                    : safeInitialPage
                }
                drawShadow
                flippingTime={850}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.35}
                showCover
                mobileScrollSupport
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners={false}
                disableFlipByClick
                onInit={(
                  event: FlipEvent<{ page: number; mode: PageOrientation }>
                ) => {
                  currentPageRef.current = event.data.page;
                  setCurrentPage(event.data.page);
                  onPageChange?.(event.data.page);
                  synchronizeSinglePageCenter(event.object);
                  flipInitializedRef.current = true;
                  notifyReadyWhenPaintable();
                }}
                onFlip={(event: FlipEvent<number>) => {
                  currentPageRef.current = event.data;
                  setCurrentPage(event.data);
                  onPageChange?.(event.data);
                  synchronizeSinglePageCenter(event.object);
                }}
                onChangeState={(event: FlipEvent<PageFlipState>) => {
                  const busy =
                    event.data === "user_fold" || event.data === "flipping";
                  pageFlipBusyRef.current = busy;
                  setFoldShadowActive(event.data !== "read");
                  if (busy) clearTapTimer();
                }}
                onChangeOrientation={(event: FlipEvent<PageOrientation>) => {
                  synchronizeSinglePageCenter(event.object);
                }}
              >
                {pages.map((page, index) => (
                  <PageFace
                    key={page.id}
                    page={page}
                    isCover={index === 0 || index === pages.length - 1}
                    comments={commentsByPage.get(page.id) ?? []}
                    commentsHidden={
                      commentsHeldHidden ||
                      zoomCommentsHidden ||
                      magnifierOpen
                    }
                    commentMode={commentMode}
                    canManageComments={canManageComments}
                    activeDraft={commentDraft}
                    draftBody={commentDraftBody}
                    commentBusy={commentBusy}
                    commentError={commentError}
                    onImageReady={() => handlePageImageReady(index)}
                    onPlaceComment={placeComment}
                    onDraftBodyChange={setCommentDraftBody}
                    onSubmitDraft={() => void submitCommentDraft()}
                    onCancelDraft={cancelCommentDraft}
                    onDeleteComment={(commentId) =>
                      void deleteComment(commentId)
                    }
                  />
                ))}
              </HTMLFlipBook>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      {magnifierOpen && typeof document !== "undefined"
        ? createPortal(bookStage, document.body)
        : bookStage}
    </div>
  );
}
