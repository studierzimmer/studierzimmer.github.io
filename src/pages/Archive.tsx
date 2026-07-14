import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SENTENCES = ["GBRLD.SPACE", "Gabriel Dell'Aiuto"];
const archiveImages = import.meta.glob<string>("@/img/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default",
});

interface ArchiveItem {
  id: number;
  title: string;
  image: string;
  fullFilename: string;
}

interface SelectedArchiveItem extends ArchiveItem {
  rect: DOMRect;
}

const TypingHeader = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    const current = SENTENCES[sentenceIndex];

    // Speed settings
    const typeSpeed = 90;
    const deleteSpeed = 35;
    const pauseAfterFull = 2000;

    if (!isDeleting && charIndex < current.length) {
      timeout = window.setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = window.setTimeout(() => setIsDeleting(true), pauseAfterFull);
    } else if (isDeleting && charIndex > 0) {
      timeout = window.setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setSentenceIndex((s) => (s + 1) % SENTENCES.length);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [charIndex, isDeleting, sentenceIndex]);

  const text = SENTENCES[sentenceIndex].slice(0, charIndex);

  return (
    <h1 className="text-3xl sm:text-4xl transition-all text-gray-900 dark:text-white text-center overflow-hidden whitespace-nowrap border-r-2 pr-2 animate-blink">
      {text}
    </h1>
  );
};

const Archive = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<SelectedArchiveItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const gridItems = useMemo<ArchiveItem[]>(() => {
    return Object.entries(archiveImages).map(([path, url], index) => {
      const fullFilename = path.split("/").pop() || `Image ${index + 1}`;
      const title = fullFilename.replace(/\.[^/.]+$/, "");
      return {
        id: index + 1,
        title,
        image: url,
        fullFilename,
      };
    });
  }, []);

  useEffect(() => {
    const mountTimeout = window.setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(mountTimeout);
  }, []);

  const handleClose = () => setSelectedItem(null);

  // Use event.currentTarget so we always read the right rect even if the click lands on the child
  const handleItemClick = (item: ArchiveItem, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedItem({ ...item, rect });
  };

  const handleBackToHome = () => setIsExiting(true);

  useEffect(() => {
    if (isExiting) {
      const timeout = window.setTimeout(() => navigate("/"), 400);
      return () => clearTimeout(timeout);
    }
  }, [isExiting, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current?.scrollTop || 0;
      setIsScrolled(scrollTop > 10);
    };

    const ref = scrollContainerRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // keyboard support: Esc to close enlarged image
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen overflow-scroll scrollbar-hide bg-white dark:bg-black select-none">
      {/* Header with Typing */}
      <div
        className={`z-50 fixed top-1 left-0 right-0 transition-opacity duration-700 ease-in-out ${
          isExiting || isScrolled ? "animate-elastic-shrink opacity-100" : "animate-elastic-grow opacity-100"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <button
          onClick={handleBackToHome}
          className="fixed z-50 top-1 left-0 right-0 text-2xl sm:text-4xl text-center text-gray-900 dark:text-white hover:scale-110 active:scale-95 transition-transform"
          aria-label="Back to home"
        >
          <TypingHeader />
        </button>
      </div>

      {/* Grid Items */}
      <div
        ref={scrollContainerRef}
        className={`fixed bottom-0 left-0 right-0 top-1 scrollbar-hide transition-colors bg-white dark:bg-black duration-500 overflow-y-scroll ${
          isExiting ? "animate-slide-down" : "animate-slide-up"
        }`}
      >
        <h2 className="transition-all mt-40 text-2xl md:text-2xl xl:text-3xl font-regular dark:text-white text-black mb-6 text-center">
          <i>2022 — 2025</i>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-10 gap-8 py-12 px-4 max-w-[90vw] mx-auto">
          {gridItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  (e.target as HTMLElement).click();
                }
              }}
              onClick={(e) => handleItemClick(item, e)}
              className="text-md text-left hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ willChange: "transform" }}
              aria-label={`Open ${item.title}`}
            >
              {/* Aspect-preserving container to avoid layout shift */}
              <div style={{ aspectRatio: "1 / 1", width: "100%", overflow: "hidden", borderRadius: 8 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all shadow-md"
                  loading="lazy"
                  decoding="async"
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
              </div>

              <p className="mt-2 text-center text-xl max-w-xl dark:text-white">{item.title}</p>
            </div>
          ))}
        </div>

        <h2 className="transition-all mt-15 text-xl md:text-2xl xl:text-3xl font-regular dark:text-white text-black mb-20 text-center">
          <i>
            All rights reserved to the respective brands.
            <br /> Images used to document design contribution.
          </i>
        </h2>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      {/* Enlarged Image */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="enlarged"
            initial={{
              top: selectedItem.rect.top,
              left: selectedItem.rect.left,
              width: selectedItem.rect.width,
              height: selectedItem.rect.height,
              position: "fixed",
              zIndex: 100,
            }}
            animate={{ top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }}
            exit={{
              top: selectedItem.rect.top,
              left: selectedItem.rect.left,
              width: selectedItem.rect.width,
              height: selectedItem.rect.height,
            }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="bg-white flex items-center justify-center fixed inset-0"
            onClick={handleClose}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="object-contain max-w-full max-h-[90vh] shadow-2xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      {isMounted && (
        <div
          className={`fixed top-5 xl:top-20 right-0 xl:right-20 z-50 transition-opacity duration-700 ease-in-out ${
            !isExiting ? "animate-elastic-grow opacity-100" : "animate-elastic-shrink opacity-100"
          }`}
        >
          <button
            onClick={handleBackToHome}
            className="relative px-4 py-2 bg-alpha hover:scale-110 active:scale-95 dark:bg-gray-900 text-gray-900 dark:text-white transition-transform"
            aria-label="Back to home"
          >
            <div className="text-2xl sm:text-4xl transition-all animate-bounce">&lt;</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Archive;
