import { CHARACTER_BUCKET, supabase } from "@/lib/supabase";
import type {
  Character3D,
  UpdateCharacter3DInput,
} from "@/types/characters3d";

const MAX_CHARACTER_BYTES = 100 * 1024 * 1024;
const CHARACTER_URL_LIFETIME_SECONDS = 15 * 60;
const PIRATE_SHIP_ASSET_VERSION = "20260726-15";
const CESSNA_ASSET_VERSION = "20260726-5";

type CharacterRow = Omit<Character3D, "public_url" | "is_virtual">;

export type CharacterTransferProgress = {
  percent: number;
  label: string;
};

export type CharacterTransferCallback = (
  progress: CharacterTransferProgress
) => void;

const bundledDefaults: Character3D[] = [
  {
    id: "bundled:wolfy",
    name: "Wolfy",
    description: "The original Studierzimmer ocean character.",
    file_name: "wolfy.glb",
    asset_source: "bundled",
    storage_path: null,
    bundled_path: "wolfy.glb",
    model_scale: 10,
    camera_distance: 70,
    is_published: true,
    is_featured: true,
    sort_order: 0,
    created_at: "2026-07-26T00:00:00.000Z",
    updated_at: "2026-07-26T00:00:00.000Z",
    public_url: bundledUrl("wolfy.glb"),
    is_virtual: true,
  },
  {
    id: "bundled:pirate-sailing-ship",
    name: "Pirate sailing ship",
    description:
      "A wooden sailing ship with full white sails and a small pirate flag.",
    file_name: "pirate-sailing-ship.glb",
    asset_source: "bundled",
    storage_path: null,
    bundled_path: "pirate-sailing-ship.glb",
    model_scale: 3.4,
    camera_distance: 105,
    is_published: true,
    is_featured: false,
    sort_order: 1,
    created_at: "2026-07-26T00:00:00.000Z",
    updated_at: "2026-07-26T00:00:00.000Z",
    public_url: bundledUrl("pirate-sailing-ship.glb"),
    is_virtual: true,
  },
  {
    id: "bundled:cessna-aircraft",
    name: "Cessna aircraft",
    description:
      "A polished light aircraft with a looping animated propeller.",
    file_name: "cessna-aircraft.glb",
    asset_source: "bundled",
    storage_path: null,
    bundled_path: "cessna-aircraft.glb",
    model_scale: 3.6,
    camera_distance: 100,
    is_published: true,
    is_featured: false,
    sort_order: 2,
    created_at: "2026-07-26T00:00:00.000Z",
    updated_at: "2026-07-26T00:00:00.000Z",
    public_url: bundledUrl("cessna-aircraft.glb"),
    is_virtual: true,
  },
];

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;
  if (typeof error === "object" && error && "message" in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error(fallback);
}

function bundledUrl(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  const version =
    cleanPath === "pirate-sailing-ship.glb"
      ? `?v=${PIRATE_SHIP_ASSET_VERSION}`
      : cleanPath === "cessna-aircraft.glb"
        ? `?v=${CESSNA_ASSET_VERSION}`
      : "";
  return `${import.meta.env.BASE_URL}${cleanPath}${version}`;
}

async function mapCharacter(row: CharacterRow): Promise<Character3D> {
  if (row.asset_source === "bundled" && row.bundled_path) {
    return {
      ...row,
      public_url: bundledUrl(row.bundled_path),
    };
  }

  if (!row.storage_path) {
    throw new Error(`${row.name} has no character file.`);
  }

  const { data, error } = await supabase.storage
    .from(CHARACTER_BUCKET)
    .createSignedUrl(row.storage_path, CHARACTER_URL_LIFETIME_SECONDS);

  if (error) {
    throw asError(error, `Unable to authorize ${row.name}.`);
  }

  return {
    ...row,
    public_url: data.signedUrl,
  };
}

