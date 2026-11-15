import { supabase } from "@/lib/supabase";
import { isBuiltInBook } from "@/services/bookRepository";
import type {
  BookComment,
  CreateBookCommentInput,
  BookRichDocument,
} from "@/types/bookComments";
import { bookRichText, hasBookRichFormatting, validateBookRichDocument } from "@/lib/bookRichText";

const DEFAULT_BACKGROUND_COLOR = "#DDE2E5";
const DEFAULT_TEXT_COLOR = "#414A51";
const DEFAULT_BACKGROUND_OPACITY = .75;
const DEFAULT_FONT_SIZE = 14;

function validatedCommentBody(value: string): string {
  const body = value.trim();
  if (!body) throw new Error("Write a comment first.");
  if (body.length > 600) throw new Error("Comments can contain at most 600 characters.");
  return body;
}

function normalizedCommentTitle(value?: string | null): string | null {
  if (value == null) return null;
  if (typeof value !== "string") throw new Error("Inserisci un titolo valido per il commento.");
  const title = value.trim();
  if (title.length > 120) throw new Error("Il titolo del commento può contenere al massimo 120 caratteri.");
  return title || null;
}

function validateCommentColors(backgroundColor?: string, textColor?: string): void {
  if ([backgroundColor, textColor].some((color) => color !== undefined && !/^#[0-9a-f]{6}$/i.test(color))) {
    throw new Error("Scegli colori validi per il balloon e il testo.");
  }
}

function validateCommentOpacity(opacity?: number): void {
  if (opacity !== undefined && (!Number.isFinite(opacity) || opacity < .15 || opacity > 1)) throw new Error("Scegli una trasparenza dello sfondo fra 15% e 100%.");
}

function validateCommentFontSize(fontSize?: number): void {
  if (fontSize !== undefined && (!Number.isFinite(fontSize) || fontSize < 10 || fontSize > 48)) throw new Error("Scegli una dimensione del testo fra 10 e 48 px.");
}

function validatedAnchor(value: number): number {
  if (!Number.isFinite(value)) throw new Error("Scegli una posizione valida per il commento.");
  return Math.min(1, Math.max(0, value));
}

function usesDefaultCommentStyle(backgroundColor?: string, textColor?: string, backgroundOpacity?: number, fontSize?: number): boolean {
  return (backgroundColor ?? DEFAULT_BACKGROUND_COLOR).toUpperCase() === DEFAULT_BACKGROUND_COLOR && (textColor ?? DEFAULT_TEXT_COLOR).toUpperCase() === DEFAULT_TEXT_COLOR && (backgroundOpacity ?? DEFAULT_BACKGROUND_OPACITY) === DEFAULT_BACKGROUND_OPACITY && (fontSize ?? DEFAULT_FONT_SIZE) === DEFAULT_FONT_SIZE;
}

const colorMigrationError = () => new Error("Applica prima la migrazione 20261114010000_comment_colors.sql in Supabase per salvare titoli, colori, trasparenza o dimensione del testo personalizzati.");

function announceCommentChange(bookId?: string): void {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("book-comments-changed", { detail: { bookId } }));
}

async function requireCommentUser(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Administrator login required.");
  return data.user.id;
}

