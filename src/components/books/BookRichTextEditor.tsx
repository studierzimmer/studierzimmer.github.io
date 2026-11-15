import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { BookRichAlignment, BookRichDocument } from "@/types/bookComments";
import { alignBookRichSelection, bookRichSelectionAlignment, bookRichSelectionMarked, bookRichText, markBookRichSelection, reconcileBookRichText, safeBookRichDocument } from "@/lib/bookRichText";
import BookRichText from "./BookRichText";
import "./BookRichText.css";

interface Props {
  body: string;
  value?: BookRichDocument | null;
  onChange: (body: string, document: BookRichDocument) => void;
  label: string;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

/** Native mobile selection/keyboard, with structured formatting and live preview. */
export default function BookRichTextEditor({ body, value, onChange, label, disabled = false, autoFocus, placeholder, style, onKeyDown }: Props) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const frame = useRef<number | null>(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const document = safeBookRichDocument(value, body);
  const capture = () => { const input = textarea.current; if (input) setSelection({ start: input.selectionStart, end: input.selectionEnd }); };
  useEffect(() => () => { if (frame.current !== null) window.cancelAnimationFrame(frame.current); }, []);
  const apply = (next: BookRichDocument) => {
    onChange(bookRichText(next), next);
    if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => { frame.current = null; textarea.current?.focus({ preventScroll: true }); textarea.current?.setSelectionRange(selection.start, selection.end); });
  };
  const alignment = bookRichSelectionAlignment(document, selection);
  return <div className="book-rich-editor">
    <div className="book-rich-toolbar" role="toolbar" aria-label="Formato del commento">
      <button type="button" aria-label="Grassetto selezione" aria-pressed={bookRichSelectionMarked(document, selection, "bold")} disabled={disabled || selection.start === selection.end} onPointerDown={(event) => event.preventDefault()} onClick={() => apply(markBookRichSelection(document, selection, "bold"))}><strong>B</strong></button>
      <button type="button" aria-label="Corsivo selezione" aria-pressed={bookRichSelectionMarked(document, selection, "italic")} disabled={disabled || selection.start === selection.end} onPointerDown={(event) => event.preventDefault()} onClick={() => apply(markBookRichSelection(document, selection, "italic"))}><em>I</em></button>
      <select aria-label="Allineamento del paragrafo" value={alignment} disabled={disabled} onChange={(event) => apply(alignBookRichSelection(document, selection, event.target.value as BookRichAlignment))}><option value="mixed" disabled>Allineamenti diversi</option><option value="left">Sinistra</option><option value="center">Centro</option><option value="right">Destra</option><option value="justify">Giustificato</option></select>
    </div>
    <textarea ref={textarea} autoFocus={autoFocus} aria-label={label} rows={5} required maxLength={600} value={body} disabled={disabled} placeholder={placeholder} style={style} onSelect={capture} onKeyUp={capture} onClick={capture} onChange={(event) => { const next = event.target.value; onChange(next, reconcileBookRichText(document, next)); capture(); }} onKeyDown={(event) => {
      const key = event.key.toLowerCase();
      if (!disabled && (event.ctrlKey || event.metaKey) && (key === "b" || key === "i") && selection.start !== selection.end) { event.preventDefault(); apply(markBookRichSelection(document, selection, key === "b" ? "bold" : "italic")); }
      onKeyDown?.(event);
    }} />
    <div className="book-rich-editor-note">Seleziona il testo per B / I · allinea il paragrafo</div>
    <BookRichText className="book-rich-editor-preview" body={body} value={document} />
  </div>;
}
