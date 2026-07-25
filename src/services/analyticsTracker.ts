import { supabase } from "@/lib/supabase";

export type AnalyticsConsentChoice = "necessary" | "analytics";

export type AnalyticsEventName =
  | "session_start"
  | "session_end"
  | "page_view"
  | "navigation_click"
  | "book_open"
  | "book_page_view"
  | "model_open"
  | "model_interaction"
  | "archive_filter"
  | "outbound_click";

export type AnalyticsTargetType =
  | "navigation"
  | "book"
  | "book_page"
  | "model"
  | "archive"
  | "external"
  | "interface";

interface StoredAnalyticsConsent {
  version: 1;
  choice: AnalyticsConsentChoice;
  updatedAt: string;
  expiresAt: string;
}

interface TrackAnalyticsEventInput {
  eventName: AnalyticsEventName;
  path?: string;
  targetType?: AnalyticsTargetType;
  targetId?: string;
  valueInt?: number;
}

const CONSENT_STORAGE_KEY = "studierzimmer_analytics_consent_v1";
const SESSION_STORAGE_KEY = "studierzimmer_analytics_session_v1";
const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;
export const ANALYTICS_CONSENT_EVENT = "studierzimmer:analytics-consent";

let memorySessionId: string | null = null;
let sessionStarted = false;
let analyticsUnavailable = false;

function safeStorage(
  storage: "localStorage" | "sessionStorage"
): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window[storage];
  } catch {
    return null;
  }
}

function safeGetItem(storage: Storage | null, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeSetItem(storage: Storage | null, key: string, value: string) {
  try {
    storage?.setItem(key, value);
  } catch {
    // The in-memory session fallback still keeps collection session-scoped.
  }
}

function safeRemoveItem(storage: Storage | null, key: string) {
  try {
    storage?.removeItem(key);
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }
}

function normalizedPath(path = window.location.pathname): string {
  const cleanPath = path.split("?")[0]?.split("#")[0] ?? "/";
  return cleanPath.startsWith("/") ? cleanPath.slice(0, 160) : "/";
}

function safeReferrerHost(): string | null {
  if (!document.referrer) return null;

  try {
    return new URL(document.referrer).host.slice(0, 160) || null;
  } catch {
    return null;
  }
}

function deviceType(): "mobile" | "tablet" | "desktop" | "unknown" {
  const width = window.innerWidth;
  if (!Number.isFinite(width)) return "unknown";
  if (width < 600) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function randomSessionId(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const value = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(
    12,
    16
  )}-${value.slice(16, 20)}-${value.slice(20)}`;
}

function getSessionId(): string {
  const storage = safeStorage("sessionStorage");
  const existing = safeGetItem(storage, SESSION_STORAGE_KEY);
  if (existing) return existing;
  if (memorySessionId) return memorySessionId;

  const sessionId = randomSessionId();
  memorySessionId = sessionId;
  safeSetItem(storage, SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

function dispatchConsentChange(choice: AnalyticsConsentChoice | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: choice })
  );
}

export function readAnalyticsConsent(): AnalyticsConsentChoice | null {
  const storage = safeStorage("localStorage");
  const stored = safeGetItem(storage, CONSENT_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<StoredAnalyticsConsent>;
    const validChoice =
      parsed.choice === "necessary" || parsed.choice === "analytics";
    const expiresAt = Date.parse(String(parsed.expiresAt ?? ""));

    if (
      parsed.version !== 1 ||
      !validChoice ||
      !Number.isFinite(expiresAt) ||
      expiresAt <= Date.now()
    ) {
      safeRemoveItem(storage, CONSENT_STORAGE_KEY);
      return null;
    }

    return parsed.choice;
  } catch {
    safeRemoveItem(storage, CONSENT_STORAGE_KEY);
    return null;
  }
}

export function saveAnalyticsConsent(choice: AnalyticsConsentChoice): void {
  const now = new Date();
  const record: StoredAnalyticsConsent = {
    version: 1,
    choice,
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_LIFETIME_MS).toISOString(),
  };

  safeSetItem(
    safeStorage("localStorage"),
    CONSENT_STORAGE_KEY,
    JSON.stringify(record)
  );

  if (choice === "necessary") {
    safeRemoveItem(safeStorage("sessionStorage"), SESSION_STORAGE_KEY);
    memorySessionId = null;
    sessionStarted = false;
  } else {
    analyticsUnavailable = false;
  }

  dispatchConsentChange(choice);
}

function analyticsSchemaMissing(error: unknown): boolean {
  const message =
    typeof error === "object" && error && "message" in error
      ? String((error as { message: unknown }).message)
      : String(error);

  return /track_analytics_event|schema cache|does not exist|could not find/i.test(
    message
  );
}

export async function trackAnalyticsEvent({
  eventName,
  path,
  targetType,
  targetId,
  valueInt,
}: TrackAnalyticsEventInput): Promise<boolean> {
  if (
    typeof window === "undefined" ||
    readAnalyticsConsent() !== "analytics" ||
    analyticsUnavailable
  ) {
    return false;
  }

  const sessionId = getSessionId();
  const safeTargetId = targetId?.trim().slice(0, 120) || null;
  const safeValue = Number.isFinite(valueInt)
    ? Math.min(86400000, Math.max(0, Math.round(valueInt ?? 0)))
    : null;

  if (!sessionStarted && eventName !== "session_start") {
    sessionStarted = true;
    await trackAnalyticsEvent({
      eventName: "session_start",
      path,
    });
  } else if (eventName === "session_start") {
    sessionStarted = true;
  }

  const { data, error } = await supabase.rpc("track_analytics_event", {
    p_session_id: sessionId,
    p_event_name: eventName,
    p_path: normalizedPath(path),
    p_target_type: targetType ?? null,
    p_target_id: safeTargetId,
    p_referrer_host:
      eventName === "session_start" ? safeReferrerHost() : null,
    p_device_type: deviceType(),
    p_value_int: safeValue,
  });

  if (error) {
    if (analyticsSchemaMissing(error)) {
      analyticsUnavailable = true;
      console.info(
        "Analytics collection is disabled until the analytics SQL migration is run."
      );
      return false;
    }

    return false;
  }

  return data === true;
}
