export interface ThreeDModel {
  id: string;
  name: string;
  description: string;
  file_name: string;
  storage_path: string;
  source_file_name: string | null;
  source_storage_path: string | null;
  source_format: "step" | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  plaster_color: string;
  created_at: string;
  updated_at: string;
  public_url: string;
}

export interface UpdateThreeDModelInput {
  name?: string;
  description?: string;
  is_published?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  plaster_color?: string;
}
