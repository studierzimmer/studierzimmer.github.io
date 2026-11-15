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
import type { BookComment, BookRichDocument } from "@/types/bookComments";
import {
  builtInNotebook,
  isBuiltInBook,
  listBookPages,
  listPublishedBooks,
} from "@/services/bookRepository";
import {
  createBookComment,
  deleteBookComment,
  listVisibleBookComments,
  updateBookComment,
} from "@/services/bookCommentRepository";
import { trackAnalyticsEvent } from "@/services/analyticsTracker";
import BookDeckViewer from "@/components/books/BookDeckViewer";
import BookDeckViewport, { type BookDeckChoice, type BookDeckHandle } from "@/components/books/BookDeckViewport";
import { adjacentDeckBook, bookDeckEntry, readBookPageMemory, rememberBookPage, type BookDeckDirection } from "@/components/books/bookDeckState";
import { prepareBookDeckPages } from "@/components/books/prepareBookDeck";
import { useAdminSession } from "@/hooks/useAdminSession";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useInlineSiteEditing } from "@/components/SiteEditControl";
import ScrambleText from "@/components/navigation/ScrambleText";
import SectionNavigation from "@/components/navigation/SectionNavigation";
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
  navigationMode?: "legacy" | "sketches";
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

interface IncomingDeckBook {
  book: Book;
  pages: BookPage[];
  comments: BookComment[];
  page: number;
  autoOpen: boolean;
  direction: BookDeckDirection;
}

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

.sketches-controls {
  position: fixed;
  inset: max(18px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) auto max(20px, env(safe-area-inset-left));
  z-index: 170;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.sketches-controls button {
  min-width: 40px;
  min-height: 40px;
  border: 0;
  background: transparent;
  font: inherit;
  pointer-events: auto;
}

.sketches-controls .sketches-menu-toggle { font-size: 28px; }
.sketches-controls .sketches-home { font-size: 21px; }
.sketches-controls .sketches-admin { font-size: 18px; }
.sketches-control-actions { display: flex; align-items: center; gap: 8px; }
.sketches-heading { position: absolute; left: 50%; max-width: calc(100vw - 220px); transform: translateX(-50%); text-align: center; font-size: 12px; }
.sketches-heading img { display: block; max-height: 32px; max-width: 100%; object-fit: contain; }

.public-book-shell.is-sketches .public-library-drawer {
  top: 0;
  left: auto;
  right: 0;
  bottom: 0;
  width: min(430px, 92vw);
  height: 100dvh;
  padding-top: max(62px, env(safe-area-inset-top));
  background: rgb(255 255 255 / 0.98);
  box-shadow: -12px 0 48px rgb(0 0 0 / 0.06);
  transform: translate3d(105%, 0, 0);
}

.public-book-shell.is-sketches .public-library-drawer.is-open {
  transform: translate3d(0, 0, 0);
}

.public-book-shell.is-sketches .public-library-book-row {
  min-height: 230px;
  padding: 22px 28px;
  gap: 18px;
}

.public-book-shell.is-sketches .public-library-open-book {
  width: min(300px, 72vw);
}

.public-book-service-notice {
  position: fixed;
  z-index: 145;
  left: 50%;
  bottom: max(14px, env(safe-area-inset-bottom));
  width: min(570px, calc(100vw - 32px));
  transform: translateX(-50%);
  padding: 10px 14px;
  background: rgb(255 255 255 / 0.94);
  text-align: center;
  font-size: 11px;
  line-height: 1.5;
}

.public-book-service-notice button {
  border: 0;
  padding: 4px 6px;
  background: transparent;
  font: inherit;
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
  opacity: 1;
  visibility: hidden;
  background: rgb(207 207 207);
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    visibility 0s 720ms;
  will-change: transform;
}

.public-library-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
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
  visibility: hidden;
  transition: visibility 0s 430ms;
}

.public-book-viewport.are-comments-visible .book-comment-layer {
  visibility: visible;
  transition-delay: 0s;
}

