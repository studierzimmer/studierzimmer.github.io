import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  loadAnalyticsReport,
  type AnalyticsDailyPoint,
  type AnalyticsReport,
} from "@/services/analyticsRepository";

type MotionState = "outside" | "entering" | "visible";

const rangeOptions = [7, 30, 90] as const;

const emptyReport: AnalyticsReport = {
  summary: {
    visits: 0,
    events: 0,
    pageViews: 0,
    clicks: 0,
    bookOpens: 0,
    modelOpens: 0,
  },
  daily: [],
  breakdown: {
    devices: [],
    referrers: [],
    topTargets: [],
  },
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-CH").format(value);
}

function buildDailySeries(
  points: AnalyticsDailyPoint[],
  rangeDays: number
): AnalyticsDailyPoint[] {
  const byDay = new Map(points.map((point) => [point.day, point]));
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: rangeDays }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (rangeDays - index - 1));
    const day = date.toISOString().slice(0, 10);
    return byDay.get(day) ?? { day, visits: 0, pageViews: 0, clicks: 0 };
  });
}

function linePoints(
  series: AnalyticsDailyPoint[],
  key: "visits" | "pageViews" | "clicks",
  maximum: number
): string {
  if (series.length === 0) return "";
  return series
    .map((point, index) => {
      const x =
        series.length === 1 ? 450 : (index / (series.length - 1)) * 900;
      const y = 170 - (point[key] / Math.max(1, maximum)) * 150;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function friendlyAnalyticsError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (
    /schema cache|could not find the function|does not exist|404/i.test(message)
  ) {
    return "Analytics is not installed in Supabase yet. Run the privacy-friendly analytics SQL migration, then refresh this section.";
  }
  return message || "Unable to load analytics.";
}

export default function AdminAnalyticsInfo() {
  const [rangeDays, setRangeDays] = useState<(typeof rangeOptions)[number]>(30);
  const [report, setReport] = useState<AnalyticsReport>(emptyReport);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [motion, setMotion] = useState<MotionState>("outside");
  const requestId = useRef(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMotion("entering"));
    const timer = window.setTimeout(() => setMotion("visible"), 1300);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  const load = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const nextReport = await loadAnalyticsReport(rangeDays);
      if (currentRequest !== requestId.current) return;
      setReport(nextReport);
      setLastUpdated(new Date());
    } catch (loadError) {
      if (currentRequest !== requestId.current) return;
      setReport(emptyReport);
      setError(friendlyAnalyticsError(loadError));
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [rangeDays]);

  useEffect(() => {
    void load();
    return () => {
      requestId.current += 1;
    };
  }, [load]);

  const dailySeries = useMemo(
    () => buildDailySeries(report.daily, rangeDays),
    [rangeDays, report.daily]
  );
  const chartMaximum = Math.max(
    1,
    ...dailySeries.flatMap((point) => [
      point.visits,
      point.pageViews,
      point.clicks,
    ])
  );
  const firstDay = dailySeries[0]?.day ?? "";
  const lastDay = dailySeries[dailySeries.length - 1]?.day ?? "";

  const panel = (delay: number) => ({
    className: `admin-backend-panel is-${motion}`,
    style: { "--panel-delay": `${delay}ms` } as React.CSSProperties,
  });

  const metrics = [
    ["VISITS", report.summary.visits],
    ["PAGE VIEWS", report.summary.pageViews],
    ["CLICKS", report.summary.clicks],
    ["BOOK OPENS", report.summary.bookOpens],
    ["MODEL OPENS", report.summary.modelOpens],
    ["TOTAL EVENTS", report.summary.events],
  ] as const;

  return (
    <main className="mx-auto w-full max-w-[1500px] p-5 md:p-8" aria-busy={loading}>
      <div {...panel(0)} className={`${panel(0).className} mb-7 flex flex-wrap items-end justify-between gap-4`}>
        <div>
          <h1 className="text-[24px] leading-none">TRAFFIC INFO</h1>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-black/55">
            Private, first-party session statistics. No IP addresses, emails,
            full URLs or persistent visitor fingerprints are stored.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {rangeOptions.map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => setRangeDays(days)}
              className={`border border-black/35 px-3 py-2 transition-transform hover:scale-[1.03] active:scale-[0.98] ${
                rangeDays === days ? "bg-black text-white" : ""
              }`}
            >
              {days} DAYS
            </button>
          ))}
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="border border-black/35 px-3 py-2 transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40"
          >
            {loading ? "..." : "REFRESH"}
          </button>
        </div>
      </div>

      {error && (
        <div {...panel(40)} className={`${panel(40).className} mb-6 border border-red-700 p-4 text-[13px] text-red-700`} role="alert">
          {error}
        </div>
      )}

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map(([label, value], index) => (
          <article
            key={label}
            {...panel(70 + index * 35)}
            className={`${panel(70 + index * 35).className} min-w-0 border border-black/20 p-4`}
          >
            <p className="text-[11px] text-black/50">{label}</p>
            <p className="mt-5 truncate text-[clamp(24px,3vw,42px)] leading-none">
              {loading ? "…" : formatNumber(value)}
            </p>
          </article>
        ))}
      </section>

      <section {...panel(310)} className={`${panel(310).className} mt-6 border border-black/20 p-4 sm:p-6`}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[17px]">DAILY ACTIVITY</h2>
          <div className="flex flex-wrap gap-4 text-[11px] text-black/60">
            <span>— VISITS</span>
            <span className="text-black/45">— PAGE VIEWS</span>
            <span className="text-black/25">— CLICKS</span>
          </div>
        </div>

        <div className="h-[190px] w-full">
          <svg
            viewBox="0 0 900 180"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={`Daily analytics from ${firstDay} to ${lastDay}`}
          >
            {[20, 70, 120, 170].map((y) => (
              <line
                key={y}
                x1="0"
                x2="900"
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <polyline
              points={linePoints(dailySeries, "clicks", chartMaximum)}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.24"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={linePoints(dailySeries, "pageViews", chartMaximum)}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={linePoints(dailySeries, "visits", chartMaximum)}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-black/45">
          <span>{firstDay}</span>
          <span>{lastDay}</span>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <article {...panel(350)} className={`${panel(350).className} border border-black/20 p-5`}>
          <h2 className="mb-4 text-[16px]">TOP CLICKS</h2>
          {report.breakdown.topTargets.length === 0 ? (
            <p className="text-[13px] text-black/45">NO DATA YET</p>
          ) : (
            <ol className="divide-y divide-black/10">
              {report.breakdown.topTargets.map((target) => (
                <li key={`${target.targetType}:${target.targetId}`} className="flex gap-3 py-2 text-[12px]">
                  <span className="min-w-0 flex-1 truncate">
                    {target.targetId} <span className="text-black/40">· {target.targetType}</span>
                  </span>
                  <span>{formatNumber(target.count)}</span>
                </li>
              ))}
            </ol>
          )}
        </article>

        <article {...panel(390)} className={`${panel(390).className} border border-black/20 p-5`}>
          <h2 className="mb-4 text-[16px]">DEVICES</h2>
          {report.breakdown.devices.length === 0 ? (
            <p className="text-[13px] text-black/45">NO DATA YET</p>
          ) : (
            <ul className="divide-y divide-black/10">
              {report.breakdown.devices.map((device) => (
                <li key={device.name} className="flex justify-between gap-3 py-2 text-[12px]">
                  <span>{device.name.toUpperCase()}</span>
                  <span>{formatNumber(device.count)}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article {...panel(430)} className={`${panel(430).className} border border-black/20 p-5`}>
          <h2 className="mb-4 text-[16px]">REFERRERS</h2>
          {report.breakdown.referrers.length === 0 ? (
            <p className="text-[13px] text-black/45">NO DATA YET</p>
          ) : (
            <ul className="divide-y divide-black/10">
              {report.breakdown.referrers.map((referrer) => (
                <li key={referrer.name} className="flex gap-3 py-2 text-[12px]">
                  <span className="min-w-0 flex-1 truncate">{referrer.name}</span>
                  <span>{formatNumber(referrer.count)}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <aside {...panel(470)} className={`${panel(470).className} mt-6 border border-black/20 p-5 text-[12px] leading-relaxed text-black/55`}>
        <p>
          Retention target: 180 days. The deletion RPC must be scheduled or run
          periodically. Public tracking is not enabled by this admin screen and
          must remain blocked until the visitor has made the required analytics
          privacy choice.
        </p>
        {lastUpdated && (
          <p className="mt-2 font-mono text-[10px]">
            UPDATED {lastUpdated.toLocaleString("en-CH")}
          </p>
        )}
      </aside>
    </main>
  );
}
