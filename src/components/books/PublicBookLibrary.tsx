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
import type { BookComment } from "@/types/bookComments";
import {
  bookPagePreviewUrl,
  listBookPages,
  listPublishedBooks,
} from "@/services/bookRepository";
import {
  createBookComment,
  deleteBookComment,
  listVisibleBookComments,
} from "@/services/bookCommentRepository";
import { trackAnalyticsEvent } from "@/services/analyticsTracker";
import FoldingBookViewer from "@/components/books/FoldingBookViewer";
import { useAdminSession } from "@/hooks/useAdminSession";
import ScrambleText from "@/components/navigation/ScrambleText";
import {
  BOOK_INDEX_RETURN_KEY,
  BOOK_INTRO_RETURN_KEY,
  readBookSession,
  writeBookSession,
} from "@/components/books/bookSession";

const loadAdminPortal = () => import("@/components/admin/AdminPortal");
const AdminPortal = lazy(loadAdminPortal);
const preloadWatchStudio = () => import("@/pages/WatchStudio");
const preloadThreeDExperience = () =>
  preloadWatchStudio().then((module) =>
    module.preloadWatchStudioExperience()
  );

interface PublicBookLibraryProps {
  initialSlug?: string | null;
  onBack: () => void;
  onLogin: () => void;
  onThreeD: () => void;
  onBookChange?: (slug: string) => void;
}

type CenterMotion = "outside" | "entering" | "visible" | "leaving";

type BookPreviewImage = {
  src: string;
  fallback: string;
};

type BookPreview = {
  cover: BookPreviewImage | null;
  lastPage: BookPreviewImage | null;
};

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
const BOOK_VIEWER_READY_TIMEOUT = 6000;

