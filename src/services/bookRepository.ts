import {
  BOOK_BUCKET,
  supabase,
} from "@/lib/supabase";
import type {
  Book,
  BookPage,
  CreateBookInput,
  UpdateBookInput,
} from "@/types/books";

const MAX_JPEG_BYTES =
  50 * 1024 * 1024;

export const BUILT_IN_NOTEBOOK_ID = "local:the-notebook";

// These pages ship with the application. They are a public, read-only sample,
// never a substitute for the administrator's Supabase catalogue.
const notebookImages = import.meta.glob<string>(
  "/src/img/*thenotebook.jpg",
  { eager: true, query: "?url", import: "default" }
);

export function isBuiltInBook(bookId: string): boolean {
  return bookId === BUILT_IN_NOTEBOOK_ID;
}

export function builtInNotebook(): Book {
  return {
    id: BUILT_IN_NOTEBOOK_ID,
    title: "The Notebook",
    slug: "the-notebook-locale",
    storage_folder: "local:the-notebook",
    category: "sketches",
    description: "Copia inclusa nel sito · sola lettura",
    is_published: true,
    is_featured: true,
    sort_order: 0,
    page_format: "a4_long_edge",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

function builtInNotebookPages(): BookPage[] {
  return Object.entries(notebookImages)
    .sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))
    .map(([path, url], index) => ({
      id: `${BUILT_IN_NOTEBOOK_ID}:${index + 1}`,
      book_id: BUILT_IN_NOTEBOOK_ID,
      storage_path: `local:${url}`,
      file_name: path.split("/").pop() ?? `page-${index + 1}.jpg`,
      page_number: index + 1,
      created_at: "2026-01-01T00:00:00.000Z",
      public_url: url,
    }));
}

function readTimeout() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

function asError(
  error: unknown,
  fallback: string
): Error {
  const message =
    error && typeof error === "object" && "message" in error
      ? String(error.message)
      : String(error ?? "");

  if (/failed to fetch|fetch failed|networkerror|load failed|aborted|aborterror|timed? ?out/i.test(message)) {
    return new Error(
      "La biblioteca Supabase non è raggiungibile. Verifica la connessione e che il progetto Supabase sia attivo, poi riprova."
    );
  }

  if (error instanceof Error) {
    return error;
  }

  if (
    typeof error === "object" &&
    error &&
    "message" in error
  ) {
    return new Error(
      String(
        (
          error as {
            message: unknown;
          }
        ).message
      )
    );
  }

  return new Error(fallback);
}

function publicUrlFor(
  storagePath: string
): string {
  const { data } = supabase.storage
    .from(BOOK_BUCKET)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

export function bookPagePreviewUrl(
  storagePath: string
): string {
  if (storagePath.startsWith("local:")) return storagePath.slice(6);

  const { data } = supabase.storage
    .from(BOOK_BUCKET)
    .getPublicUrl(storagePath, {
      transform: {
        width: 720,
        height: 720,
        resize: "contain",
        quality: 72,
      },
    });

  return data.publicUrl;
}

function mapPage(
  row: Omit<BookPage, "public_url">
): BookPage {
  return {
    ...row,
    public_url: publicUrlFor(
      row.storage_path
    ),
  };
}

function randomToken(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function validateJpegFiles(
  files: File[]
): void {
  if (files.length === 0) {
    throw new Error(
      "Choose at least one JPG or JPEG file."
    );
  }

  for (const file of files) {
    const lowerName =
      file.name.toLowerCase();

    const isJpegName =
      lowerName.endsWith(".jpg") ||
      lowerName.endsWith(".jpeg");

    const isJpegMime =
      file.type === "image/jpeg" ||
      file.type === "";

    if (
      !isJpegName ||
      !isJpegMime
    ) {
      throw new Error(
        `${file.name} is not a JPG/JPEG image.`
      );
    }

    if (
      file.size >
      MAX_JPEG_BYTES
    ) {
      throw new Error(
        `${file.name} is larger than 50 MB.`
      );
    }
  }
}

export function slugifyBookTitle(
  value: string
): string {
  return value
    .normalize("NFKD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    )
    .replace(
      /-{2,}/g,
      "-"
    );
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data, error } =
    await supabase.rpc("is_admin");

  if (error) {
    throw asError(
      error,
      "Unable to verify administrator access."
    );
  }

  return data === true;
}

export async function listPublishedBooks(): Promise<
  Book[]
> {
  const timeout = readTimeout();
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true })
      .abortSignal(timeout.signal);

    if (error) throw asError(error, "Unable to load books.");

    return (data ?? []) as Book[];
  } finally {
    timeout.clear();
  }
}

