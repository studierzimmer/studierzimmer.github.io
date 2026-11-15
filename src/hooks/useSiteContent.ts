import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_SITE_SETTINGS,
  getSiteContentStatus,
  getSiteSettings,
  listArtworkItems,
  saveSiteSettings,
  SITE_CONTENT_EVENT,
} from "@/services/siteContentRepository";
import type { ArtworkItem, ContentSource, SiteSettings } from "@/types/siteContent";

interface Snapshot<T> {
  value: T;
  loading: boolean;
  error: string | null;
  source: ContentSource;
}

function createContentStore<T>(initial: T, read: () => Promise<T>, kind: "settings" | "artworks") {
  let snapshot: Snapshot<T> = { value: initial, loading: true, error: null, source: "default" };
  let started = false;
  let pending: Promise<void> | null = null;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());
  const reload = (): Promise<void> => {
    if (pending) return pending;
    started = true;
    snapshot = { ...snapshot, loading: true };
    notify();
    pending = (async () => {
      try {
        const value = await read();
        snapshot = { value, loading: false, ...getSiteContentStatus(kind) };
      } catch (error) {
        snapshot = { ...snapshot, loading: false, error: error instanceof Error ? error.message : "Caricamento non riuscito." };
      } finally {
        pending = null;
        notify();
      }
    })();
    return pending;
  };
  const onChange = (event: Event) => {
    if ((event as CustomEvent<{ kind: string }>).detail.kind !== kind) return;
    // A save can finish while the initial remote read is still pending. Re-read
    // afterwards so the older response cannot replace the newly saved draft.
    if (pending) void pending.then(reload);
    else void reload();
  };
  let observing = false;
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      if (!observing) {
        window.addEventListener(SITE_CONTENT_EVENT, onChange);
        observing = true;
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener(SITE_CONTENT_EVENT, onChange);
          observing = false;
          // A later mount re-reads saved changes made while this store was idle.
          started = false;
        }
      };
    },
    ensureLoaded: () => { if (!started) void reload(); },
    reload,
  };
}

const settingsStore = createContentStore(DEFAULT_SITE_SETTINGS, getSiteSettings, "settings");
const publishedArtworkStore = createContentStore<ArtworkItem[]>([], () => listArtworkItems(false), "artworks");
const allArtworkStore = createContentStore<ArtworkItem[]>([], () => listArtworkItems(true), "artworks");

export function useSiteContent() {
  const snapshot = useSyncExternalStore(settingsStore.subscribe, settingsStore.getSnapshot);
  useEffect(() => { settingsStore.ensureLoaded(); }, []);
  const saveSettings = useCallback(async (settings: SiteSettings) => {
    await saveSiteSettings(settings);
    await settingsStore.reload();
  }, []);
  return { settings: snapshot.value, loading: snapshot.loading, error: snapshot.error, source: snapshot.source, saveSettings, reload: settingsStore.reload };
}

export function useArtworks(includeUnpublished = false) {
  const store = includeUnpublished ? allArtworkStore : publishedArtworkStore;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
  useEffect(() => { store.ensureLoaded(); }, [store]);
  return { items: snapshot.value, loading: snapshot.loading, error: snapshot.error, source: snapshot.source, reload: store.reload };
}
