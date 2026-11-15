import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createThreeDModel,
  deleteThreeDModel,
  listAllThreeDModelsForAdmin,
  removeThreeDModelHdri,
  replaceThreeDModelFile,
  replaceThreeDModelHdri,
  setFeaturedThreeDModel,
  updateThreeDModel,
} from "@/services/threeDModelRepository";
import BookBackgroundColorPicker, {
  hexToRgb,
  rgbToHex,
  type RgbColor,
} from "@/components/admin/BookBackgroundColorPicker";
import type { ThreeDModel } from "@/types/threeDModels";
import type { ModelProcessingProgress } from "@/services/stepModelConverter";
import { useSiteContent } from "@/hooks/useSiteContent";
import { modelCategoryFor } from "@/lib/modelCategories";
import type { ModelCategory } from "@/types/siteContent";
import "./AdminWorkspace.css";

interface AdminThreeDModelManagerProps {
  onModelsChanged?: () => void;
}

const inputClass =
  "w-full border-0 border-b border-black/30 bg-transparent px-0 py-2 text-[13px] outline-none focus:border-black";
const buttonClass =
  "border-0 bg-transparent px-2 py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-40";
const modelFileAccept =
  ".glb,.stl,.step,.stp,model/gltf-binary,model/stl,application/sla,application/step,model/step";
const hdriFileAccept = ".hdr,.exr,image/vnd.radiance,image/x-exr";
const DEFAULT_PLASTER_COLOR: RgbColor = { r: 238, g: 234, b: 225 };

function isStlModel(model: ThreeDModel): boolean {
  return /\.stl$/i.test(model.file_name) || /\.stl$/i.test(model.storage_path);
}

