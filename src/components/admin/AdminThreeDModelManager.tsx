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
  replaceThreeDModelFile,
  setFeaturedThreeDModel,
  updateThreeDModel,
} from "@/services/threeDModelRepository";
import BookBackgroundColorPicker, {
  hexToRgb,
  rgbToHex,
  type RgbColor,
} from "@/components/admin/BookBackgroundColorPicker";
import type { ThreeDModel } from "@/types/threeDModels";

interface AdminThreeDModelManagerProps {
  onModelsChanged?: () => void;
}

const inputClass =
  "w-full border border-black/25 bg-white px-3 py-2 text-[13px] outline-none focus:border-black";
const buttonClass =
  "border border-black/35 bg-white px-3 py-2 text-[12px] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";
const modelFileAccept =
  ".glb,.stl,model/gltf-binary,model/stl,application/sla";
const DEFAULT_PLASTER_COLOR: RgbColor = { r: 238, g: 234, b: 225 };

function isStlModel(model: ThreeDModel): boolean {
  return /\.stl$/i.test(model.file_name) || /\.stl$/i.test(model.storage_path);
}

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function AdminThreeDModelManager({
  onModelsChanged,
}: AdminThreeDModelManagerProps) {
  const [models, setModels] = useState<ThreeDModel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPublished, setEditPublished] = useState(false);
  const [editFeatured, setEditFeatured] = useState(false);
  const [editSortOrder, setEditSortOrder] = useState(0);
  const [editPlasterColor, setEditPlasterColor] = useState<RgbColor>(
    DEFAULT_PLASTER_COLOR
  );
  const createFileRef = useRef<HTMLInputElement | null>(null);
  const replaceFileRef = useRef<HTMLInputElement | null>(null);

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
    setEditSortOrder(selectedModel.sort_order);
    setEditPlasterColor(
      hexToRgb(selectedModel.plaster_color) ?? DEFAULT_PLASTER_COLOR
    );
    if (replaceFileRef.current) replaceFileRef.current.value = "";
  }, [selectedModel]);

  const clearMessages = () => {
    setNotice(null);
    setError(null);
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newFile) {
      setError("Choose a GLB or STL file.");
      return;
    }

    clearMessages();
    setBusy(true);
    try {
      const created = await createThreeDModel(newName, newFile, models.length);
      await reload(created.id);
      setNewName("");
      setNewFile(null);
      if (createFileRef.current) createFileRef.current.value = "";
      setNotice("Model uploaded as a draft. Publish it when it is ready.");
    } catch (createError) {
      setError(messageFrom(createError));
    } finally {
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
      await replaceThreeDModelFile(selectedModel, file);
      await reload(selectedModel.id);
      setNotice("Model file replaced.");
    } catch (replaceError) {
      setError(messageFrom(replaceError));
    } finally {
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

  return (
    <div className="grid min-h-0 flex-1 md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="overflow-y-auto border-b border-black/15 p-4 md:border-b-0 md:border-r">
        <form onSubmit={handleCreate} className="mb-7 flex flex-col gap-3">
          <h2 className="text-[16px]">ADD 3D MODEL</h2>
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="MODEL NAME"
            className={inputClass}
          />
          <input
            ref={createFileRef}
            type="file"
            accept={modelFileAccept}
            onChange={(event) => setNewFile(event.target.files?.[0] ?? null)}
            className="min-w-0 text-[12px]"
          />
          <button type="submit" disabled={busy || !newFile} className={buttonClass}>
            UPLOAD GLB / STL
          </button>
        </form>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[16px]">MODEL LIST</h2>
          <span className="text-[11px] text-black/45">{models.length}</span>
        </div>

        {loading ? (
          <p className="text-[13px] text-black/50">Loading…</p>
        ) : models.length === 0 ? (
          <p className="text-[13px] leading-relaxed text-black/55">
            No Supabase models yet. The local watch remains the public fallback.
          </p>
        ) : (
          <div className="border-t border-black/15">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedId(model.id)}
                className={`block w-full border-b border-black/15 px-2 py-3 text-left ${
                  model.id === selectedId ? "bg-black text-white" : "hover:bg-black/5"
                }`}
              >
                <span className="block truncate text-[13px]">{model.name}</span>
                <span className="mt-1 block truncate text-[10px] opacity-60">
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
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <h2 className="text-[20px]">{selectedModel.name}</h2>
              <p className="mt-1 break-all font-mono text-[10px] text-black/45">
                {selectedModel.storage_path}
              </p>
            </div>

            <label className="text-[11px]">
              NAME
              <input
                required
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>

            <label className="text-[11px]">
              DESCRIPTION
              <textarea
                rows={4}
                value={editDescription}
                onChange={(event) => setEditDescription(event.target.value)}
                className={`${inputClass} mt-1 resize-y`}
              />
            </label>

            <label className="text-[11px]">
              PUBLIC ORDER
              <input
                type="number"
                value={editSortOrder}
                onChange={(event) => setEditSortOrder(Number(event.target.value))}
                className={`${inputClass} mt-1`}
              />
            </label>

            {isStlModel(selectedModel) && (
              <div>
                <BookBackgroundColorPicker
                  key={`${selectedModel.id}-${selectedModel.file_name}`}
                  value={editPlasterColor}
                  onChange={setEditPlasterColor}
                  legend="STL PLASTER COLOR — HSV"
                  ariaLabel="STL plaster color"
                />
                <p className="mt-2 text-[11px] leading-relaxed text-black/50">
                  Used as the plaster base color in PBR mode. Arctic stays
                  neutral and pen stays black on white.
                </p>
              </div>
            )}

            <label className="flex items-center gap-3 text-[12px]">
              <input
                type="checkbox"
                checked={editPublished}
                onChange={(event) => setEditPublished(event.target.checked)}
              />
              PUBLISHED — visible in the public 3D list
            </label>

            <label className="flex items-center gap-3 text-[12px]">
              <input
                type="checkbox"
                checked={editFeatured}
                onChange={(event) => setEditFeatured(event.target.checked)}
              />
              FEATURED — opens first
            </label>

            <div className="border border-dashed border-black/25 p-3">
              <label className="block text-[11px]">
                REPLACE GLB / STL
                <input
                  ref={replaceFileRef}
                  type="file"
                  accept={modelFileAccept}
                  disabled={busy}
                  onChange={(event) => void handleReplace(event.target.files?.[0])}
                  className="mt-2 block min-w-0 text-[12px]"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={busy} className={buttonClass}>
                SAVE MODEL
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleDelete()}
                className={`${buttonClass} border-red-700 text-red-700`}
              >
                DELETE MODEL + FILE
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
