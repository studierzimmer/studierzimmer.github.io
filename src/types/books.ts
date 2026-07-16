export type BookCategory = string;

export type BookPageFormat =
  | "a4_long_edge"
  | "a4_short_edge"
  | "square";

export interface Book {
  id: string;
  title: string;
  slug: string;
  storage_folder: string;
  category: BookCategory;
  description: string;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  page_format?: BookPageFormat;
  background_r?: number;
  background_g?: number;
  background_b?: number;
  created_at: string;
  updated_at: string;
}

export interface BookPage {
  id: string;
  book_id: string;
  storage_path: string;
  file_name: string;
  page_number: number;
  created_at: string;
  public_url: string;
}

export interface CreateBookInput {
  title: string;
  slug: string;
  category: BookCategory;
  description?: string;
  is_published?: boolean;
  sort_order?: number;
  page_format?: BookPageFormat;
}

export interface UpdateBookInput {
  title?: string;
  category?: BookCategory;
  description?: string;
  is_published?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  page_format?: BookPageFormat;
  background_r?: number;
  background_g?: number;
  background_b?: number;
}
