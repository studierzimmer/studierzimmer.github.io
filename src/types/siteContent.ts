import type { OceanEnvironmentSettings } from "./oceanEnvironment";

export type MenuKey =
  | "bio"
  | "sketches"
  | "artworks"
  | "horlogerie"
  | "jewelry"
  | "fashion"
  | "models"
  | "featured"
  | "navigate";

export interface MenuItem {
  id: MenuKey;
  label: string;
  image_url: string | null;
  visible: boolean;
}

export type ModelCategory = "horlogerie" | "jewelry" | "models";

export interface SiteSettings {
  id: "main";
  splash_logo_url: string | null;
  menu_items: MenuItem[];
  menu_font_family: string;
  menu_font_size: number;
  menu_color: string;
  menu_background_color?: string;
  menu_letter_spacing: number;
  sketches_book_list_label?: string;
  bio_text: string;
  bio_font_family: string;
  bio_font_size: number;
  bio_color: string;
  bio_background_color?: string;
  bio_line_height: number;
  bio_text_align: "left" | "center" | "justify";
  model_categories: Record<string, ModelCategory>;
  ocean_title?: string;
  ocean_subtitle?: string;
  ocean_about?: string;
  ocean_text_color?: string | null;
  ocean_background_color?: string | null;
  ocean_environment?: OceanEnvironmentSettings;
}

export interface ArtworkItem {
  id: string;
  title: string;
  year: number;
  kind: "image" | "video" | "model";
  media_url: string;
  poster_url: string | null;
  model_id: string | null;
  is_fashion: boolean;
  is_published: boolean;
  sort_order: number;
  description: string;
  is_featured_in?: boolean;
  external_url?: string | null;
}

export type ContentSource = "local" | "remote" | "default";