function mergeBundledDefaults(rows: Character3D[]): Character3D[] {
  const knownPaths = new Set(
    rows
      .filter((row) => row.asset_source === "bundled")
      .map((row) => row.bundled_path)
  );

  return [...rows, ...bundledDefaults.filter((row) => !knownPaths.has(row.bundled_path))]
    .sort(
      (a, b) =>
        Number(b.is_featured) - Number(a.is_featured) ||
        a.sort_order - b.sort_order ||
        a.name.localeCompare(b.name)
    );
}

function safeFolderName(value: string): string {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "character";
}

function randomToken(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function extensionFor(file: File): "glb" | "gltf" {
  const extension = file.name.toLowerCase().match(/\.(glb|gltf)$/)?.[1];
  if (extension !== "glb" && extension !== "gltf") {
    throw new Error("Choose a .glb or self-contained .gltf character file.");
  }
  if (file.size > MAX_CHARACTER_BYTES) {
    throw new Error("The character file is larger than 100 MB.");
  }
  return extension;
}

async function validateSelfContainedGltf(file: File): Promise<void> {
  if (extensionFor(file) !== "gltf") return;

  let json: {
    buffers?: Array<{ uri?: string }>;
    images?: Array<{ uri?: string }>;
  };
  try {
    json = JSON.parse(await file.text()) as typeof json;
  } catch {
    throw new Error("The .gltf file is not valid JSON.");
  }

  const externalUri = [...(json.buffers ?? []), ...(json.images ?? [])].find(
    (entry) =>
      entry.uri &&
      !entry.uri.startsWith("data:") &&
      !entry.uri.startsWith("blob:")
  );
  if (externalUri) {
    throw new Error(
      "This .gltf references external files. Export it as one .glb, or embed every buffer and texture."
    );
  }
}

async function uploadCharacterFile(
  name: string,
  file: File,
  onProgress?: CharacterTransferCallback
): Promise<string> {
  const extension = extensionFor(file);
  await validateSelfContainedGltf(file);
  const storagePath = `${safeFolderName(name)}/${Date.now()}-${randomToken()}.${extension}`;
  onProgress?.({ percent: 12, label: "UPLOADING CHARACTER" });

  const { error } = await supabase.storage
    .from(CHARACTER_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      contentType:
        extension === "glb" ? "model/gltf-binary" : "model/gltf+json",
      upsert: false,
    });

  if (error) throw asError(error, `Unable to upload ${file.name}.`);
  onProgress?.({ percent: 82, label: "REGISTERING CHARACTER" });
  return storagePath;
}

async function removeStoredCharacter(path: string | null): Promise<void> {
  if (!path) return;
  const { error } = await supabase.storage
    .from(CHARACTER_BUCKET)
    .remove([path]);
  if (error) {
    throw asError(error, "Unable to remove the previous character file.");
  }
}

export async function listPublishedCharacters(): Promise<Character3D[]> {
  const { data, error } = await supabase
    .from("characters_3d")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    if (
      /characters_3d|schema cache|does not exist/i.test(error.message ?? "")
    ) {
      return bundledDefaults;
    }
    throw asError(error, "Unable to load the character list.");
  }

  const mapped = await Promise.all(
    ((data ?? []) as CharacterRow[]).map(mapCharacter)
  );
  return mergeBundledDefaults(mapped);
}

export async function listAllCharactersForAdmin(): Promise<Character3D[]> {
  const { data, error } = await supabase
    .from("characters_3d")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw asError(error, "Unable to load the admin character list.");
  }

  const mapped = await Promise.all(
    ((data ?? []) as CharacterRow[]).map(mapCharacter)
  );
  return mergeBundledDefaults(mapped);
}

