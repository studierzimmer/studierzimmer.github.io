import React, { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  createArchiveSection,
  deleteArchiveSection,
  listAllArchiveSectionsForAdmin,
  updateArchiveSection,
} from "@/services/archiveSectionRepository";
import type { ArchiveSection } from "@/types/archiveSections";

interface AdminArchiveSectionManagerProps {
  onSectionsChanged?: (sections: ArchiveSection[]) => void;
}

const inputClass =
  "w-full border border-black/25 bg-white px-3 py-2 text-[13px] outline-none focus:border-black";
const buttonClass =
  "border border-black/35 bg-white px-3 py-2 text-[12px] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function AdminArchiveSectionManager({
  onSectionsChanged,
}: AdminArchiveSectionManagerProps) {
  const [sections, setSections] = useState<ArchiveSection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editOrder, setEditOrder] = useState(0);
  const [editVisible, setEditVisible] = useState(true);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedId) ?? null,
    [sections, selectedId]
  );

  const reload = useCallback(
    async (preferredId?: string | null) => {
      const nextSections = await listAllArchiveSectionsForAdmin();
      setSections(nextSections);
      setSelectedId((current) => {
        const candidate = preferredId ?? current;
        return candidate && nextSections.some((section) => section.id === candidate)
          ? candidate
          : nextSections[0]?.id ?? null;
      });
      onSectionsChanged?.(nextSections);
      return nextSections;
    },
    [onSectionsChanged]
  );

  useEffect(() => {
    let active = true;
    void listAllArchiveSectionsForAdmin()
      .then((nextSections) => {
        if (!active) return;
        setSections(nextSections);
        setSelectedId(nextSections[0]?.id ?? null);
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
    if (!selectedSection) return;
    setEditName(selectedSection.name);
    setEditCode(selectedSection.code);
    setEditOrder(selectedSection.sort_order);
    setEditVisible(selectedSection.is_visible);
  }, [selectedSection]);

  const clearMessages = () => {
    setNotice(null);
    setError(null);
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();
    setBusy(true);
    try {
      const created = await createArchiveSection(newName, newCode, sections.length);
      await reload(created.id);
      setNewName("");
      setNewCode("");
      setNotice("Archive section created. It is now available in book settings.");
    } catch (createError) {
      setError(messageFrom(createError));
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSection) return;
    clearMessages();
    setBusy(true);
    try {
      await updateArchiveSection(selectedSection.id, {
        name: editName,
        code: editCode,
        sort_order: Number.isFinite(editOrder) ? editOrder : 0,
        is_visible: editVisible,
      });
      await reload(selectedSection.id);
      setNotice("Archive section saved.");
    } catch (saveError) {
      setError(messageFrom(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSection) return;
    if (
      !window.confirm(
        `Delete “${selectedSection.name}”? Sections containing books cannot be deleted.`
      )
    ) {
      return;
    }
    clearMessages();
    setBusy(true);
    try {
      await deleteArchiveSection(selectedSection);
      await reload(null);
      setNotice("Archive section deleted.");
    } catch (deleteError) {
      setError(messageFrom(deleteError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-0 flex-1 md:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="border-b border-black/15 p-5 md:border-b-0 md:border-r">
        <form onSubmit={handleCreate} className="mb-8 flex flex-col gap-3">
          <h2 className="text-[17px]">CREATE SECTION</h2>
          <label className="text-[11px]">
            PUBLIC NAME
            <input
              required
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              className={`${inputClass} mt-1`}
              placeholder="PHOTOGRAPHY"
            />
          </label>
          <label className="text-[11px]">
            LIST CODE
            <input
              required
              maxLength={8}
              value={newCode}
              onChange={(event) => setNewCode(event.target.value.toUpperCase())}
              className={`${inputClass} mt-1`}
              placeholder="PHOTO"
            />
          </label>
          <button type="submit" disabled={busy} className={buttonClass}>
            CREATE SECTION
          </button>
        </form>

        <div className="border-t border-black/15">
          {loading ? (
            <p className="py-4 text-[13px] text-black/50">...</p>
          ) : (
            sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setSelectedId(section.id)}
                className={`block w-full border-b border-black/15 px-2 py-3 text-left ${
                  section.id === selectedId
                    ? "bg-black text-white"
                    : "hover:bg-black/5"
                }`}
              >
                <span className="block truncate text-[13px]">{section.name}</span>
                <span className="mt-1 block text-[10px] opacity-60">
                  {section.code} · {section.is_visible ? "VISIBLE" : "HIDDEN"}
                </span>
              </button>
            ))
          )}
        </div>
      </aside>

      <section className="p-5 md:p-8">
        {(notice || error) && (
          <div
            className={`mb-5 border p-3 text-[12px] ${
              error ? "border-red-700 text-red-700" : "border-black/25"
            }`}
            role={error ? "alert" : "status"}
          >
            {error ?? notice}
          </div>
        )}

        {!selectedSection ? (
          <div className="flex min-h-48 items-center justify-center text-[13px] text-black/45">
            CREATE OR SELECT A SECTION
          </div>
        ) : (
          <form onSubmit={handleSave} className="flex max-w-xl flex-col gap-4">
            <div>
              <h2 className="text-[22px]">{selectedSection.name}</h2>
              <p className="mt-1 font-mono text-[10px] text-black/45">
                STABLE SLUG · {selectedSection.slug}
              </p>
            </div>
            <label className="text-[11px]">
              PUBLIC NAME
              <input
                required
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="text-[11px]">
              LIST CODE
              <input
                required
                maxLength={8}
                value={editCode}
                onChange={(event) => setEditCode(event.target.value.toUpperCase())}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="text-[11px]">
              ORDER
              <input
                type="number"
                value={editOrder}
                onChange={(event) => setEditOrder(Number(event.target.value))}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="flex items-center gap-3 text-[12px]">
              <input
                type="checkbox"
                checked={editVisible}
                onChange={(event) => setEditVisible(event.target.checked)}
              />
              VISIBLE IN THE PUBLIC ARCHIVE
            </label>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={busy} className={buttonClass}>
                SAVE SECTION
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleDelete()}
                className={`${buttonClass} border-red-700 text-red-700`}
              >
                DELETE SECTION
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
