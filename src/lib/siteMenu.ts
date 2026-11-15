import type { MenuItem, MenuKey } from "@/types/siteContent";

/** Keep the owner's order; only append genuinely new/default destinations. */
export function orderedMenuDefaults(defaults: readonly MenuItem[], supplied: readonly Partial<MenuItem>[]): MenuItem[] {
  const byId = new Map(defaults.map((item) => [item.id, item]));
  const hasFeatured = supplied.some((item) => item?.id === "featured");
  const seen = new Set<MenuKey>();
  const result: MenuItem[] = [];
  for (const item of supplied) {
    const id = item?.id === "models" && !hasFeatured ? "featured" : item?.id;
    if (!id || seen.has(id) || !byId.has(id)) continue;
    seen.add(id);
    result.push(byId.get(id)!);
  }
  for (const item of defaults) if (!seen.has(item.id)) result.push(item);
  return result;
}

export function moveMenuItem(items: readonly MenuItem[], id: MenuKey, position: number): MenuItem[] {
  const from = items.findIndex((item) => item.id === id);
  if (from < 0 || !Number.isFinite(position)) return [...items];
  const to = Math.min(items.length - 1, Math.max(0, Math.trunc(position)));
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