const libraryStyles = `
.public-book-shell {
  height: 100vh;
  height: 100dvh;
}

.public-book-nav {
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(34px, 5vw, 48px);
  align-items: start;
  gap: clamp(1px, 0.6vw, 7px);
  max-width: calc(100vw - 24px - env(safe-area-inset-left));
}

.public-book-control-column {
  position: relative;
  width: 100%;
  height: clamp(96px, 16dvh, 138px);
  border: 0;
  outline: none;
  padding: 0;
  background: transparent;
  color: black;
  overflow: visible;
}

.public-book-control-column > span {
  position: absolute;
  left: auto;
  right: 50%;
  top: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transform: rotate(-90deg);
  transform-origin: 100% 50%;
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgb(0 0 0 / 0.42);
  transition:
    color 480ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.public-book-control-column:hover > span,
.public-book-control-column:focus-visible > span {
  color: rgb(0 0 0 / 0.72);
  transform: rotate(-90deg) scale(1.08);
}

.public-book-control-column:focus-visible > span {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.public-book-control-column.is-active > span {
  color: black;
  text-decoration: none;
}

.public-book-library-plus {
  position: absolute;
  left: 50%;
  top: clamp(68px, 9dvh, 76px);
  display: block;
  pointer-events: none;
  color: rgb(0 0 0 / 0.52);
  font-size: clamp(13px, 1.7vw, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.public-book-library-plus.is-hidden {
  animation: public-book-library-plus-arrive 520ms
    cubic-bezier(0.4, 0, 0.2, 1) reverse both;
}

.public-book-library-plus.is-visible {
  animation: public-book-library-plus-arrive 680ms
    cubic-bezier(0.22, 0.88, 0.3, 1) 360ms both;
}

@keyframes public-book-library-plus-arrive {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -5px, 0) scale(0);
  }
  64% {
    opacity: 1;
    transform: translate3d(-50%, 1px, 0) scale(1.16);
  }
  82% {
    transform: translate3d(-50%, 0, 0) scale(0.94);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, 0, 0) scale(1);
  }
}

.public-book-main {
  padding:
    calc(env(safe-area-inset-top) + clamp(14px, 2.5dvh, 32px))
    max(12px, env(safe-area-inset-right))
    calc(env(safe-area-inset-bottom) + clamp(14px, 2.5dvh, 32px))
    max(12px, env(safe-area-inset-left));
}

.public-book-viewport {
  box-sizing: border-box;
  width: min(
    calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right) - clamp(28px, 5vw, 82px)),
    1800px
  );
  height: min(
    calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - clamp(40px, 8dvh, 92px)),
    1100px
  );
  min-height: 0;
  padding: clamp(8px, 1.6vw, 24px);
  contain: layout;
  isolation: isolate;
}

.public-book-viewport .stf__parent {
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}

.public-book-viewport .stf__wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: inherit;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}

.public-book-viewport .stf__hardShadow,
.public-book-viewport .stf__hardInnerShadow {
  pointer-events: none;
  opacity: 0;
  filter: blur(clamp(4px, 0.65vw, 8px));
  transition: opacity 150ms cubic-bezier(0.22, 0.8, 0.28, 1);
  will-change: opacity, filter;
}

.public-book-viewport.is-page-folding .stf__hardShadow,
.public-book-viewport.is-page-folding .stf__hardInnerShadow {
  opacity: 0.84;
}

.public-book-surface {
  transform: none;
  opacity: 1;
  filter: blur(0);
  transition:
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 700ms ease,
    filter 700ms ease;
}

.public-book-surface.is-login-muted {
  transform: scale(0.94);
  opacity: 0.25;
  filter: blur(9px);
}

.public-book-stage.is-magnified {
  position: fixed;
  inset: 0;
  z-index: 220;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  transform: none !important;
  animation: none !important;
  opacity: 1 !important;
  background: rgb(255 255 255 / 0.98);
  overscroll-behavior: none;
}

.public-book-stage.is-magnified .public-book-viewport {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  padding: 0;
  contain: none;
  touch-action: none;
  overscroll-behavior: none;
}

.public-book-stage.is-zoom-closing {
  pointer-events: none;
}

@media (max-width: 380px), (max-height: 700px) {
  .public-book-nav {
    top: max(8px, env(safe-area-inset-top));
    left: max(7px, env(safe-area-inset-left));
    grid-auto-columns: 31px;
    gap: 0;
    max-width: calc(100vw - 14px);
  }

  .public-book-control-column {
    height: clamp(76px, 20dvh, 104px);
  }

  .public-book-main {
    padding:
      calc(env(safe-area-inset-top) + 9px)
      max(8px, env(safe-area-inset-right))
      calc(env(safe-area-inset-bottom) + 9px)
      max(8px, env(safe-area-inset-left));
  }

  .public-book-viewport {
    width: calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right) - 20px);
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 20px);
    min-height: 0;
    padding: 5px;
  }
}

@media (max-height: 520px) {
  .public-book-viewport {
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 16px);
  }

  .public-book-control-column {
    height: min(82px, calc(100dvh - 18px));
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

.public-library-drawer {
  left: 0;
  right: 0;
  bottom: 0;
  height: min(72dvh, 720px);
  transform: translate3d(0, 104%, 0);
  opacity: 0;
  background: rgb(207 207 207);
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 360ms ease;
  will-change: transform, opacity;
}

.public-library-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.public-library-book-row {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2.2vw, 24px);
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: clamp(270px, 44dvh, 440px);
  padding: clamp(26px, 4vw, 54px) clamp(18px, 5vw, 76px);
  border: 0;
  background: transparent;
  text-align: center;
  transform-origin: 50% 50%;
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.public-library-book-row:hover .public-library-open-book,
.public-library-book-row.is-selected .public-library-open-book {
  transform: scale(1.025);
}

.public-library-book-row:active {
  transform: scale(0.99);
}

.public-library-open-book {
  display: flex;
  align-items: stretch;
  width: min(500px, 72vw);
  aspect-ratio: 1.52 / 1;
  perspective: 700px;
  filter: drop-shadow(0 9px 12px rgb(0 0 0 / 0.13));
  transform-origin: 50% 50%;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.public-library-open-book > span {
  position: relative;
  width: 50%;
  overflow: hidden;
  background: rgb(238 238 238);
}

.public-library-open-book > span:first-child {
  transform: rotateY(3deg);
  transform-origin: right center;
}

.public-library-open-book > span:last-child {
  transform: rotateY(-3deg);
  transform-origin: left center;
}

.public-library-open-book img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.public-library-book-copy h2 {
  font-size: clamp(18px, 2.8vw, 32px);
  line-height: 1.05;
  font-weight: 400;
}

.public-library-book-copy {
  width: min(680px, 88vw);
}

.public-library-book-copy p {
  margin: 0.65rem auto 0;
  max-width: 58ch;
  font-size: clamp(12px, 1.5vw, 16px);
  line-height: 1.45;
  color: rgb(0 0 0 / 0.58);
}

.book-comment-layer {
  pointer-events: none;
  opacity: 1;
  transition: opacity 320ms ease, filter 320ms ease;
}

.book-comment-layer.is-hidden {
  opacity: 0;
  filter: blur(5px);
}

.book-comment-balloon {
  pointer-events: none;
  min-width: 82px;
  max-width: min(220px, 78%);
  padding: 10px 13px 11px;
  border-radius: 15px;
  background: rgb(188 188 188 / 0.94);
  color: black;
  font-size: clamp(10px, 1.25vw, 13px);
  line-height: 1.3;
  overflow-wrap: anywhere;
  filter: drop-shadow(0 6px 12px rgb(0 0 0 / 0.12));
}

.book-comment-balloon::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 14px;
  height: 14px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transform: translateX(-50%) rotate(-45deg);
}

.book-comment-delete {
  pointer-events: auto;
  position: absolute;
  top: 2px;
  right: 4px;
  z-index: 2;
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  font-size: 15px;
  line-height: 1;
}

.book-comment-balloon:has(.book-comment-delete) > p {
  padding-right: 10px;
}

.book-comment-editor {
  pointer-events: auto;
  z-index: 5;
  width: min(238px, 88%);
  max-width: 88%;
  padding: 16px 12px 10px;
}

.book-comment-editor textarea {
  display: block;
  width: 100%;
  min-height: 72px;
  resize: vertical;
  border: 0;
  border-bottom: 1px solid rgb(0 0 0 / 0.28);
  border-radius: 0;
  outline: none;
  background: transparent;
  font: inherit;
}

.book-comment-editor-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}

.book-comment-emojis {
  display: flex;
  gap: 5px;
}

.book-comment-emojis button,
.book-comment-editor-actions > button {
  border: 0;
  padding: 2px;
  background: transparent;
  font-size: 11px;
}

.book-comment-editor-actions > button {
  padding: 3px 5px;
  font-weight: 400;
}

.book-comment-editor-actions button:disabled {
  opacity: 0.35;
}

.book-comment-editor-error {
  margin-top: 6px;
  color: rgb(132 0 0);
  font-size: 10px;
}

@media (max-width: 560px) {
  .public-library-drawer {
    height: min(78dvh, 680px);
  }

  .public-library-book-row {
    gap: 13px;
    min-height: 250px;
    padding: 24px 12px 28px;
  }

  .public-library-open-book {
    width: min(360px, 82vw);
  }

  .public-library-book-copy h2 {
    font-size: 17px;
  }

  .public-library-book-copy p {
    display: -webkit-box;
    margin-top: 5px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 11px;
  }

  .book-comment-balloon {
    max-width: 88%;
    padding: 8px 10px 9px;
    border-radius: 12px;
    font-size: 9px;
  }
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

.public-nav-item.is-continuing {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
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

.public-login-scramble {
  display: inline-flex;
  width: 5ch;
  justify-content: center;
  white-space: pre;
  letter-spacing: 0;
}

@media (prefers-reduced-motion: reduce) {
  .public-book-background-layer.is-current,
  .public-book-background-layer.is-previous {
    animation-duration: 1ms;
  }
}


`;

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

  return `rgb(${channel(book?.background_r)} ${channel(
    book?.background_g
  )} ${channel(book?.background_b)})`;
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
    image.decoding = "async";
    image.src = url;
  });
}

