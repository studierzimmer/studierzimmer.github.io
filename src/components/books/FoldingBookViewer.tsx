import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
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
  const activeBookIdRef = useRef(book.id);
  const currentPageRef = useRef(safeInitialPage);

  const [currentPage, setCurrentPage] = useState(safeInitialPage);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [pageSize, setPageSize] = useState(() =>
    fitOpenSpread(pageMetrics, 640, 480)
  );
  const [layoutMeasured, setLayoutMeasured] = useState(false);

  const synchronizeSinglePageCenter = useCallback(
    (eventObject?: PageFlipApi) => {
      window.requestAnimationFrame(() => {
        const pageFlip = eventObject ?? bookRef.current?.pageFlip();

        if (!pageFlip) {
          return;
        }

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

    if (!element) {
      return;
    }

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

      const nextPageSize = fitOpenSpread(pageMetrics, width, height);
      setPageSize((currentSize) =>
        currentSize.width === nextPageSize.width &&
        currentSize.height === nextPageSize.height
          ? currentSize
          : nextPageSize
      );
      setLayoutMeasured(true);
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
  }, [pageMetrics, synchronizeSinglePageCenter]);

  useEffect(() => {
    activeBookIdRef.current = book.id;
    currentPageRef.current = safeInitialPage;
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
          className="public-book-viewport relative flex cursor-default items-center justify-center overflow-hidden"
          data-page={currentPage}
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              transform: `translate3d(${horizontalOffset}px, 0, 0)`,
              transition: "transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
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
                showPageCorners
                disableFlipByClick={false}
                onInit={(event: FlipEvent<{ page: number; mode: PageOrientation }>) => {
                  currentPageRef.current = event.data.page;
                  setCurrentPage(event.data.page);
                  onPageChange?.(event.data.page);
                  synchronizeSinglePageCenter(event.object);
                  onReady?.(book.id);
                }}
                onFlip={(event: FlipEvent<number>) => {
                  currentPageRef.current = event.data;
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
            )}
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
