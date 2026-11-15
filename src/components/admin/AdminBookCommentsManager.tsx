import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { deleteBookComment, listAdminBookComments, updateBookComment } from "@/services/bookCommentRepository";
import { listBookPages } from "@/services/bookRepository";
import type { BookComment, BookRichDocument } from "@/types/bookComments";
import BookRichText from "@/components/books/BookRichText";
import BookRichTextEditor from "@/components/books/BookRichTextEditor";
import type { Book, BookPage } from "@/types/books";
import "./AdminBookCommentsManager.css";

interface AdminBookCommentsManagerProps {
  books: Book[];
  selectedBookId: string | null;
  selectedPages?: BookPage[];
}

interface CommentValues {
  title: string;
  body: string;
  backgroundColor: string;
  backgroundOpacity: number;
  fontSize: number;
  textColor: string;
  isVisible: boolean;
  richContent: BookRichDocument | null;
}

interface CommentDraft extends CommentValues { original: CommentValues }

const DEFAULT_BACKGROUND = "#DDE2E5";
const DEFAULT_TEXT = "#414A51";
const DEFAULT_BACKGROUND_OPACITY = .75;
const DEFAULT_FONT_SIZE = 14;
const EMPTY_PAGES: BookPage[] = [];
const COMMENT_BATCH = 30;

function valuesFor(comment: BookComment): CommentValues {
  return {
    title: comment.title ?? "",
    body: comment.body,
    backgroundColor: /^#[\da-f]{6}$/i.test(comment.background_color ?? "") ? comment.background_color : DEFAULT_BACKGROUND,
    backgroundOpacity: typeof comment.background_opacity === "number" && Number.isFinite(comment.background_opacity) ? Math.min(1, Math.max(.15, comment.background_opacity)) : DEFAULT_BACKGROUND_OPACITY,
    fontSize: typeof comment.font_size === "number" && Number.isFinite(comment.font_size) ? Math.min(48, Math.max(10, comment.font_size)) : DEFAULT_FONT_SIZE,
    textColor: /^#[\da-f]{6}$/i.test(comment.text_color ?? "") ? comment.text_color : DEFAULT_TEXT,
    isVisible: comment.is_visible,
    richContent: comment.rich_content ?? null,
  };
}

function changed(draft: CommentDraft): boolean {
  return draft.title !== draft.original.title || draft.body !== draft.original.body || draft.backgroundColor !== draft.original.backgroundColor || draft.backgroundOpacity !== draft.original.backgroundOpacity || draft.fontSize !== draft.original.fontSize || draft.textColor !== draft.original.textColor || draft.isVisible !== draft.original.isVisible || JSON.stringify(draft.richContent) !== JSON.stringify(draft.original.richContent);
}

function balloonBackground(color: string, opacity: number): string {
  const rgb = Number.parseInt(color.slice(1), 16);
  return `rgba(${(rgb >> 16) & 255}, ${(rgb >> 8) & 255}, ${rgb & 255}, ${opacity})`;
}

function messageFrom(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") return error.message;
  return "Operazione non riuscita. Riprova.";
}

function commentDate(value: string): string {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }) : "";
}

