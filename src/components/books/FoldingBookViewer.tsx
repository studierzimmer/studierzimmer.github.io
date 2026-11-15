import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  animate as animateMotion,
  motion,
  useMotionValue,
} from "framer-motion";
import { createPortal } from "react-dom";
import HTMLFlipBook, { type OwnedFlipBookHandle } from "@/components/books/OwnedFlipBook";
import { BookImageContext } from "@/components/books/bookImageContext";
import { BookImageScheduler } from "@/components/books/bookImageScheduler";
import type { Book, BookPage, BookPageFormat } from "@/types/books";
import type { BookComment, BookRichDocument } from "@/types/bookComments";
import { bookRichFromText, reconcileBookRichText, safeBookRichDocument } from "@/lib/bookRichText";
import BookCommentFocusView from "@/components/books/BookCommentFocusView";
import BookRichText from "@/components/books/BookRichText";
import BookRichTextEditor from "@/components/books/BookRichTextEditor";
import { BOOK_VIEW_MODE_EVENT, bookFoldViewOffset, bookLeafSide, bookSingleViewScale, bookSpreadLeaves, bookSpreadStart, bookViewDragOffset, commitsBookViewDrag, guardBookNativeTap, normalizeBookPointerCoordinates, planBookPageTurn, readBookViewMode, saveBookViewMode, type BookViewMode } from "@/components/books/bookViewMode";
import "@/components/books/bookViewMode.css";

interface CreatePageCommentRequest {
  title?: string | null;
  bookPageId: string;
  body: string;
  anchorX: number;
  anchorY: number;
  backgroundColor?: string;
  textColor?: string;
  backgroundOpacity?: number;
  fontSize?: number;
  richContent?: BookRichDocument | null;
}

type UpdatePageCommentRequest = Pick<CreatePageCommentRequest, "body" | "title" | "richContent" | "backgroundColor" | "textColor" | "backgroundOpacity" | "fontSize"> & { anchorX?: number; anchorY?: number };

interface FoldingBookViewerProps {
  book: Book;
  pages: BookPage[];
  comments?: BookComment[];
  commentMode?: boolean;
  canManageComments?: boolean;
  initialPage?: number;
  bookMotionClassName?: string;
  autoOpenOnActivate?: boolean;
  controlsActive?: boolean;
  onPageChange?: (pageIndex: number) => void;
  onReady?: (bookId: string) => void;
  onCreateComment?: (input: CreatePageCommentRequest) => Promise<void>;
  onUpdateComment?: (commentId: string, input: UpdatePageCommentRequest) => Promise<void>;
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
  getState?: () => PageFlipState;
  getFlipController?: () => { getCalculation: () => { getDirection: () => number; getFlippingProgress: () => number } | null };
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
  commentMode: boolean;
  canManageComments: boolean;
  onImageReady?: () => void;
  onPlaceComment: (
    pageId: string,
    anchorX: number,
    anchorY: number
  ) => void;
}

interface CommentDraft {
  commentId?: string;
  pageId: string;
  anchorX: number;
  anchorY: number;
}

