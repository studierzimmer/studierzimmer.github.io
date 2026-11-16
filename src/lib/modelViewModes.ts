export type ModelViewMode = "render" | "arctic" | "pen";

export const MODEL_VIEW_MODES: ReadonlyArray<{ id: ModelViewMode; label: string }> = [
  { id: "render", label: "Render" },
  { id: "arctic", label: "Arctic" },
  { id: "pen", label: "Pen" },
];

export const DEFAULT_MODEL_VIEW_MODES: readonly ModelViewMode[] = MODEL_VIEW_MODES.map((mode) => mode.id);

/** Old or malformed settings never remove all ways to view an existing model. */
export function normalizeAllowedModelViewModes(value: unknown): ModelViewMode[] {
  const allowed = Array.isArray(value) ? value : [];
  const modes = DEFAULT_MODEL_VIEW_MODES.filter((mode) => allowed.includes(mode));
  return modes.length ? [...modes] : [...DEFAULT_MODEL_VIEW_MODES];
}

export function normalizeModelViewModes(value: unknown): Record<string, ModelViewMode[]> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id]) => id.trim()).map(([id, modes]) => [id, normalizeAllowedModelViewModes(modes)]));
}

export function modelViewModesFor(modelId: string, map?: Record<string, ModelViewMode[]>): ModelViewMode[] {
  return normalizeAllowedModelViewModes(map && Object.prototype.hasOwnProperty.call(map, modelId) ? map[modelId] : undefined);
}
