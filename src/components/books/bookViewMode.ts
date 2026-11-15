export type BookViewMode = "single" | "double";
export const BOOK_VIEW_MODE_KEY = "studierzimmer:book-page-view";
export const BOOK_VIEW_MODE_EVENT = "studierzimmer:book-view-mode";
let sessionViewMode: BookViewMode | undefined;
const leafInRange = (leaf: number, count: number) => Math.min(Math.max(0, Math.floor(leaf)), Math.max(0, count - 1));

export function bookSpreadStart(leaf: number): number { return leaf <= 0 ? 0 : leaf % 2 === 0 ? leaf - 1 : leaf; }
export function bookSpreadLeaves(leaf: number, count: number): number[] {
  if (count <= 0) return [];
  const start = bookSpreadStart(leafInRange(leaf, count));
  return start === 0 ? [0] : [start, start + 1].filter((page) => page < count);
}
export function bookLeafSide(leaf: number, count?: number): 0 | 1 { return count === 1 ? 0 : leaf === 0 || leaf !== bookSpreadStart(leaf) ? 1 : 0; }
export function planBookPageTurn(leaf: number, forward: boolean, count: number, mode: BookViewMode) {
  const current = leafInRange(leaf, count), spread = bookSpreadStart(current);
  const target = mode === "single" ? leafInRange(current + (forward ? 1 : -1), count) : leafInRange(forward ? (spread === 0 ? 1 : spread + 2) : (spread <= 2 ? 0 : spread - 2), count);
  const targetSpread = bookSpreadStart(target);
  return { leaf: target, spread: targetSpread, action: target === current ? "none" : targetSpread === spread ? "view" : targetSpread > spread ? "next" : "previous" } as const;
}
export function bookSingleViewScale(page: { width: number; height: number }, viewport: { width: number; height: number }): number {
  return Math.max(.01, Math.min(viewport.width / Math.max(1, page.width), viewport.height / Math.max(1, page.height)));
}
/** Follow the very same native fold calculation, including a cancelled drag. */
export function bookFoldViewOffset(leaf: number, count: number, width: number, forward: boolean, progress: number): number {
  const spread = bookSpreadStart(leaf);
  const targetSpread = planBookPageTurn(leaf, forward, count, "double").spread;
  const targetLeaf = forward ? targetSpread : targetSpread === 0 ? 0 : Math.min(count - 1, targetSpread + 1);
  const start = -bookLeafSide(leaf, count) * width;
  const end = -bookLeafSide(targetLeaf, count) * width;
  if (targetSpread === spread) return start;
  return start + (end - start) * Math.min(1, Math.max(0, progress / 100));
}
export function bookViewDragOffset(source: number, target: number, screenDelta: number, scale: number) {
  const value = Math.min(Math.max(source + screenDelta / Math.max(.01, scale), Math.min(source, target)), Math.max(source, target));
  return { value, progress: source === target ? 0 : Math.max(0, (value - source) / (target - source)) };
}
export function commitsBookViewDrag(progress: number, screenVelocity: number, direction: number): boolean {
  return progress >= .25 || (progress > .04 && screenVelocity * Math.sign(direction) >= .32);
}

interface NativePointerUI {
  getMousePos?: (x: number, y: number) => { x: number; y: number };
  getDistElement?: () => HTMLElement;
}
/** StPageFlip2.0.7 subtracts rect.left/top but does not account for CSS scale.
 * Normalize this one instance's public pointer conversion; never patch globals.
 * Native down/move/up listeners and the fold physics remain unchanged. */
export function normalizeBookPointerCoordinates(ui: NativePointerUI): () => void {
  if (!ui.getMousePos || !ui.getDistElement) return () => undefined;
  const previous = ui.getMousePos;
  const normalized = (x: number, y: number) => {
    const element = ui.getDistElement!();
    const rect = element.getBoundingClientRect();
    const scaleX = rect.width / Math.max(1, element.offsetWidth);
    const scaleY = rect.height / Math.max(1, element.offsetHeight);
    return { x: (x - rect.left) / (scaleX || 1), y: (y - rect.top) / (scaleY || 1) };
  };
  ui.getMousePos = normalized;
  return () => { if (ui.getMousePos === normalized) ui.getMousePos = previous; };
}
/** disableFlipByClick still permits native corner taps. The viewer owns all
 * delayed taps/double-taps; leave native folds/spring-back completely intact. */
export function guardBookNativeTap(engine: { userStop?: (point: { x: number; y: number }, swipe?: boolean) => void; getState?: () => string }, isViewerTap: () => boolean): () => void {
  if (!engine.userStop) return () => undefined;
  const previous = engine.userStop;
  const guarded = (point: { x: number; y: number }, swipe = false) => previous.call(engine, point, swipe || (isViewerTap() && engine.getState?.() === "read"));
  engine.userStop = guarded;
  return () => { if (engine.userStop === guarded) engine.userStop = previous; };
}
export function readBookViewMode(): BookViewMode {
  try {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(BOOK_VIEW_MODE_KEY);
      if (stored === "single" || stored === "double") sessionViewMode = stored;
    }
  } catch { /* Keep the in-memory preference when storage is blocked. */ }
  if (!sessionViewMode) sessionViewMode = typeof window !== "undefined" && window.innerWidth <= 767 ? "single" : "double";
  return sessionViewMode;
}
export function saveBookViewMode(mode: BookViewMode): void {
  sessionViewMode = mode;
  try { window.localStorage.setItem(BOOK_VIEW_MODE_KEY, mode); } catch { /* Private/blocked storage retains the current session choice. */ }
  window.dispatchEvent(new CustomEvent(BOOK_VIEW_MODE_EVENT, { detail: mode }));
}