interface CommentDrag {
  pointerId: number;
  comment: BookComment;
  rect: DOMRect;
  startX: number;
  startY: number;
  moved: boolean;
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
  viewOnly?: boolean;
  viewSourceLeaf?: number;
  viewTargetLeaf?: number;
  viewStartOffset?: number;
  viewTargetOffset?: number;
  viewProgress?: number;
  viewVelocity?: number;
  lastMoveX?: number;
  lastMoveTime?: number;
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
const COMMENT_IDLE_DELAY = 1000;
const DEFAULT_BALLOON_COLOR = "#DDE2E5";
const DEFAULT_COMMENT_TEXT_COLOR = "#414A51";
const DEFAULT_BACKGROUND_OPACITY = .75;

interface CommentAnchor {
  id: string;
  x: number;
  y: number;
  below: boolean;
  maxHeight: number;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function commentBackground(color: string, opacity = DEFAULT_BACKGROUND_OPACITY): string {
  return `${color}${Math.round(clamp(opacity, .15, 1) * 255).toString(16).padStart(2, "0")}`;
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

const PageFace = forwardRef<HTMLDivElement, PageFaceProps>(function PageFace(
  {
    page,
    isCover,
    commentMode,
    canManageComments,
    onImageReady,
    onPlaceComment,
  },
  ref
) {
  const images = useContext(BookImageContext);
  const imageActive = useSyncExternalStore(images?.subscribe ?? (() => () => undefined), () => images?.isActive(page.public_url) ?? true, () => false);
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
      data-book-page-id={page.id}
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
          src={imageActive ? page.public_url : undefined}
          alt={`Page ${page.page_number}: ${page.file_name}`}
          draggable={false}
          decoding="async"
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
  autoOpenOnActivate = false,
  controlsActive = true,
  onPageChange,
  onReady,
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
}: FoldingBookViewerProps) {
  const bookRef = useRef<OwnedFlipBookHandle | null>(null);
  const sizeObserverTargetRef = useRef<HTMLDivElement | null>(null);
  const modeControlsRef = useRef<HTMLDivElement | null>(null);
  const activeBookIdRef = useRef(book.id);
  const currentPageRef = useRef(Math.min(Math.max(0, Math.floor(initialPage)), Math.max(0, pages.length - 1)));
  const initializedEngineRef = useRef<PageFlipApi | null>(null);
  const pendingNativeLeafRef = useRef<number | null>(null);
  const cameraFrameRef = useRef<number | null>(null);
  const cameraAnimationRef = useRef<{ stop: () => void } | null>(null);
  const pointerCoordinatesCleanupRef = useRef<(() => void) | null>(null);
  const viewerOwnsNativeTapRef = useRef(false);
  const viewGestureNativeBlockedRef = useRef(false);
  const magnifierOpenRef = useRef(false);
  const zoomClosingRef = useRef(false);
  const pageFlipBusyRef = useRef(false);
  const pendingResizeRef = useRef<{ width: number; height: number } | null>(null);
  const pendingLayoutViewportRef = useRef<{ width: number; height: number } | null>(null);
  const suppressPageFlipRef = useRef(false);
  const activeGestureRef = useRef<ActiveGesture | null>(null);
  const lastTapRef = useRef<TapSnapshot>({
    time: 0,
    x: 0,
    y: 0,
    pointerType: "",
  });
  const tapTimerRef = useRef<number | null>(null);
  const pageTurnIntentRef = useRef(0);
  const closeTimerRef = useRef<number | null>(null);
  const zoomAnimationsRef = useRef<Array<{ stop: () => void }>>([]);
  const viewportSizeRef = useRef({ width: 1, height: 1 });
  const commentIdleTimerRef = useRef<number | null>(null);
  const commentDraftRef = useRef<CommentDraft | null>(null);
  const commentDragRef = useRef<CommentDrag | null>(null);
  const movedCommentAnchorsRef = useRef(new Map<string, { anchorX: number; anchorY: number }>());
  const focusedCommentRef = useRef<string | null>(null);
  const commentTapRef = useRef<{ id: string; time: number; x: number; y: number } | null>(null);
  const commentTouchStartRef = useRef<{ id: string; x: number; y: number; scrollTop: number } | null>(null);
  const commentsRef = useRef(comments);
  commentsRef.current = comments;

  const pageFormat = book.page_format ?? "a4_long_edge";
  const pageMetrics = PAGE_FORMAT_METRICS[pageFormat];
  const imageScheduler = useMemo(() => new BookImageScheduler(pages.map((page) => page.public_url)), [pages]);
  const safeInitialPage = Math.min(
    Math.max(0, Math.floor(initialPage)),
    Math.max(0, pages.length - 1)
  );
  const initialLeafRef = useRef(safeInitialPage);
  const [viewMode, setViewMode] = useState<BookViewMode>(readBookViewMode);
  const [toolbarVisible, setToolbarVisible] = useState(() => typeof document === "undefined" || document.querySelector<HTMLElement>('[data-portfolio-navigation][data-section="sketches"]')?.dataset.navigationVisible !== "false");
  const viewModeRef = useRef(viewMode);
  viewModeRef.current = viewMode;
  const flipInitializedRef = useRef(false);
  const readyNotifiedRef = useRef(false);
  const autoOpenedRef = useRef(false);
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
    initialLeafRef.current = safeInitialPage;
    currentPageRef.current = safeInitialPage;
  }

  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  useEffect(() => { imageScheduler.start(currentPageRef.current); return () => imageScheduler.dispose(); }, [imageScheduler]);
  useEffect(() => { imageScheduler.setPage(currentPage); }, [imageScheduler, currentPage]);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [magnifierOpen, setMagnifierOpen] = useState(false);
  const [zoomClosing, setZoomClosing] = useState(false);
  const [zoomCommentsHidden, setZoomCommentsHidden] = useState(false);
  const [commentDraft, setCommentDraft] = useState<CommentDraft | null>(null);
  const [commentDraftBody, setCommentDraftBody] = useState("");
  const [commentDraftTitle, setCommentDraftTitle] = useState("");
  const [commentDraftRichContent, setCommentDraftRichContent] = useState<BookRichDocument>(() => bookRichFromText(""));
  const [draftBackground, setDraftBackground] = useState(DEFAULT_BALLOON_COLOR);
  const [draftTextColor, setDraftTextColor] = useState(DEFAULT_COMMENT_TEXT_COLOR);
  const [draftBackgroundOpacity, setDraftBackgroundOpacity] = useState(DEFAULT_BACKGROUND_OPACITY);
  const [draftFontSize, setDraftFontSize] = useState(14);
  const [draggingCommentId, setDraggingCommentId] = useState<string | null>(null);
  const [focusedComment, setFocusedComment] = useState<{ id: string; origin: { left: number; top: number; width: number; height: number; content?: HTMLElement } } | null>(null);
  focusedCommentRef.current = focusedComment?.id ?? null;
  const [commentsIdle, setCommentsIdle] = useState(false);
  const commentsIdleRef = useRef(commentsIdle);
  commentsIdleRef.current = commentsIdle;
  const [commentAnchors, setCommentAnchors] = useState<CommentAnchor[]>([]);
  const [editorBottom, setEditorBottom] = useState(24);
  const [editorTop, setEditorTop] = useState<number | null>(null);
  const [editorMaxHeight, setEditorMaxHeight] = useState<number | null>(null);
  const [draftPoint, setDraftPoint] = useState<{ x: number; y: number } | null>(null);
  commentDraftRef.current = commentDraft;
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [foldShadowActive, setFoldShadowActive] = useState(false);
  const [layoutMeasured, setLayoutMeasured] = useState(false);
  const [pageSize, setPageSize] = useState(() =>
    fitOpenSpread(pageMetrics, 640, 480)
  );
  const [layoutViewport, setLayoutViewport] = useState({ width: 640, height: 480 });
  const baseViewScale = viewMode === "single" ? bookSingleViewScale(pageSize, layoutViewport) : 1;
  const baseViewScaleRef = useRef(baseViewScale);
  baseViewScaleRef.current = baseViewScale;
  const zoomScale = useMotionValue(1);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const canvasX = useMotionValue(viewMode === "single" ? -bookLeafSide(safeInitialPage, pages.length) * pageSize.width : 0);
  const cameraGeometryRef = useRef<string | null>(null);
  const followNativeFold = useCallback((engine: PageFlipApi) => {
    if (viewModeRef.current !== "single" || cameraFrameRef.current !== null || document.hidden) return;
    cameraAnimationRef.current?.stop();
    const tick = () => {
      cameraFrameRef.current = null;
      if (viewModeRef.current !== "single" || bookRef.current?.pageFlip() !== engine || document.hidden) return;
      if (engine.getState?.() === "read") {
        pendingNativeLeafRef.current = null;
        canvasX.set(-bookLeafSide(currentPageRef.current, pages.length) * pageSize.width);
        return;
      }
      const calculation = engine.getFlipController?.().getCalculation();
      if (!calculation && !activeGestureRef.current) {
        pendingNativeLeafRef.current = null;
        canvasX.set(-bookLeafSide(currentPageRef.current, pages.length) * pageSize.width);
        return;
      }
      if (calculation) {
        const forward = calculation.getDirection() === 0;
        if (pendingNativeLeafRef.current === null) {
          const target = planBookPageTurn(currentPageRef.current, forward, pages.length, "double").spread;
          pendingNativeLeafRef.current = forward || target === 0 ? target : Math.min(pages.length - 1, target + 1);
        }
        canvasX.set(bookFoldViewOffset(currentPageRef.current, pages.length, pageSize.width, forward, calculation.getFlippingProgress()));
      }
      cameraFrameRef.current = window.requestAnimationFrame(tick);
    };
    cameraFrameRef.current = window.requestAnimationFrame(tick);
  }, [canvasX, pageSize.width, pages.length]);

  useLayoutEffect(() => {
    if (viewMode === "single" && pageFlipBusyRef.current) return;
    const target = viewMode === "single" ? -bookLeafSide(currentPage, pages.length) * pageSize.width : horizontalOffset;
    const geometry = `${book.id}:${pageSize.width}:${pageSize.height}:${magnifierOpen}`;
    cameraAnimationRef.current?.stop();
    if (cameraGeometryRef.current !== geometry) canvasX.set(target);
    else cameraAnimationRef.current = animateMotion(canvasX, target, { duration: .48, ease: [.22, .88, .3, 1] });
    cameraGeometryRef.current = geometry;
  }, [book.id, canvasX, currentPage, horizontalOffset, magnifierOpen, pageSize, pages.length, viewMode]);

  useEffect(() => {
    const resume = () => {
      const engine = bookRef.current?.pageFlip();
      if (!document.hidden && engine && engine.getState() !== "read") followNativeFold(engine);
    };
    document.addEventListener("visibilitychange", resume);
    return () => {
      document.removeEventListener("visibilitychange", resume);
      if (cameraFrameRef.current !== null) window.cancelAnimationFrame(cameraFrameRef.current);
      cameraFrameRef.current = null;
      cameraAnimationRef.current?.stop();
    };
  }, [followNativeFold]);

  useEffect(() => () => pointerCoordinatesCleanupRef.current?.(), []);
  useEffect(() => {
    if (!autoOpenOnActivate || autoOpenedRef.current || pages.length < 2 || currentPage !== 0 || !readyNotifiedRef.current || !/\bis-visible\b/.test(bookMotionClassName)) return;
    let canceled = false, pending = false;
    const intent = pageTurnIntentRef.current;
    const open = () => {
      if (canceled || pending || autoOpenedRef.current) return;
      if (pageTurnIntentRef.current !== intent) { autoOpenedRef.current = true; return; }
      const engine = bookRef.current?.pageFlip();
      if (!engine || engine.getState() !== "read" || magnifierOpenRef.current || commentDraftRef.current || focusedCommentRef.current) return;
      pending = true;
      void imageScheduler.preparePage(1).then((prepared) => {
        pending = false;
        if (canceled || !prepared || autoOpenedRef.current) return;
        if (pageTurnIntentRef.current !== intent) { autoOpenedRef.current = true; return; }
        if (currentPageRef.current !== 0 || engine.getState() !== "read" || magnifierOpenRef.current || commentDraftRef.current || focusedCommentRef.current) return;
        autoOpenedRef.current = true;
        engine.flipNext();
      });
    };
    const unsubscribe = imageScheduler.subscribe(open);
    open();
    return () => { canceled = true; unsubscribe(); };
  }, [autoOpenOnActivate, bookMotionClassName, currentPage, imageScheduler, layoutMeasured, pages.length]);
  const flushPendingResize = useCallback(() => {
    if (pageFlipBusyRef.current || activeGestureRef.current || magnifierOpenRef.current || commentDraftRef.current || focusedCommentRef.current) return;
    const next = pendingResizeRef.current;
    if (!next) return;
    pendingResizeRef.current = null;
    const available = pendingLayoutViewportRef.current;
    pendingLayoutViewportRef.current = null;
    if (available) setLayoutViewport((previous) => Math.abs(previous.width - available.width) < 2 && Math.abs(previous.height - available.height) < 2 ? previous : available);
    setPageSize((current) => Math.abs(current.width - next.width) < 2 && Math.abs(current.height - next.height) < 2 ? current : next);
    setLayoutMeasured(true);
  }, []);
  const findCommentPage = useCallback((pageId: string) => {
    return [...(sizeObserverTargetRef.current?.querySelectorAll<HTMLElement>("[data-book-page-id]") ?? [])].find((page) => page.dataset.bookPageId === pageId && page.dataset.bookPageVisible !== "false" && page.style.display !== "none" && page.getBoundingClientRect().width > 0);
  }, []);
  const locateCommentPoint = useCallback((draft: CommentDraft) => {
    const rect = findCommentPage(draft.pageId)?.getBoundingClientRect();
    return rect ? { x: rect.left + draft.anchorX * rect.width, y: rect.top + draft.anchorY * rect.height } : null;
  }, [findCommentPage]);
  const refreshCommentAnchors = useCallback(() => {
    const viewport = sizeObserverTargetRef.current;
    if (!viewport) return false;
    const bounds = viewport.getBoundingClientRect();
    if (bounds.width < 1 || bounds.height < 1) return false;
    const width = viewport.clientWidth || bounds.width;
    const height = viewport.clientHeight || bounds.height;
    const scaleX = bounds.width / width, scaleY = bounds.height / height;
    const left = Math.max(12, -bounds.left / scaleX + 12);
    const right = Math.min(width - 12, ((window.innerWidth ?? bounds.left + bounds.width) - bounds.left) / scaleX - 12);
    const top = Math.max(12, -bounds.top / scaleY + 12);
    const bottom = Math.min(height - 12, ((window.innerHeight ?? bounds.top + bounds.height) - bounds.top) / scaleY - 12);
    const measuredWidths = new Map<string, number>();
    viewport.querySelectorAll<HTMLElement>("[data-book-comment-id]").forEach((position) => {
      const measuredWidth = position.getBoundingClientRect().width / scaleX;
      if (position.dataset.bookCommentId && measuredWidth > 0) measuredWidths.set(position.dataset.bookCommentId, measuredWidth);
    });
    const next: CommentAnchor[] = [];
    let visiblePages = 0;
    viewport.querySelectorAll<HTMLElement>("[data-book-page-id]").forEach((page) => {
      const rect = page.getBoundingClientRect();
      if (page.dataset.bookPageVisible === "false" || page.style.display === "none" || rect.width < 1 || rect.height < 1) return;
      visiblePages += 1;
      commentsRef.current.filter((comment) => comment.is_visible && comment.book_page_id === page.dataset.bookPageId).forEach((comment) => {
        if (next.some((anchor) => anchor.id === comment.id)) return;
        const moved = movedCommentAnchorsRef.current.get(comment.id);
        const x = (rect.left - bounds.left + (moved?.anchorX ?? comment.anchor_x) * rect.width) / scaleX;
        const y = clamp((rect.top - bounds.top + (moved?.anchorY ?? comment.anchor_y) * rect.height) / scaleY, top, bottom);
        const aboveSpace = Math.max(0, y - 14 - top);
        const belowSpace = Math.max(0, bottom - y - 14);
        const below = belowSpace > aboveSpace;
        const balloonWidth = measuredWidths.get(comment.id) ?? Math.min(240, width - 32);
        next.push({ id: comment.id, x: clamp(x, left + balloonWidth / 2, right - balloonWidth / 2), y: clamp(y + (below ? 14 : -14), top, bottom), below, maxHeight: Math.max(8, (below ? belowSpace : aboveSpace) - 44) });
      });
    });
    if (!visiblePages) return false;
    setCommentAnchors(next);
    return true;
  }, []);
  const restartCommentIdle = useCallback(() => {
    if (commentIdleTimerRef.current) window.clearTimeout(commentIdleTimerRef.current);
    commentsIdleRef.current = false;
    setCommentsIdle(false);
    const reveal = () => {
      commentIdleTimerRef.current = null;
      if (magnifierOpenRef.current || (commentDraftRef.current && !commentDraftRef.current.commentId)) return;
      const state = bookRef.current?.pageFlip()?.getState?.();
      const busy = state ? state === "user_fold" || state === "flipping" : pageFlipBusyRef.current;
      if (busy || !refreshCommentAnchors()) {
        commentIdleTimerRef.current = window.setTimeout(reveal, 160);
        return;
      }
      commentsIdleRef.current = true;
      setCommentsIdle(true);
    };
    commentIdleTimerRef.current = window.setTimeout(reveal, COMMENT_IDLE_DELAY);
  }, [refreshCommentAnchors]);

  useEffect(() => {
    restartCommentIdle();
    return () => { if (commentIdleTimerRef.current) window.clearTimeout(commentIdleTimerRef.current); };
  }, [book.id, currentPage, pageSize, viewMode, magnifierOpen, zoomClosing, layoutMeasured, restartCommentIdle]);

  useEffect(() => {
    // Updating/deleting one record only updates its anchors, never hides peers.
    if (commentsIdleRef.current) refreshCommentAnchors();
  }, [comments, refreshCommentAnchors]);

  useLayoutEffect(() => {
    // A newly mounted caption can now be measured at its intrinsic text width.
    // Refining once before paint keeps short captions close to their anchor.
    if (commentAnchors.length) refreshCommentAnchors();
  }, [commentAnchors.length, refreshCommentAnchors]);

  useEffect(() => {
    const outsidePress = (event: PointerEvent) => {
      if (focusedCommentRef.current) return;
      if (event.target instanceof Element && event.target.closest("[data-book-comment-ui]")) return;
      pageTurnIntentRef.current += 1;
      viewerOwnsNativeTapRef.current = false;
      restartCommentIdle();
    };
    window.addEventListener("pointerdown", outsidePress, { capture: true, passive: true });
    return () => window.removeEventListener("pointerdown", outsidePress, true);
  }, [restartCommentIdle]);

  useEffect(() => {
    // Hover and keyboard use must not hide a settled note.
    // A backgrounded tab only needs recovery if its reveal was still pending.
    const recover = () => {
      if (document.visibilityState === "visible" && !commentsIdleRef.current) restartCommentIdle();
    };
    window.addEventListener("focus", recover);
    document.addEventListener("visibilitychange", recover);
    return () => {
      window.removeEventListener("focus", recover);
      document.removeEventListener("visibilitychange", recover);
    };
  }, [restartCommentIdle]);

  useLayoutEffect(() => {
    if (!commentDraft) {
      activeGestureRef.current = null;
      suppressPageFlipRef.current = false;
      if (!commentsIdleRef.current) restartCommentIdle();
      return;
    }
    if (!commentDraft.commentId) {
      if (commentIdleTimerRef.current) window.clearTimeout(commentIdleTimerRef.current);
      commentIdleTimerRef.current = null;
      commentsIdleRef.current = false;
      setCommentsIdle(false);
    }
    const updateKeyboardInset = () => {
      const viewport = window.visualViewport;
      const top = (viewport?.offsetTop ?? 0) + 16;
      const bottom = (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight) - 16;
      const point = locateCommentPoint(commentDraft);
      setDraftPoint(point);
      const anchorY = clamp(point?.y ?? (top + bottom) / 2, top + 24, bottom - 24);
      if (anchorY > (top + bottom) / 2) {
        setEditorTop(null);
        setEditorBottom(Math.max(16, window.innerHeight - anchorY + 18));
        setEditorMaxHeight(Math.max(48, anchorY - 18 - top));
      } else {
        setEditorTop(anchorY + 18);
        setEditorMaxHeight(Math.max(48, bottom - anchorY - 18));
      }
    };
    updateKeyboardInset();
    window.visualViewport?.addEventListener("resize", updateKeyboardInset);
    window.visualViewport?.addEventListener("scroll", updateKeyboardInset);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateKeyboardInset);
      window.visualViewport?.removeEventListener("scroll", updateKeyboardInset);
    };
  }, [commentDraft, restartCommentIdle, locateCommentPoint]);

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
    return imageScheduler.preparePage(currentPageRef.current);
  }, [imageScheduler]);

  const placeComment = useCallback(
    (pageId: string, anchorX: number, anchorY: number) => {
      if (!commentMode || !canManageComments) return;
      setCommentError(null);
      setCommentDraftBody("");
      setCommentDraftTitle("");
      setCommentDraftRichContent(bookRichFromText(""));
      setDraftBackground(DEFAULT_BALLOON_COLOR);
      setDraftTextColor(DEFAULT_COMMENT_TEXT_COLOR);
      setDraftBackgroundOpacity(DEFAULT_BACKGROUND_OPACITY);
      setDraftFontSize(14);
      setCommentsIdle(false);
      suppressPageFlipRef.current = false;
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

  const editComment = useCallback((comment: BookComment) => {
    if (!canManageComments || !onUpdateComment || commentBusy) return;
    setCommentError(null);
    setCommentDraftBody(comment.body);
    setCommentDraftTitle(comment.title ?? "");
    setCommentDraftRichContent(safeBookRichDocument(comment.rich_content, comment.body));
    setDraftBackground(comment.background_color || DEFAULT_BALLOON_COLOR);
    setDraftTextColor(comment.text_color || DEFAULT_COMMENT_TEXT_COLOR);
    setDraftBackgroundOpacity(comment.background_opacity ?? DEFAULT_BACKGROUND_OPACITY);
    setDraftFontSize(comment.font_size ?? 14);
    setCommentDraft({ commentId: comment.id, pageId: comment.book_page_id, anchorX: comment.anchor_x, anchorY: comment.anchor_y });
  }, [canManageComments, commentBusy, onUpdateComment]);

  const submitCommentDraft = useCallback(async () => {
    if (
      !commentDraft ||
      !commentDraftBody.trim() ||
      (commentDraft.commentId ? !onUpdateComment : !onCreateComment) ||
      commentBusy
    ) {
      return;
    }

    setCommentBusy(true);
    setCommentError(null);
    try {
      const content = {
        ...(commentDraftTitle.trim() || (commentDraft.commentId && commentsRef.current.find((comment) => comment.id === commentDraft.commentId)?.title) ? { title: commentDraftTitle } : {}),
        body: commentDraftBody,
        richContent: commentDraftRichContent,
        backgroundColor: draftBackground,
        textColor: draftTextColor,
        backgroundOpacity: draftBackgroundOpacity,
        fontSize: draftFontSize,
      };
      if (commentDraft.commentId) {
        await onUpdateComment!(commentDraft.commentId, content);
      } else {
        await onCreateComment!({ ...content, bookPageId: commentDraft.pageId, anchorX: commentDraft.anchorX, anchorY: commentDraft.anchorY });
      }
      setCommentDraft(null);
      setCommentDraftBody("");
    } catch (error) {
      setCommentError(
        error instanceof Error ? error.message : "Unable to save the comment."
      );
    } finally {
      setCommentBusy(false);
    }
  }, [commentBusy, commentDraft, commentDraftBody, commentDraftTitle, commentDraftRichContent, draftBackground, draftTextColor, draftBackgroundOpacity, draftFontSize, onCreateComment, onUpdateComment]);

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
    const singleView = viewModeRef.current === "single";
    const scale = singleView ? baseViewScaleRef.current : 1;
    return {
      width: pageSize.width * (singleView ? 1 : bookSpreadLeaves(currentPageRef.current, pages.length).length) * scale,
      height: pageSize.height * scale,
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
    activeGestureRef.current = null;
    lastTapRef.current.time = 0;
    pageTurnIntentRef.current += 1;
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

  useEffect(() => {
    const exitZoom = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !magnifierOpenRef.current) return;
      event.preventDefault();
      closeMagnifier();
    };
    window.addEventListener("keydown", exitZoom);
    return () => window.removeEventListener("keydown", exitZoom);
  }, [closeMagnifier]);

  const commitPageSelection = useCallback((leaf: number) => {
    const changed = currentPageRef.current !== leaf;
    currentPageRef.current = leaf;
    setCurrentPage(leaf);
    if (changed) { restartCommentIdle(); onPageChange?.(leaf); }
  }, [onPageChange, restartCommentIdle]);

  const synchronizeSinglePageCenter = useCallback(
    (eventObject?: PageFlipApi) => {
      window.requestAnimationFrame(() => {
        const pageFlip = eventObject ?? bookRef.current?.pageFlip();
        if (!pageFlip || bookRef.current?.pageFlip() !== pageFlip || initializedEngineRef.current !== pageFlip) return;

        const pageIndex = pageFlip.getCurrentPageIndex();
        const bounds = pageFlip.getBoundsRect();
        const selected = pendingNativeLeafRef.current;
        if (selected !== null && bookSpreadStart(selected) === pageIndex) {
          pendingNativeLeafRef.current = null;
          commitPageSelection(selected);
        } else if (bookSpreadStart(currentPageRef.current) !== pageIndex) commitPageSelection(pageIndex);

        if (pageFlip.getOrientation() !== "landscape") {
          setHorizontalOffset(0);
        } else if (pageIndex === 0 && pages.length > 1) {
          setHorizontalOffset(-(bounds.pageWidth / 2));
        } else if (bookSpreadLeaves(pageIndex, pages.length).length === 1) {
          setHorizontalOffset(bounds.pageWidth / 2);
        } else {
          setHorizontalOffset(0);
        }
      });
    },
    [commitPageSelection, pages.length]
  );

  useLayoutEffect(() => {
    const element = sizeObserverTargetRef.current;
    if (!element) return;

    const update = () => {
      if (focusedCommentRef.current) return;
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

      if (!magnifierOpenRef.current && !commentDraftRef.current) {
        const available = { width, height };
        pendingLayoutViewportRef.current = available;
        const nextPageSize = fitOpenSpread(pageMetrics, width, available.height);
        pendingResizeRef.current = nextPageSize;
        flushPendingResize();
      }

      if (!pageFlipBusyRef.current) synchronizeSinglePageCenter();
    };

    update();
    let frame: number | null = null;
    const queueUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => { frame = null; update(); });
    };
    const observer = new ResizeObserver(queueUpdate);
    observer.observe(element);
    window.addEventListener("resize", queueUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", queueUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [magnifierOpen, pageMetrics, synchronizeSinglePageCenter, flushPendingResize]);

  useEffect(() => { if (!magnifierOpen && !commentDraft) flushPendingResize(); }, [magnifierOpen, commentDraft, flushPendingResize]);

  useEffect(() => {
    // initialPage is a mount seed. Parent memory updates must never reset zoom,
    // selected right-hand leaves, or a gesture on the already mounted book.
    currentPageRef.current = initialLeafRef.current;
    setCurrentPage(initialLeafRef.current);
    setHorizontalOffset(0);
    magnifierOpenRef.current = false;
    zoomClosingRef.current = false;
    setMagnifierOpen(false);
    setZoomClosing(false);
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
  }, [book.id, panX, panY, zoomScale]);

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
    pageTurnIntentRef.current += 1;
    if (!tapTimerRef.current) return;
    window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = null;
  }, []);

  const openCommentFocus = useCallback((comment: BookComment, element: HTMLElement) => {
    const flipState = bookRef.current?.pageFlip()?.getState?.();
    if (focusedCommentRef.current || commentDragRef.current || pageFlipBusyRef.current || (flipState && flipState !== "read")) return;
    const balloon = element.closest<HTMLElement>(".book-comment-balloon");
    if (!balloon) return;
    const rect = balloon.getBoundingClientRect();
    clearTapTimer();
    activeGestureRef.current = null;
    focusedCommentRef.current = comment.id;
    setFocusedComment({ id: comment.id, origin: { left: rect.left, top: rect.top, width: rect.width, height: rect.height, content: element } });
  }, [clearTapTimer]);

  const beginCommentMove = useCallback((event: React.PointerEvent<HTMLButtonElement>, comment: BookComment) => {
    if (!canManageComments || !onUpdateComment || commentBusy || focusedCommentRef.current) return;
    const rect = findCommentPage(comment.book_page_id)?.getBoundingClientRect();
    if (!rect) return;
    event.preventDefault(); event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    clearTapTimer(); activeGestureRef.current = null;
    setCommentError(null);
    commentDragRef.current = { pointerId: event.pointerId, comment, rect, startX: event.clientX, startY: event.clientY, moved: false };
    setDraggingCommentId(comment.id);
  }, [canManageComments, onUpdateComment, commentBusy, findCommentPage, clearTapTimer]);

  const moveComment = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = commentDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault(); event.stopPropagation();
    const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 2) drag.moved = true;
    movedCommentAnchorsRef.current.set(drag.comment.id, { anchorX: clamp(drag.comment.anchor_x + dx / drag.rect.width, 0, 1), anchorY: clamp(drag.comment.anchor_y + dy / drag.rect.height, 0, 1) });
    refreshCommentAnchors();
  }, [refreshCommentAnchors]);

  const endCommentMove = useCallback(async (event: React.PointerEvent<HTMLButtonElement>, canceled = false) => {
    const drag = commentDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault(); event.stopPropagation();
    commentDragRef.current = null; setDraggingCommentId(null);
    const moved = movedCommentAnchorsRef.current.get(drag.comment.id);
    if (canceled || !drag.moved || !moved || !onUpdateComment) {
      movedCommentAnchorsRef.current.delete(drag.comment.id); refreshCommentAnchors(); return;
    }
    setCommentBusy(true);
    try { await onUpdateComment(drag.comment.id, { body: drag.comment.body, ...moved }); }
    catch (error) { setCommentError(error instanceof Error ? error.message : "Impossibile spostare il commento."); }
    finally {
      setCommentBusy(false);
      window.requestAnimationFrame(() => { movedCommentAnchorsRef.current.delete(drag.comment.id); refreshCommentAnchors(); });
    }
  }, [onUpdateComment, refreshCommentAnchors]);

  useEffect(() => {
    if (focusedComment && !comments.some((comment) => comment.id === focusedComment.id)) setFocusedComment(null);
  }, [comments, focusedComment]);

  const adjacentPage = useCallback((forward: boolean) => {
    return planBookPageTurn(currentPageRef.current, forward, pages.length, viewModeRef.current).leaf;
  }, [pages.length]);

  const changeViewMode = useCallback((mode: BookViewMode, persist = true) => {
    if (magnifierOpenRef.current || zoomClosingRef.current || pageFlipBusyRef.current || activeGestureRef.current || commentDraftRef.current || focusedCommentRef.current) return;
    clearTapTimer();
    pageTurnIntentRef.current += 1;
    lastTapRef.current.time = 0;
    viewModeRef.current = mode;
    setViewMode(mode);
    restartCommentIdle();
    if (persist) saveBookViewMode(mode);
  }, [clearTapTimer, restartCommentIdle]);

  useEffect(() => {
    const synchronizeMode = () => changeViewMode(readBookViewMode(), false);
    window.addEventListener(BOOK_VIEW_MODE_EVENT, synchronizeMode);
    window.addEventListener("storage", synchronizeMode);
    // A preference changed by another mounted book is applied after zoom/edit.
    synchronizeMode();
    return () => {
      window.removeEventListener(BOOK_VIEW_MODE_EVENT, synchronizeMode);
      window.removeEventListener("storage", synchronizeMode);
    };
  }, [changeViewMode, magnifierOpen, commentDraft, focusedComment]);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-portfolio-navigation][data-section="sketches"]');
    if (header) setToolbarVisible(header.dataset.navigationVisible !== "false");
    const visibility = (event: Event) => {
      const detail = (event as CustomEvent<{ section?: string; visible?: boolean }>).detail;
      if (detail?.section === "sketches" || detail?.section === "books") setToolbarVisible(Boolean(detail.visible));
    };
    window.addEventListener("portfolio:toolbar-visibility", visibility);
    return () => window.removeEventListener("portfolio:toolbar-visibility", visibility);
  }, []);

  useLayoutEffect(() => {
    if (modeControlsRef.current) modeControlsRef.current.inert = !toolbarVisible || !controlsActive;
  }, [toolbarVisible, controlsActive]);

  useLayoutEffect(() => {
    const visible = bookSpreadLeaves(currentPage, pages.length);
    const ids = new Set(visible.map((index) => pages[index]?.id));
    sizeObserverTargetRef.current?.querySelectorAll<HTMLElement>("[data-book-page-id]").forEach((page) => {
      page.dataset.bookPageVisible = ids.has(page.dataset.bookPageId) ? "true" : "false";
    });
  }, [currentPage, viewMode, pages, layoutMeasured, pageSize, magnifierOpen]);

  useEffect(() => {
    const claimBookDrag = (event: Event) => {
      const claim = event as CustomEvent<{ bookId?: string; pointerId?: number }>;
      if (claim.detail?.bookId !== book.id) return;
      const gesture = activeGestureRef.current;
      if (magnifierOpenRef.current || zoomClosingRef.current || focusedCommentRef.current || commentDraftRef.current || commentMode || (gesture && gesture.mode !== "page")) {
        event.preventDefault();
        return;
      }
      if (!gesture || gesture.pointerId !== claim.detail.pointerId) return;
      activeGestureRef.current = null;
      lastTapRef.current.time = 0;
      pageTurnIntentRef.current += 1;
      clearTapTimer();
      suppressPageFlipRef.current = true;
    };
    window.addEventListener("book-deck-drag-claim", claimBookDrag);
    return () => window.removeEventListener("book-deck-drag-claim", claimBookDrag);
  }, [book.id, clearTapTimer, commentMode]);

  const beginGesture = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pageTurnIntentRef.current += 1;
      viewerOwnsNativeTapRef.current = false;
      if (focusedCommentRef.current) { event.preventDefault(); event.stopPropagation(); return; }
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("[data-book-comment-ui]")
      ) {
        suppressPageFlipRef.current = false;
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
      const targetPage = adjacentPage(event.clientX >= stageRect.left + stageRect.width / 2);
      const viewPlan = planBookPageTurn(currentPageRef.current, event.clientX >= stageRect.left + stageRect.width / 2, pages.length, viewModeRef.current);
      const viewOnly = !isSecondTap && !startedZoomed && viewPlan.action === "view";
      viewGestureNativeBlockedRef.current = viewOnly;
      if (viewOnly) {
        const native = bookRef.current?.pageFlip() as (PageFlipApi & Parameters<typeof guardBookNativeTap>[0]) | undefined;
        // This gesture never belongs to PageFlip. Clear a preceding native
        // touch snapshot before ignoring its global compatibility move/up.
        native?.userStop?.({ x: 0, y: 0 }, true);
      }
      const clickedId = target instanceof Element ? target.closest<HTMLElement>("[data-book-page-id]")?.dataset.bookPageId : undefined;
      const clickedIndex = clickedId ? pages.findIndex((page) => page.id === clickedId) : -1;
      const nativeLeaf = clickedIndex >= 0 ? clickedIndex : currentPageRef.current;
      const nativeTarget = viewModeRef.current === "single" ? planBookPageTurn(currentPageRef.current, bookLeafSide(nativeLeaf, pages.length) === 1, pages.length, "double").leaf : targetPage;
      const targetReady = imageScheduler.isReadyForPage(targetPage) && imageScheduler.isReadyForPage(nativeTarget);
      if (!targetReady && !isSecondTap && !startedZoomed) { void imageScheduler.preparePage(targetPage); void imageScheduler.preparePage(nativeTarget); }

      if (isSecondTap) {
        clearTapTimer();
        lastTapRef.current.time = 0;
        suppressPageFlipRef.current = true;
        stopZoomAnimations();
      } else {
        suppressPageFlipRef.current = startedZoomed || viewOnly || !targetReady;
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
        viewOnly,
        viewSourceLeaf: currentPageRef.current,
        viewTargetLeaf: viewPlan.leaf,
        viewStartOffset: -bookLeafSide(currentPageRef.current, pages.length) * pageSize.width,
        viewTargetOffset: -bookLeafSide(viewPlan.leaf, pages.length) * pageSize.width,
        viewProgress: 0,
        viewVelocity: 0,
        lastMoveX: event.clientX,
        lastMoveTime: now,
      };
    },
    [
      clearTapTimer,
      commentMode,
      panX,
      panY,
      prepareZoomImages,
      adjacentPage,
      imageScheduler,
      pages,
      pageSize.width,
      stopZoomAnimations,
      zoomScale,
    ]
  );

  const schedulePageTurn = useCallback(
    (x: number, stageCenterX: number) => {
      clearTapTimer();
      const intent = pageTurnIntentRef.current;
      tapTimerRef.current = window.setTimeout(() => {
        tapTimerRef.current = null;
        if (
          magnifierOpenRef.current ||
          pageFlipBusyRef.current ||
          activeGestureRef.current
        ) {
          return;
        }

        const fromPage = currentPageRef.current;
        const plan = planBookPageTurn(fromPage, x >= stageCenterX, pages.length, viewModeRef.current);
        if (plan.action === "none") return;
        const targetPage = plan.leaf;
        void imageScheduler.preparePage(targetPage).then((prepared) => {
          if (!prepared || pageTurnIntentRef.current !== intent || magnifierOpenRef.current || pageFlipBusyRef.current || activeGestureRef.current || focusedCommentRef.current || commentDraftRef.current || currentPageRef.current !== fromPage || !imageScheduler.isReadyForPage(targetPage)) return;
          if (plan.action === "view") { commitPageSelection(targetPage); return; }
          const pageFlip = bookRef.current?.pageFlip();
          if (!pageFlip) return;
          pendingNativeLeafRef.current = targetPage;
          if (plan.action === "previous") pageFlip.flipPrev();
          else pageFlip.flipNext();
        });
      }, DOUBLE_TAP_DELAY);
    },
    [clearTapTimer, imageScheduler, pages.length, commitPageSelection]
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

      if (gesture.viewOnly) {
        if (!gesture.moved) return;
        event.preventDefault();
        cameraAnimationRef.current?.stop();
        const horizontal = event.clientX - gesture.startX;
        if (Math.abs(event.clientY - gesture.startY) > Math.abs(horizontal) * 1.25) return;
        const now = performance.now();
        gesture.viewVelocity = (event.clientX - (gesture.lastMoveX ?? gesture.startX)) / Math.max(1, now - (gesture.lastMoveTime ?? now));
        gesture.lastMoveX = event.clientX; gesture.lastMoveTime = now;
        const drag = bookViewDragOffset(gesture.viewStartOffset ?? 0, gesture.viewTargetOffset ?? 0, horizontal, baseViewScaleRef.current);
        gesture.viewProgress = drag.progress;
        canvasX.set(drag.value);
        return;
      }

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
    [canvasX, clampPan, openMagnifier, panX, panY, zoomAroundPoint, zoomScale]
  );

  const handleGlobalPointerEnd = useCallback(
    (event: PointerEvent) => {
      suppressPageFlipRef.current = false;
      const gesture = activeGestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;

      activeGestureRef.current = null;
      suppressPageFlipRef.current = false;
      viewerOwnsNativeTapRef.current = gesture.mode === "page" && !gesture.moved;
      flushPendingResize();

      if (event.type === "pointercancel") {
        viewGestureNativeBlockedRef.current = false;
        lastTapRef.current.time = 0;
        if (gesture.viewOnly) cameraAnimationRef.current = animateMotion(canvasX, gesture.viewStartOffset ?? 0, { type: "spring", stiffness: 260, damping: 27 });
        return;
      }

      if (gesture.viewOnly && gesture.moved) {
        lastTapRef.current.time = 0;
        clearTapTimer();
        const intent = pageTurnIntentRef.current;
        const source = gesture.viewSourceLeaf ?? currentPageRef.current;
        const target = gesture.viewTargetLeaf ?? source;
        const direction = (gesture.viewTargetOffset ?? 0) - (gesture.viewStartOffset ?? 0);
        const velocity = performance.now() - (gesture.lastMoveTime ?? 0) < 120 ? gesture.viewVelocity ?? 0 : 0;
        const settleBack = () => { cameraAnimationRef.current?.stop(); cameraAnimationRef.current = animateMotion(canvasX, gesture.viewStartOffset ?? 0, { type: "spring", stiffness: 260, damping: 27 }); };
        if (!commitsBookViewDrag(gesture.viewProgress ?? 0, velocity, direction)) { settleBack(); return; }
        void imageScheduler.preparePage(target).then((prepared) => {
          if (pageTurnIntentRef.current !== intent || currentPageRef.current !== source || magnifierOpenRef.current || activeGestureRef.current) return;
          if (!prepared || !imageScheduler.isReadyForPage(target)) { settleBack(); return; }
          commitPageSelection(target);
        });
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
    [canvasX, clearTapTimer, closeMagnifier, commitPageSelection, imageScheduler, openMagnifier, schedulePageTurn, flushPendingResize]
  );

  const blockNativeViewGesture = useCallback((event: Event) => {
    if (!viewGestureNativeBlockedRef.current) return;
    if (event.type === "mouseup" || event.type === "touchend" || event.type === "touchcancel") viewGestureNativeBlockedRef.current = false;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
  }, []);

  useEffect(() => {
    const nativeEvents = ["mousemove", "mouseup", "touchmove", "touchend", "touchcancel"];
    nativeEvents.forEach((name) => window.addEventListener(name, blockNativeViewGesture, { capture: true, passive: false }));
    window.addEventListener("pointermove", handleGlobalPointerMove, {
      passive: false,
    });
    window.addEventListener("pointerup", handleGlobalPointerEnd, true);
    window.addEventListener("pointercancel", handleGlobalPointerEnd, true);

    return () => {
      nativeEvents.forEach((name) => window.removeEventListener(name, blockNativeViewGesture, true));
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerEnd, true);
      window.removeEventListener("pointercancel", handleGlobalPointerEnd, true);
    };
  }, [blockNativeViewGesture, handleGlobalPointerEnd, handleGlobalPointerMove]);

  useEffect(() => {
    return () => {
      clearTapTimer();
      stopZoomAnimations();
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [clearTapTimer, stopZoomAnimations]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (event.target instanceof Element && event.target.closest("[data-book-comment-ui]")) { event.stopPropagation(); return; }
      if (focusedCommentRef.current) { event.preventDefault(); event.stopPropagation(); return; }
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

  // react-pageflip rebuilds its internal HTML page collection whenever its
  // children identity changes. Keep the actual page elements stable across
  // transient gesture/render state so releasing a mobile fold does not detach
  // and reinsert the full-resolution images. Content-driven changes (comments,
  // permissions, or pages) still create a fresh collection as expected.
  const pageFaces = useMemo(
    () =>
      pages.map((page, index) => (
        <PageFace
          key={page.id}
          page={page}
          isCover={index === 0 || index === pages.length - 1}
          commentMode={commentMode}
          canManageComments={canManageComments}
          onImageReady={() => handlePageImageReady(index)}
          onPlaceComment={placeComment}
        />
      )),
    [
      canManageComments,
      commentMode,
      handlePageImageReady,
      pages,
      placeComment,
    ]
  );

  if (pages.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55">
        This published book does not contain any JPG pages yet.
      </div>
    );
  }

  const focusedRecord = focusedComment ? comments.find((comment) => comment.id === focusedComment.id) : null;

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
        } ${foldShadowActive ? "is-page-folding" : ""} ${commentMode && canManageComments ? "is-comment-mode" : ""} ${
          commentsIdle && !zoomCommentsHidden && !magnifierOpen && (!commentDraft || Boolean(commentDraft.commentId))
            ? "are-comments-visible"
            : "are-comments-hidden"
        }`}
        data-page={currentPage}
        data-book-view-mode={viewMode}
        data-zoomed={magnifierOpen ? "true" : "false"}
        onPointerDownCapture={beginGesture}
        onMouseDownCapture={(event) => {
          if (event.target instanceof Element && event.target.closest("[data-book-comment-ui]")) return;
          if (commentMode || suppressPageFlipRef.current || magnifierOpenRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onTouchStartCapture={(event) => {
          if (event.target instanceof Element && event.target.closest("[data-book-comment-ui]")) return;
          if (commentMode || suppressPageFlipRef.current || magnifierOpenRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onWheel={handleWheel}
      >
        <div className="book-comment-layer absolute inset-0 z-20" aria-hidden={!commentsIdle || zoomCommentsHidden || magnifierOpen || Boolean(commentDraft && !commentDraft.commentId)}>
          {commentAnchors.map((anchor) => {
            const comment = comments.find((item) => item.id === anchor.id);
            if (!comment) return null;
            return <div key={comment.id} data-book-comment-id={comment.id} className={`book-comment-position ${anchor.below ? "is-below" : ""} ${draggingCommentId === comment.id ? "is-dragging" : ""}`} style={{ left: anchor.x, top: anchor.y, transform: `translate(-50%, ${anchor.below ? "0" : "-100%"})`, visibility: focusedComment?.id === comment.id ? "hidden" : undefined, "--book-comment-max-height": `${anchor.maxHeight}px` } as React.CSSProperties}>
              <div data-book-comment-ui="true" className="book-comment-balloon" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()} onWheel={(event) => event.stopPropagation()} style={{ background: commentBackground(comment.background_color || DEFAULT_BALLOON_COLOR, comment.background_opacity), color: comment.text_color || DEFAULT_COMMENT_TEXT_COLOR, fontSize: comment.font_size ?? 14 }}>
                <div className="book-comment-read" tabIndex={0} aria-label="Commento: doppio clic per leggere a schermo intero" onDoubleClick={(event) => { event.preventDefault(); event.stopPropagation(); openCommentFocus(comment, event.currentTarget); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); openCommentFocus(comment, event.currentTarget); } }} onPointerDown={(event) => { if (event.pointerType !== "mouse") commentTouchStartRef.current = { id: comment.id, x: event.clientX, y: event.clientY, scrollTop: event.currentTarget.scrollTop }; }} onPointerCancel={() => { commentTouchStartRef.current = null; commentTapRef.current = null; }} onPointerUp={(event) => {
                  if (event.pointerType === "mouse") return;
                  const start = commentTouchStartRef.current; commentTouchStartRef.current = null;
                  if (!start || start.id !== comment.id || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8 || Math.abs(event.currentTarget.scrollTop - start.scrollTop) > 1) { commentTapRef.current = null; return; }
                  const previous = commentTapRef.current, now = performance.now();
                  if (previous?.id === comment.id && now - previous.time < 320 && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 18) { event.preventDefault(); commentTapRef.current = null; openCommentFocus(comment, event.currentTarget); }
                  else commentTapRef.current = { id: comment.id, time: now, x: event.clientX, y: event.clientY };
                }}>{comment.title && <h3>{comment.title}</h3>}<BookRichText body={comment.body} value={comment.rich_content} /></div>
                {canManageComments && <div className="book-comment-manage">{onUpdateComment && <><button type="button" className="book-comment-move" aria-label="Sposta commento" onPointerDown={(event) => beginCommentMove(event, comment)} onPointerMove={moveComment} onPointerUp={(event) => void endCommentMove(event)} onPointerCancel={(event) => void endCommentMove(event, true)} onLostPointerCapture={(event) => void endCommentMove(event, true)} disabled={commentBusy}>↔</button><button type="button" className="book-comment-edit" onClick={() => editComment(comment)} disabled={commentBusy}>modifica</button></>}<button type="button" className="book-comment-delete" onClick={() => void deleteComment(comment.id)} aria-label="Elimina commento" disabled={commentBusy}>−</button></div>}
              </div>
            </div>;
          })}
        </div>
        <motion.div
          className="book-view-scene flex h-full w-full items-center justify-center"
          style={{
            x: panX,
            y: panY,
            scale: zoomScale,
            transformOrigin: "50% 50%",
            willChange: "transform",
            pointerEvents: focusedComment ? "none" : undefined,
          }}
        >
          <div
            data-book-page-clip="true"
            className="book-page-clip"
            style={{
              width: pageSize.width * (viewMode === "single" ? 1 : 2),
              height: pageSize.height,
              transform: `scale(${baseViewScale})`,
              willChange: "transform",
              pointerEvents: magnifierOpen ? "none" : "auto",
            }}
          >
            <motion.div className="book-page-canvas" style={{ width: pageSize.width * 2, height: pageSize.height, x: canvasX }}>
            {layoutMeasured && (
              <BookImageContext.Provider value={imageScheduler}><HTMLFlipBook
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
                  bookSpreadStart(activeBookIdRef.current === book.id
                    ? currentPageRef.current
                    : safeInitialPage)
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
                  initializedEngineRef.current = event.object;
                  pointerCoordinatesCleanupRef.current?.();
                  const native = event.object as PageFlipApi & Parameters<typeof guardBookNativeTap>[0] & { getUI?: () => Parameters<typeof normalizeBookPointerCoordinates>[0] };
                  const restoreCoordinates = native.getUI ? normalizeBookPointerCoordinates(native.getUI()) : () => undefined;
                  const restoreTap = guardBookNativeTap(native, () => viewerOwnsNativeTapRef.current);
                  pointerCoordinatesCleanupRef.current = () => { restoreTap(); restoreCoordinates(); };
                  synchronizeSinglePageCenter(event.object);
                  flipInitializedRef.current = true;
                  notifyReadyWhenPaintable();
                }}
                onFlip={(event: FlipEvent<number>) => {
                  // Native emits bootstrap page0 before applying startPage.
                  // Ignore that event so restoring an even leaf stays exact.
                  if (initializedEngineRef.current !== event.object) return;
                  const pending = pendingNativeLeafRef.current;
                  pendingNativeLeafRef.current = null;
                  if (pending !== null && bookSpreadStart(pending) === event.data) commitPageSelection(pending);
                  else if (bookSpreadStart(currentPageRef.current) !== event.data) commitPageSelection(event.data);
                  synchronizeSinglePageCenter(event.object);
                }}
                onChangeState={(event: FlipEvent<PageFlipState>) => {
                  const busy =
                    event.data === "user_fold" || event.data === "flipping";
                  const wasBusy = pageFlipBusyRef.current;
                  pageFlipBusyRef.current = busy;
                  imageScheduler.setBusy(busy);
                  if (busy) followNativeFold(event.object);
                  if (!busy) flushPendingResize();
                  if (busy || wasBusy || event.data === "read") restartCommentIdle();
                  setFoldShadowActive(event.data !== "read");
                  if (busy) clearTapTimer();
                }}
                onChangeOrientation={(event: FlipEvent<PageOrientation>) => {
                  synchronizeSinglePageCenter(event.object);
                }}
              >
                {pageFaces}
              </HTMLFlipBook></BookImageContext.Provider>
            )}
            </motion.div>
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
      {controlsActive && createPortal(<div data-book-comment-ui="true" data-book-view-controls="true" className="book-view-controls" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
        <div ref={modeControlsRef} className={`book-view-mode-controls ${toolbarVisible ? "is-revealed" : "is-concealed"}`} role="group" aria-label="Visualizzazione del libro" aria-hidden={!toolbarVisible}>
          <button type="button" tabIndex={toolbarVisible ? 0 : -1} aria-label="Pagina singola" aria-pressed={viewMode === "single"} disabled={!toolbarVisible || magnifierOpen || zoomClosing || foldShadowActive || Boolean(commentDraft) || Boolean(focusedComment)} onClick={() => changeViewMode("single")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h12v17H6z"/><path d="M9 7h6M9 10h6"/></svg></button>
          <button type="button" tabIndex={toolbarVisible ? 0 : -1} aria-label="Doppia pagina" aria-pressed={viewMode === "double"} disabled={!toolbarVisible || magnifierOpen || zoomClosing || foldShadowActive || Boolean(commentDraft) || Boolean(focusedComment)} onClick={() => changeViewMode("double")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 4.5h8L12 6l1.5-1.5h8v15h-8L12 21l-1.5-1.5h-8zM12 6v15"/><path d="M5.5 8h3M15.5 8h3"/></svg></button>
        </div>
        {magnifierOpen && <button type="button" className="book-zoom-exit" aria-label="Esci dallo zoom" disabled={zoomClosing} onClick={closeMagnifier}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6M7 10h6"/></svg></button>}
      </div>, document.body)}
      {commentDraft && createPortal(
        <form data-book-comment-ui="true" className="book-comment-draft-panel" style={{ top: editorTop ?? undefined, bottom: editorTop === null ? editorBottom : undefined, maxHeight: editorMaxHeight ?? undefined, background: draftBackground, color: draftTextColor }} onSubmit={(event) => { event.preventDefault(); void submitCommentDraft(); }}>
          <div className="book-comment-draft-header"><span>{commentDraft.commentId ? "MODIFICA ANNOTAZIONE" : "ANNOTAZIONE"}</span><button type="button" disabled={commentBusy} onClick={cancelCommentDraft}>annulla</button></div>
          <input className="book-comment-title-input" aria-label="Titolo del commento facoltativo" placeholder="Titolo (facoltativo)" maxLength={120} value={commentDraftTitle} onChange={(event) => setCommentDraftTitle(event.target.value)} />
          <BookRichTextEditor autoFocus label="Testo del commento" style={{ fontSize: Math.max(16, draftFontSize) }} body={commentDraftBody} value={commentDraftRichContent} disabled={commentBusy} placeholder="Scrivi sul foglio…" onChange={(body, document) => { setCommentDraftBody(body); setCommentDraftRichContent(document); }} onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === "Escape") cancelCommentDraft();
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); void submitCommentDraft(); }
          }} />
          <div className="book-comment-color-controls">
            <label>Balloon <input type="color" aria-label="Colore balloon" value={draftBackground} onChange={(event) => setDraftBackground(event.target.value)} /></label>
            <label>Testo <input type="color" aria-label="Colore testo commento" value={draftTextColor} onChange={(event) => setDraftTextColor(event.target.value)} /></label>
          </div>
          <label className="book-comment-opacity-control">Opacità dello sfondo <input type="range" aria-label="Opacità dello sfondo commento" min="15" max="100" step="5" value={Math.round(draftBackgroundOpacity * 100)} onChange={(event) => setDraftBackgroundOpacity(Number(event.target.value) / 100)} /><output>{Math.round(draftBackgroundOpacity * 100)}%</output></label>
          <label className="book-comment-opacity-control">Dimensione testo <input type="range" aria-label="Dimensione testo commento" min="10" max="48" step="1" value={draftFontSize} onChange={(event) => setDraftFontSize(Number(event.target.value))} /><output>{draftFontSize}px</output></label>
          <div className="book-comment-editor-actions">
            <div className="book-comment-emojis" aria-label="Aggiungi simbolo">{COMMENT_EMOJIS.map((emoji) => <button key={emoji} type="button" onClick={() => { const next = `${commentDraftBody}${emoji}`; if (next.length > 600) return; setCommentDraftBody(next); setCommentDraftRichContent(reconcileBookRichText(safeBookRichDocument(commentDraftRichContent, commentDraftBody), next)); }}>{emoji}</button>)}</div>
            <button type="submit" disabled={commentBusy || !commentDraftBody.trim()}>{commentBusy ? "…" : "salva"}</button>
          </div>
          {commentError && <p role="alert" className="book-comment-editor-error">{commentError}</p>}
        </form>, document.body
      )}
      {commentDraft && draftPoint && createPortal(<span className="book-comment-draft-anchor" aria-hidden="true" style={{ left: draftPoint.x, top: draftPoint.y }} />, document.body)}
      {!commentDraft && commentError && <p role="alert" data-book-comment-ui="true" className="book-comment-action-error">{commentError}</p>}
      {focusedComment && focusedRecord && <BookCommentFocusView comment={focusedRecord} origin={focusedComment.origin} onClose={() => { focusedCommentRef.current = null; setFocusedComment(null); }} />}
    </div>
  );
}
