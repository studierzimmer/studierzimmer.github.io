import {
  MODEL_BUCKET,
  supabase,
} from "@/lib/supabase";
import type {
  ThreeDModel,
  UpdateThreeDModelInput,
} from "@/types/threeDModels";

const MAX_MODEL_BYTES = 100 * 1024 * 1024;
const MODEL_URL_LIFETIME_SECONDS = 15 * 60;

type ThreeDModelRow = Omit<ThreeDModel, "public_url">;

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;

  if (
    typeof error === "object" &&
    error &&
    "message" in error
  ) {
    return new Error(String((error as { message: unknown }).message));
  }

  return new Error(fallback);
}

async function signedUrlFor(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(MODEL_BUCKET)
    .createSignedUrl(storagePath, MODEL_URL_LIFETIME_SECONDS);

  if (error) {
    throw asError(error, "Unable to authorize the 3D model preview.");
  }

  return data.signedUrl;
}

async function mapModel(row: ThreeDModelRow): Promise<ThreeDModel> {
  return {
    ...row,
    public_url: await signedUrlFor(row.storage_path),
  };
}

function safeFolderName(value: string): string {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "model";
}

function randomToken(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function modelFileExtension(file: File): "glb" | "stl" {
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith(".glb")) return "glb";
  if (lowerName.endsWith(".stl")) return "stl";

  throw new Error("Choose a .glb or .stl model file.");
}

function validateModelFile(file: File): "glb" | "stl" {
  const extension = modelFileExtension(file);

  if (file.size > MAX_MODEL_BYTES) {
    throw new Error("The model file is larger than 100 MB.");
  }

  return extension;
}

async function uploadModelFile(name: string, file: File): Promise<string> {
  const extension = validateModelFile(file);

  const storagePath = `${safeFolderName(name)}/${Date.now()}-${randomToken()}.${extension}`;
  const { error } = await supabase.storage
    .from(MODEL_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      contentType: extension === "stl" ? "model/stl" : "model/gltf-binary",
      upsert: false,
    });

  if (error) {
    throw asError(error, `Unable to upload ${file.name}.`);
  }

  return storagePath;
}

export async function listPublishedThreeDModels(): Promise<ThreeDModel[]> {
  const { data, error } = await supabase
    .from("models_3d")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw asError(error, "Unable to load the 3D models.");
  }

  return Promise.all(((data ?? []) as ThreeDModelRow[]).map(mapModel));
}

export async function listAllThreeDModelsForAdmin(): Promise<ThreeDModel[]> {
  const { data, error } = await supabase
    .from("models_3d")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw asError(error, "Unable to load the admin 3D model list.");
  }

  return Promise.all(((data ?? []) as ThreeDModelRow[]).map(mapModel));
}

export async function createThreeDModel(
  name: string,
  file: File,
  sortOrder: number
): Promise<ThreeDModel> {
  const cleanName = name.trim() || file.name.replace(/\.(?:glb|stl)$/i, "");
  const storagePath = await uploadModelFile(cleanName, file);

  const { data, error } = await supabase
    .from("models_3d")
    .insert({
      name: cleanName,
      description: "",
      file_name: file.name,
      storage_path: storagePath,
      is_published: false,
      is_featured: false,
      sort_order: sortOrder,
    })
    .select("*")
    .single();

  if (error) {
    await supabase.storage.from(MODEL_BUCKET).remove([storagePath]);
    throw asError(error, "Unable to register the 3D model.");
  }

  return await mapModel(data as ThreeDModelRow);
}

export async function updateThreeDModel(
  id: string,
  input: UpdateThreeDModelInput
): Promise<ThreeDModel> {
  const { data, error } = await supabase
    .from("models_3d")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw asError(error, "Unable to save the 3D model settings.");
  }

  return await mapModel(data as ThreeDModelRow);
}

export async function setFeaturedThreeDModel(id: string): Promise<void> {
  const { error: clearError } = await supabase
    .from("models_3d")
    .update({ is_featured: false })
    .eq("is_featured", true);

  if (clearError) {
    throw asError(clearError, "Unable to clear the featured 3D model.");
  }

  const { error } = await supabase
    .from("models_3d")
    .update({ is_featured: true, is_published: true })
    .eq("id", id);

  if (error) {
    throw asError(error, "Unable to feature this 3D model.");
  }
}

export async function replaceThreeDModelFile(
  model: ThreeDModel,
  file: File
): Promise<ThreeDModel> {
  const nextPath = await uploadModelFile(model.name, file);
  const { data, error } = await supabase
    .from("models_3d")
    .update({
      file_name: file.name,
      storage_path: nextPath,
    })
    .eq("id", model.id)
    .select("*")
    .single();

  if (error) {
    await supabase.storage.from(MODEL_BUCKET).remove([nextPath]);
    throw asError(error, "Unable to replace the 3D model.");
  }

  await supabase.storage.from(MODEL_BUCKET).remove([model.storage_path]);
  return await mapModel(data as ThreeDModelRow);
}

export async function deleteThreeDModel(model: ThreeDModel): Promise<void> {
  const { error: storageError } = await supabase.storage
    .from(MODEL_BUCKET)
    .remove([model.storage_path]);

  if (storageError) {
    throw asError(storageError, "Unable to delete the model file from Storage.");
  }

  const { error } = await supabase
    .from("models_3d")
    .delete()
    .eq("id", model.id);

  if (error) {
    throw asError(error, "The model file was deleted, but its database row remains.");
  }
}