.book-comment-position {
  position: absolute;
  width: max-content;
  max-width: min(240px, calc(100vw - 64px));
  pointer-events: none;
}

.book-comment-balloon {
  position: relative;
  pointer-events: auto;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border-radius: 0;
  background: #dde2e5bf;
  color: #414a51;
  font-size: clamp(12px, 1.05vw, 14px);
  line-height: 1.55;
  letter-spacing: 0.015em;
  overflow-wrap: anywhere;
  transform: scale(0);
  transform-origin: 50% 100%;
  transition: transform 430ms cubic-bezier(.55,-.25,.7,.2);
}

.public-book-viewport.are-comments-visible .book-comment-balloon {
  transform: scale(1);
  transition: transform 680ms cubic-bezier(.2,1.45,.35,1);
}

.book-comment-position.is-below .book-comment-balloon { transform-origin: 50% 0; }
.book-comment-read {
  max-height: var(--book-comment-max-height, min(240px, 35dvh));
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.book-comment-read p { margin:0; }
.book-comment-read h3 { font:inherit; font-size:1.15em; font-weight:400; margin:0 0 .6em; }

.book-comment-balloon::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 10px;
  height: 10px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transform: translateX(-50%) rotate(-45deg);
}

.book-comment-position.is-below .book-comment-balloon::after { top: -7px; bottom: auto; transform: translateX(-50%) rotate(135deg); }

.book-comment-manage {
  pointer-events: auto;
  position: absolute;
  right: 0;
  bottom: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  margin-bottom: 3px;
  padding: 0 6px;
  white-space: nowrap;
  background: #ffffffdb;
}

.book-comment-manage button {
  border: 0;
  background: transparent;
  color: inherit;
  padding: 6px 0;
  font: inherit;
  font-size: 10px;
  line-height: 1;
}

