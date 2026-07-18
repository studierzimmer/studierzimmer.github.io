import { MODEL_BUCKET, supabase } from "@/lib/supabase";
import {
  convertStepToGlb,
  isStepFile,
  type ModelProcessingCallback,
} from "@/services/stepModelConverter";
import type {
  ThreeDModel,
  UpdateThreeDModelInput,
} from "@/types/threeDModels";

const MAX_MODEL_BYTES = 100 * 1024 * 1024;
const MODEL_URL_LIFETIME_SECONDS = 15 * 60;
const PUBLIC_MODEL_COLUMNS = [
  "id",
  "name",
  "description",
  "file_name",
  "storage_path",
  "is_published",
  "is_featured",
  "is_watch",
  "sort_order",
  "plaster_color",
  "hdri_file_name",
  "hdri_storage_path",
  "created_at",
  "updated_at",
].join(",");
const LEGACY_PUBLIC_MODEL_COLUMNS = PUBLIC_MODEL_COLUMNS.replace(",is_watch", "");

type ModelFileExtension = "glb" | "stl" | "step" | "stp";
type ThreeDModelRow = Omit<ThreeDModel, "public_url" | "hdri_public_url">;

interface PreparedModelFiles {
  previewFile: File;
  sourceFile: File | null;
  sourceFormat: "step" | null;
}

interface UploadedModelFiles {
  fileName: string;
  storagePath: string;
  sourceFileName: string | null;
  sourceStoragePath: string | null;
  sourceFormat: "step" | null;
}

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;

  if (typeof error === "object" && error && "message" in error) {
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
  const [publicUrl, hdriPublicUrl] = await Promise.all([
    signedUrlFor(row.storage_path),
    row.hdri_storage_path ? signedUrlFor(row.hdri_storage_path) : null,
  ]);

  return {
    ...row,
    source_file_name: row.source_file_name ?? null,
    source_storage_path: row.source_storage_path ?? null,
    source_format: row.source_format ?? null,
    hdri_file_name: row.hdri_file_name ?? null,
    hdri_storage_path: row.hdri_storage_path ?? null,
    is_watch: row.is_watch ?? false,
    public_url: publicUrl,
    hdri_public_url: hdriPublicUrl,
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

function modelFileExtension(file: File): ModelFileExtension {
  const extension = file.name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1];

  if (
    extension === "glb" ||
    extension === "stl" ||
    extension === "step" ||
    extension === "stp"
  ) {
    return extension;
  }

  throw new Error("Choose a .glb, .stl, .step or .stp model file.");
}

function validateModelFile(file: File): ModelFileExtension {
  const extension = modelFileExtension(file);

  if (file.size > MAX_MODEL_BYTES) {
    throw new Error("The model file is larger than 100 MB.");
  }

  return extension;
}

function contentTypeFor(extension: ModelFileExtension): string {
  if (extension === "stl") return "model/stl";
  if (extension === "step" || extension === "stp") return "application/step";
  return "model/gltf-binary";
}

async function uploadStoredFile(
  name: string,
  file: File,
  directory: "preview" | "source"
): Promise<string> {
  const extension = validateModelFile(file);
  const storagePath = `${safeFolderName(name)}/${directory}/${Date.now()}-${randomToken()}.${extension}`;
  const { error } = await supabase.storage
    .from(MODEL_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      contentType: contentTypeFor(extension),
      upsert: false,
    });

  if (error) {
    throw asError(error, `Unable to upload ${file.name}.`);
  }

  return storagePath;
}

async function removeStoragePaths(paths: Array<string | null>): Promise<void> {
  const uniquePaths = [...new Set(paths.filter((path): path is string => Boolean(path)))];
  if (uniquePaths.length === 0) return;

  const { error } = await supabase.storage.from(MODEL_BUCKET).remove(uniquePaths);
  if (error) {
    throw asError(error, "Unable to delete one or more model files from Storage.");
  }
}

async function prepareModelFiles(
  file: File,
  onProgress?: ModelProcessingCallback
): Promise<PreparedModelFiles> {
  validateModelFile(file);

  if (!isStepFile(file)) {
    onProgress?.({ percent: 72, label: "MODEL FILE READY" });
    return { previewFile: file, sourceFile: null, sourceFormat: null };
  }

  const previewFile = await convertStepToGlb(file, onProgress);
  return { previewFile, sourceFile: file, sourceFormat: "step" };
}

async function uploadPreparedModelFiles(
  name: string,
  files: PreparedModelFiles,
  onProgress?: ModelProcessingCallback
): Promise<UploadedModelFiles> {
  const uploadedPaths: string[] = [];

  try {
    onProgress?.({ percent: 86, label: "UPLOADING GLB PREVIEW" });
    const storagePath = await uploadStoredFile(name, files.previewFile, "preview");
    uploadedPaths.push(storagePath);

    let sourceStoragePath: string | null = null;
    if (files.sourceFile) {
      onProgress?.({ percent: 93, label: "STORING PRIVATE STEP SOURCE" });
      sourceStoragePath = await uploadStoredFile(name, files.sourceFile, "source");
      uploadedPaths.push(sourceStoragePath);
    }

    return {
      fileName: files.previewFile.name,
      storagePath,
      sourceFileName: files.sourceFile?.name ?? null,
      sourceStoragePath,
      sourceFormat: files.sourceFormat,
    };
  } catch (error) {
    await removeStoragePaths(uploadedPaths).catch(() => undefined);
    throw error;
  }
}