export default function AdminBookCommentsManager({ books, selectedBookId, selectedPages = EMPTY_PAGES }: AdminBookCommentsManagerProps) {
  const [comments, setComments] = useState<BookComment[]>([]);
  const [drafts, setDrafts] = useState<Record<string, CommentDraft>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scope, setScope] = useState<"all" | "selected">("all");
  const [visibility, setVisibility] = useState<"all" | "visible" | "hidden">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, { error: boolean; text: string }>>({});
  const [pageInfo, setPageInfo] = useState<Record<string, Pick<BookPage, "page_number" | "file_name">>>({});
  const [pageWarning, setPageWarning] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(COMMENT_BATCH);
  const pageRequests = useRef(new Map<string, Promise<BookPage[]>>());
  const mounted = useRef(true);
  const dirtyCount = Object.values(drafts).filter(changed).length;
  const anyBusy = Object.values(busy).some(Boolean);
  const bookMap = useMemo(() => new Map(books.map((book) => [book.id, book])), [books]);
  const selectedBook = selectedBookId ? bookMap.get(selectedBookId) : null;
  const knownPages = useMemo(() => {
    const result = { ...pageInfo };
    selectedPages.forEach((page) => { if (page.book_id === selectedBookId) result[page.id] = page; });
    return result;
  }, [pageInfo, selectedPages, selectedBookId]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await listAdminBookComments();
      if (!mounted.current) return;
      setComments(next);
      setExpandedId((current) => current && next.some((comment) => comment.id === current) ? current : null);
    } catch (loadError) {
      if (mounted.current) setError(messageFrom(loadError));
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => { mounted.current = false; };
  }, [load]);

  useEffect(() => {
    if (!dirtyCount) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirtyCount]);

  useEffect(() => { setVisibleLimit(COMMENT_BATCH); }, [scope, visibility, search]);

  useEffect(() => {
    let canceled = false;
    const bookIds = [...new Set(comments.map((comment) => comment.book_id))];
    let cursor = 0;
    const worker = async () => {
      while (cursor < bookIds.length) {
        const bookId = bookIds[cursor++];
        if (bookId === selectedBookId && selectedPages.some((page) => page.book_id === bookId)) continue;
        let request = pageRequests.current.get(bookId);
        if (!request) {
          request = listBookPages(bookId);
          pageRequests.current.set(bookId, request);
        }
        try {
          const pages = await request;
          if (!canceled) setPageInfo((current) => ({ ...current, ...Object.fromEntries(pages.map((page) => [page.id, { page_number: page.page_number, file_name: page.file_name }])) }));
        } catch {
          pageRequests.current.delete(bookId);
          if (!canceled) setPageWarning(true);
        }
      }
    };
    void Promise.all(Array.from({ length: Math.min(3, bookIds.length) }, worker));
    return () => { canceled = true; };
  }, [comments, selectedBookId, selectedPages]);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("it");
    return comments.filter((comment) => {
      // Filter the saved record, so editing text/visibility cannot make its
      // Save button disappear halfway through a staged change.
      const values = valuesFor(comment);
      return (scope === "all" || comment.book_id === selectedBookId) &&
        (visibility === "all" || values.isVisible === (visibility === "visible")) &&
        (!query || `${values.title} ${values.body} ${bookMap.get(comment.book_id)?.title ?? ""} ${knownPages[comment.book_page_id]?.page_number ?? ""}`.toLocaleLowerCase("it").includes(query));
    }).sort((a, b) => (bookMap.get(a.book_id)?.title ?? "").localeCompare(bookMap.get(b.book_id)?.title ?? "", "it") ||
      (knownPages[a.book_page_id]?.page_number ?? Number.MAX_SAFE_INTEGER) - (knownPages[b.book_page_id]?.page_number ?? Number.MAX_SAFE_INTEGER) ||
      a.created_at.localeCompare(b.created_at));
  }, [bookMap, comments, knownPages, scope, search, selectedBookId, visibility]);

  const stage = (comment: BookComment, patch: Partial<CommentValues>) => {
    if (loading || busy[comment.id]) return;
    setDrafts((current) => ({ ...current, [comment.id]: { ...(current[comment.id] ?? { ...valuesFor(comment), original: valuesFor(comment) }), ...patch } }));
    setMessages((current) => { const next = { ...current }; delete next[comment.id]; return next; });
  };

  const cancel = (id: string) => {
    setDrafts((current) => { const next = { ...current }; delete next[id]; return next; });
    setMessages((current) => { const next = { ...current }; delete next[id]; return next; });
  };

  const save = async (comment: BookComment) => {
    const draft = drafts[comment.id];
    if (loading || !draft || !changed(draft) || busy[comment.id]) return;
    if (!draft.body.trim()) { setMessages((current) => ({ ...current, [comment.id]: { error: true, text: "Il testo del commento non può essere vuoto." } })); return; }
    setBusy((current) => ({ ...current, [comment.id]: true }));
    try {
      // Leave an unchanged/blank legacy title out of the request, while an
      // explicit removal of an existing title is persisted as SQL NULL.
      const titlePatch = draft.title !== draft.original.title && (draft.title.trim() || draft.original.title.trim()) ? { title: draft.title.trim() || null } : {};
      const richPatch = JSON.stringify(draft.richContent) !== JSON.stringify(draft.original.richContent) ? { richContent: draft.richContent } : {};
      const saved = await updateBookComment(comment.id, { ...titlePatch, ...richPatch, body: draft.body, backgroundColor: draft.backgroundColor, backgroundOpacity: draft.backgroundOpacity, fontSize: draft.fontSize, textColor: draft.textColor, isVisible: draft.isVisible });
      if (!mounted.current) return;
      setComments((current) => current.map((item) => item.id === saved.id ? saved : item));
      setDrafts((current) => { const next = { ...current }; if (next[comment.id] === draft) delete next[comment.id]; return next; });
      setMessages((current) => ({ ...current, [comment.id]: { error: false, text: "Commento salvato." } }));
    } catch (saveError) {
      if (mounted.current) setMessages((current) => ({ ...current, [comment.id]: { error: true, text: messageFrom(saveError) } }));
    } finally {
      if (mounted.current) setBusy((current) => ({ ...current, [comment.id]: false }));
    }
  };

  const remove = async (comment: BookComment) => {
    if (loading || busy[comment.id] || !window.confirm("Eliminare definitivamente questo commento?")) return;
    setBusy((current) => ({ ...current, [comment.id]: true }));
    try {
      await deleteBookComment(comment.id);
      if (!mounted.current) return;
      setComments((current) => current.filter((item) => item.id !== comment.id));
      cancel(comment.id);
      setExpandedId((current) => current === comment.id ? null : current);
    } catch (deleteError) {
      if (mounted.current) setMessages((current) => ({ ...current, [comment.id]: { error: true, text: messageFrom(deleteError) } }));
    } finally {
      if (mounted.current) setBusy((current) => ({ ...current, [comment.id]: false }));
    }
  };

  const refresh = () => {
    if (anyBusy || (dirtyCount > 0 && !window.confirm("Scartare le modifiche ai commenti e ricaricare l’elenco?"))) return;
    setDrafts({});
    setMessages({});
    setPageWarning(false);
    setVisibleLimit(COMMENT_BATCH);
    void load();
  };

  return <section className="admin-comments-manager" aria-label="Tutti i commenti degli Sketches">
    <header className="admin-comments-heading"><div><h2>Commenti degli Sketches</h2><p>Leggi e modifica tutti i commenti, anche quelli nascosti. Le modifiche si applicano solo con Salva.</p></div><button type="button" onClick={refresh} disabled={loading || anyBusy}>Ricarica</button></header>
    <div className="admin-comments-filters">
      <label>Libro<select value={scope} onChange={(event) => setScope(event.target.value as typeof scope)}><option value="all">Tutti i libri</option><option value="selected" disabled={!selectedBookId}>Libro selezionato{selectedBook ? ` · ${selectedBook.title}` : ""}</option></select></label>
      <label>Visibilità<select value={visibility} onChange={(event) => setVisibility(event.target.value as typeof visibility)}><option value="all">Visibili e nascosti</option><option value="visible">Visibili</option><option value="hidden">Nascosti</option></select></label>
      <label className="admin-comments-search">Cerca<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Titolo, testo, libro o numero pagina" /></label>
    </div>
    <p className="admin-comments-count" aria-live="polite">{filtered.length} di {comments.length} commenti{dirtyCount ? ` · ${dirtyCount} con modifiche da salvare` : ""}</p>
    {loading && <p className="admin-comments-empty" role="status">Caricamento dei commenti…</p>}
    {error && <p className="admin-comments-error" role="alert">{error}</p>}
    {pageWarning && <p className="admin-comments-count" role="status">Il numero di alcune pagine non è disponibile. I commenti restano modificabili.</p>}
    {!loading && !error && filtered.length === 0 && <p className="admin-comments-empty">{comments.length ? "Nessun commento corrisponde ai filtri." : "Non ci sono ancora commenti."}</p>}
    <div className="admin-comments-list">{filtered.slice(0, visibleLimit).map((comment) => {
      const draft = drafts[comment.id];
      const values = draft ?? valuesFor(comment);
      const isDirty = Boolean(draft && changed(draft));
      const saving = Boolean(busy[comment.id]);
      const locked = loading || saving;
      const message = messages[comment.id];
      const page = knownPages[comment.book_page_id];
      const pageLabel = page ? `Pagina ${page.page_number}` : "Pagina non disponibile";
      return <details key={comment.id} open={expandedId === comment.id} className="admin-editor-group admin-comment-card">
        <summary onClick={(event) => { event.preventDefault(); setExpandedId((current) => current === comment.id ? null : comment.id); }}><span><span className="admin-comment-context">{bookMap.get(comment.book_id)?.title ?? "Libro non disponibile"} · {pageLabel}</span>{values.title.trim() && <span className="admin-comment-title">{values.title}</span>}<span className="admin-comment-excerpt">{values.body}</span><small>{values.isVisible ? "Visibile" : "Nascosto"}{isDirty ? " · da salvare" : ""} · {commentDate(comment.created_at)}</small></span><span aria-hidden="true">＋</span></summary>
        <form className="admin-comment-form" onSubmit={(event) => { event.preventDefault(); void save(comment); }}>
          <label>Titolo (facoltativo)<input type="text" aria-label={`Titolo commento · ${pageLabel}`} maxLength={120} value={values.title} disabled={locked} onChange={(event) => stage(comment, { title: event.target.value })} /><small>{values.title.length}/120</small></label>
          <div className="admin-comment-rich-field"><span>Testo</span><BookRichTextEditor label={`Commento · ${pageLabel}`} body={values.body} value={values.richContent} disabled={locked} onChange={(body, document) => stage(comment, { body, richContent: document })} /><small>{values.body.length}/600</small></div>
          <div className="admin-comment-colors"><label>Testo<input type="color" aria-label="Colore testo commento" value={values.textColor} disabled={locked} onChange={(event) => stage(comment, { textColor: event.target.value })} /></label><label>Sfondo balloon<input type="color" aria-label="Colore sfondo commento" value={values.backgroundColor} disabled={locked} onChange={(event) => stage(comment, { backgroundColor: event.target.value })} /></label></div>
          <label className="admin-comment-opacity"><span>Opacità sfondo<output>{Math.round(values.backgroundOpacity * 100)}%</output></span><input type="range" min="15" max="100" step="5" aria-label="Opacità sfondo commento" aria-valuetext={`${Math.round(values.backgroundOpacity * 100)}%`} value={Math.round(values.backgroundOpacity * 100)} disabled={locked} onChange={(event) => stage(comment, { backgroundOpacity: Number(event.target.value) / 100 })} /></label>
          <label className="admin-comment-opacity"><span>Dimensione testo<output>{values.fontSize} px</output></span><input type="range" min="10" max="48" step="1" aria-label="Dimensione testo commento" aria-valuetext={`${values.fontSize} pixel`} value={values.fontSize} disabled={locked} onChange={(event) => stage(comment, { fontSize: Number(event.target.value) })} /></label>
          <label className="admin-comment-visible"><input type="checkbox" checked={values.isVisible} disabled={locked} onChange={(event) => stage(comment, { isVisible: event.target.checked })} /><span>Mostra sul foglio</span></label>
          <div className="admin-comment-preview" aria-label="Anteprima del commento" style={{ backgroundColor: balloonBackground(values.backgroundColor, values.backgroundOpacity), color: values.textColor, fontSize: values.fontSize }}>{values.title.trim() && <h3>{values.title}</h3>}<BookRichText body={values.body || "Anteprima del commento"} value={values.richContent} /></div>
          {page && <p className="admin-comments-count">{pageLabel} · {page.file_name}</p>}
          {message && <p className={message.error ? "admin-comments-error" : "admin-comments-count"} role={message.error ? "alert" : "status"}>{message.text}</p>}
          <div className="admin-comment-actions"><button type="button" className="admin-comment-delete" disabled={locked} onClick={() => void remove(comment)}>Elimina</button><button type="button" disabled={locked || !isDirty} onClick={() => cancel(comment.id)}>Annulla</button><button type="submit" className="admin-primary-action" disabled={locked || !isDirty}>{saving ? "Attendi…" : "Salva"}</button></div>
        </form>
      </details>;
    })}</div>
    {filtered.length > visibleLimit && <button type="button" className="admin-comments-more" disabled={loading} onClick={() => setVisibleLimit((current) => current + COMMENT_BATCH)}>Mostra altri {Math.min(COMMENT_BATCH, filtered.length - visibleLimit)} commenti</button>}
  </section>;
}
