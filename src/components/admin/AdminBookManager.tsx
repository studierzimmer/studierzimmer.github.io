import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  Book,
  BookCategory,
  BookPageFormat,
  BookPage,
} from "@/types/books";
import AdminThreeDModelManager from "@/components/admin/AdminThreeDModelManager";
import AdminArchiveSectionManager from "@/components/admin/AdminArchiveSectionManager";
import BookBackgroundColorPicker from "@/components/admin/BookBackgroundColorPicker";
import {
  createBook,
  deleteBookAndFiles,
  deleteBookPage,
  listAllBooksForAdmin,
  listBookPages,
  moveBookPage,
  setFeaturedBook,
  slugifyBookTitle,
  updateBook,
  uploadBookPages,
} from "@/services/bookRepository";
import { listAllArchiveSectionsForAdmin } from "@/services/archiveSectionRepository";
import {
  DEFAULT_ARCHIVE_SECTIONS,
  type ArchiveSection,
} from "@/types/archiveSections";

interface AdminBookManagerProps {
  userEmail: string;
  onBack: () => void;
  onSignOut: () => Promise<void>;
  embedded?: boolean;
  accountControlsReady?: boolean;
}

type AccountMotion = "outside" | "entering" | "visible";

const accountMotionStyles = `
.admin-account-item {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.admin-account-item.is-outside {
  opacity: 0;
}

.admin-account-item.is-entering {
  opacity: 1;
}

.admin-account-item.is-visible {
  transform: scale(1);
  opacity: 1;
}

.admin-account-letter,
.admin-backend-letter {
  display: inline-block;
  transform-origin: 50% 50%;
  white-space: pre;
}

.admin-account-item.is-outside .admin-account-letter,
.admin-backend-panel.is-outside .admin-backend-letter {
  transform: scale(0);
  opacity: 0;
}

.admin-account-item.is-entering .admin-account-letter,
.admin-backend-panel.is-entering .admin-backend-letter {
  animation: elastic-center-scale 760ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: calc(var(--letter-index, 0) * 24ms + var(--letter-offset, 0ms));
}

.admin-account-item.is-visible .admin-account-letter,
.admin-backend-panel.is-visible .admin-backend-letter {
  transform: scale(1);
  opacity: 1;
}

.admin-backend-panel {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.admin-backend-panel.is-outside {
  transform: scale(0);
  opacity: 0;
}

.admin-backend-panel.is-entering {
  animation: elastic-center-scale 940ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: var(--panel-delay, 0ms);
}

.admin-backend-panel.is-visible {
  transform: scale(1);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .admin-account-item.is-entering {
    animation-duration: 1ms;
    animation-delay: 0ms;
  }

  .admin-account-letter,
  .admin-backend-letter,
  .admin-backend-panel.is-entering {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
  }
}
`;