function isMissingCommentStyleColumn(error: unknown): boolean {
  if (typeof error !== "object" || !error) return false;
  const { code, message } = error as { code?: unknown; message?: unknown };
  if (typeof message !== "string") return false;
  if (code === "PGRST204") {
    return /could not find the ['"](?:background_color|text_color|background_opacity|font_size|title)['"] column of ['"]book_comments['"] in the schema cache/i.test(message);
  }
  return code === "42703" && /column (?:(?:"?book_comments"?)\.)?"?(?:background_color|text_color|background_opacity|font_size|title)"?(?: of relation "?book_comments"?)? does not exist/i.test(message);
}

function isMissingRichColumn(error: unknown): boolean {
  if (typeof error !== "object" || !error) return false;
  const { code, message } = error as { code?: unknown; message?: unknown };
  return typeof message === "string" && ((code === "PGRST204" && /could not find the ['"]rich_content['"] column of ['"]book_comments['"] in the schema cache/i.test(message)) || (code === "42703" && /column (?:(?:"?book_comments"?)\.)?"?rich_content"?(?: of relation "?book_comments"?)? does not exist/i.test(message)));
}

function richPatch(value: BookRichDocument | null | undefined, body: string, creating: boolean): Record<string, unknown> {
  if (value === undefined) return {};
  if (value === null) return creating ? {} : { rich_content: null };
  const document = validateBookRichDocument(value);
  if (bookRichText(document).trim() !== body) throw new Error("Il testo formattato deve corrispondere al testo del commento.");
  return hasBookRichFormatting(document) ? { rich_content: document } : creating ? {} : { rich_content: null };
}

async function persistComment(
  write: (payload: Record<string, unknown>) => PromiseLike<{ data: unknown; error: unknown }>,
  base: Record<string, unknown>, metadata: Record<string, unknown>, rich: Record<string, unknown>, defaultMetadata: boolean
): Promise<BookComment> {
  let payload = { ...base, ...metadata, ...rich };
  let removedRich = false, removedMetadata = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, error } = await write(payload);
    if (!error) return data as BookComment;
    if (isMissingRichColumn(error) && Object.prototype.hasOwnProperty.call(payload, "rich_content") && !removedRich) {
      if (payload.rich_content !== null) throw new Error("Applica la migrazione 20261115010000_comment_rich_content.sql in Supabase per salvare la formattazione del commento.");
      const { rich_content: _rich, ...plain } = payload;
      payload = plain; removedRich = true; continue;
    }
    if (isMissingCommentStyleColumn(error) && !removedMetadata) {
      if (!defaultMetadata) throw colorMigrationError();
      payload = { ...base, ...(Object.prototype.hasOwnProperty.call(payload, "rich_content") ? { rich_content: payload.rich_content } : {}) };
      removedMetadata = true; continue;
    }
    throw asError(error, "Unable to save the comment.");
  }
  throw new Error("Unable to save the comment. Check the comment SQL migrations.");
}

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;
  if (typeof error === "object" && error && "message" in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error(fallback);
}

function isMissingCommentsSchema(error: unknown): boolean {
  if (typeof error !== "object" || !error) return false;
  const { code, message } = error as { code?: unknown; message?: unknown };
  if (typeof message !== "string") return false;
  return (code === "PGRST205" && /could not find the table ['"](?:public\.)?book_comments['"] in the schema cache/i.test(message)) || (code === "42P01" && /relation ['"](?:public\.)?book_comments['"] does not exist/i.test(message));
}

export async function listVisibleBookComments(
  bookId: string
): Promise<BookComment[]> {
  if (isBuiltInBook(bookId)) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const { data, error } = await supabase
      .from("book_comments")
      .select("*")
      .eq("book_id", bookId)
      .eq("is_visible", true)
      .order("created_at", { ascending: true })
      .abortSignal(controller.signal);

    if (error) {
      if (isMissingCommentsSchema(error)) {
        console.info(
          "Book comments are disabled until the book_comments SQL migration is run."
        );
        return [];
      }

      throw asError(error, "Unable to load book comments.");
    }

    return (data ?? []) as BookComment[];
  } finally {
    clearTimeout(timer);
  }
}

export async function createBookComment(
  input: CreateBookCommentInput
): Promise<BookComment> {
  if (isBuiltInBook(input.bookId)) {
    throw new Error("La copia locale è in sola lettura. Ricollega Supabase per aggiungere commenti.");
  }

  const body = validatedCommentBody(input.body);
  const rich = richPatch(input.richContent, body, true);
  const title = normalizedCommentTitle(input.title);
  const backgroundColor = input.backgroundColor ?? DEFAULT_BACKGROUND_COLOR;
  const textColor = input.textColor ?? DEFAULT_TEXT_COLOR;
  const backgroundOpacity = input.backgroundOpacity ?? DEFAULT_BACKGROUND_OPACITY;
  const fontSize = input.fontSize ?? DEFAULT_FONT_SIZE;
  validateCommentColors(backgroundColor, textColor);
  validateCommentOpacity(backgroundOpacity);
  validateCommentFontSize(fontSize);
  const anchorX = validatedAnchor(input.anchorX);
  const anchorY = validatedAnchor(input.anchorY);
  const userId = await requireCommentUser();

  const comment = {
    book_id: input.bookId,
    book_page_id: input.bookPageId,
    body,
    anchor_x: anchorX,
    anchor_y: anchorY,
    created_by: userId,
    is_visible: true,
  };
  return persistComment((payload) => supabase
    .from("book_comments")
    .insert(payload)
    .select("*")
    .single(), comment, {
      ...(title === null ? {} : { title }),
      background_color: backgroundColor,
      text_color: textColor,
      background_opacity: backgroundOpacity,
      font_size: fontSize,
    }, rich, title === null && usesDefaultCommentStyle(backgroundColor, textColor, backgroundOpacity, fontSize));
}

export async function listAdminBookComments(bookId?: string): Promise<BookComment[]> {
  await requireCommentUser();
  if (bookId && isBuiltInBook(bookId)) return [];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const comments = new Map<string, BookComment>();
    const pageSize = 500;
    for (let offset = 0; ; offset += pageSize) {
      let query = supabase.from("book_comments").select("*").order("created_at", { ascending: false }).order("id", { ascending: false }).range(offset, offset + pageSize - 1);
      if (bookId) query = query.eq("book_id", bookId);
      const { data, error } = await query.abortSignal(controller.signal);
      if (error) throw asError(error, "Unable to load book comments.");
      const batch = (data ?? []) as BookComment[];
      batch.forEach((comment) => comments.set(comment.id, comment));
      if (batch.length < pageSize) return [...comments.values()];
    }
  } finally {
    clearTimeout(timer);
  }
}

export async function updateBookComment(
  commentId: string,
  input: { body: string; title?: string | null; richContent?: BookRichDocument | null; backgroundColor?: string; textColor?: string; backgroundOpacity?: number; fontSize?: number; anchorX?: number; anchorY?: number; isVisible?: boolean }
): Promise<BookComment> {
  const body = validatedCommentBody(input.body);
  const rich = richPatch(input.richContent, body, false);
  const title = normalizedCommentTitle(input.title);
  validateCommentColors(input.backgroundColor, input.textColor);
  validateCommentOpacity(input.backgroundOpacity);
  validateCommentFontSize(input.fontSize);
  const anchors = {
    ...(input.anchorX === undefined ? {} : { anchor_x: validatedAnchor(input.anchorX) }),
    ...(input.anchorY === undefined ? {} : { anchor_y: validatedAnchor(input.anchorY) }),
  };
  await requireCommentUser();
  const comment = { body, ...anchors, ...(input.isVisible === undefined ? {} : { is_visible: input.isVisible }) };
  const saved = await persistComment((payload) => supabase.from("book_comments").update(payload).eq("id", commentId).select("*").single(), comment, {
    ...(input.title === undefined ? {} : { title }),
    ...(input.backgroundColor === undefined ? {} : { background_color: input.backgroundColor }),
    ...(input.textColor === undefined ? {} : { text_color: input.textColor }),
    ...(input.backgroundOpacity === undefined ? {} : { background_opacity: input.backgroundOpacity }),
    ...(input.fontSize === undefined ? {} : { font_size: input.fontSize }),
  }, rich, title === null && usesDefaultCommentStyle(input.backgroundColor, input.textColor, input.backgroundOpacity, input.fontSize));
  announceCommentChange(saved.book_id);
  return saved;
}

export async function deleteBookComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from("book_comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw asError(error, "Unable to delete the comment.");
  }
  announceCommentChange();
}
