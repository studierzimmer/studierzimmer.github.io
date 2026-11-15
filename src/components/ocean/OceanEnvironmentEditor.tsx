import { useInlineSiteEditing } from "@/components/SiteEditControl";
import { useAdminSession } from "@/hooks/useAdminSession";
import { normalizeOceanEnvironment, type OceanEnvironmentSettings } from "@/types/oceanEnvironment";
import "./ocean-environment-editor.css";

const ranges: { key: keyof OceanEnvironmentSettings; label: string; min: number; max: number; step: number }[] = [
  { key: "waterClarity", label: "Limpidezza vicina", min: .2, max: 1, step: .02 },
  { key: "nearRadius", label: "Raggio limpidezza", min: 60, max: 600, step: 10 },
  { key: "sunElevation", label: "Altezza del sole", min: 3, max: 75, step: 1 },
  { key: "sunAzimuth", label: "Direzione del sole", min: 0, max: 360, step: 1 },
  { key: "floorGlowStrength", label: "Luce sul fondo", min: 0, max: 2, step: .05 },
  { key: "floorGlowRadius", label: "Raggio luce sul fondo", min: 40, max: 400, step: 10 },
];
export default function OceanEnvironmentEditor() {
  const { editing, isAdmin, draft, update, saving } = useInlineSiteEditing();
  const session = useAdminSession();
  if (!editing || !isAdmin || !session.user || !session.isAdmin || session.loading) return null;
  const environment = normalizeOceanEnvironment(draft.ocean_environment);
  const change = (key: keyof OceanEnvironmentSettings, value: string | number) => update({ ocean_environment: normalizeOceanEnvironment({ ...environment, [key]: value }) });
  return <details className="ocean-environment-editor" data-ocean-control data-inline-editor aria-label="Modifica mare e sole">
    <summary>Mare e sole</summary>
    <div className="ocean-environment-fields">
    <div className="ocean-environment-colors">{([
      ["shallowColor", "Colore vicino"], ["waterColor", "Oltremare lontano"], ["floorGlowColor", "Luce sul fondo"],
    ] as const).map(([key, label]) => <label key={key}><span>{label}</span><input type="color" aria-label={label} value={environment[key]} disabled={saving} onChange={(event) => change(key, event.target.value)} /></label>)}</div>
    {ranges.map(({ key, label, min, max, step }) => <label key={key} className="ocean-environment-range"><span>{label}</span><output>{Number(environment[key]).toFixed(step < 1 ? 2 : 0)}</output><input type="range" aria-label={label} min={min} max={max} step={step} value={environment[key]} disabled={saving} onChange={(event) => change(key, Number(event.target.value))} /></label>)}
    <small>Anteprima in tempo reale · usa Salva o Annulla della matita.</small>
    </div>
  </details>;
}