.book-comment-manage .book-comment-delete {
  min-width: 24px;
  font-size: 16px;
}
.book-comment-position.is-below .book-comment-manage { bottom:auto; top:100%; margin-bottom:0; margin-top:3px; }
.book-comment-manage .book-comment-move { min-width:28px; font-size:16px; cursor:grab; touch-action:none; }
.book-comment-position.is-dragging .book-comment-move { cursor:grabbing; }
.book-comment-draft-anchor { position:fixed; z-index:320; width:10px; height:10px; border:1px solid #515e68; background:#e0e5e8; border-radius:50%; transform:translate(-50%,-50%); box-shadow:0 0 0 3px #ffffffbb; pointer-events:none; }
.book-comment-action-error { position:fixed; z-index:320; bottom:20px; left:50%; transform:translateX(-50%); max-width:calc(100vw - 32px); padding:10px 14px; background:#fff; color:#a02727; font-size:12px; }

.public-book-viewport.is-comment-mode { outline: 1px dashed #a7afb6; outline-offset: -8px; cursor: crosshair; }
.book-comment-mode-indicator { position:fixed; z-index:170; top:max(84px,calc(env(safe-area-inset-top) + 70px)); left:50%; transform:translateX(-50%); width:max-content; max-width:calc(100vw - 36px); display:flex; align-items:center; gap:20px; padding:10px 14px; background:#eef1f3; color:#414a51; font-size:11px; line-height:1.45; }
.book-comment-mode-indicator button { border:0; background:transparent; color:inherit; padding:6px 0; font:inherit; }

.book-comment-draft-panel {
  position: fixed;
  left: 50%;
  z-index: 310;
  width: min(360px, calc(100vw - 32px));
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  padding: 20px;
  border-radius: 0;
  transform: translateX(-50%);
  touch-action: pan-y;
  box-shadow: 0 12px 48px rgb(45 55 65 / 0.15);
  animation: book-comment-compose 650ms cubic-bezier(.2,1.3,.35,1) both;
}

@keyframes book-comment-compose { from { transform: translateX(-50%) scale(0); } to { transform: translateX(-50%) scale(1); } }
.book-comment-draft-header { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 14px; font-size: 10px; letter-spacing: .08em; }
.book-comment-draft-header button { padding: 8px; font-size: 12px; letter-spacing: .01em; }
.book-comment-title-input { display:block; width:100%; border:0; border-bottom:1px solid #727e8550; border-radius:0; background:transparent; padding:8px 0; margin-bottom:10px; color:inherit; font:inherit; font-size:16px; }
.book-comment-draft-panel textarea {
  display: block;
  width: 100%;
  min-height: 95px;
  max-height: 25dvh;
  resize: vertical;
  border: 0;
  border-bottom: 1px solid rgb(0 0 0 / 0.28);
  border-radius: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 16px;
  line-height: 1.5;
  user-select: text !important;
  -webkit-user-select: text !important;
  touch-action: manipulation;
}
.book-comment-color-controls { display: flex; justify-content: space-between; gap: 16px; margin-top: 14px; font-size: 11px; }
.book-comment-color-controls label { display: flex; align-items: center; gap: 9px; }
.book-comment-color-controls input { width: 36px; height: 36px; padding: 3px; border: 1px solid currentColor; background: transparent; border-radius: 0; }
.book-comment-opacity-control { display:flex; align-items:center; gap:12px; margin-top:16px; font-size:11px; }
.book-comment-opacity-control input { min-width:60px; flex:1; accent-color:#67737c; }
.book-comment-opacity-control output { min-width:32px; text-align:right; }

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
  padding: 9px;
  background: transparent;
  font-size: 11px;
}

.book-comment-editor-actions > button {
  padding: 9px 12px;
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
    padding: 12px 15px;
    border-radius: 0;
    font-size: 12px;
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

@keyframes public-book-blossom {
  0% { transform: scale(0); }
  48% { transform: scale(1.075); }
  66% { transform: scale(0.97); }
  80% { transform: scale(1.018); }
  91% { transform: scale(0.994); }
  100% { transform: scale(1); }
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
  animation-name: public-book-blossom;
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
  animation-name: public-book-blossom;
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
  transform-origin: center;
  will-change: scale;
}

.public-route-message.is-outside {
  scale: 0;
  pointer-events: none;
}

.public-route-message.is-visible {
  animation: public-route-message-enter 760ms cubic-bezier(.22,.88,.3,1) both;
}

.public-route-message.is-leaving {
  animation: public-route-message-leave 760ms cubic-bezier(.22,.88,.3,1) both;
  pointer-events: none;
}

@keyframes public-route-message-enter {
  0% { scale: 0; }
  48% { scale: 1.075; }
  66% { scale: .97; }
  80% { scale: 1.018; }
  91% { scale: .994; }
  100% { scale: 1; }
}

@keyframes public-route-message-leave {
  0% { scale: 1; }
  9% { scale: .994; }
  20% { scale: 1.018; }
  34% { scale: .97; }
  52% { scale: 1.075; }
  100% { scale: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .public-route-message.is-visible,
  .public-route-message.is-leaving { animation-duration: 1ms; }
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

  let nextPage = 0;
  await Promise.all(Array.from({ length: Math.min(2, visiblePages.length) }, async () => {
    while (nextPage < visiblePages.length) {
      const page = visiblePages[nextPage++];
      await preloadImage(page.public_url);
    }
  }));
}

export default function PublicBookLibrary({
  navigationMode = "sketches",
  initialSlug,
  onBack,
  onLogin,
  onThreeD,
  onBookChange,
}: PublicBookLibraryProps) {
  const { isAdmin } = useAdminSession();
  const { settings } = useSiteContent();
  const inline = useInlineSiteEditing();
  const sketchesMenu = settings.menu_items.find((item) => item.id === "sketches");
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
  const bookPreviewsRef = useRef(bookPreviews);
  bookPreviewsRef.current = bookPreviews;
  const [visiblePreviewBooks, setVisiblePreviewBooks] = useState(new Set<string>());
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingPages, setLoadingPages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceNotice, setServiceNotice] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

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
  const [incomingDeckBook, setIncomingDeckBook] = useState<IncomingDeckBook | null>(null);
  const [autoOpenBookId, setAutoOpenBookId] = useState<string | null>(null);

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
  const [initialBookPageMemory] = useState(() => readBookPageMemory(savedBookSessionRef.current));
  const bookPageMemoryRef = useRef(initialBookPageMemory);
  const bookPagesCacheRef = useRef(new Map<string, BookPage[]>());
  const deckRef = useRef<BookDeckHandle>(null);
  const deckLoadAbortRef = useRef<AbortController | null>(null);
  const deckLoadBookRef = useRef<string | null>(null);
  const observedRouteSlugRef = useRef(initialSlug);
  const autoOpenAfterEntryRef = useRef<string | null>(null);
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
  const reportedPageRef = useRef<{ bookId: string; pageIndex: number } | null>(null);

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

  const requestPreview = useCallback((bookId: string) => {
      setVisiblePreviewBooks((current) => current.has(bookId) ? current : new Set([...current, bookId]));
      if (bookPreviewsRef.current[bookId] || previewRequestsRef.current.has(bookId)) return;
      previewRequestsRef.current.add(bookId);
      void listBookPages(bookId)
        .then((bookPages) => {
          if (!mountedRef.current) return;
          bookPagesCacheRef.current.set(bookId, bookPages);
          const coverPage = bookPages[0];
          const lastPage = bookPages[bookPages.length - 1];
          const preview: BookPreview = {
            cover: coverPage
              ? {
                  src: coverPage.public_url,
                  fallback: coverPage.public_url,
                }
              : null,
            lastPage: lastPage
              ? {
                  src: lastPage.public_url,
                  fallback: lastPage.public_url,
                }
              : null,
          };

          bookPreviewsRef.current = { ...bookPreviewsRef.current, [bookId]: preview };
          setBookPreviews((current) => ({
            ...current,
            [bookId]: preview,
          }));
        })
        .catch(() => undefined)
        .finally(() => {
          previewRequestsRef.current.delete(bookId);
        });
  }, []);

  useEffect(() => {
    if (!bookBalloonOpen || loginMounted) { setVisiblePreviewBooks(new Set()); return; }
    const root = previewScrollRef.current;
    if (!root) return;
    if (typeof IntersectionObserver !== "function") {
      books.slice(0, 3).forEach((book) => requestPreview(book.id));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) requestPreview((entry.target as HTMLElement).dataset.previewBookId!); });
    }, { root, rootMargin: "180px 0px" });
    root.querySelectorAll("[data-preview-book-id]").forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [bookBalloonOpen, loginMounted, books, requestPreview]);

  useEffect(() => {
    if (navigationMode !== "sketches" || !selectedBook || viewerMotion !== "visible") return;
    [-1, 1].forEach((direction) => { const neighbor = adjacentDeckBook(books, selectedBook.id, direction as BookDeckDirection); if (neighbor) requestPreview(neighbor.id); });
  }, [books, navigationMode, requestPreview, selectedBook, viewerMotion]);

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
            setAutoOpenBookId(autoOpenAfterEntryRef.current);
            autoOpenAfterEntryRef.current = null;
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
      deckLoadAbortRef.current?.abort();
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
        setServiceNotice(null);
        if (!nextBooks.some((book) => book.id === selectedBookIdRef.current)) {
          setSelectedBookId(null);
          selectedBookIdRef.current = null;
          setPages([]);
        }
      } catch (loadError) {
        if (active) {
          const localBook = builtInNotebook();
          setBooks([localBook]);
          if (selectedBookIdRef.current !== localBook.id) {
            setSelectedBookId(null);
            selectedBookIdRef.current = null;
            setPages([]);
          }
          setServiceNotice(
            `${messageFrom(loadError)} Stai sfogliando il quaderno incluso nel sito, in sola lettura.`
          );
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
  }, [reloadKey]);

  const loadComments = useCallback(async (bookId: string) => {
    try {
      return await listVisibleBookComments(bookId);
    } catch {
      setServiceNotice("Il libro è disponibile, ma i commenti non sono raggiungibili. Puoi riprovare la connessione.");
      return [];
    }
  }, []);

  useEffect(() => {
    if (!selectedBookId || isBuiltInBook(selectedBookId)) return;
    let active = true;
    let request = 0;
    const refresh = (event: Event) => {
      const changedBookId = (event as CustomEvent<{ bookId?: string }>).detail?.bookId;
      if (changedBookId && changedBookId !== selectedBookId) return;
      const currentRequest = ++request;
      void listVisibleBookComments(selectedBookId).then((items) => {
        if (active && currentRequest === request && selectedBookIdRef.current === selectedBookId) setBookComments(items);
      }).catch(() => {
        if (active) setServiceNotice("Le modifiche ai commenti sono salvate, ma non è stato possibile aggiornare l’anteprima. Riprova la connessione.");
      });
    };
    window.addEventListener("book-comments-changed", refresh);
    return () => { active = false; window.removeEventListener("book-comments-changed", refresh); };
  }, [selectedBookId]);

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
          loadComments(book.id),
        ]);
        const entry = bookDeckEntry(bookPageMemoryRef.current, book.slug, nextPages.length);
        const restoredPage = entry.page;

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
          selectedBookIdRef.current = book.id;
          setPages(nextPages);
          setBookComments(nextComments);
          setViewerPage(restoredPage);
        });

        writeBookSession(book.slug, restoredPage);
        bookPagesCacheRef.current.set(book.id, nextPages);
        autoOpenAfterEntryRef.current = navigationMode === "sketches" && entry.autoOpen ? book.id : null;
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
    [loadComments, navigationMode, revealViewer, waitForViewerReady]
  );

  const switchToBook = useCallback(
    async (book: Book, updateRoute: boolean, requestedDirection?: BookDeckDirection) => {
      if (!mountedRef.current) {
        return;
      }

      if (transitionBusyRef.current) {
        if (deckLoadBookRef.current === book.id) { setBookBalloonOpen(false); return; }
        pendingBookSwitchRef.current = {
          book,
          updateRoute,
        };
        deckLoadAbortRef.current?.abort();

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
      setServiceNotice(null);
      setAutoOpenBookId(null);

      if (navigationMode === "sketches" && selectedBookIdRef.current) {
        const controller = new AbortController();
        deckLoadAbortRef.current = controller;
        deckLoadBookRef.current = book.id;
        try {
          const [nextPages, nextComments] = await Promise.all([listBookPages(book.id), loadComments(book.id)]);
          const entry = bookDeckEntry(bookPageMemoryRef.current, book.slug, nextPages.length);
          await prepareBookDeckPages(nextPages, entry.page, controller.signal);
          if (!mountedRef.current || controller.signal.aborted) return;
          const sourceIndex = books.findIndex((item) => item.id === selectedBookIdRef.current);
          const targetIndex = books.findIndex((item) => item.id === book.id);
          const direction: BookDeckDirection = requestedDirection ?? (targetIndex < sourceIndex ? -1 : 1);
          viewerReadyBookIdRef.current = null;
          const ready = waitForViewerReady(book.id);
          const stopWaiting = () => { if (viewerReadyWaiterRef.current?.bookId === book.id) viewerReadyWaiterRef.current.finish(); };
          controller.signal.addEventListener("abort", stopWaiting, { once: true });
          flushSync(() => setIncomingDeckBook({ book, pages: nextPages, comments: nextComments, page: entry.page, autoOpen: entry.autoOpen, direction }));
          try { await ready; } finally { controller.signal.removeEventListener("abort", stopWaiting); }
          if (!mountedRef.current || controller.signal.aborted) return;
          if (viewerReadyBookIdRef.current !== book.id) throw new Error("Il libro sta ancora preparando le immagini. Riprova: il libro corrente resta aperto.");
          const committed = await deckRef.current?.commit(direction);
          if (!committed || !mountedRef.current || controller.signal.aborted) return;
          flushSync(() => {
            selectedBookIdRef.current = book.id;
            setSelectedBookId(book.id); setPages(nextPages); setBookComments(nextComments);
            setViewerPage(entry.page); setViewerMotion("visible"); setViewerFastMotion(false);
            setIncomingDeckBook(null); setLoadingPages(false);
          });
          bookPagesCacheRef.current.set(book.id, nextPages);
          bookPageMemoryRef.current = rememberBookPage(bookPageMemoryRef.current, book.slug, entry.page);
          savedBookSessionRef.current = { slug: book.slug, pageIndex: entry.page };
          writeBookSession(book.slug, entry.page);
          if (updateRoute) onBookChange?.(book.slug);
          setAutoOpenBookId(entry.autoOpen ? book.id : null);
        } catch (loadError) {
          if (mountedRef.current && !controller.signal.aborted) setServiceNotice(messageFrom(loadError));
        } finally {
          if (mountedRef.current && selectedBookIdRef.current !== book.id) { await deckRef.current?.reset(); setIncomingDeckBook(null); }
          controller.abort();
          if (deckLoadAbortRef.current === controller) { deckLoadAbortRef.current = null; deckLoadBookRef.current = null; }
          transitionBusyRef.current = false;
          if (mountedRef.current) {
            setTransitionBusy(false); setLoadingPages(false);
            const pending = pendingBookSwitchRef.current; pendingBookSwitchRef.current = null;
            if (pending && pending.book.id !== selectedBookIdRef.current) window.setTimeout(() => switchToBookRef.current?.(pending.book, pending.updateRoute), 24);
          }
        }
        return;
      }

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
        const nextCommentsPromise = loadComments(book.id);

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
      books,
      loadComments,
      navigationMode,
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
    const routeChanged = observedRouteSlugRef.current !== initialSlug;
    observedRouteSlugRef.current = initialSlug;

    const requestedBook = initialSlug
      ? books.find((book) => book.slug === initialSlug)
      : null;

    if (!selectedBookId) {
      const featuredBook = books.find((book) => book.is_featured);
      const savedBook = books.find((book) => book.slug === savedBookSessionRef.current?.slug);
      const firstBook = requestedBook ?? savedBook ?? featuredBook ?? books[0];

      void loadFirstVisibleBook(firstBook);
      return;
    }

    if (
      requestedBook &&
      requestedBook.id !== selectedBookId &&
      // A promoted deck is authoritative until its route prop catches up.
      // Re-running for selectedBookId/callback changes must never reinterpret
      // the unchanged outgoing slug as a new navigation request. Real URL
      // changes still enter switchToBook, whose queue handles a busy deck.
      routeChanged
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

    if (transitionBusyRef.current && navigationMode === "sketches" && deckLoadAbortRef.current) {
      deckLoadAbortRef.current.abort();
      onBack();
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

    if (navigationMode === "legacy") {
      window.sessionStorage.setItem(BOOK_INDEX_RETURN_KEY, "true");

      window.sessionStorage.removeItem("revealDone");

      // Preserve the original ocean-intro return route for legacy navigation.
      window.sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
      window.sessionStorage.removeItem("returnFromExample");
    }

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
    }) => {
      if (!selectedBook || !isAdmin) {
        throw new Error("Administrator login required.");
      }

      const comment = await createBookComment({
        title: input.title,
        bookId: selectedBook.id,
        bookPageId: input.bookPageId,
        body: input.body,
        anchorX: input.anchorX,
        anchorY: input.anchorY,
        backgroundColor: input.backgroundColor,
        textColor: input.textColor,
        backgroundOpacity: input.backgroundOpacity,
        fontSize: input.fontSize,
        richContent: input.richContent,
      });
      if (mountedRef.current && selectedBookIdRef.current === selectedBook.id) {
        setBookComments((current) => [...current.filter((item) => item.id !== comment.id), comment]);
      }
    },
    [isAdmin, selectedBook]
  );

  const handleUpdateComment = useCallback(async (commentId: string, input: { body: string; title?: string | null; backgroundColor?: string; textColor?: string; backgroundOpacity?: number; fontSize?: number; richContent?: BookRichDocument | null; anchorX?: number; anchorY?: number }) => {
    if (!isAdmin || !selectedBook) throw new Error("Administrator login required.");
    const comment = await updateBookComment(commentId, input);
    if (mountedRef.current && selectedBookIdRef.current === selectedBook.id) {
      setBookComments((current) => {
        const others = current.filter((item) => item.id !== comment.id);
        return comment.is_visible ? [...others, comment] : others;
      });
    }
  }, [isAdmin, selectedBook]);

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

  const handleBookPageChange = useCallback(
    (bookId: string, pageIndex: number) => {
      if (bookId !== selectedBookIdRef.current) return;
      const activeBook = books.find((book) => book.id === bookId);
      if (!activeBook) return;
      setViewerPage(pageIndex);

      if (activeBook) {
        if (reportedPageRef.current?.bookId === activeBook.id && reportedPageRef.current.pageIndex === pageIndex) return;
        reportedPageRef.current = { bookId: activeBook.id, pageIndex };
        bookPageMemoryRef.current = rememberBookPage(bookPageMemoryRef.current, activeBook.slug, pageIndex);
        savedBookSessionRef.current = {
          slug: activeBook.slug,
          pageIndex,
        };

        writeBookSession(activeBook.slug, pageIndex);
        void trackAnalyticsEvent({
          eventName: "book_page_view",
          targetType: "book_page",
          targetId: `${activeBook.slug}:${pageIndex}`,
          valueInt: pageIndex,
        });
      }
    },
    [books]
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

  const messageMotionClass = barVisible
    ? "is-visible"
    : transitionBusy
      ? "is-leaving"
      : "is-outside";

  const deckChoice = (book: Book): BookDeckChoice => {
    const cached = bookPagesCacheRef.current.get(book.id);
    const entry = bookDeckEntry(bookPageMemoryRef.current, book.slug, cached?.length ?? 0);
    const first = entry.page === 0 ? 0 : entry.page % 2 === 0 ? entry.page - 1 : entry.page;
    const previewUrls = cached ? cached.slice(first, first + (entry.page === 0 ? 1 : 2)).map((page) => page.public_url) : bookPreviews[book.id]?.cover ? [bookPreviews[book.id].cover!.src] : [];
    return { book, previewUrls, edgeUrl: cached?.[entry.page]?.public_url || bookPreviews[book.id]?.cover?.src };
  };
  const viewer = (book: Book, bookPages: BookPage[], comments: BookComment[], page: number, stageClass: string, autoOpen = false) => <BookDeckViewer book={book} pages={bookPages} comments={comments} commentMode={commentMode} canManageComments={isAdmin && !isBuiltInBook(book.id)} initialPage={page} autoOpenOnActivate={autoOpen} controlsActive={book.id === selectedBookId} bookMotionClassName={stageClass} onBookPageChange={handleBookPageChange} onReady={handleViewerReady} onCreateComment={handleCreateComment} onUpdateComment={handleUpdateComment} onDeleteComment={handleDeleteComment} />;

  return (
    <div
      className={`public-book-shell ${navigationMode === "sketches" ? "is-sketches" : ""} fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black`}
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

      {navigationMode === "sketches" && (
        <SectionNavigation section="sketches" title={sketchesMenu?.label ?? "SKETCHES"} onIndex={() => void handleBack()}>
            {isAdmin && (
              <>
                {selectedBook && !isBuiltInBook(selectedBook.id) && (
                  <button type="button" onClick={() => setCommentMode((active) => !active)} aria-label="Annota le pagine" aria-pressed={commentMode}>✎</button>
                )}
                <button type="button" className="sketches-admin" onClick={onLogin} aria-label="Gestisci libri">edit</button>
              </>
            )}
            {inline.editing ? <input className="section-title-input" aria-label="Testo Book List" value={inline.draft.sketches_book_list_label ?? "Book List"} onChange={(event) => inline.update({ sketches_book_list_label: event.target.value })} /> : <button type="button" onClick={() => setBookBalloonOpen((open) => !open)} aria-label={bookBalloonOpen ? "Chiudi selezione libri" : "Scegli libro"} aria-expanded={bookBalloonOpen} aria-controls="public-book-library">{settings.sketches_book_list_label || "Book List"}</button>}
        </SectionNavigation>
      )}

      {commentMode && isAdmin && selectedBook && !isBuiltInBook(selectedBook.id) && <aside data-book-comment-ui="true" data-blossom className="book-comment-mode-indicator blossom" role="status"><span>tocca la pagina per aggiungere un commento</span><button type="button" onClick={() => setCommentMode(false)}>fine</button></aside>}

      {navigationMode === "legacy" && <div
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
      </div>}

      <aside
        id="public-book-library"
        className={`public-library-drawer fixed z-[150] flex flex-col ${
          bookBalloonOpen && !loginMounted
            ? "is-open pointer-events-auto"
            : "pointer-events-none"
        }`}
        aria-hidden={!bookBalloonOpen || loginMounted}
      >
        {navigationMode === "legacy" && <button
          type="button"
          tabIndex={bookBalloonOpen && !loginMounted ? 0 : -1}
          onClick={() => setBookBalloonOpen(false)}
          data-analytics-event="navigation_click"
          data-analytics-type="interface"
          data-analytics-id="library-close"
          className="absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 sm:right-8"
          aria-label="Close book list"
        >
          ×
        </button>}

        <div ref={previewScrollRef} className="public-book-scroll min-h-0 flex-1 overflow-y-auto">
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
              const preview = bookBalloonOpen && visiblePreviewBooks.has(book.id) ? bookPreviews[book.id] : undefined;

              return (
                <button
                  key={book.id}
                  data-preview-book-id={book.id}
                  type="button"
                  tabIndex={bookBalloonOpen && !loginMounted ? 0 : -1}
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
                          loading="lazy"
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
                          loading="lazy"
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
            key="books-loading"
            data-blossom
            className={`public-route-message ${messageMotionClass}`}
          >
            ...
          </div>
        ) : error ? (
          <div
            key="books-error"
            data-blossom
            className={`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${messageMotionClass}`}
          >
            <p role="alert">{error}</p>
            <button type="button" className="mt-4" onClick={() => {
              setSelectedBookId(null);
              selectedBookIdRef.current = null;
              setReloadKey((key) => key + 1);
            }}>Riprova</button>
          </div>
        ) : books.length === 0 ? (
          <div
            key="books-empty"
            data-blossom
            className={`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${messageMotionClass}`}
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
              {navigationMode === "sketches" ? <BookDeckViewport ref={deckRef} active={deckChoice(selectedBook)} previous={(() => { const book = adjacentDeckBook(books, selectedBook.id, -1); return book ? deckChoice(book) : null; })()} next={(() => { const book = adjacentDeckBook(books, selectedBook.id, 1); return book ? deckChoice(book) : null; })()} disabled={loginMounted || bookBalloonOpen || commentMode || transitionBusy || viewerMotion !== "visible"} locked={transitionBusy} incoming={incomingDeckBook ? { choice: deckChoice(incomingDeckBook.book), direction: incomingDeckBook.direction, content: viewer(incomingDeckBook.book, incomingDeckBook.pages, incomingDeckBook.comments, incomingDeckBook.page, "is-visible") } : null} onSelect={(book, direction) => void switchToBook(book, true, direction)}>
                {viewer(selectedBook, pages, bookComments, viewerPage, viewerStageClass, autoOpenBookId === selectedBook.id && !transitionBusy && !bookBalloonOpen && !loginMounted && !commentMode)}
              </BookDeckViewport> : viewer(selectedBook, pages, bookComments, viewerPage, viewerStageClass)}
            </div>
          </div>
        ) : null}
      </main>


      {serviceNotice && !loginMounted && (
        <div className="public-book-service-notice" role="status">
          <p>{serviceNotice}</p>
          <button type="button" disabled={loadingBooks || loadingPages} onClick={() => setReloadKey((key) => key + 1)}>
            {loadingBooks ? "Connessione…" : "Riprova connessione"}
          </button>
        </div>
      )}

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
