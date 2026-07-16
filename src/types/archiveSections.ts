export interface ArchiveSection {
  id: string;
  slug: string;
  name: string;
  code: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateArchiveSectionInput {
  name?: string;
  code?: string;
  sort_order?: number;
  is_visible?: boolean;
}

export const DEFAULT_ARCHIVE_SECTIONS: ArchiveSection[] = [
  {
    id: "default-objects",
    slug: "objects",
    name: "Objects",
    code: "OBJ",
    sort_order: 0,
    is_visible: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "default-graphics",
    slug: "graphics",
    name: "Graphics",
    code: "GRPH",
    sort_order: 1,
    is_visible: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "default-concepts",
    slug: "concepts",
    name: "Concepts",
    code: "CNCP",
    sort_order: 2,
    is_visible: true,
    created_at: "",
    updated_at: "",
  },
];
