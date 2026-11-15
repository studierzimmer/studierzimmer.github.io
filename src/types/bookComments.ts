export type BookRichAlignment = "left" | "center" | "right" | "justify";
export interface BookRichRun { text: string; bold?: boolean; italic?: boolean }
export interface BookRichParagraph { align?: BookRichAlignment; runs: BookRichRun[] }
export interface BookRichDocument { version: 1; paragraphs: BookRichParagraph[] }

export interface BookComment {
  id: string;
  book_id: string;
  book_page_id: string;
  body: string;
  title?: string | null;
  anchor_x: number;
  anchor_y: number;
  created_by: string | null;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  background_color?: string;
  text_color?: string;
  background_opacity?: number;
  font_size?: number;
  rich_content?: BookRichDocument | null;
}

export interface CreateBookCommentInput {
  bookId: string;
  bookPageId: string;
  body: string;
  title?: string | null;
  anchorX: number;
  anchorY: number;
  backgroundColor?: string;
  textColor?: string;
  backgroundOpacity?: number;
  fontSize?: number;
  richContent?: BookRichDocument | null;
}
