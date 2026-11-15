export interface OceanEnvironmentSettings {
  waterColor: string;
  shallowColor: string;
  waterClarity: number;
  nearRadius: number;
  sunElevation: number;
  sunAzimuth: number;
  floorGlowColor: string;
  floorGlowStrength: number;
  floorGlowRadius: number;
}

export const OCEAN_ENVIRONMENT_EVENT = "studierzimmer:ocean-environment";
export const DEFAULT_OCEAN_ENVIRONMENT: OceanEnvironmentSettings = {
  waterColor: "#04060B", shallowColor: "#0E545D", waterClarity: .75,
  nearRadius: 180, sunElevation: 19, sunAzimuth: 121,
  floorGlowColor: "#D3B65C", floorGlowStrength: .65, floorGlowRadius: 150,
};
export function normalizeOceanEnvironment(value?: Partial<OceanEnvironmentSettings> | null): OceanEnvironmentSettings {
  const input = value && typeof value === "object" ? value : {};
  const color = (value: unknown, fallback: string) => typeof value === "string" && /^#[\da-f]{6}$/i.test(value) ? value : fallback;
  const number = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
  const defaults = DEFAULT_OCEAN_ENVIRONMENT;
  return {
    waterColor: color(input.waterColor, defaults.waterColor), shallowColor: color(input.shallowColor, defaults.shallowColor),
    waterClarity: number(input.waterClarity, defaults.waterClarity, .2, 1), nearRadius: number(input.nearRadius, defaults.nearRadius, 60, 600),
    sunElevation: number(input.sunElevation, defaults.sunElevation, 3, 75), sunAzimuth: number(input.sunAzimuth, defaults.sunAzimuth, 0, 360),
    floorGlowColor: color(input.floorGlowColor, defaults.floorGlowColor), floorGlowStrength: number(input.floorGlowStrength, defaults.floorGlowStrength, 0, 2),
    floorGlowRadius: number(input.floorGlowRadius, defaults.floorGlowRadius, 40, 400),
  };
}
