import { supabase } from "@/lib/supabase";
import type {
  ArchiveSection,
  UpdateArchiveSectionInput,
} from "@/types/archiveSections";

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;
  if (typeof error === "object" && error && "message" in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error(fallback);
}

export function slugifyArchiveSection(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export async function listVisibleArchiveSections(): Promise<ArchiveSection[]> {
  const { data, error } = await supabase
    .from("archive_sections")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw asError(error, "Unable to load the archive sections.");
  return (data ?? []) as ArchiveSection[];
}

export async function listAllArchiveSectionsForAdmin(): Promise<ArchiveSection[]> {
  const { data, error } = await supabase
    .from("archive_sections")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw asError(error, "Unable to load the archive section manager.");
  return (data ?? []) as ArchiveSection[];
}

export async function createArchiveSection(
  name: string,
  code: string,
  sortOrder: number
): Promise<ArchiveSection> {
  const cleanName = name.trim();
  const slug = slugifyArchiveSection(cleanName);
  const cleanCode = code.trim().toUpperCase().slice(0, 8);

  if (!cleanName || !slug) throw new Error("Enter a section name.");
  if (!cleanCode) throw new Error("Enter a short section code.");

  const { data, error } = await supabase
    .from("archive_sections")
    .insert({
      name: cleanName,
      slug,
      code: cleanCode,
      sort_order: sortOrder,
      is_visible: true,
    })
    .select("*")
    .single();

  if (error) throw asError(error, "Unable to create the archive section.");
  return data as ArchiveSection;
}

export async function updateArchiveSection(
  id: string,
  input: UpdateArchiveSectionInput
): Promise<ArchiveSection> {
  const payload = {
    ...input,
    ...(input.name !== undefined ? { name: input.name.trim() } : {}),
    ...(input.code !== undefined
      ? { code: input.code.trim().toUpperCase().slice(0, 8) }
      : {}),
  };
  const { data, error } = await supabase
    .from("archive_sections")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw asError(error, "Unable to save the archive section.");
  return data as ArchiveSection;
}

export async function deleteArchiveSection(section: ArchiveSection): Promise<void> {
  const { error } = await supabase
    .from("archive_sections")
    .delete()
    .eq("id", section.id);

  if (error) {
    throw asError(
      error,
      "Unable to delete this section. Move its books to another section first."
    );
  }
}