export async function ensureBundledCharactersForAdmin(): Promise<void> {
  const { data, error } = await supabase
    .from("characters_3d")
    .select("bundled_path")
    .eq("asset_source", "bundled");

  if (error) {
    throw asError(error, "Unable to inspect bundled characters.");
  }

  const existing = new Set(
    ((data ?? []) as Array<{ bundled_path: string | null }>).map(
      (row) => row.bundled_path
    )
  );
  const missing = bundledDefaults
    .filter((character) => !existing.has(character.bundled_path))
    .map((character) => ({
      name: character.name,
      description: character.description,
      file_name: character.file_name,
      asset_source: "bundled" as const,
      storage_path: null,
      bundled_path: character.bundled_path,
      model_scale: character.model_scale,
      camera_distance: character.camera_distance,
      is_published: character.is_published,
      is_featured: character.is_featured && existing.size === 0,
      sort_order: character.sort_order,
    }));

  if (missing.length === 0) return;
  const { error: insertError } = await supabase
    .from("characters_3d")
    .insert(missing);
  if (insertError) {
    throw asError(insertError, "Unable to register bundled characters.");
  }
}

export async function createCharacter(
  name: string,
  file: File,
  sortOrder: number,
  onProgress?: CharacterTransferCallback
): Promise<Character3D> {
  const cleanName = name.trim() || file.name.replace(/\.(?:glb|gltf)$/i, "");
  const storagePath = await uploadCharacterFile(cleanName, file, onProgress);
  const { data, error } = await supabase
    .from("characters_3d")
    .insert({
      name: cleanName,
      description: "",
      file_name: file.name,
      asset_source: "storage",
      storage_path: storagePath,
      bundled_path: null,
      model_scale: 10,
      camera_distance: 70,
      is_published: false,
      is_featured: false,
      sort_order: sortOrder,
    })
    .select("*")
    .single();

  if (error) {
    await removeStoredCharacter(storagePath).catch(() => undefined);
    throw asError(error, "Unable to register the character.");
  }

  onProgress?.({ percent: 100, label: "CHARACTER READY" });
  return mapCharacter(data as CharacterRow);
}

export async function updateCharacter(
  id: string,
  input: UpdateCharacter3DInput
): Promise<Character3D> {
  const { data, error } = await supabase
    .from("characters_3d")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw asError(error, "Unable to save the character settings.");
  return mapCharacter(data as CharacterRow);
}

export async function setFeaturedCharacter(id: string): Promise<void> {
  const { error: clearError } = await supabase
    .from("characters_3d")
    .update({ is_featured: false })
    .eq("is_featured", true);
  if (clearError) {
    throw asError(clearError, "Unable to clear the featured character.");
  }

  const { error } = await supabase
    .from("characters_3d")
    .update({ is_featured: true, is_published: true })
    .eq("id", id);
  if (error) throw asError(error, "Unable to feature this character.");
}

export async function replaceCharacterFile(
  character: Character3D,
  file: File,
  onProgress?: CharacterTransferCallback
): Promise<Character3D> {
  const storagePath = await uploadCharacterFile(character.name, file, onProgress);
  const { data, error } = await supabase
    .from("characters_3d")
    .update({
      file_name: file.name,
      asset_source: "storage",
      storage_path: storagePath,
      bundled_path: null,
    })
    .eq("id", character.id)
    .select("*")
    .single();

  if (error) {
    await removeStoredCharacter(storagePath).catch(() => undefined);
    throw asError(error, "Unable to replace the character file.");
  }

  if (character.asset_source === "storage") {
    await removeStoredCharacter(character.storage_path);
  }
  onProgress?.({ percent: 100, label: "CHARACTER READY" });
  return mapCharacter(data as CharacterRow);
}

export async function deleteCharacter(character: Character3D): Promise<void> {
  if (character.is_virtual || character.asset_source === "bundled") {
    throw new Error("Bundled characters can be replaced, but not deleted.");
  }

  const { error } = await supabase
    .from("characters_3d")
    .delete()
    .eq("id", character.id);
  if (error) throw asError(error, "Unable to delete the character.");
  await removeStoredCharacter(character.storage_path);
}
