import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";
import type { Book, BookPage, BookPageFormat } from "@/types/books";

interface FoldingBookViewerProps {
  book: Book;
  pages: BookPage[];
  initialPage?: number;
  bookMotionClassName?: string;
  onPageChange?: (pageIndex: number) => void;
  onReady?: (bookId: string) => void;
}

type PageOrientation = "portrait" | "landscape";

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
    minWidth: 160,
    maxWidth: 600,
    minHeight: 226,
    maxHeight: 849,
  },
  a4_short_edge: {
    width: 679,
    height: 480,
    minWidth: 190,
    maxWidth: 680,
    minHeight: 134,
    maxHeight: 481,
  },
  square: {
    width: 560,
    height: 560,
    minWidth: 180,
    maxWidth: 620,
    minHeight: 180,
    maxHeight: 620,
  },
};

const PageFace = forwardRef<HTMLDivElement, PageFaceProps>(function PageFace(
  { page, isCover },
  ref
) {
  return (
    <div
      ref={ref}
      data-density={isCover ? "hard" : "soft"}
      className="h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]"
    >
      <img
        src={page.public_url}
        alt={`Page ${page.page_number}: ${page.file_name}`}
        draggable={false}
        className="h-full w-full select-none object-cover object-center"
      />
    </div>
  );
});

export default function FoldingBookViewer({
  book,
  pages,
  initialPage = 0,
  bookMotionClassName = "is-visible",
  onPageChange,
  onReady,
}: FoldingBookViewerProps) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const sizeObserverTargetRef = useRef<HTMLDivElement | null>(null);
  const pageFormat = book.page_format ?? "a4_long_edge";
  const pageMetrics = PAGE_FORMAT_METRICS[pageFormat];

  const safeInitialPage = Math.min(
    Math.max(0, Math.floor(initialPage)),
    Math.max(0, pages.length - 1)
  );

  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  const [horizontalOffset, setHorizontalOffset] = useState(0);

  const synchronizeSinglePageCenter = useCallback(
    (eventObject?: PageFlipApi) => {
      window.requestAnimationFrame(() => {
        const pageFlip = eventObject ?? bookRef.current?.pageFlip();

        if (!pageFlip) {
          return;
        }

        const orientation = pageFlip.getOrientation();
        const pageIndex = pageFlip.getCurrentPageIndex();
        const bounds = pageFlip.getBoundsRect();

        setCurrentPage(pageIndex);
        onPageChange?.(pageIndex);

        if (orientation !== "landscape") {
          setHorizontalOffset(0);
          return;
        }

        if (pageIndex === 0) {
          setHorizontalOffset(-(bounds.pageWidth / 2));
          return;
        }

        if (pageIndex >= pages.length - 1) {
          setHorizontalOffset(bounds.pageWidth / 2);
          return;
        }

        setHorizontalOffset(0);
      });
    },
    [onPageChange, pages.length]
  );

  useEffect(() => {
    const element = sizeObserverTargetRef.current;

    if (!element) {
      return;
    }

    const update = () => {
      synchronizeSinglePageCenter();
    };

    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [synchronizeSinglePageCenter]);

  useEffect(() => {
    setCurrentPage(safeInitialPage);
    setHorizontalOffset(0);
  }, [book.id, safeInitialPage]);

  useEffect(() => {
    if (pages.length === 0) {
      onReady?.(book.id);
    }
  }, [book.id, onReady, pages.length]);

  if (pages.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55">
        This published book does not contain any JPG pages yet.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className={`public-book-stage ${bookMotionClassName}`}>
        <div
          ref={sizeObserverTargetRef}
          className="public-book-viewport flex items-center justify-center overflow-visible px-2"
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              transform: `translate3d(${horizontalOffset}px, 0, 0)`,
              transition:
                "transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            <HTMLFlipBook
              ref={bookRef}
              key={`${book.id}-${pageFormat}`}
              className="mx-auto"
              style={{ margin: "0 auto" }}
              width={pageMetrics.width}
              height={pageMetrics.height}
              minWidth={pageMetrics.minWidth}
              maxWidth={pageMetrics.maxWidth}
              minHeight={pageMetrics.minHeight}
              maxHeight={pageMetrics.maxHeight}
              size="stretch"
              startPage={safeInitialPage}
              drawShadow
              flippingTime={850}
              usePortrait
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.35}
              showCover
              mobileScrollSupport
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={false}
              onInit={(event: FlipEvent<{ page: number; mode: PageOrientation }>) => {
                setCurrentPage(event.data.page);
                onPageChange?.(event.data.page);
                synchronizeSinglePageCenter(event.object);
                onReady?.(book.id);
              }}
              onFlip={(event: FlipEvent<number>) => {
                setCurrentPage(event.data);
                onPageChange?.(event.data);
                synchronizeSinglePageCenter(event.object);
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
                />
              ))}
            </HTMLFlipBook>
          </div>
        </div>
      </div>

      <div
        className={`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${bookMotionClassName}`}
      >
        <span className="max-w-[60vw] truncate">{book.title}</span>
      </div>

      {book.description && (
        <div
          className={`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${bookMotionClassName}`}
        >
          <span className="max-w-[60vw] truncate">{book.description}</span>
        </div>
      )}
    </div>
  );
}
