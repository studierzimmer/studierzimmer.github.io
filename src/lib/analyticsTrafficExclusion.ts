export const ANALYTICS_TRAFFIC_EXCLUSION_KEY = "studierzimmer_analytics_traffic_excluded_v1";

export interface AnalyticsTrafficExclusionState {
  excluded: boolean;
  automatic: boolean;
  reason: "development" | "local" | "browser" | null;
  /** False for a manual choice held only in memory when storage is blocked. */
  persisted: boolean;
}

/** Explicit local origins only; never infer an owner/bot from an IP or UA. */
export function automaticAnalyticsTrafficExclusion(development: boolean, hostname?: string): "development" | "local" | null {
  if (development) return "development";
  const host = (hostname ?? "").toLowerCase().replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost")) return "local";
  if (/^127(?:\.\d{1,3}){3}$/.test(host) && host.split(".").every((part) => Number(part) <= 255)) return "local";
  if (host.includes(":")) {
    try {
      const bare = host.replace(/^\[|\]$/g, "");
      const normalized = new URL(`http://[${bare}]/`).hostname.replace(/^\[|\]$/g, "");
      if (normalized === "::1" || /^::ffff:7f[\da-f]{2}:[\da-f]{1,4}$/i.test(normalized)) return "local";
    } catch { /* A non-IP hostname is not a loopback origin. */ }
  }
  return null;
}
