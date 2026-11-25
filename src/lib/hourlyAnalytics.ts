export const ANALYTICS_TIME_ZONE = "Europe/Rome" as const;
// Reserved ONLY for session_start.value_int. Other events retain their page,
// duration or interaction number. This is declared link attribution, not a
// fabricated referrer host or a persistent visitor identifier.
export const INSTAGRAM_ENTRY_SOURCE_CODE = 1;

export interface AnalyticsSessionArrival {
  id: number | string;
  session_id: string;
  recorded_at: string;
  referrer_host: string | null;
  value_int: number | null;
}

export interface HourlyAnalyticsPoint {
  start: string;
  label: string;
  arrivals: number;
  instagram: number;
}

export interface HourlyAnalyticsReport {
  day: string;
  timeZone: typeof ANALYTICS_TIME_ZONE;
  hours: HourlyAnalyticsPoint[];
  arrivals: number;
  instagram: number;
}

/** Read and immediately reduce the entry query to a single allowlisted flag. */
export function hasDeclaredInstagramSource(search: string | undefined): boolean {
  const sources = new URLSearchParams(search ?? "").getAll("utm_source");
  return sources.length === 1 && sources[0].toLowerCase() === "instagram";
}

export function isInstagramReferrer(value: string | null | undefined): boolean {
  if (!value) return false;
  const match = value.trim().toLowerCase().match(/^([a-z0-9.-]+)(?::[0-9]{1,5})?$/);
  if (!match) return false;
  const host = match[1].replace(/\.$/, "");
  if (host === "instagram.com") return true;
  if (!host.endsWith(".instagram.com")) return false;
  return host.slice(0, -".instagram.com".length).split(".").every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label));
}

const localParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: ANALYTICS_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});

function partsAt(instant: number): Record<string, number> {
  return Object.fromEntries(localParts.formatToParts(instant).filter((part) => part.type !== "literal").map((part) => [part.type, Number(part.value)]));
}

function offsetAt(instant: number): number {
  const parts = partsAt(instant);
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - Math.floor(instant / 1000) * 1000;
}

function midnight(utcDate: number): number {
  let instant = utcDate;
  for (let iteration = 0; iteration < 3; iteration++) instant = utcDate - offsetAt(instant);
  return instant;
}

export function romeDayInterval(day: string): { start: string; end: string } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw new Error("Scegli una data valida.");
  const utc = Date.parse(`${day}T00:00:00.000Z`);
  if (!Number.isFinite(utc) || new Date(utc).toISOString().slice(0, 10) !== day || Number(day.slice(0, 4)) < 1970) throw new Error("Scegli una data valida.");
  return { start: new Date(midnight(utc)).toISOString(), end: new Date(midnight(utc + 86400000)).toISOString() };
}

function compareId(a: number | string, b: number | string): number {
  const left = String(a), right = String(b);
  if (/^\d+$/.test(left) && /^\d+$/.test(right) && left.length !== right.length) return left.length - right.length;
  return left < right ? -1 : left > right ? 1 : 0;
}

export function buildHourlyAnalyticsReport(day: string, rows: readonly AnalyticsSessionArrival[]): HourlyAnalyticsReport {
  const interval = romeDayInterval(day), start = Date.parse(interval.start), end = Date.parse(interval.end);
  const hours: HourlyAnalyticsPoint[] = [];
  for (let instant = start; instant < end; instant += 3600000) {
    const parts = partsAt(instant);
    hours.push({ start: new Date(instant).toISOString(), label: `${String(parts.hour).padStart(2, "0")}:00`, arrivals: 0, instagram: 0 });
  }
  const labelCounts = new Map<string, number>();
  hours.forEach((hour) => labelCounts.set(hour.label, (labelCounts.get(hour.label) ?? 0) + 1));
  hours.forEach((hour) => {
    if (labelCounts.get(hour.label) === 1) return;
    const minutes = offsetAt(Date.parse(hour.start)) / 60000;
    hour.label += ` (UTC${minutes < 0 ? "-" : "+"}${String(Math.floor(Math.abs(minutes) / 60)).padStart(2, "0")}:${String(Math.abs(minutes) % 60).padStart(2, "0")})`;
  });
  const seen = new Set<string>();
  const sorted = [...rows].sort((a, b) => Date.parse(a.recorded_at) - Date.parse(b.recorded_at) || compareId(a.id, b.id));
  sorted.forEach((row) => {
    const instant = Date.parse(row.recorded_at);
    if (!Number.isFinite(instant) || !row.session_id) throw new Error("Le statistiche contengono una sessione non valida.");
    if (instant < start || instant >= end || seen.has(row.session_id)) return;
    seen.add(row.session_id);
    const hour = hours[Math.floor((instant - start) / 3600000)];
    hour.arrivals++;
    if (isInstagramReferrer(row.referrer_host) || row.value_int === INSTAGRAM_ENTRY_SOURCE_CODE) hour.instagram++;
  });
  return { day, timeZone: ANALYTICS_TIME_ZONE, hours, arrivals: hours.reduce((sum, hour) => sum + hour.arrivals, 0), instagram: hours.reduce((sum, hour) => sum + hour.instagram, 0) };
}
