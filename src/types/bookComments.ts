export interface BookComment {
  id: string;
  book_id: string;
  book_page_id: string;
  body: string;
  anchor_x: number;
  anchor_y: number;
  created_by: string | null;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBookCommentInput {
  bookId: string;
  bookPageId: string;
  body: string;
  anchorX: number;
  anchorY: number;
}