export async function listPublishedThreeDModels(): Promise<ThreeDModel[]> {
  let response = await supabase
    .from("models_3d")
    .select(PUBLIC_MODEL_COLUMNS)
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  // Keep existing published models available locally until the watch migration
  // has been applied to Supabase.
  if (response.error?.message.includes("is_watch")) {
    response = await supabase
      .from("models_3d")
      .select(LEGACY_PUBLIC_MODEL_COLUMNS)
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
  }

  const { data, error } = response;

  if (error) {
    throw asError(error, "Unable to load the 3D models.");
  }

  return Promise.all(((data ?? []) as unknown as ThreeDModelRow[]).map(mapModel));
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
  sortOrder: number,
  onProgress?: ModelProcessingCallback
): Promise<ThreeDModel> {
  const cleanName =
    name.trim() || file.name.replace(/\.(?:glb|stl|step|stp)$/i, "");
  const preparedFiles = await prepareModelFiles(file, onProgress);
  const uploaded = await uploadPreparedModelFiles(cleanName, preparedFiles, onProgress);

  onProgress?.({ percent: 98, label: "REGISTERING MODEL" });
  const { data, error } = await supabase
    .from("models_3d")
    .insert({
      name: cleanName,
      description: "",
      file_name: uploaded.fileName,
      storage_path: uploaded.storagePath,
      source_file_name: uploaded.sourceFileName,
      source_storage_path: uploaded.sourceStoragePath,
      source_format: uploaded.sourceFormat,
      is_published: false,
      is_featured: false,
      is_watch: false,
      sort_order: sortOrder,
    })
    .select("*")
    .single();

  if (error) {
    await removeStoragePaths([
      uploaded.storagePath,
      uploaded.sourceStoragePath,
    ]).catch(() => undefined);
    throw asError(error, "Unable to register the 3D model.");
  }

  onProgress?.({ percent: 100, label: "MODEL READY" });
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
  file: File,
  onProgress?: ModelProcessingCallback
): Promise<ThreeDModel> {
  const preparedFiles = await prepareModelFiles(file, onProgress);
  const uploaded = await uploadPreparedModelFiles(model.name, preparedFiles, onProgress);

  onProgress?.({ percent: 98, label: "UPDATING MODEL" });
  const { data, error } = await supabase
    .from("models_3d")
    .update({
      file_name: uploaded.fileName,
      storage_path: uploaded.storagePath,
      source_file_name: uploaded.sourceFileName,
      source_storage_path: uploaded.sourceStoragePath,
      source_format: uploaded.sourceFormat,
    })
    .eq("id", model.id)
    .select("*")
    .single();

  if (error) {
    await removeStoragePaths([
      uploaded.storagePath,
      uploaded.sourceStoragePath,
    ]).catch(() => undefined);
    throw asError(error, "Unable to replace the 3D model.");
  }

  await removeStoragePaths([model.storage_path, model.source_storage_path]);
  onProgress?.({ percent: 100, label: "MODEL READY" });
  return await mapModel(data as ThreeDModelRow);
}

function validateHdriFile(file: File): "hdr" | "exr" {
  const extension = file.name.toLowerCase().match(/\.(hdr|exr)$/)?.[1];
  if (extension !== "hdr" && extension !== "exr") {
    throw new Error("Choose a .hdr or .exr environment file.");
  }
  if (file.size > MAX_MODEL_BYTES) {
    throw new Error("The environment file is larger than 100 MB.");
  }
  return extension;
}

export async function replaceThreeDModelHdri(
  model: ThreeDModel,
  file: File
): Promise<ThreeDModel> {
  const extension = validateHdriFile(file);
  const storagePath = `${safeFolderName(model.name)}/environment/${Date.now()}-${randomToken()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from(MODEL_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      contentType:
        extension === "hdr" ? "image/vnd.radiance" : "image/x-exr",
      upsert: false,
    });

  if (uploadError) {
    throw asError(uploadError, `Unable to upload ${file.name}.`);
  }

  const { data, error } = await supabase
    .from("models_3d")
    .update({
      hdri_file_name: file.name,
      hdri_storage_path: storagePath,
    })
    .eq("id", model.id)
    .select("*")
    .single();

  if (error) {
    await removeStoragePaths([storagePath]).catch(() => undefined);
    throw asError(error, "Unable to attach the HDRI to this model.");
  }

  await removeStoragePaths([model.hdri_storage_path]);
  return await mapModel(data as ThreeDModelRow);
}

export async function removeThreeDModelHdri(
  model: ThreeDModel
): Promise<ThreeDModel> {
  const { data, error } = await supabase
    .from("models_3d")
    .update({ hdri_file_name: null, hdri_storage_path: null })
    .eq("id", model.id)
    .select("*")
    .single();

  if (error) throw asError(error, "Unable to remove this model HDRI.");
  await removeStoragePaths([model.hdri_storage_path]);
  return await mapModel(data as ThreeDModelRow);
}

export async function deleteThreeDModel(model: ThreeDModel): Promise<void> {
  await removeStoragePaths([
    model.storage_path,
    model.source_storage_path,
    model.hdri_storage_path,
  ]);

  const { error } = await supabase.from("models_3d").delete().eq("id", model.id);

  if (error) {
    throw asError(error, "The model files were deleted, but their database row remains.");
  }
}