function AnimatedBackendText({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {Array.from(text).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="admin-backend-letter"
          style={{ "--letter-index": index } as React.CSSProperties}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
}

const inputClass =
  "w-full border border-black/25 bg-transparent px-3 py-2 text-[15px] outline-none focus:border-black";

const buttonClass =
  "border border-black/40 px-3 py-2 text-[14px] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

function messageFrom(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Something went wrong.";
}

function rgbChannel(value: number | undefined): number {
  return Number.isFinite(value)
    ? Math.min(255, Math.max(0, Math.round(value ?? 255)))
    : 255;
}

export default function AdminBookManager({
  userEmail,
  onBack,
  onSignOut,
  embedded = false,
  accountControlsReady = true,
}: AdminBookManagerProps) {
  const [accountMotion, setAccountMotion] = useState<AccountMotion>(
    embedded ? "outside" : "visible"
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [managerSection, setManagerSection] = useState<
    "books" | "models" | "sections"
  >("books");
  const [archiveSections, setArchiveSections] = useState<ArchiveSection[]>(
    DEFAULT_ARCHIVE_SECTIONS
  );

  const [selectedBookId, setSelectedBookId] =
    useState<string | null>(null);

  const [pages, setPages] = useState<BookPage[]>([]);

  const [loadingBooks, setLoadingBooks] =
    useState(true);

  const [loadingPages, setLoadingPages] =
    useState(false);

  const [busy, setBusy] = useState(false);

  const [notice, setNotice] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const [newCategory, setNewCategory] =
    useState<BookCategory>("objects");

  const [slugWasEdited, setSlugWasEdited] =
    useState(false);

  const [editTitle, setEditTitle] = useState("");

  const [editCategory, setEditCategory] =
    useState<BookCategory>("objects");

  const [editDescription, setEditDescription] =
    useState("");

  const [editPublished, setEditPublished] =
    useState(false);

  const [editFeatured, setEditFeatured] =
    useState(false);

  const [editSortOrder, setEditSortOrder] =
    useState(0);

  const [editPageFormat, setEditPageFormat] =
    useState<BookPageFormat>("a4_long_edge");

  const [editBackgroundR, setEditBackgroundR] =
    useState(255);

  const [editBackgroundG, setEditBackgroundG] =
    useState(255);

  const [editBackgroundB, setEditBackgroundB] =
    useState(255);

  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  const [uploadProgress, setUploadProgress] =
    useState<string | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!embedded) {
      setAccountMotion("visible");
      return;
    }

    if (!accountControlsReady) {
      setAccountMotion("outside");
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setAccountMotion("entering");
      });
    });
    const finishTimer = window.setTimeout(() => {
      setAccountMotion("visible");
    }, 1850);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(finishTimer);
    };
  }, [accountControlsReady, embedded]);

  const selectedBook = useMemo(
    () =>
      books.find(
        (book) => book.id === selectedBookId
      ) ?? null,
    [books, selectedBookId]
  );

  const renderAccountLetters = (text: string, offset = 0) =>
    Array.from(text).map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        aria-hidden="true"
        className="admin-account-letter"
        style={
          {
            "--letter-index": index,
            "--letter-offset": `${offset}ms`,
          } as React.CSSProperties
        }
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));

  const clearMessages = () => {
    setNotice(null);
    setError(null);
  };

  const reloadBooks = useCallback(
    async (preferredBookId?: string | null) => {
      const nextBooks =
        await listAllBooksForAdmin();

      setBooks(nextBooks);

      setSelectedBookId((current) => {
        const candidate =
          preferredBookId ?? current;

        if (
          candidate &&
          nextBooks.some(
            (book) => book.id === candidate
          )
        ) {
          return candidate;
        }

        return nextBooks[0]?.id ?? null;
      });

      return nextBooks;
    },
    []
  );

  const reloadPages = useCallback(
    async (bookId: string) => {
      setLoadingPages(true);

      try {
        const nextPages =
          await listBookPages(bookId);

        setPages(nextPages);
      } finally {
        setLoadingPages(false);
      }
    },
    []
  );

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoadingBooks(true);

      try {
        const nextBooks =
          await listAllBooksForAdmin();

        if (!active) return;

        setBooks(nextBooks);

        setSelectedBookId(
          nextBooks[0]?.id ?? null
        );
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

  useEffect(() => {
    if (
      archiveSections.length > 0 &&
      !archiveSections.some((section) => section.slug === newCategory)
    ) {
      setNewCategory(archiveSections[0].slug);
    }
  }, [archiveSections, newCategory]);

  useEffect(() => {
    let active = true;
    void listAllArchiveSectionsForAdmin()
      .then((sections) => {
        if (active && sections.length > 0) setArchiveSections(sections);
      })
      .catch(() => {
        if (active) setArchiveSections(DEFAULT_ARCHIVE_SECTIONS);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedBook) {
      setPages([]);
      return;
    }

    setEditTitle(selectedBook.title);
    setEditCategory(selectedBook.category);
    setEditDescription(
      selectedBook.description
    );
    setEditPublished(
      selectedBook.is_published
    );
    setEditFeatured(
      selectedBook.is_featured
    );
    setEditSortOrder(
      selectedBook.sort_order
    );
    setEditPageFormat(
      selectedBook.page_format ?? "a4_long_edge"
    );
    setEditBackgroundR(
      rgbChannel(selectedBook.background_r)
    );
    setEditBackgroundG(
      rgbChannel(selectedBook.background_g)
    );
    setEditBackgroundB(
      rgbChannel(selectedBook.background_b)
    );

    setSelectedFiles([]);
    setUploadProgress(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    void reloadPages(
      selectedBook.id
    ).catch((loadError) => {
      setError(messageFrom(loadError));
    });
  }, [selectedBook, reloadPages]);

  const handleNewTitleChange = (
    value: string
  ) => {
    setNewTitle(value);

    if (!slugWasEdited) {
      setNewSlug(
        slugifyBookTitle(value)
      );
    }
  };

  const handleCreateBook = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    clearMessages();
    setBusy(true);

    try {
      const created = await createBook({
        title: newTitle,
        slug: newSlug,
        category: newCategory,
        sort_order: books.length,
      });

      await reloadBooks(created.id);

      setNewTitle("");
      setNewSlug("");
      setNewCategory("objects");
      setSlugWasEdited(false);

      setNotice(
        `Created “${created.title}”. Its Storage folder is ${created.storage_folder}/.`
      );
    } catch (createError) {
      setError(messageFrom(createError));
    } finally {
      setBusy(false);
    }
  };

  const handleSaveBook = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedBook) return;

    clearMessages();
    setBusy(true);

    try {
      await updateBook(
        selectedBook.id,
        {
          title: editTitle.trim(),
          category: editCategory,
          description:
            editDescription.trim(),
          is_published:
            editPublished,
          sort_order:
            Number.isFinite(
              editSortOrder
            )
              ? editSortOrder
              : 0,
          page_format: editPageFormat,
          background_r:
            rgbChannel(editBackgroundR),
          background_g:
            rgbChannel(editBackgroundG),
          background_b:
            rgbChannel(editBackgroundB),

          ...(selectedBook.is_featured &&
          !editFeatured
            ? {
                is_featured: false,
              }
            : {}),
        }
      );

      if (
        editFeatured &&
        !selectedBook.is_featured
      ) {
        await setFeaturedBook(
          selectedBook.id
        );
      }

      await reloadBooks(
        selectedBook.id
      );

      setNotice(
        "Book settings saved."
      );
    } catch (saveError) {
      setError(messageFrom(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handleFiles = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFiles(
      Array.from(
        event.target.files ?? []
      )
    );

    setUploadProgress(null);
  };

  const handleUpload = async () => {
    if (!selectedBook) return;

    clearMessages();
    setBusy(true);
    setUploadProgress(null);

    try {
      const nextPages =
        await uploadBookPages(
          selectedBook,
          selectedFiles,
          (finished, total) =>
            setUploadProgress(
              `${finished} / ${total}`
            )
        );

      setPages(nextPages);
      setSelectedFiles([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setNotice(
        "Images uploaded. Their order follows the natural filename order."
      );
    } catch (uploadError) {
      setError(messageFrom(uploadError));
    } finally {
      setBusy(false);
    }
  };

  const handleDeletePage = async (
    page: BookPage
  ) => {
    if (!selectedBook) return;

    const confirmed =
      window.confirm(
        `Delete page ${page.page_number}: ${page.file_name}?`
      );

    if (!confirmed) return;

    clearMessages();
    setBusy(true);

    try {
      await deleteBookPage(page);

      await reloadPages(
        selectedBook.id
      );

      setNotice("Page deleted.");
    } catch (deleteError) {
      setError(messageFrom(deleteError));
    } finally {
      setBusy(false);
    }
  };

  const handleMovePage = async (
    index: number,
    direction: -1 | 1
  ) => {
    clearMessages();
    setBusy(true);

    try {
      const nextPages =
        await moveBookPage(
          pages,
          index,
          direction
        );

      setPages(nextPages);
    } catch (moveError) {
      setError(messageFrom(moveError));
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteBook =
    async () => {
      if (!selectedBook) return;

      const confirmed =
        window.confirm(
          `Delete “${selectedBook.title}” and every JPG in ${selectedBook.storage_folder}/? This cannot be undone.`
        );

      if (!confirmed) return;

      clearMessages();
      setBusy(true);

      try {
        await deleteBookAndFiles(
          selectedBook
        );

        await reloadBooks(null);

        setNotice(
          "Book and image folder deleted."
        );
      } catch (deleteError) {
        setError(
          messageFrom(deleteError)
        );
      } finally {
        setBusy(false);
      }
    };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white text-black">
      <style>{accountMotionStyles}</style>

      <header
        className={
          embedded
            ? "sticky top-0 z-10 flex min-h-[72px] items-start justify-end bg-white px-4 pt-4 sm:min-h-[88px] sm:px-6 sm:pt-6"
            : "sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-black/20 bg-white px-5 py-4 md:px-8"
        }
      >
        {!embedded && (
          <div className="flex items-center gap-5 text-[15px]">
            <button
              type="button"
              onClick={onBack}
              className="transition-transform hover:scale-110 active:scale-110"
            >
              ← BACK
            </button>

            <span>BOOK BACKEND</span>
          </div>
        )}

        <div className="flex h-12 items-center gap-4 text-[13px]">
          <span
            aria-label={userEmail}
            className={`${
              embedded ? `admin-account-item item-email is-${accountMotion}` : ""
            } max-w-[min(48vw,280px)] truncate text-black/60`}
          >
            {embedded ? renderAccountLetters(userEmail) : userEmail}
          </span>

          <button
            type="button"
            onClick={() =>
              void onSignOut()
            }
            aria-label="Logout"
            className={`${
              embedded ? `admin-account-item item-logout is-${accountMotion}` : ""
            } underline underline-offset-4`}
          >
            {embedded ? renderAccountLetters("LOGOUT", 120) : "LOGOUT"}
          </button>
        </div>
      </header>

      <nav className="sticky top-[72px] z-10 flex justify-center gap-2 border-b border-black/15 bg-white px-4 py-2 sm:top-[88px]">
        <button
          type="button"
          onClick={() => setManagerSection("books")}
          className={`${buttonClass} ${
            managerSection === "books" ? "bg-black text-white" : ""
          }`}
        >
          BOOKS
        </button>
        <button
          type="button"
          onClick={() => setManagerSection("models")}
          className={`${buttonClass} ${
            managerSection === "models" ? "bg-black text-white" : ""
          }`}
        >
          3D MODELS
        </button>
        <button
          type="button"
          onClick={() => setManagerSection("sections")}
          className={`${buttonClass} ${
            managerSection === "sections" ? "bg-black text-white" : ""
          }`}
        >
          ARCHIVE SECTIONS
        </button>
      </nav>

      {managerSection === "models" ? (
        <main className="mx-auto flex min-h-[calc(100vh-121px)] w-full max-w-[1500px]">
          <AdminThreeDModelManager />
        </main>
      ) : managerSection === "sections" ? (
        <main className="mx-auto flex min-h-[calc(100vh-121px)] w-full max-w-[1500px]">
          <AdminArchiveSectionManager onSectionsChanged={setArchiveSections} />
        </main>
      ) : (
      <main className="mx-auto grid w-full max-w-[1500px] gap-0 md:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-black/20 p-5 md:min-h-[calc(100vh-65px)] md:border-b-0 md:border-r md:p-6">
          <form
            onSubmit={
              handleCreateBook
            }
            className={`mb-8 flex flex-col gap-3 ${
              embedded ? `admin-backend-panel is-${accountMotion}` : ""
            }`}
            style={
              embedded
                ? ({ "--panel-delay": "0ms" } as React.CSSProperties)
                : undefined
            }
          >
            <h2 className="text-[18px]">
              {embedded ? <AnimatedBackendText text="CREATE A BOOK" /> : "CREATE A BOOK"}
            </h2>

            <label className="text-[12px]">
              TITLE

              <input
                value={newTitle}
                onChange={(event) =>
                  handleNewTitleChange(
                    event.target.value
                  )
                }
                required
                className={`${inputClass} mt-1`}
              />
            </label>

            <label className="text-[12px]">
              FOLDER / URL SLUG

              <input
                value={newSlug}
                onChange={(event) => {
                  setSlugWasEdited(
                    true
                  );

                  setNewSlug(
                    slugifyBookTitle(
                      event.target
                        .value
                    )
                  );
                }}
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                className={`${inputClass} mt-1 font-mono text-[13px]`}
              />
            </label>

            <label className="text-[12px]">
              CATEGORY

              <select
                value={newCategory}
                onChange={(event) =>
                  setNewCategory(
                    event.target
                      .value as BookCategory
                  )
                }
                className={`${inputClass} mt-1`}
              >
                {archiveSections.map((section) => (
                  <option key={section.id} value={section.slug}>
                    {section.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={busy}
              className={buttonClass}
            >
              CREATE EMPTY FOLDER
            </button>
          </form>

          <div
            className={embedded ? `admin-backend-panel is-${accountMotion}` : ""}
            style={
              embedded
                ? ({ "--panel-delay": "90ms" } as React.CSSProperties)
                : undefined
            }
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px]">
                {embedded ? <AnimatedBackendText text="BOOK FOLDERS" /> : "BOOK FOLDERS"}
              </h2>

              <span className="text-[12px] text-black/50">
                {books.length}
              </span>
            </div>

            {loadingBooks ? (
              <p className="text-[14px]">
                Loading…
              </p>
            ) : books.length === 0 ? (
              <p className="text-[14px] leading-relaxed text-black/60">
                No books yet. Create
                the first folder above.
              </p>
            ) : (
              <div className="flex flex-col border-t border-black/15">
                {books.map(
                  (book) => (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() =>
                        setSelectedBookId(
                          book.id
                        )
                      }
                      className={`border-b border-black/15 px-2 py-3 text-left transition-colors ${
                        book.id ===
                        selectedBookId
                          ? "bg-black text-white"
                          : "hover:bg-black/5"
                      }`}
                    >
                      <span className="block truncate text-[14px]">
                        {book.title}
                      </span>

                      <span
                        className={`mt-1 block truncate font-mono text-[11px] ${
                          book.id ===
                          selectedBookId
                            ? "text-white/70"
                            : "text-black/50"
                        }`}
                      >
                        {
                          book.storage_folder
                        }
                        / ·{" "}
                        {book.is_published
                          ? "PUBLIC"
                          : "DRAFT"}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </aside>

        <section
          className={`min-w-0 p-5 md:p-8 ${
            embedded ? `admin-backend-panel is-${accountMotion}` : ""
          }`}
          style={
            embedded
              ? ({ "--panel-delay": "180ms" } as React.CSSProperties)
              : undefined
          }
        >
          {(notice || error) && (
            <div
              className={`mb-6 border p-3 text-[14px] ${
                error
                  ? "border-red-700 text-red-700"
                  : "border-black/30 text-black"
              }`}
              role={
                error
                  ? "alert"
                  : "status"
              }
            >
              {error ?? notice}
            </div>
          )}

          {!selectedBook ? (
            <div className="flex min-h-[50vh] items-center justify-center text-black/50">
              CREATE OR SELECT A BOOK
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <form
                onSubmit={
                  handleSaveBook
                }
                className="grid gap-5 lg:grid-cols-2"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-[24px] leading-tight">
                      {embedded ? (
                        <AnimatedBackendText text={selectedBook.title} />
                      ) : (
                        selectedBook.title
                      )}
                    </h1>

                    <p className="mt-2 font-mono text-[12px] text-black/55">
                      Storage →
                      book-pages/
                      {
                        selectedBook.storage_folder
                      }
                      /
                    </p>

                    <p className="mt-1 font-mono text-[12px] text-black/55">
                      Public link →
                      /book/
                      {
                        selectedBook.slug
                      }
                    </p>
                  </div>

                  <label className="text-[12px]">
                    TITLE

                    <input
                      value={
                        editTitle
                      }
                      onChange={(
                        event
                      ) =>
                        setEditTitle(
                          event.target
                            .value
                        )
                      }
                      required
                      className={`${inputClass} mt-1`}
                    />
                  </label>

                  <label className="text-[12px]">
                    CATEGORY

                    <select
                      value={
                        editCategory
                      }
                      onChange={(
                        event
                      ) =>
                        setEditCategory(
                          event.target
                            .value as BookCategory
                        )
                      }
                      className={`${inputClass} mt-1`}
                    >
                      {!archiveSections.some(
                        (section) => section.slug === editCategory
                      ) && (
                        <option value={editCategory}>
                          {editCategory.toUpperCase()}
                        </option>
                      )}
                      {archiveSections.map((section) => (
                        <option key={section.id} value={section.slug}>
                          {section.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-[12px]">
                    PUBLIC ORDER

                    <input
                      type="number"
                      value={
                        editSortOrder
                      }
                      onChange={(
                        event
                      ) =>
                        setEditSortOrder(
                          Number(
                            event.target
                              .value
                          )
                        )
                      }
                      className={`${inputClass} mt-1`}
                    />
                  </label>

                  <label className="text-[12px]">
                    PAGE SIZE / BINDING — BACKEND ONLY

                    <select
                      value={editPageFormat}
                      onChange={(event) =>
                        setEditPageFormat(event.target.value as BookPageFormat)
                      }
                      className={`${inputClass} mt-1`}
                    >
                      <option value="a4_long_edge">
                        A4 — UNFOLDS FROM LONG SIDE
                      </option>
                      <option value="a4_short_edge">
                        A4 — UNFOLDS FROM SHORT SIDE
                      </option>
                      <option value="square">
                        SQUARE
                      </option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[12px]">
                    DESCRIPTION

                    <textarea
                      value={
                        editDescription
                      }
                      onChange={(
                        event
                      ) =>
                        setEditDescription(
                          event.target
                            .value
                        )
                      }
                      rows={7}
                      className={`${inputClass} mt-1 resize-y`}
                    />
                  </label>

                  <BookBackgroundColorPicker
                    key={selectedBook.id}
                    value={{
                      r: editBackgroundR,
                      g: editBackgroundG,
                      b: editBackgroundB,
                    }}
                    onChange={(color) => {
                      setEditBackgroundR(color.r);
                      setEditBackgroundG(color.g);
                      setEditBackgroundB(color.b);
                    }}
                  />

                  <label className="flex items-center gap-3 text-[14px]">
                    <input
                      type="checkbox"
                      checked={
                        editPublished
                      }
                      onChange={(
                        event
                      ) =>
                        setEditPublished(
                          event.target
                            .checked
                        )
                      }
                    />

                    PUBLISHED — visible to
                    the public
                  </label>

                  <label className="flex items-center gap-3 text-[14px]">
                    <input
                      type="checkbox"
                      checked={
                        editFeatured
                      }
                      onChange={(
                        event
                      ) =>
                        setEditFeatured(
                          event.target
                            .checked
                        )
                      }
                    />

                    FEATURED — opens by
                    default
                  </label>

                  <div className="mt-auto flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={busy}
                      className={
                        buttonClass
                      }
                    >
                      SAVE BOOK
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void handleDeleteBook()
                      }
                      className={`${buttonClass} border-red-700 text-red-700`}
                    >
                      DELETE BOOK + FOLDER
                    </button>
                  </div>
                </div>
              </form>

              <div className="border-t border-black/20 pt-8">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-[20px]">
                      {embedded ? <AnimatedBackendText text="JPG PAGES" /> : "JPG PAGES"}
                    </h2>

                    <p className="mt-1 text-[13px] text-black/55">
                      Select several files at
                      once. Files are appended
                      using natural filename
                      order, so 01.jpg comes
                      before 02.jpg.
                    </p>
                  </div>

                  <span className="font-mono text-[12px] text-black/50">
                    {pages.length} PAGE
                    {pages.length === 1
                      ? ""
                      : "S"}
                  </span>
                </div>

                <div className="mb-7 flex flex-col gap-3 border border-dashed border-black/30 p-4 sm:flex-row sm:items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg"
                    multiple
                    onChange={
                      handleFiles
                    }
                    className="min-w-0 flex-1 text-[13px]"
                  />

                  <button
                    type="button"
                    disabled={
                      busy ||
                      selectedFiles.length ===
                        0
                    }
                    onClick={() =>
                      void handleUpload()
                    }
                    className={
                      buttonClass
                    }
                  >
                    {uploadProgress
                      ? `UPLOADING ${uploadProgress}`
                      : `UPLOAD ${
                          selectedFiles.length ||
                          ""
                        } JPG${
                          selectedFiles.length ===
                          1
                            ? ""
                            : "S"
                        }`}
                  </button>
                </div>

                {loadingPages ? (
                  <p>Loading pages…</p>
                ) : pages.length === 0 ? (
                  <div className="border border-black/15 p-8 text-center text-black/50">
                    THIS FOLDER IS EMPTY
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {pages.map(
                      (
                        page,
                        index
                      ) => (
                        <article
                          key={
                            page.id
                          }
                          className="min-w-0 border border-black/20 p-2"
                        >
                          <div className="aspect-[3/4] overflow-hidden bg-black/5">
                            <img
                              src={
                                page.public_url
                              }
                              alt={`Page ${page.page_number}: ${page.file_name}`}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="mt-2">
                            <div className="flex items-center justify-between gap-2 text-[12px]">
                              <span>
                                PAGE{" "}
                                {
                                  page.page_number
                                }
                              </span>

                              <span className="truncate font-mono text-[10px] text-black/45">
                                {
                                  page.file_name
                                }
                              </span>
                            </div>

                            <div className="mt-2 grid grid-cols-3 gap-1">
                              <button
                                type="button"
                                title="Move earlier"
                                disabled={
                                  busy ||
                                  index ===
                                    0
                                }
                                onClick={() =>
                                  void handleMovePage(
                                    index,
                                    -1
                                  )
                                }
                                className={
                                  buttonClass
                                }
                              >
                                ↑
                              </button>

                              <button
                                type="button"
                                title="Move later"
                                disabled={
                                  busy ||
                                  index ===
                                    pages.length -
                                      1
                                }
                                onClick={() =>
                                  void handleMovePage(
                                    index,
                                    1
                                  )
                                }
                                className={
                                  buttonClass
                                }
                              >
                                ↓
                              </button>

                              <button
                                type="button"
                                title="Delete page"
                                disabled={
                                  busy
                                }
                                onClick={() =>
                                  void handleDeletePage(
                                    page
                                  )
                                }
                                className={`${buttonClass} border-red-700 text-red-700`}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </article>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      )}
    </div>
  );
}
