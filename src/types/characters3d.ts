export type CharacterAssetSource = "storage" | "bundled";

export interface Character3D {
  id: string;
  name: string;
  description: string;
  file_name: string;
  asset_source: CharacterAssetSource;
  storage_path: string | null;
  bundled_path: string | null;
  model_scale: number;
  camera_distance: number;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  public_url: string;
  is_virtual?: boolean;
}

export interface UpdateCharacter3DInput {
  name?: string;
  description?: string;
  model_scale?: number;
  camera_distance?: number;
  is_published?: boolean;
  is_featured?: boolean;
  sort_order?: number;
}
