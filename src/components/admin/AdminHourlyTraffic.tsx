import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { HourlyAnalyticsReport } from "@/services/analyticsRepository";

const INSTAGRAM_LINK = "https://www.studierzimmer.ch/?utm_source=instagram";
const number = (value: number) => new Intl.NumberFormat("it-IT").format(value);

interface Props {
  day: string;
  report: HourlyAnalyticsReport | null;
  loading: boolean;
  error: string | null;
  onDayChange: (day: string) => void;
  onRefresh: () => void;
  className?: string;
  style?: CSSProperties;
}

interface ExclusionProps {
  excluded: boolean;
  automatic: boolean;
  reason?: "development" | "local" | "browser" | null;
  persisted?: boolean;
  onChange: (excluded: boolean) => void;
  error?: string | null;
  className?: string;
  style?: CSSProperties;
}

/** Local-browser preference only; this component never accesses telemetry. */
export function AnalyticsTrafficExclusionControl({ excluded, automatic, reason, persisted = true, onChange, error, className = "", style }: ExclusionProps) {
  return <section className={`${className} my-6 min-w-0 border border-black/20 p-4 sm:p-5`} style={style} aria-label="Esclusione del mio traffico">
    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] leading-relaxed"><input type="checkbox" checked={excluded} disabled={automatic} onChange={(event) => { if (!automatic) onChange(event.currentTarget.checked); }} className="mt-1 h-5 w-5 shrink-0 accent-black" /><span>Escludi questo browser dalle statistiche<span className="mt-1 block text-black/60">{excluded ? "Esclusione attiva" : "Esclusione disattivata"}{automatic ? ` · ${reason === "development" ? "ambiente di sviluppo" : "indirizzo locale"}` : ""}</span></span></label>
    <p className="mt-3 text-[14px] leading-relaxed text-black/60">Vale per questo browser e dispositivo e solo per gli eventi futuri. Non elimina né corregge i dati passati. Ripeti la scelta negli altri browser o profili.</p>
    <p className="mt-2 text-[14px] leading-relaxed text-black/60">{automatic ? "Il traffico di sviluppo e locale è escluso automaticamente e non può essere riattivato qui." : "La preferenza non modifica il consenso: quando l’esclusione è disattivata, le statistiche richiedono comunque il consenso del visitatore."}</p>
    {!automatic && !persisted && <p className="mt-2 text-[14px] leading-relaxed text-black/60" role="status">Memoria del browser non disponibile: questa preferenza vale solo in questa scheda finché resta aperta.</p>}
    {error && <p className="mt-3 text-[14px] text-red-700" role="alert">{error}</p>}
  </section>;
}

