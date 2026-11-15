import type { BookRichAlignment, BookRichDocument, BookRichParagraph, BookRichRun } from "@/types/bookComments";

export interface BookRichSelection { start: number; end: number }
const alignments = new Set(["left", "center", "right", "justify"]);
const record = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const keysOnly = (value: Record<string, unknown>, keys: string[]) => Object.keys(value).every((key) => keys.includes(key));
const invalid = () => new Error("La formattazione del commento non è valida.");
const mergeRuns = (runs: BookRichRun[]): BookRichRun[] => {
  const result: BookRichRun[] = [];
  runs.forEach((run) => {
    const clean: BookRichRun = { text: run.text, ...(run.bold ? { bold: true } : {}), ...(run.italic ? { italic: true } : {}) };
    const previous = result[result.length - 1];
    if (previous && Boolean(previous.bold) === Boolean(clean.bold) && Boolean(previous.italic) === Boolean(clean.italic)) previous.text += clean.text;
    else if (clean.text || !result.length) result.push(clean);
  });
  return result.length ? result : [{ text: "" }];
};

/** Strict allow-list, never HTML. Normalized output contains only text/marks/alignment. */
export function validateBookRichDocument(value: unknown): BookRichDocument {
  if (!record(value) || !keysOnly(value, ["version", "paragraphs"]) || value.version !== 1 || !Array.isArray(value.paragraphs) || !value.paragraphs.length || value.paragraphs.length > 601) throw invalid();
  let runCount = 0;
  const paragraphs = value.paragraphs.map((paragraph): BookRichParagraph => {
    if (!record(paragraph) || !keysOnly(paragraph, ["align", "runs"]) || (paragraph.align !== undefined && (typeof paragraph.align !== "string" || !alignments.has(paragraph.align))) || !Array.isArray(paragraph.runs) || !paragraph.runs.length) throw invalid();
    const runs = paragraph.runs.map((run): BookRichRun => {
      if (++runCount > 1201 || !record(run) || !keysOnly(run, ["text", "bold", "italic"]) || typeof run.text !== "string" || (run.bold !== undefined && typeof run.bold !== "boolean") || (run.italic !== undefined && typeof run.italic !== "boolean")) throw invalid();
      return { text: run.text, ...(run.bold ? { bold: true } : {}), ...(run.italic ? { italic: true } : {}) };
    });
    if (runs.some((run) => run.text.includes("\n"))) throw invalid();
    return { ...(paragraph.align && paragraph.align !== "justify" ? { align: paragraph.align as BookRichAlignment } : {}), runs: mergeRuns(runs) };
  });
  const document: BookRichDocument = { version: 1, paragraphs };
  if (bookRichText(document).length > 600 || JSON.stringify(document).length > 100000) throw invalid();
  return document;
}

export function bookRichText(document: BookRichDocument): string {
  return document.paragraphs.map((paragraph) => paragraph.runs.map((run) => run.text).join("")).join("\n");
}
export function bookRichFromText(text: string): BookRichDocument {
  return { version: 1, paragraphs: text.split("\n").map((line) => ({ runs: [{ text: line }] })) };
}
export function safeBookRichDocument(value: unknown, body: string): BookRichDocument {
  if (value) {
    try {
      const document = validateBookRichDocument(value);
      if (bookRichText(document).trim() === body.trim()) return document;
    } catch { /* Legacy/malformed rows always retain their plain body. */ }
  }
  return bookRichFromText(body);
}
export function hasBookRichFormatting(document: BookRichDocument): boolean {
  return document.paragraphs.some((paragraph) => (paragraph.align && paragraph.align !== "justify") || paragraph.runs.some((run) => run.bold || run.italic));
}