async function preloadBookOpening(
  pages: BookPage[],
  startingPage = 0
): Promise<void> {
  const safeStartingPage = Math.min(
    Math.max(0, Math.floor(startingPage)),
    Math.max(0, pages.length - 1)
  );
  const nearbyPageIndices = [
    safeStartingPage - 1,
    safeStartingPage,
    safeStartingPage + 1,
    safeStartingPage + 2,
  ].filter((index) => index >= 0 && index < pages.length);
  const visiblePages = [...new Set(nearbyPageIndices)].map(
    (index) => pages[index]
  );

  await Promise.all(
    visiblePages.map((page) => preloadImage(page.public_url))
  );
}

export default function PublicBookLibrary({
  initialSlug,
  onBack,
  onLogin,
  onThreeD,
  onBookChange,
}: PublicBookLibraryProps) {
  void onLogin;
  const { isAdmin } = useAdminSession();
  const [navigationContinuesFromModels] = useState(() => {
    const continues =
      window.sessionStorage.getItem("gstudios:nav-continuity") ===
      "models-to-library";

    if (continues) {
      window.sessionStorage.removeItem("gstudios:nav-continuity");
    }

    return continues;
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [pages, setPages] = useState<BookPage[]>([]);
  const [bookComments, setBookComments] = useState<BookComment[]>([]);
  const [commentMode, setCommentMode] = useState(false);
  const [bookPreviews, setBookPreviews] = useState<
    Record<string, BookPreview>
  >({});
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingPages, setLoadingPages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookBalloonOpen, setBookBalloonOpen] = useState(false);
  const [loginMounted, setLoginMounted] = useState(false);
  const [loginMotion, setLoginMotion] =
    useState<CenterMotion>("outside");
  const [barVisible, setBarVisible] = useState(
    navigationContinuesFromModels
  );
  const [activeNavId, setActiveNavId] = useState<"library" | "models">(
    "library"
  );
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
  const viewerAnimationTimerRef = useRef<number | null>(null);
  const backgroundLayerIdRef = useRef(0);
  const backgroundColorRef = useRef("rgb(255 255 255)");
  const backgroundCleanupTimerRef = useRef<number | null>(null);
  const viewerReadyBookIdRef = useRef<string | null>(null);
  const viewerReadyWaiterRef = useRef<{
    bookId: string;
    finish: () => void;
    timeout: number;
  } | null>(null);
  const previewRequestsRef = useRef(new Set<string>());

  const [backgroundLayers, setBackgroundLayers] = useState([
    { id: 0, color: backgroundColorRef.current },
  ]);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) ?? null,
    [books, selectedBookId]
  );

  useEffect(() => {
    if (!isAdmin) setCommentMode(false);
  }, [isAdmin]);

  useEffect(() => {
    if (!selectedBook || pages.length === 0) return;
    setBookPreviews((current) => ({
      ...current,
      [selectedBook.id]: {
        cover: pages[0]
          ? { src: pages[0].public_url, fallback: pages[0].public_url }
          : null,
        lastPage: pages[pages.length - 1]
          ? {
              src: pages[pages.length - 1].public_url,
              fallback: pages[pages.length - 1].public_url,
            }
          : null,
      },
    }));
  }, [pages, selectedBook]);

  useEffect(() => {
    if (books.length === 0) return;
    let active = true;

    const preloadImage = (preview: BookPreviewImage | null) => {
      if (!preview) return;
      const image = new Image();
      image.decoding = "async";
      image.onerror = () => {
        if (preview.fallback === preview.src) return;
        const fallbackImage = new Image();
        fallbackImage.decoding = "async";
        fallbackImage.src = preview.fallback;
      };
      image.src = preview.src;
    };

    books.forEach((book) => {
      if (bookPreviews[book.id] || previewRequestsRef.current.has(book.id)) {
        return;
      }

      previewRequestsRef.current.add(book.id);
      void listBookPages(book.id)
        .then((bookPages) => {
          if (!active) return;
          const coverPage = bookPages[0];
          const lastPage = bookPages[bookPages.length - 1];
          const preview: BookPreview = {
            cover: coverPage
              ? {
                  src: bookPagePreviewUrl(coverPage.storage_path),
                  fallback: coverPage.public_url,
                }
              : null,
            lastPage: lastPage
              ? {
                  src: bookPagePreviewUrl(lastPage.storage_path),
                  fallback: lastPage.public_url,
                }
              : null,
          };

          preloadImage(preview.cover);
          preloadImage(preview.lastPage);
          setBookPreviews((current) => ({
            ...current,
            [book.id]: preview,
          }));
        })
        .catch(() => undefined)
        .finally(() => {
          previewRequestsRef.current.delete(book.id);
        });
    });

    return () => {
      active = false;
    };
  }, [bookPreviews, books]);

  useEffect(() => {
    const nextColor = bookBackgroundColor(selectedBook);

    if (nextColor === backgroundColorRef.current) {
      return;
    }

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

  const waitForViewerReady = useCallback(
    (bookId: string): Promise<void> => {
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

        const timeout = window.setTimeout(
          finish,
          BOOK_VIEWER_READY_TIMEOUT
        );

        viewerReadyWaiterRef.current = {
          bookId,
          finish,
          timeout,
        };
      });
    },
    []
  );

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

  useEffect(() => {
    if (!selectedBook) return;
    void trackAnalyticsEvent({
      eventName: "book_open",
      targetType: "book",
      targetId: selectedBook.slug,
    });
  }, [selectedBook]);

  const cancelViewerAnimation = useCallback(() => {
    if (viewerAnimationTimerRef.current) {
      window.clearTimeout(viewerAnimationTimerRef.current);
      viewerAnimationTimerRef.current = null;
    }
  }, []);

  const revealViewer = useCallback(
    (fast = false) => {
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
    },
    [cancelViewerAnimation]
  );

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
    const connection = (
      navigator as Navigator & {
        connection?: {
          effectiveType?: string;
          saveData?: boolean;
        };
      }
    ).connection;

    if (
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) {
      return;
    }

    const warmExperience = () => {
      void preloadThreeDExperience();
    };

    const idleWindow = window as unknown as {
      requestIdleCallback?: Window["requestIdleCallback"];
      cancelIdleCallback?: Window["cancelIdleCallback"];
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(warmExperience, {
        timeout: 2500,
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(warmExperience, 1400);
    return () => window.clearTimeout(timer);
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
        const [nextPages, nextComments] = await Promise.all([
          listBookPages(book.id),
          listVisibleBookComments(book.id),
        ]);
        const savedSnapshot = savedBookSessionRef.current;

        const restoredPage =
          savedSnapshot?.slug === book.slug
            ? Math.min(
                savedSnapshot.pageIndex,
                Math.max(0, nextPages.length - 1)
              )
            : 0;

        await preloadBookOpening(nextPages, restoredPage);

        if (!mountedRef.current) {
          return;
        }

        viewerReadyBookIdRef.current = null;

        const viewerReady = waitForViewerReady(book.id);

        flushSync(() => {
          setViewerFastMotion(false);
          setViewerMotion("outside");
          setSelectedBookId(book.id);
          setPages(nextPages);
          setBookComments(nextComments);
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
        pendingBookSwitchRef.current = {
          book,
          updateRoute,
        };

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
        cancelViewerAnimation();
        setViewerFastMotion(true);
        setViewerMotion("leaving");

        const nextPagesPromise = listBookPages(book.id).then(
          async (loadedPages) => {
            await preloadBookOpening(loadedPages);
            return loadedPages;
          }
        );
        const nextCommentsPromise = listVisibleBookComments(book.id);

        const [nextPages, nextComments] = await Promise.all([
          nextPagesPromise,
          nextCommentsPromise,
          wait(BOOK_SWITCH_LEAVE_TOTAL_DURATION),
        ]);

        if (!mountedRef.current) {
          return;
        }

        viewerReadyBookIdRef.current = null;

        const viewerReady = waitForViewerReady(book.id);

        flushSync(() => {
          setViewerFastMotion(true);
          setViewerMotion("outside");
          setSelectedBookId(book.id);
          selectedBookIdRef.current = book.id;
          setPages(nextPages);
          setBookComments(nextComments);
          setViewerPage(0);
          setLoadingPages(false);
        });

        savedBookSessionRef.current = {
          slug: book.slug,
          pageIndex: 0,
        };

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
    [
      cancelViewerAnimation,
      onBookChange,
      waitForViewerReady,
    ]
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
      const firstBook =
        requestedBook ?? featuredBook ?? books[0];

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

    window.sessionStorage.setItem(
      BOOK_INDEX_RETURN_KEY,
      "true"
    );

    window.sessionStorage.removeItem("revealDone");

    // The globe always returns through the ocean intro. BACK can reopen this
    // exact book, while START continues to the main navigation.
    window.sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
    window.sessionStorage.removeItem("returnFromExample");

    await wait(BOOK_LEAVE_TOTAL_DURATION);

    if (mountedRef.current) {
      onBack();
    }
  };

  const handleNavigateFromAdmin = async () => {
    if (!loginMounted || transitionBusyRef.current) {
      return;
    }

    transitionBusyRef.current = true;
    setTransitionBusy(true);
    setBookBalloonOpen(false);
    setBarVisible(false);
    setLoginMotion("leaving");

    if (selectedBook) {
      writeBookSession(selectedBook.slug, viewerPage);
    }

    window.sessionStorage.setItem(BOOK_INDEX_RETURN_KEY, "true");
    window.sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
    window.sessionStorage.removeItem("revealDone");
    window.sessionStorage.removeItem("returnFromExample");

    await wait(BOOK_LEAVE_TOTAL_DURATION);

    if (mountedRef.current) {
      onBack();
    }
  };

  const handleThreeD = async () => {
    if (transitionBusyRef.current) {
      return;
    }

    setActiveNavId("models");
    transitionBusyRef.current = true;
    setTransitionBusy(true);
    setBookBalloonOpen(false);
    if (loginMounted) {
      setLoginMotion("leaving");
    } else {
      cancelViewerAnimation();
      setViewerMotion("leaving");
    }

    if (selectedBook) {
      writeBookSession(selectedBook.slug, viewerPage);
    }

    const studioReady = preloadThreeDExperience().catch(() => null);

    await Promise.all([
      wait(BOOK_LEAVE_TOTAL_DURATION),
      studioReady,
    ]);

    if (mountedRef.current) {
      onThreeD();
    }
  };

  const selectBook = (book: Book) => {
    void switchToBook(book, true);
  };

  const handleCreateComment = useCallback(
    async (input: {
      bookPageId: string;
      body: string;
      anchorX: number;
      anchorY: number;
    }) => {
      if (!selectedBook || !isAdmin) {
        throw new Error("Administrator login required.");
      }

      const comment = await createBookComment({
        bookId: selectedBook.id,
        bookPageId: input.bookPageId,
        body: input.body,
        anchorX: input.anchorX,
        anchorY: input.anchorY,
      });
      setBookComments((current) => [...current, comment]);
    },
    [isAdmin, selectedBook]
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!isAdmin) throw new Error("Administrator login required.");
      await deleteBookComment(commentId);
      setBookComments((current) =>
        current.filter((comment) => comment.id !== commentId)
      );
    },
    [isAdmin]
  );

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      setViewerPage(pageIndex);

      if (selectedBook) {
        savedBookSessionRef.current = {
          slug: selectedBook.slug,
          pageIndex,
        };

        writeBookSession(selectedBook.slug, pageIndex);
        void trackAnalyticsEvent({
          eventName: "book_page_view",
          targetType: "book_page",
          targetId: `${selectedBook.slug}:${pageIndex}`,
          valueInt: pageIndex,
        });
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
    ? navigationContinuesFromModels
      ? "is-continuing"
      : "is-visible"
    : transitionBusy || navigationLeaving
      ? "is-leaving"
      : "is-outside";

  return (
    <div
      className="public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black"
      style={{
        backgroundColor:
          backgroundLayers[0]?.color ?? "rgb(255 255 255)",
      }}
    >
      <style>{libraryStyles}</style>

      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
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
          className="fixed inset-0 z-[141] cursor-default bg-black/0"
          onClick={() => setBookBalloonOpen(false)}
        />
      )}

      <div
        className={`public-book-nav fixed ${
          loginMounted ? "z-[190]" : "z-[170]"
        }`}
      >
        <div
          className={`public-nav-item ${navMotionClass}`}
          style={
            {
              "--public-nav-delay": "0ms",
              "--public-nav-exit-delay": "180ms",
            } as React.CSSProperties
          }
        >
          <button
            type="button"
            onClick={() =>
              void (loginMounted ? handleNavigateFromAdmin() : handleBack())
            }
            disabled={transitionBusy}
            data-analytics-event="navigation_click"
            data-analytics-type="navigation"
            data-analytics-id="navigate"
            className="public-book-control-column disabled:pointer-events-none disabled:opacity-40"
            aria-label="Navigate"
            title="Navigate"
          >
            <span>NAVIGATE</span>
          </button>
        </div>

        <div
          className={`public-nav-item ${navMotionClass}`}
          style={
            {
              "--public-nav-delay": "70ms",
              "--public-nav-exit-delay": "120ms",
            } as React.CSSProperties
          }
        >
          <button
            type="button"
            onClick={() => {
              setActiveNavId("library");
              if (loginMounted) {
                void closeLogin();
                return;
              }
              setBookBalloonOpen((open) => !open);
            }}
            disabled={transitionBusy}
            data-analytics-event="navigation_click"
            data-analytics-type="navigation"
            data-analytics-id="library"
            className={`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${
              !loginMounted &&
              bookBalloonOpen &&
              activeNavId === "library"
                ? "is-active"
                : ""
            }`}
            aria-label="Choose a book"
            aria-expanded={bookBalloonOpen}
            aria-controls="public-book-library"
            title="Choose a book"
          >
            <span>LIBRARY</span>
            <i
              aria-hidden="true"
              className={`public-book-library-plus ${
                barVisible &&
                !loginMounted &&
                activeNavId === "library"
                  ? "is-visible"
                  : "is-hidden"
              }`}
            >
              +
            </i>
          </button>
        </div>

        <div
          className={`public-nav-item ${navMotionClass}`}
          style={
            {
              "--public-nav-delay": "140ms",
              "--public-nav-exit-delay": "60ms",
            } as React.CSSProperties
          }
        >
          <button
            type="button"
            onClick={() => void toggleLogin()}
            disabled={transitionBusy}
            data-analytics-event="navigation_click"
            data-analytics-type="navigation"
            data-analytics-id="login"
            className={`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${
              loginMounted ? "is-active" : ""
            }`}
            aria-expanded={loginMounted}
            aria-label="Login"
          >
            <span>
              <ScrambleText text="LOGIN" />
            </span>
          </button>
        </div>

        <div
          className={`public-nav-item ${navMotionClass}`}
          style={
            {
              "--public-nav-delay": "210ms",
              "--public-nav-exit-delay": "0ms",
            } as React.CSSProperties
          }
        >
          <button
            type="button"
            onClick={() => void handleThreeD()}
            onPointerEnter={() => void preloadThreeDExperience()}
            onFocus={() => void preloadThreeDExperience()}
            disabled={transitionBusy}
            data-analytics-event="model_open"
            data-analytics-type="model"
            data-analytics-id="models"
            className={`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${
              !loginMounted && activeNavId === "models" ? "is-active" : ""
            }`}
          >
            <span>MODELS</span>
          </button>
        </div>

        {isAdmin && !loginMounted && (
          <div
            className={`public-nav-item ${navMotionClass}`}
            style={
              {
                "--public-nav-delay": "280ms",
                "--public-nav-exit-delay": "0ms",
              } as React.CSSProperties
            }
          >
            <button
              type="button"
              onClick={() => setCommentMode((active) => !active)}
              disabled={transitionBusy || loginMounted}
              data-analytics-event="navigation_click"
              data-analytics-type="interface"
              data-analytics-id="comment-mode"
              className={`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${
                commentMode ? "is-active" : ""
              }`}
              aria-pressed={commentMode}
              aria-label="Comment on book pages"
            >
              <span>COMMENT</span>
            </button>
          </div>
        )}
      </div>

      <aside
        id="public-book-library"
        className={`public-library-drawer fixed z-[150] flex flex-col ${
          bookBalloonOpen && !loginMounted
            ? "is-open pointer-events-auto"
            : "pointer-events-none"
        }`}
        aria-hidden={!bookBalloonOpen || loginMounted}
      >
        <button
          type="button"
          onClick={() => setBookBalloonOpen(false)}
          data-analytics-event="navigation_click"
          data-analytics-type="interface"
          data-analytics-id="library-close"
          className="absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-8"
          aria-label="Close book list"
        >
          ×
        </button>

        <div className="public-book-scroll min-h-0 flex-1 overflow-y-auto">
          {loadingBooks ? (
            <p className="py-6 text-center text-[14px] text-black/50">
              ...
            </p>
          ) : books.length === 0 ? (
            <p className="py-6 text-center text-[14px] leading-relaxed text-black/55">
              No published books are available yet.
            </p>
          ) : (
            books.map((book) => {
              const selected = book.id === selectedBookId;
              const preview = bookPreviews[book.id];

              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => selectBook(book)}
                  data-analytics-event="navigation_click"
                  data-analytics-type="book"
                  data-analytics-id={book.slug}
                  className={`public-library-book-row ${
                    selected ? "is-selected" : ""
                  }`}
                >
                  <span
                    className="public-library-open-book"
                    aria-hidden="true"
                  >
                    <span>
                      {preview?.lastPage && (
                        <img
                          src={preview.lastPage.src}
                          alt=""
                          draggable={false}
                          loading="eager"
                          decoding="async"
                          onError={(event) => {
                            if (event.currentTarget.dataset.fallbackApplied) {
                              return;
                            }
                            event.currentTarget.dataset.fallbackApplied = "true";
                            event.currentTarget.src =
                              preview.lastPage?.fallback ?? "";
                          }}
                        />
                      )}
                    </span>
                    <span>
                      {preview?.cover && (
                        <img
                          src={preview.cover.src}
                          alt=""
                          draggable={false}
                          loading="eager"
                          decoding="async"
                          onError={(event) => {
                            if (event.currentTarget.dataset.fallbackApplied) {
                              return;
                            }
                            event.currentTarget.dataset.fallbackApplied = "true";
                            event.currentTarget.src =
                              preview.cover?.fallback ?? "";
                          }}
                        />
                      )}
                    </span>
                  </span>
                  <span className="public-library-book-copy min-w-0">
                    <h2>{book.title}</h2>
                    {book.description && (
                      <p>{book.description}</p>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </aside>

      <main className="public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden">
        {loadingBooks ||
        (loadingPages && !selectedBook) ? (
          <div
            className={`public-route-message ${
              barVisible
                ? "is-visible"
                : "is-outside"
            }`}
          >
            ...
          </div>
        ) : error ? (
          <div
            className={`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${
              barVisible
                ? "is-visible"
                : "is-outside"
            }`}
          >
            {error}
          </div>
        ) : books.length === 0 ? (
          <div
            className={`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${
              barVisible
                ? "is-visible"
                : "is-outside"
            }`}
          >
            No books are public yet.
          </div>
        ) : selectedBook ? (
          <div className="h-full w-full">
            <div
              className={`public-book-surface flex h-full w-full items-center justify-center ${
                loginMounted
                  ? "is-login-muted"
                  : ""
              }`}
            >
              <FoldingBookViewer
                key={selectedBook.id}
                book={selectedBook}
                pages={pages}
                comments={bookComments}
                commentMode={commentMode}
                canManageComments={isAdmin}
                initialPage={viewerPage}
                bookMotionClassName={
                  viewerStageClass
                }
                onPageChange={handlePageChange}
                onReady={handleViewerReady}
                onCreateComment={handleCreateComment}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        ) : null}
      </main>

      {loginMounted && (
        <div
          className={`public-login-stage fixed inset-0 z-[180] overflow-hidden bg-white ${loginMotionClass}`}
          aria-hidden={
            loginMotion === "outside" ||
            loginMotion === "leaving"
          }
        >
          <Suspense fallback={null}>
            <AdminPortal
              embedded
              surfaceReady={
                loginMotion === "entering" ||
                loginMotion === "visible"
              }
              onBack={() => void closeLogin()}
              onNavigate={() => void handleNavigateFromAdmin()}
              onLibrary={() => void closeLogin()}
              onModels={() => void handleThreeD()}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
