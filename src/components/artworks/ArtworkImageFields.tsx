import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { artworkImageSources } from "@/lib/artworkImages";
import { uploadArtworkAsset } from "@/services/siteContentRepository";
import type { ArtworkItem } from "@/types/siteContent";
import "./ArtworkImageFields.css";

type ImageValue = Pick<ArtworkItem, "media_url" | "additional_images">;
type ImagePatch = { media_url: string; additional_images: string[] };

interface ArtworkImageFieldsProps {
  value: ImageValue;
  onChange: (patch: ImagePatch) => void;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
}

function orderedImages(value: ImageValue): string[] {
  return artworkImageSources({ ...value, kind: "image" });
}

function imagePatch(images: string[]): ImagePatch {
  return { media_url: images[0] ?? "", additional_images: images.slice(1) };
}

/** Uploads originals only; removal and ordering change the unsaved artwork, never storage. */
export default function ArtworkImageFields({ value, onChange, disabled = false, onBusyChange }: ArtworkImageFieldsProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const valueRef = useRef(value);
  const changeRef = useRef(onChange);
  const busyRef = useRef(onBusyChange);
  const mountedRef = useRef(true);
  const uploadingRef = useRef(false);
  valueRef.current = value;
  changeRef.current = onChange;
  busyRef.current = onBusyChange;

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; busyRef.current?.(false); };
  }, []);

  const commit = (images: string[]) => {
    const patch = imagePatch(images);
    valueRef.current = patch;
    changeRef.current(patch);
  };

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (!files.length || disabled || uploadingRef.current) return;
    uploadingRef.current = true;
    setUploading(true); setError(null);
    busyRef.current?.(true);
    const failures: string[] = [];
    try {
      // One original at a time bounds upload memory and keeps the selected order.
      for (let index = 0; index < files.length; index += 1) {
        if (!mountedRef.current) break;
        const file = files[index];
        setProgress(`Caricamento ${index + 1} di ${files.length} · ${file.name}`);
        try {
          if (!/\.(png|jpe?g|gif|webp|avif)$/i.test(file.name) || (file.type && !file.type.startsWith("image/"))) {
            throw new Error("Scegli un'immagine PNG, JPG, GIF, WebP o AVIF.");
          }
          const url = await uploadArtworkAsset(file);
          if (mountedRef.current) commit([...new Set([...orderedImages(valueRef.current), url])]);
        } catch (failure) {
          failures.push(`${file.name}: ${failure instanceof Error ? failure.message : "Caricamento non riuscito."}`);
        }
      }
      if (mountedRef.current && failures.length) setError(failures.join("\n"));
    } finally {
      uploadingRef.current = false;
      if (mountedRef.current) { setUploading(false); setProgress(""); busyRef.current?.(false); }
    }
  };

  const images = orderedImages(value);
  const locked = disabled || uploading;
  const move = (index: number, offset: number) => {
    if (locked) return;
    const next = [...images];
    const target = index + offset;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  };

  return (
    <div className="artwork-image-fields" aria-busy={uploading}>
      <label className="artwork-image-upload">Immagini
        <input type="file" accept=".png,.jpg,.jpeg,.webp,.avif,.gif,image/*" multiple disabled={locked} onChange={(event) => void upload(event)} />
        <small>La prima immagine è la copertina. Aggiungi più originali e scegli il loro ordine · massimo 50 MB per immagine.</small>
      </label>
      {images.length > 0 && <ol className="artwork-image-strip" aria-label="Ordine delle immagini">
        {images.map((url, index) => <li key={url} className="artwork-image-thumb">
          <img src={url} alt={index === 0 ? "Copertina" : `Immagine ${index + 1}`} loading="lazy" decoding="async" />
          <span>{index === 0 ? "Copertina" : `Immagine ${index + 1}`}</span>
          <div className="artwork-image-thumb-actions">
            <button type="button" disabled={locked || index === 0} aria-label={`Sposta immagine ${index + 1} prima`} onClick={() => move(index, -1)}>←</button>
            <button type="button" disabled={locked || index === images.length - 1} aria-label={`Sposta immagine ${index + 1} dopo`} onClick={() => move(index, 1)}>→</button>
            <button type="button" disabled={locked} aria-label={`Rimuovi immagine ${index + 1} dalla bozza`} onClick={() => { if (!locked) commit(images.filter((_, position) => position !== index)); }}>Rimuovi</button>
          </div>
        </li>)}
      </ol>}
      {uploading && <p className="artwork-image-status" role="status">{progress || "Caricamento immagini…"}</p>}
      {error && <p className="artwork-image-error" role="alert">{error}</p>}
      {images.length > 0 && <small className="artwork-image-help">Ordine e rimozioni si applicano solo con Salva. I file originali non vengono eliminati.</small>}
    </div>
  );
}
