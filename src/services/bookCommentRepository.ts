import { supabase } from "@/lib/supabase";
import type {
  BookComment,
  CreateBookCommentInput,
} from "@/types/bookComments";

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;
  if (typeof error === "object" && error && "message" in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error(fallback);
}

function isMissingCommentsSchema(error: unknown): boolean {
  const message =
    typeof error === "object" && error && "message" in error
      ? String((error as { message: unknown }).message)
      : String(error);

  return /book_comments|schema cache|does not exist|could not find/i.test(
    message
  );
}

export async function listVisibleBookComments(
  bookId: string
): Promise<BookComment[]> {
  const { data, error } = await supabase
    .from("book_comments")
    .select("*")
    .eq("book_id", bookId)
    .eq("is_visible", true)
    .order("created_at", { ascending: true });

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
}

export async function createBookComment(
  input: CreateBookCommentInput
): Promise<BookComment> {
  const body = input.body.trim();
  if (!body) throw new Error("Write a comment first.");
  if (body.length > 600) {
    throw new Error("Comments can contain at most 600 characters.");
  }

  const { data: authData, error: authError } =
    await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Administrator login required.");
  }

  const { data, error } = await supabase
    .from("book_comments")
    .insert({
      book_id: input.bookId,
      book_page_id: input.bookPageId,
      body,
      anchor_x: Math.min(1, Math.max(0, input.anchorX)),
      anchor_y: Math.min(1, Math.max(0, input.anchorY)),
      created_by: authData.user.id,
      is_visible: true,
    })
    .select("*")
    .single();

  if (error) {
    throw asError(
      error,
      "Unable to create the comment. Run the book comments SQL migration first."
    );
  }

  return data as BookComment;
}

export async function deleteBookComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from("book_comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw asError(error, "Unable to delete the comment.");
  }
}
