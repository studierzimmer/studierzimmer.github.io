export interface OceanLabels {
  exit: string;
  start: string;
  about: string;
  figure: string;
  music: string;
  loadingFigures: string;
  figuresUnavailable: string;
}

export const DEFAULT_OCEAN_LABELS: Readonly<OceanLabels> = Object.freeze({
  exit: "Exit",
  start: "start",
  about: "about",
  figure: "figura",
  music: "musica",
  loadingFigures: "caricamento…",
  figuresUnavailable: "Il catalogo delle figure non è disponibile. La figura inclusa resta utilizzabile.",
});

/** Only known, own string fields survive. Empty strings are intentional CMS
 * content, not missing values; neither whitespace nor text is rewritten. */
export function normalizeOceanLabels(value?: unknown): OceanLabels {
  const labels = { ...DEFAULT_OCEAN_LABELS };
  if (!value || typeof value !== "object" || Array.isArray(value)) return labels;
  const input = value as Record<string, unknown>;
  (Object.keys(DEFAULT_OCEAN_LABELS) as Array<keyof OceanLabels>).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(input, key) && typeof input[key] === "string") labels[key] = input[key];
  });
  return labels;
}