type Character = { text: string; bold?: boolean; italic?: boolean; align: BookRichAlignment };
function characters(document: BookRichDocument): Character[] {
  return document.paragraphs.flatMap((paragraph, index) => {
    const align = paragraph.align ?? "justify";
    const result: Character[] = paragraph.runs.flatMap((run) => run.text.split("").map((text) => ({ text, bold: run.bold, italic: run.italic, align })));
    if (index < document.paragraphs.length - 1) result.push({ text: "\n", align });
    return result;
  });
}
function fromCharacters(chars: Character[], fallback: BookRichAlignment = "justify"): BookRichDocument {
  const paragraphs: BookRichParagraph[] = [];
  let runs: BookRichRun[] = [], align = fallback;
  const flush = () => { paragraphs.push({ ...(align === "justify" ? {} : { align }), runs: mergeRuns(runs) }); runs = []; };
  chars.forEach((character) => {
    if (!runs.length) align = character.align;
    if (character.text === "\n") { flush(); align = character.align; }
    else runs.push({ text: character.text, bold: character.bold, italic: character.italic });
  });
  flush();
  return { version: 1, paragraphs };
}
function selectedParagraphs(document: BookRichDocument, selection: BookRichSelection): number[] {
  let offset = 0;
  return document.paragraphs.flatMap((paragraph, index) => {
    const length = paragraph.runs.reduce((sum, run) => sum + run.text.length, 0);
    const matches = selection.start === selection.end ? selection.start >= offset && selection.start <= offset + length : selection.start <= offset + length && selection.end > offset;
    offset += length + 1;
    return matches ? [index] : [];
  });
}
export function bookRichSelectionAlignment(document: BookRichDocument, selection: BookRichSelection): BookRichAlignment | "mixed" {
  const selected = selectedParagraphs(document, selection).map((index) => document.paragraphs[index].align ?? "justify");
  return selected.every((align) => align === selected[0]) ? selected[0] ?? "justify" : "mixed";
}
export function bookRichSelectionMarked(document: BookRichDocument, selection: BookRichSelection, mark: "bold" | "italic"): boolean {
  const selected = characters(document).slice(selection.start, selection.end).filter((character) => character.text !== "\n");
  return selected.length > 0 && selected.every((character) => character[mark]);
}
export function markBookRichSelection(document: BookRichDocument, selection: BookRichSelection, mark: "bold" | "italic"): BookRichDocument {
  if (selection.start === selection.end) return document;
  const enabled = !bookRichSelectionMarked(document, selection, mark);
  const marked = fromCharacters(characters(document).map((character, index) => index >= selection.start && index < selection.end && character.text !== "\n" ? { ...character, [mark]: enabled } : character));
  return { version: 1, paragraphs: marked.paragraphs.map((paragraph, index) => ({ ...(document.paragraphs[index].align ? { align: document.paragraphs[index].align } : {}), runs: paragraph.runs })) };
}
export function alignBookRichSelection(document: BookRichDocument, selection: BookRichSelection, align: BookRichAlignment): BookRichDocument {
  const selected = new Set(selectedParagraphs(document, selection));
  return { version: 1, paragraphs: document.paragraphs.map((paragraph, index) => selected.has(index) ? { ...(align === "justify" ? {} : { align }), runs: paragraph.runs } : paragraph) };
}

/** Native textarea edits preserve marks outside the replaced range. */
export function reconcileBookRichText(document: BookRichDocument, nextText: string): BookRichDocument {
  const previousText = bookRichText(document);
  if (previousText === nextText) return document;
  let start = 0, suffix = 0;
  while (start < previousText.length && start < nextText.length && previousText[start] === nextText[start]) start++;
  while (suffix < previousText.length - start && suffix < nextText.length - start && previousText[previousText.length - suffix - 1] === nextText[nextText.length - suffix - 1]) suffix++;
  const previous = characters(document);
  const paragraph = selectedParagraphs(document, { start, end: start })[0] ?? document.paragraphs.length - 1;
  const align = document.paragraphs[paragraph]?.align ?? "justify";
  const replacing = previousText.length - suffix > start;
  const nearby = replacing ? previous[start] : previous[start - 1]?.text !== "\n" ? previous[start - 1] : previous[start];
  const inserted = nextText.slice(start, nextText.length - suffix).split("").map((text) => ({ text, align, bold: nearby?.bold, italic: nearby?.italic }));
  const next = fromCharacters([...previous.slice(0, start), ...inserted, ...previous.slice(previous.length - suffix)], align);
  if (!nextText) return next;
  let offset = 0;
  return { version: 1, paragraphs: next.paragraphs.map((paragraph) => {
    const length = paragraph.runs.reduce((sum, run) => sum + run.text.length, 0);
    const oldOffset = offset >= nextText.length - suffix ? offset + previousText.length - nextText.length : Math.min(offset, start);
    const source = selectedParagraphs(document, { start: oldOffset, end: oldOffset })[0];
    offset += length + 1;
    if (length || source === undefined) return paragraph;
    const emptyAlign = document.paragraphs[source].align;
    return { ...(emptyAlign ? { align: emptyAlign } : {}), runs: paragraph.runs };
  }) };
}