/** Presentation only: the parent owns independent requests and stale guards. */
export default function AdminHourlyTraffic({ day, report, loading, error, onDayChange, onRefresh, className = "", style }: Props) {
  const [copyStatus, setCopyStatus] = useState("");
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const maximum = Math.max(1, ...(report?.hours.map((hour) => hour.arrivals) ?? []));
  const share = report && report.arrivals > 0 ? new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1 }).format(report.instagram / report.arrivals * 100) : null;
  const staleDay = report !== null && report.day !== day;
  const canCopy = typeof navigator !== "undefined" && typeof navigator.clipboard?.writeText === "function";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTAGRAM_LINK);
      if (mounted.current) setCopyStatus("Link copiato.");
    } catch {
      if (mounted.current) setCopyStatus("Copia non disponibile: seleziona e copia il link qui sotto.");
    }
  };

  return <section className={`${className} mt-6 min-w-0 border border-black/20 p-4 sm:p-6`} style={style} aria-labelledby="hourly-traffic-title" aria-busy={loading}>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h2 id="hourly-traffic-title" className="text-[18px]">ARRIVI PER ORA</h2><p className="mt-2 text-[14px] leading-relaxed text-black/60">Sessioni con consenso · orario di Roma</p></div>
      <div className="flex w-full flex-wrap items-end gap-3 sm:w-auto">
        <label className="flex min-w-0 flex-1 flex-col gap-2 text-[14px] sm:flex-none">Giorno · Europe/Rome<input aria-label="Giorno delle statistiche orarie" type="date" value={day} onChange={(event) => { const value = event.currentTarget.value; if (/^\d{4}-\d{2}-\d{2}$/.test(value)) onDayChange(value); }} className="min-h-[44px] min-w-0 max-w-full rounded-none border border-black/30 bg-transparent px-3 text-[16px]" /></label>
        <button type="button" onClick={onRefresh} disabled={loading} className="min-h-[44px] border border-black/30 px-4 text-[14px] disabled:opacity-40">{loading ? "Aggiornamento…" : "Aggiorna ore"}</button>
      </div>
    </div>

    {error && <p className="mt-4 border border-red-700 p-3 text-[14px] leading-relaxed text-red-700" role="alert">{error}</p>}
    {staleDay && <p className="mt-4 text-[14px] leading-relaxed text-black/60" role="status">Sono ancora visibili i dati del {report.day}. {loading ? "Caricamento del giorno selezionato in corso." : "Il giorno selezionato non è stato aggiornato."}</p>}

    <div className={`mt-5 grid grid-cols-2 gap-3 ${share !== null ? "sm:grid-cols-3" : ""}`}>
      <article className="min-w-0 border border-black/15 p-4"><h3 className="text-[13px] text-black/60">ARRIVI · SESSIONI</h3><p className="mt-3 text-[30px] leading-none tabular-nums">{report ? number(report.arrivals) : loading ? "…" : "—"}</p></article>
      <article className="min-w-0 border border-black/15 p-4"><h3 className="text-[13px] text-black/60">DA INSTAGRAM</h3><p className="mt-3 text-[30px] leading-none tabular-nums">{report ? number(report.instagram) : loading ? "…" : "—"}</p></article>
      {share !== null && <article className="col-span-2 min-w-0 border border-black/15 p-4 sm:col-span-1"><h3 className="text-[13px] text-black/60">QUOTA INSTAGRAM</h3><p className="mt-3 text-[30px] leading-none tabular-nums">{share}%</p></article>}
    </div>

    {report && <>
      <p className="mt-5 text-[14px] text-black/60">Dati del {report.day} · {report.timeZone} · {report.hours.length} ore</p>
      {report.arrivals === 0 && <p className="mt-2 text-[14px] leading-relaxed text-black/60">Nessuna sessione con consenso registrata in questo giorno.</p>}
      <table className="mt-3 w-full border-collapse text-[14px] tabular-nums">
        <caption className="sr-only">Arrivi orari del {report.day}, fuso Europe/Rome. Instagram è una parte del totale degli arrivi.</caption>
        <thead><tr className="border-b border-black/20 text-left text-black/60"><th scope="col" className="py-3 pr-3 font-normal">ORA</th><th scope="col" className="px-2 py-3 text-right font-normal">ARRIVI</th><th scope="col" aria-label="Instagram" className="py-3 pl-3 text-right font-normal">IG</th></tr></thead>
        <tbody>{report.hours.map((hour) => <tr key={hour.start} className="border-b border-black/10"><th scope="row" className="py-3 pr-3 text-left font-normal">{hour.label}</th><td className="w-[40%] px-2 py-3 text-right"><span>{number(hour.arrivals)}</span><div className="relative mt-2 h-[5px] w-full bg-black/5" aria-hidden="true"><span className="absolute inset-y-0 left-0 bg-black/20" style={{ width: `${hour.arrivals / maximum * 100}%` }} /><span className="absolute inset-y-0 left-0 bg-black/70" style={{ width: `${hour.instagram / maximum * 100}%` }} /></div></td><td className="py-3 pl-3 text-right">{number(hour.instagram)}</td></tr>)}</tbody>
      </table>
    </>}

    <div className="mt-6 space-y-3 text-[14px] leading-relaxed text-black/60">
      <p>Gli arrivi sono sessioni che hanno consentito le statistiche, non persone uniche né tutte le visite al sito. Instagram include il referrer riconoscibile e le nuove sessioni aperte con il link dedicato.</p>
      <p>I referrer mancanti nei dati passati non possono essere recuperati. Nei cambi di ora legale il giorno di Roma può avere 23 o 25 ore; le ore ripetute riportano il loro offset UTC.</p>
      <label className="block text-black/80">Link da usare nella bio o nelle storie Instagram<input aria-label="Link Instagram da copiare" readOnly value={INSTAGRAM_LINK} onFocus={(event) => event.currentTarget.select()} className="mt-2 block min-h-[44px] w-full min-w-0 select-text rounded-none border border-black/25 bg-transparent px-3 text-[16px]" style={{ userSelect: "text", WebkitUserSelect: "text" }} /></label>
      {canCopy && <button type="button" onClick={() => void copy()} className="min-h-[44px] border border-black/30 px-4 text-[14px] text-black">Copia link Instagram</button>}
      {copyStatus && <p role="status">{copyStatus}</p>}
    </div>
  </section>;
}