function modelFormat(model: ThreeDModel): "GLB" | "STL" | "STEP" {
  if (model.source_format === "step") return "STEP";
  return isStlModel(model) ? "STL" : "GLB";
}

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function AdminThreeDModelManager({
  onModelsChanged,
}: AdminThreeDModelManagerProps) {
  const { settings, saveSettings } = useSiteContent();
  const [categoryBusy, setCategoryBusy] = useState(false);
  const [models, setModels] = useState<ThreeDModel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [processing, setProcessing] = useState<ModelProcessingProgress | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPublished, setEditPublished] = useState(false);
  const [editFeatured, setEditFeatured] = useState(false);
  const [editWatch, setEditWatch] = useState(false);
  const [editSortOrder, setEditSortOrder] = useState(0);
  const [editPlasterColor, setEditPlasterColor] = useState<RgbColor>(
    DEFAULT_PLASTER_COLOR
  );
  const createFileRef = useRef<HTMLInputElement | null>(null);
  const replaceFileRef = useRef<HTMLInputElement | null>(null);
  const hdriFileRef = useRef<HTMLInputElement | null>(null);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === selectedId) ?? null,
    [models, selectedId]
  );

  const reload = useCallback(async (preferredId?: string | null) => {
    const nextModels = await listAllThreeDModelsForAdmin();
    setModels(nextModels);
    setSelectedId((current) => {
      const candidate = preferredId ?? current;
      return candidate && nextModels.some((model) => model.id === candidate)
        ? candidate
        : nextModels[0]?.id ?? null;
    });
    onModelsChanged?.();
  }, [onModelsChanged]);

  useEffect(() => {
    let active = true;

    void listAllThreeDModelsForAdmin()
      .then((nextModels) => {
        if (!active) return;
        setModels(nextModels);
        setSelectedId(nextModels[0]?.id ?? null);
      })
      .catch((loadError) => {
        if (active) setError(messageFrom(loadError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedModel) return;
    setEditName(selectedModel.name);
    setEditDescription(selectedModel.description);
    setEditPublished(selectedModel.is_published);
    setEditFeatured(selectedModel.is_featured);
    setEditWatch(selectedModel.is_watch);
    setEditSortOrder(selectedModel.sort_order);
    setEditPlasterColor(
      hexToRgb(selectedModel.plaster_color) ?? DEFAULT_PLASTER_COLOR
    );
    if (replaceFileRef.current) replaceFileRef.current.value = "";
    if (hdriFileRef.current) hdriFileRef.current.value = "";
  }, [selectedModel]);

  const clearMessages = () => {
    setNotice(null);
    setError(null);
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newFile) {
      setError("Choose a GLB, STL, STEP or STP file.");
      return;
    }

    clearMessages();
    setBusy(true);
    try {
      const created = await createThreeDModel(
        newName,
        newFile,
        models.length,
        setProcessing
      );
      await reload(created.id);
      setNewName("");
      setNewFile(null);
      if (createFileRef.current) createFileRef.current.value = "";
      setNotice("Model uploaded as a draft. Publish it when it is ready.");
    } catch (createError) {
      setError(messageFrom(createError));
    } finally {
      setProcessing(null);
      setBusy(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedModel) return;

    clearMessages();
    setBusy(true);
    try {
      await updateThreeDModel(selectedModel.id, {
        name: editName.trim(),
        description: editDescription.trim(),
        is_published: editPublished,
        is_featured: editFeatured ? selectedModel.is_featured : false,
        is_watch: editWatch,
        sort_order: Number.isFinite(editSortOrder) ? editSortOrder : 0,
        ...(isStlModel(selectedModel)
          ? { plaster_color: rgbToHex(editPlasterColor) }
          : {}),
      });

      if (editFeatured && !selectedModel.is_featured) {
        await setFeaturedThreeDModel(selectedModel.id);
      }
      await reload(selectedModel.id);
      setNotice("3D model settings saved.");
    } catch (saveError) {
      setError(messageFrom(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handleReplace = async (file: File | undefined) => {
    if (!selectedModel || !file) return;
    clearMessages();
    setBusy(true);
    try {
      await replaceThreeDModelFile(selectedModel, file, setProcessing);
      await reload(selectedModel.id);
      setNotice("Model file replaced.");
    } catch (replaceError) {
      setError(messageFrom(replaceError));
    } finally {
      setProcessing(null);
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedModel) return;
    if (!window.confirm(`Delete “${selectedModel.name}” and its model file?`)) return;

    clearMessages();
    setBusy(true);
    try {
      await deleteThreeDModel(selectedModel);
      await reload(null);
      setNotice("3D model deleted.");
    } catch (deleteError) {
      setError(messageFrom(deleteError));
    } finally {
      setBusy(false);
    }
  };

  const handleHdriReplace = async (file: File | undefined) => {
    if (!selectedModel || !file) return;
    clearMessages();
    setBusy(true);
    try {
      await replaceThreeDModelHdri(selectedModel, file);
      await reload(selectedModel.id);
      setNotice("Model HDRI saved. PBR will use it on the next load.");
    } catch (hdriError) {
      setError(messageFrom(hdriError));
    } finally {
      if (hdriFileRef.current) hdriFileRef.current.value = "";
      setBusy(false);
    }
  };

  const handleHdriRemove = async () => {
    if (!selectedModel?.hdri_storage_path) return;
    clearMessages();
    setBusy(true);
    try {
      await removeThreeDModelHdri(selectedModel);
      await reload(selectedModel.id);
      setNotice("Custom HDRI removed. PBR now uses the built-in studio environment.");
    } catch (hdriError) {
      setError(messageFrom(hdriError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-model-workspace grid min-h-0 flex-1 md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="overflow-y-auto p-4">
        <details className="admin-create-disclosure">
        <summary>Nuovo modello <span aria-hidden="true">＋</span></summary>
        <form onSubmit={handleCreate} className="mb-7 flex flex-col gap-3">
          <h2 className="text-[16px]">Nome e file</h2>
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            aria-label="Nome del nuovo modello"
            placeholder="Nome del modello"
            className={inputClass}
          />
          <input
            ref={createFileRef}
            type="file"
            aria-label="File del nuovo modello"
            accept={modelFileAccept}
            onChange={(event) => setNewFile(event.target.files?.[0] ?? null)}
            className="min-w-0 text-[12px]"
          />
          <button type="submit" disabled={busy || !newFile} className={buttonClass}>
            Carica modello
          </button>
          {processing && (
            <div className="bg-black/[0.035] p-3" role="status">
              <div className="mb-2 flex items-center justify-between gap-3 text-[10px]">
                <span>{processing.label}</span>
                <span className="tabular-nums">{processing.percent}%</span>
              </div>
              <div
                className="h-[3px] overflow-hidden bg-black/10"
                role="progressbar"
                aria-label="Processing 3D model"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={processing.percent}
              >
                <div
                  className="h-full bg-black transition-[width] duration-300 ease-out"
                  style={{ width: `${processing.percent}%` }}
                />
              </div>
            </div>
          )}
        </form>
        </details>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[16px]">Modelli</h2>
          <span className="text-[11px] text-black/45">{models.length}</span>
        </div>

        {loading ? (
          <p className="text-[13px] text-black/50">...</p>
        ) : models.length === 0 ? (
          <p className="text-[13px] leading-relaxed text-black/55">
            No Supabase models yet. The local watch remains the public fallback.
          </p>
        ) : (
          <div className="admin-model-catalog">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                aria-pressed={model.id === selectedId}
                onClick={() => setSelectedId(model.id)}
                className={`block w-full border-0 px-2 py-3 text-left transition-colors ${
                  model.id === selectedId ? "bg-black text-white" : "bg-transparent"
                }`}
              >
                <span className="block truncate text-[13px]">{model.name}</span>
                <span className="mt-1 block truncate text-[10px] opacity-60">
                  {modelFormat(model)} ·{" "}
                  {model.is_featured ? "FEATURED · " : ""}
                  {model.is_published ? "PUBLIC" : "DRAFT"}
                </span>
              </button>
            ))}
          </div>
        )}
      </aside>

      <section className="overflow-y-auto p-4 sm:p-6">
        {(notice || error) && (
          <div
            role={error ? "alert" : "status"}
            className={`mb-5 border p-3 text-[12px] ${
              error ? "border-red-700 text-red-700" : "border-black/25"
            }`}
          >
            {error ?? notice}
          </div>
        )}

        {!selectedModel ? (
          <div className="flex min-h-48 items-center justify-center text-[13px] text-black/45">
            UPLOAD OR SELECT A MODEL
          </div>
        ) : (
          <form onSubmit={handleSave} className="admin-editor-form">
            <header className="admin-editor-context">
              <div><p className="admin-editor-eyebrow">Modello selezionato</p><h2>{selectedModel.name}</h2></div>
              <span className="admin-editor-state">{modelFormat(selectedModel)} · {selectedModel.is_published ? "Pubblico" : "Bozza"}</span>
            </header>
            <details className="admin-editor-reference">
              <summary>File e dati tecnici</summary>
              <p>{selectedModel.storage_path}</p>
              {selectedModel.source_format === "step" && <><p>Sorgente STEP · {selectedModel.source_file_name}</p><p>Il sorgente resta privato. I visitatori ricevono solo l’anteprima GLB generata.</p></>}
            </details>

            <details className="admin-editor-group" open>
              <summary><span>Testi<small>Nome e descrizione del modello</small></span><span aria-hidden="true">＋</span></summary>
              <div className="admin-editor-fields">
                <label>Nome<input required value={editName} onChange={(event) => setEditName(event.target.value)} className={inputClass} /></label>
                <label>Descrizione<textarea rows={4} value={editDescription} onChange={(event) => setEditDescription(event.target.value)} className={`${inputClass} resize-y`} /></label>
              </div>
            </details>

            <details className="admin-editor-group">
              <summary><span>Pubblicazione e sezione<small>Visibilità, ordine e comportamento</small></span><span aria-hidden="true">＋</span></summary>
              <div className="admin-editor-fields">
                <label>Sezione del sito<select className={inputClass} value={modelCategoryFor(selectedModel, settings.model_categories)} disabled={categoryBusy || busy} onChange={async (event) => {
                  const category = event.target.value as ModelCategory;
                  setCategoryBusy(true);
                  try {
                    await saveSettings({ ...settings, model_categories: { ...settings.model_categories, [selectedModel.id]: category } });
                    setNotice("Sezione aggiornata.");
                    onModelsChanged?.();
                  } catch (categoryError) { setError(messageFrom(categoryError)); }
                  finally { setCategoryBusy(false); }
                }}>
                  <option value="horlogerie">Horlogerie · orologi</option>
                  <option value="jewelry">Jewelry · gioielli</option>
                  <option value="models">Models · altri modelli</option>
                </select><small>La sezione si aggiorna subito; gli altri campi si applicano con Salva.</small></label>
                <label>Ordine nella lista<input type="number" value={editSortOrder} onChange={(event) => setEditSortOrder(Number(event.target.value))} className={inputClass} /></label>
                <label className="admin-editor-toggle"><input type="checkbox" checked={editPublished} onChange={(event) => setEditPublished(event.target.checked)} /><span>Pubblico<small>Visibile nella libreria 3D</small></span></label>
                <label className="admin-editor-toggle"><input type="checkbox" checked={editFeatured} onChange={(event) => setEditFeatured(event.target.checked)} /><span>Modello iniziale<small>Si apre per primo</small></span></label>
                {modelFormat(selectedModel) === "GLB" && <label className="admin-editor-toggle"><input type="checkbox" checked={editWatch} onChange={(event) => setEditWatch(event.target.checked)} /><span>Movimento orologio<small>Ora locale per hourshand_pivot, minuteshand_pivot e secondshand_pivot</small></span></label>}
              </div>
            </details>

            <details className="admin-editor-group">
              <summary><span>Materiale e luce<small>{isStlModel(selectedModel) ? "Colore STL e ambiente HDRI" : "Ambiente HDRI per il render PBR"}</small></span><span aria-hidden="true">＋</span></summary>
              <div className="admin-editor-fields">
                {isStlModel(selectedModel) && <div>
                  <BookBackgroundColorPicker key={`${selectedModel.id}-${selectedModel.file_name}`} value={editPlasterColor} onChange={setEditPlasterColor} legend="Colore materiale STL" ariaLabel="Colore materiale STL" />
                  <p className="admin-editor-help">Colore del materiale in PBR. Arctic resta neutro; Pen resta bianco e nero.</p>
                </div>}
                <div className="admin-editor-file">
                  <p className="admin-editor-eyebrow">Ambiente PBR</p>
                  <p className="admin-editor-filename">{selectedModel.hdri_file_name ?? "Studio neutro predefinito"}</p>
                  <label>{selectedModel.hdri_storage_path ? "Sostituisci HDR / EXR" : "Carica HDR / EXR"}<input ref={hdriFileRef} type="file" accept={hdriFileAccept} disabled={busy} onChange={(event) => void handleHdriReplace(event.target.files?.[0])} /></label>
                  <p className="admin-editor-help">Il caricamento parte subito. Il file resta privato.</p>
                  {selectedModel.hdri_storage_path && <button type="button" disabled={busy} onClick={() => void handleHdriRemove()} className={buttonClass}>Usa studio predefinito</button>}
                </div>
              </div>
            </details>

            <details className="admin-editor-group">
              <summary><span>Sostituisci file 3D<small>GLB, STL, STEP o STP</small></span><span aria-hidden="true">＋</span></summary>
              <div className="admin-editor-fields">
                <label>Nuovo file<input ref={replaceFileRef} type="file" accept={modelFileAccept} disabled={busy} onChange={(event) => void handleReplace(event.target.files?.[0])} /></label>
                <p className="admin-editor-help">La sostituzione parte subito dopo la scelta del file.</p>
              </div>
            </details>

            <details className="admin-editor-group admin-editor-danger">
              <summary><span>Elimina modello<small>Operazione definitiva, richiede conferma</small></span><span aria-hidden="true">＋</span></summary>
              <div className="admin-editor-fields"><p>Rimuove il modello e i suoi file.</p><button type="button" disabled={busy} onClick={() => void handleDelete()} className={`${buttonClass} text-red-700`}>Elimina modello e file</button></div>
            </details>

            <div className="admin-model-savebar admin-editor-savebar">
              <span>{busy || categoryBusy ? "Operazione in corso…" : "Testi e impostazioni si applicano al salvataggio."}</span>
              <button type="submit" disabled={busy || categoryBusy} className="admin-primary-action">{busy ? "Attendi…" : "Salva modello"}</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