export async function listAllBooksForAdmin(): Promise<
  Book[]
> {
  const timeout = readTimeout();
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .abortSignal(timeout.signal);

    if (error) throw asError(error, "Unable to load the admin book list.");

    return (data ?? []) as Book[];
  } finally {
    timeout.clear();
  }
}

export async function listBookPages(
  bookId: string
): Promise<BookPage[]> {
  if (isBuiltInBook(bookId)) return builtInNotebookPages();

  const timeout = readTimeout();
  try {
    const { data, error } = await supabase
      .from("book_pages")
      .select("*")
      .eq("book_id", bookId)
      .order("page_number", { ascending: true })
      .order("created_at", { ascending: true })
      .abortSignal(timeout.signal);

    if (error) throw asError(error, "Unable to load the book pages.");

    return ((data ?? []) as Array<Omit<BookPage, "public_url">>).map(mapPage);
  } finally {
    timeout.clear();
  }
}

export async function createBook(
  input: CreateBookInput
): Promise<Book> {
  const slug =
    slugifyBookTitle(
      input.slug
    );

  if (!slug) {
    throw new Error(
      "The book needs a valid slug."
    );
  }

  const { data, error } =
    await supabase
      .from("books")
      .insert({
        title:
          input.title.trim(),

        slug,

        storage_folder: slug,

        category:
          input.category,

        description:
          input.description?.trim() ??
          "",

        is_published:
          input.is_published ??
          false,

        is_featured: false,

        sort_order:
          input.sort_order ?? 0,
      })
      .select("*")
      .single();

  if (error) {
    throw asError(
      error,
      "Unable to create the book."
    );
  }

  return data as Book;
}

export async function updateBook(
  bookId: string,
  input: UpdateBookInput
): Promise<Book> {
  const { data, error } =
    await supabase
      .from("books")
      .update(input)
      .eq("id", bookId)
      .select("*")
      .single();

  if (error) {
    throw asError(
      error,
      "Unable to save the book."
    );
  }

  return data as Book;
}

export async function setFeaturedBook(
  bookId: string
): Promise<void> {
  const { error } =
    await supabase.rpc(
      "set_featured_book",
      {
        p_book_id: bookId,
      }
    );

  if (error) {
    throw asError(
      error,
      "Unable to set the featured book."
    );
  }
}

