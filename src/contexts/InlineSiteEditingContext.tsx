import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAdminSession } from "@/hooks/useAdminSession";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { SiteSettings } from "@/types/siteContent";

interface InlineFields {
  save: () => Promise<void>;
  cancel: () => void;
  isDirty: () => boolean;
}

interface InlineSiteEditingState {
  editing: boolean;
  isAdmin: boolean;
  settings: SiteSettings;
  draft: SiteSettings;
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  error: string | null;
  update: (patch: Partial<SiteSettings>) => void;
  begin: () => void;
  cancel: () => void;
  save: () => Promise<void>;
  registerFields: (id: string, fields: InlineFields) => () => void;
}

const InlineSiteEditingContext = createContext<InlineSiteEditingState | null>(null);

/** One draft shared by the actual page fields and its compact save controls. */
export function InlineSiteEditingProvider({ children }: { children: ReactNode }) {
  const { settings, loading, saveSettings } = useSiteContent();
  const { isAdmin } = useAdminSession();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const original = useRef(settings);
  const fields = useRef(new Map<string, InlineFields>());
  const [, setFieldsRevision] = useState(0);
  const registerFields = useCallback((id: string, entry: InlineFields) => {
    fields.current.set(id, entry);
    setFieldsRevision((revision) => revision + 1);
    return () => {
      if (fields.current.get(id) === entry) {
        fields.current.delete(id);
        setFieldsRevision((revision) => revision + 1);
      }
    };
  }, []);

  useEffect(() => {
    if (!editing) {
      setDraft(settings);
      original.current = settings;
    }
  }, [editing, settings]);

  useEffect(() => {
    if (!isAdmin) {
      setEditing(false);
      setError(null);
    }
  }, [isAdmin]);

  const begin = useCallback(() => {
    if (!isAdmin || loading || saving || editing) return;
    original.current = settings;
    setDraft(settings);
    setError(null);
    setEditing(true);
  }, [editing, isAdmin, loading, saving, settings]);
  const update = useCallback((patch: Partial<SiteSettings>) => {
    if (!isAdmin || !editing || saving) return;
    setDraft((current) => ({ ...current, ...patch }));
    setError(null);
  }, [editing, isAdmin, saving]);
  const cancel = useCallback(() => {
    if (saving) return;
    fields.current.forEach((entry) => entry.cancel());
    setDraft(settings);
    setEditing(false);
    setError(null);
  }, [saving, settings]);
  const save = useCallback(async () => {
    if (!editing || saving) return;
    if (!isAdmin) {
      setError("Accedi con il tuo account amministratore per salvare.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      // Local catalogue persistence is read/modify/write, so save independent
      // cards sequentially to avoid one card overwriting another's update.
      for (const entry of Array.from(fields.current.values())) {
        if (entry.isDirty()) await entry.save();
      }
      if (JSON.stringify(draft) !== JSON.stringify(original.current)) {
        await saveSettings(draft);
      }
      setEditing(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Salvataggio non riuscito. Il testo resta disponibile nella pagina.");
    } finally {
      setSaving(false);
    }
  }, [draft, editing, isAdmin, saveSettings, saving]);
  const dirty = editing && (JSON.stringify(draft) !== JSON.stringify(original.current) || Array.from(fields.current.values()).some((entry) => entry.isDirty()));

  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  const value = useMemo(() => ({ editing, isAdmin, settings, draft: editing ? draft : settings, dirty, loading, saving, error, update, begin, cancel, save, registerFields }), [begin, cancel, dirty, draft, editing, error, isAdmin, loading, registerFields, save, saving, settings, update]);
  return <InlineSiteEditingContext.Provider value={value}>{children}</InlineSiteEditingContext.Provider>;
}

export function useInlineSiteEditing() {
  const context = useContext(InlineSiteEditingContext);
  if (!context) throw new Error("InlineSiteEditingProvider deve avvolgere le pagine del sito.");
  return context;
}
