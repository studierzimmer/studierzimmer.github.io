import { supabase } from "@/lib/supabase";

export interface AnalyticsSummary {
  visits: number;
  events: number;
  pageViews: number;
  clicks: number;
  bookOpens: number;
  modelOpens: number;
}

export interface AnalyticsDailyPoint {
  day: string;
  visits: number;
  pageViews: number;
  clicks: number;
}

export interface AnalyticsNamedCount {
  name: string;
  count: number;
}

export interface AnalyticsTargetCount {
  targetType: string;
  targetId: string;
  count: number;
}

export interface AnalyticsBreakdown {
  devices: AnalyticsNamedCount[];
  referrers: AnalyticsNamedCount[];
  topTargets: AnalyticsTargetCount[];
}

export interface AnalyticsReport {
  summary: AnalyticsSummary;
  daily: AnalyticsDailyPoint[];
  breakdown: AnalyticsBreakdown;
}

function asError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;
  if (typeof error === "object" && error && "message" in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error(fallback);
}

function numberFrom(value: unknown): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function recordFrom(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function arrayFrom(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.map(recordFrom)
    : [];
}

export async function loadAnalyticsReport(
  rangeDays: number
): Promise<AnalyticsReport> {
  const to = new Date();
  const from = new Date(to.getTime() - rangeDays * 86400000);
  const parameters = {
    p_from: from.toISOString(),
    p_to: to.toISOString(),
  };

  const [summaryResponse, dailyResponse, breakdownResponse] =
    await Promise.all([
      supabase.rpc("get_analytics_summary", parameters),
      supabase.rpc("get_analytics_daily", parameters),
      supabase.rpc("get_analytics_breakdown", parameters),
    ]);

  if (summaryResponse.error) {
    throw asError(
      summaryResponse.error,
      "Unable to load analytics summary."
    );
  }
  if (dailyResponse.error) {
    throw asError(
      dailyResponse.error,
      "Unable to load daily analytics."
    );
  }

  const summaryData = recordFrom(summaryResponse.data);
  const dailyData = arrayFrom(dailyResponse.data);
  const breakdownData = breakdownResponse.error
    ? {}
    : recordFrom(breakdownResponse.data);

  return {
    summary: {
      visits: numberFrom(summaryData.visits),
      events: numberFrom(summaryData.events),
      pageViews: numberFrom(summaryData.page_views),
      clicks: numberFrom(summaryData.clicks),
      bookOpens: numberFrom(summaryData.book_opens),
      modelOpens: numberFrom(summaryData.model_opens),
    },
    daily: dailyData.map((row) => ({
      day: String(row.day ?? ""),
      visits: numberFrom(row.visits),
      pageViews: numberFrom(row.page_views),
      clicks: numberFrom(row.clicks),
    })),
    breakdown: {
      devices: arrayFrom(breakdownData.devices).map((row) => ({
        name: String(row.name ?? "unknown"),
        count: numberFrom(row.events),
      })),
      referrers: arrayFrom(breakdownData.referrers).map((row) => ({
        name: String(row.name ?? "direct"),
        count: numberFrom(row.visits),
      })),
      topTargets: arrayFrom(breakdownData.top_targets).map((row) => ({
        targetType: String(row.target_type ?? "interface"),
        targetId: String(row.target_id ?? "unknown"),
        count: numberFrom(row.events),
      })),
    },
  };
}
