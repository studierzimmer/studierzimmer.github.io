import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createCharacter,
  deleteCharacter,
  ensureBundledCharactersForAdmin,
  listAllCharactersForAdmin,
  replaceCharacterFile,
  setFeaturedCharacter,
  updateCharacter,
  type CharacterTransferProgress,
} from "@/services/characterRepository";
import type { Character3D } from "@/types/characters3d";

interface AdminCharacterManagerProps {
  onCharactersChanged?: () => void;
}

const inputClass =
  "w-full border-0 border-b border-black/25 bg-transparent px-0 py-2 text-[13px] font-normal outline-none focus:border-black";
const buttonClass =
  "border-0 bg-transparent px-2 py-2 text-[12px] font-normal underline-offset-4 transition-transform hover:scale-[1.02] hover:underline active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35";

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function AdminCharacterManager({
  onCharactersChanged,
}: AdminCharacterManagerProps) {
  const [characters, setCharacters] = useState<Character3D[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] =
    useState<CharacterTransferProgress | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const createFileRef = useRef<HTMLInputElement | null>(null);
  const replaceFileRef = useRef<HTMLInputElement | null>(null);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editScale, setEditScale] = useState(10);
  const [editCameraDistance, setEditCameraDistance] = useState(70);
  const [editPublished, setEditPublished] = useState(false);
  const [editFeatured, setEditFeatured] = useState(false);
  const [editSortOrder, setEditSortOrder] = useState(0);

  const selectedCharacter = useMemo(
    () =>
      characters.find((character) => character.id === selectedId) ?? null,
    [characters, selectedId]
  );

  const reload = useCallback(
    async (preferredId?: string | null) => {
      const nextCharacters = await listAllCharactersForAdmin();
      setCharacters(nextCharacters);
      setSelectedId((current) => {
        const candidate = preferredId ?? current;
        return candidate &&
          nextCharacters.some((character) => character.id === candidate)
          ? candidate
          : nextCharacters[0]?.id ?? null;
      });
      onCharactersChanged?.();
    },
    [onCharactersChanged]
  );

  useEffect(() => {
    let active = true;
    void ensureBundledCharactersForAdmin()
      .then(() => listAllCharactersForAdmin())
      .then((nextCharacters) => {
        if (!active) return;
        setCharacters(nextCharacters);
        setSelectedId(nextCharacters[0]?.id ?? null);
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
    if (!selectedCharacter) return;
    setEditName(selectedCharacter.name);
    setEditDescription(selectedCharacter.description);
    setEditScale(Number(selectedCharacter.model_scale));
    setEditCameraDistance(Number(selectedCharacter.camera_distance));
    setEditPublished(selectedCharacter.is_published);
    setEditFeatured(selectedCharacter.is_featured);
    setEditSortOrder(selectedCharacter.sort_order);
    if (replaceFileRef.current) replaceFileRef.current.value = "";
  }, [selectedCharacter]);

  const clearMessages = () => {
    setNotice(null);
    setError(null);
    setProgress(null);
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!newFile) {
      setError("Choose a .glb or self-contained .gltf file.");
      return;
    }

    clearMessages();
    setBusy(true);
    try {
      const character = await createCharacter(
        newName,
        newFile,
        characters.length,
        setProgress
      );
      setNewName("");
      setNewFile(null);
      if (createFileRef.current) createFileRef.current.value = "";
      await reload(character.id);
      setNotice("Character added. Publish it when it is ready.");
    } catch (createError) {
      setError(messageFrom(createError));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedCharacter || selectedCharacter.is_virtual) return;

    clearMessages();
    setBusy(true);
    try {
      await updateCharacter(selectedCharacter.id, {
        name: editName.trim() || selectedCharacter.name,
        description: editDescription.trim(),
        model_scale: editScale,
        camera_distance: editCameraDistance,
        is_published: editPublished || editFeatured,
        sort_order: editSortOrder,
      });
      if (editFeatured && !selectedCharacter.is_featured) {
        await setFeaturedCharacter(selectedCharacter.id);
      }
      await reload(selectedCharacter.id);
      setNotice("Character settings saved.");
    } catch (saveError) {
      setError(messageFrom(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handleReplace = async (file: File | null) => {
    if (!selectedCharacter || !file || selectedCharacter.is_virtual) return;

    clearMessages();
    setBusy(true);
    try {
      const character = await replaceCharacterFile(
        selectedCharacter,
        file,
        setProgress
      );
      await reload(character.id);
      setNotice("Character file replaced.");
    } catch (replaceError) {
      setError(messageFrom(replaceError));
    } finally {
      setBusy(false);
      setProgress(null);
      if (replaceFileRef.current) replaceFileRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!selectedCharacter || selectedCharacter.is_virtual) return;
    if (!window.confirm(`Delete “${selectedCharacter.name}”?`)) return;

    clearMessages();
    setBusy(true);
    try {
      await deleteCharacter(selectedCharacter);
      await reload(null);
      setNotice("Character deleted.");
    } catch (deleteError) {
      setError(messageFrom(deleteError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto grid w-full max-w-[1500px] gap-8 bg-white px-5 py-7 md:grid-cols-[320px_minmax(0,1fr)] md:px-8">
      <aside className="min-w-0">
        <form onSubmit={handleCreate} className="mb-10 flex flex-col gap-3">
          <h2 className="text-[18px] font-normal">ADD A CHARACTER</h2>
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="NAME"
            className={inputClass}
            disabled={busy}
          />
          <input
            ref={createFileRef}
            type="file"
            accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
            onChange={(event) => setNewFile(event.target.files?.[0] ?? null)}
            className={`${inputClass} file:border-0 file:bg-transparent file:px-0 file:pr-3 file:text-[12px]`}
            disabled={busy}
          />
          <button
            type="submit"
            className={`${buttonClass} self-start px-0`}
            disabled={busy || !newFile}
          >
            ADD
          </button>
        </form>

        <h2 className="mb-3 text-[18px] font-normal">CHARACTERS</h2>
        {loading ? (
          <p className="py-4 text-[13px] text-black/45">...</p>
        ) : (
          <div className="flex flex-col gap-1">
            {characters.map((character) => (
              <button
                key={character.id}
                type="button"
                onClick={() => setSelectedId(character.id)}
                className={`rounded-[16px] px-4 py-3 text-left transition-colors ${
                  character.id === selectedId
                    ? "bg-black text-white"
                    : "bg-transparent text-black/48 hover:text-black"
                }`}
              >
                <span className="block text-[14px] font-normal uppercase">
                  {character.name}
                  {character.is_featured ? " *" : ""}
                </span>
                <span
                  className={`mt-1 block text-[11px] ${
                    character.id === selectedId
                      ? "text-white/60"
                      : "text-black/38"
                  }`}
                >
                  {character.asset_source.toUpperCase()} ·{" "}
                  {character.is_published ? "PUBLIC" : "DRAFT"}
                </span>
              </button>
            ))}
          </div>
        )}
      </aside>

      <section className="min-w-0">
        {selectedCharacter ? (
          <form onSubmit={handleSave} className="flex max-w-3xl flex-col gap-6">
            <div className="grid gap-5 rounded-[24px] bg-black/[0.045] p-5 sm:grid-cols-2">
              <label className="text-[11px] text-black/55">
                MODEL SCALE · {editScale.toFixed(2)}
                <input
                  type="range"
                  min="0.05"
                  max="30"
                  step="0.05"
                  value={editScale}
                  onChange={(event) =>
                    setEditScale(Number(event.target.value))
                  }
                  className="mt-3 block w-full accent-black"
                  disabled={busy}
                />
              </label>
              <label className="text-[11px] text-black/55">
                CAMERA DISTANCE · {Math.round(editCameraDistance)}
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="1"
                  value={editCameraDistance}
                  onChange={(event) =>
                    setEditCameraDistance(Number(event.target.value))
                  }
                  className="mt-3 block w-full accent-black"
                  disabled={busy}
                />
              </label>
            </div>

            <label className="text-[11px] text-black/55">
              NAME
              <input
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                className={inputClass}
                disabled={busy}
              />
            </label>
            <label className="text-[11px] text-black/55">
              DESCRIPTION
              <textarea
                value={editDescription}
                onChange={(event) => setEditDescription(event.target.value)}
                rows={4}
                className={`${inputClass} resize-y`}
                disabled={busy}
              />
            </label>
            <label className="text-[11px] text-black/55">
              ORDER
              <input
                type="number"
                value={editSortOrder}
                onChange={(event) =>
                  setEditSortOrder(Number(event.target.value))
                }
                className={inputClass}
                disabled={busy}
              />
            </label>

            <div className="flex flex-wrap gap-5 text-[12px]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editPublished}
                  onChange={(event) => setEditPublished(event.target.checked)}
                  disabled={busy}
                />
                PUBLISHED
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editFeatured}
                  onChange={(event) => setEditFeatured(event.target.checked)}
                  disabled={busy}
                />
                FEATURED
              </label>
            </div>

            {selectedCharacter.is_virtual ? (
              <p className="text-[12px] text-black/45">
                Open this section once while online to register this bundled
                character, then select it again to edit or replace it.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className={buttonClass} disabled={busy}>
                  SAVE
                </button>
                <label className={`${buttonClass} cursor-pointer`}>
                  REPLACE GLB / GLTF
                  <input
                    ref={replaceFileRef}
                    type="file"
                    accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
                    onChange={(event) =>
                      void handleReplace(event.target.files?.[0] ?? null)
                    }
                    className="sr-only"
                    disabled={busy}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => void handleDelete()}
                  className={buttonClass}
                  disabled={busy || selectedCharacter.asset_source === "bundled"}
                >
                  DELETE
                </button>
              </div>
            )}

            <p className="text-[11px] text-black/38">
              {selectedCharacter.file_name} · animations embedded in the file
              play automatically in a loop.
            </p>
          </form>
        ) : (
          !loading && (
            <p className="text-[13px] text-black/45">
              Add or select a character.
            </p>
          )
        )}

        {progress && (
          <div className="mt-7 max-w-3xl">
            <div className="mb-2 flex justify-between text-[11px] text-black/55">
              <span>{progress.label}</span>
              <span>{progress.percent}%</span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-black transition-[width] duration-300"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        )}
        {notice && (
          <p className="mt-6 text-[12px] text-black/55">{notice}</p>
        )}
        {error && <p className="mt-6 text-[12px] text-red-700">{error}</p>}
      </section>
    </main>
  );
}