export async function uploadBookPages(
  book: Book,
  selectedFiles: File[],
  onProgress?: (
    finished: number,
    total: number
  ) => void
): Promise<BookPage[]> {
  const files = [
    ...selectedFiles,
  ].sort((a, b) =>
    a.name.localeCompare(
      b.name,
      undefined,
      {
        numeric: true,
        sensitivity: "base",
      }
    )
  );

  validateJpegFiles(files);

  const currentPages =
    await listBookPages(
      book.id
    );

  let nextPageNumber =
    currentPages.reduce(
      (highest, page) =>
        Math.max(
          highest,
          page.page_number
        ),
      0
    ) + 1;

  let finished = 0;

  for (const file of files) {
    const storagePath = `${
      book.storage_folder
    }/${String(
      nextPageNumber
    ).padStart(
      4,
      "0"
    )}-${randomToken()}.jpg`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from(BOOK_BUCKET)
      .upload(
        storagePath,
        file,
        {
          cacheControl: "3600",
          contentType:
            "image/jpeg",
          upsert: false,
        }
      );

    if (uploadError) {
      throw asError(
        uploadError,
        `Unable to upload ${file.name}.`
      );
    }

    const {
      error: rowError,
    } = await supabase
      .from("book_pages")
      .insert({
        book_id: book.id,
        storage_path:
          storagePath,
        file_name: file.name,
        page_number:
          nextPageNumber,
      });

    if (rowError) {
      await supabase.storage
        .from(BOOK_BUCKET)
        .remove([
          storagePath,
        ]);

      throw asError(
        rowError,
        `Unable to register ${file.name}.`
      );
    }

    nextPageNumber += 1;
    finished += 1;

    onProgress?.(
      finished,
      files.length
    );
  }

  return listBookPages(
    book.id
  );
}

async function normalizePageNumbers(
  bookId: string
): Promise<void> {
  const pages =
    await listBookPages(
      bookId
    );

  const updates = pages
    .map((page, index) => ({
      page,
      nextNumber: index + 1,
    }))
    .filter(
      ({
        page,
        nextNumber,
      }) =>
        page.page_number !==
        nextNumber
    )
    .map(
      ({
        page,
        nextNumber,
      }) =>
        supabase
          .from("book_pages")
          .update({
            page_number:
              nextNumber,
          })
          .eq("id", page.id)
    );

  const results =
    await Promise.all(
      updates
    );

  const failed =
    results.find(
      (result) =>
        result.error
    );

  if (failed?.error) {
    throw asError(
      failed.error,
      "Unable to renumber the pages."
    );
  }
}

export async function deleteBookPage(
  page: BookPage
): Promise<void> {
  const {
    error: storageError,
  } = await supabase.storage
    .from(BOOK_BUCKET)
    .remove([
      page.storage_path,
    ]);

  if (storageError) {
    throw asError(
      storageError,
      "Unable to delete the image from Storage."
    );
  }

  const {
    error: rowError,
  } = await supabase
    .from("book_pages")
    .delete()
    .eq("id", page.id);

  if (rowError) {
    throw asError(
      rowError,
      "The image was removed, but its database row remains."
    );
  }

  await normalizePageNumbers(
    page.book_id
  );
}

export async function moveBookPage(
  pages: BookPage[],
  pageIndex: number,
  direction: -1 | 1
): Promise<BookPage[]> {
  const otherIndex =
    pageIndex + direction;

  if (
    pageIndex < 0 ||
    otherIndex < 0 ||
    otherIndex >=
      pages.length
  ) {
    return pages;
  }

  const first =
    pages[pageIndex];

  const second =
    pages[otherIndex];

  const { error } =
    await supabase.rpc(
      "swap_book_pages",
      {
        p_first_page_id:
          first.id,

        p_second_page_id:
          second.id,
      }
    );

  if (error) {
    throw asError(
      error,
      "Unable to reorder the pages."
    );
  }

  return listBookPages(
    first.book_id
  );
}

export async function deleteBookAndFiles(
  book: Book
): Promise<void> {
  const pages =
    await listBookPages(
      book.id
    );

  const paths = pages.map(
    (page) =>
      page.storage_path
  );

  if (paths.length > 0) {
    const {
      error: storageError,
    } = await supabase.storage
      .from(BOOK_BUCKET)
      .remove(paths);

    if (storageError) {
      throw asError(
        storageError,
        "Unable to delete this book's image folder."
      );
    }
  }

  const {
    error: bookError,
  } = await supabase
    .from("books")
    .delete()
    .eq("id", book.id);

  if (bookError) {
    throw asError(
      bookError,
      "Unable to delete the book record."
    );
  }
}
