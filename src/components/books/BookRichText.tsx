import type { BookRichDocument } from "@/types/bookComments";
import { safeBookRichDocument } from "@/lib/bookRichText";
import "./BookRichText.css";

export default function BookRichText({ body, value, className = "" }: { body: string; value?: BookRichDocument | null; className?: string }) {
  const document = safeBookRichDocument(value, body);
  return <div className={`book-rich-text ${className}`}>{document.paragraphs.map((paragraph, index) => {
    const align = paragraph.align ?? "justify";
    return <p key={index} style={{ textAlign: align, textAlignLast: align === "justify" ? "left" : align }}>{paragraph.runs.map((run, runIndex) => {
      const text = run.italic ? <em>{run.text}</em> : run.text;
      return run.bold ? <strong key={runIndex}>{text}</strong> : <span key={runIndex}>{text}</span>;
    })}{paragraph.runs.every((run) => !run.text) && <br />}</p>;
  })}</div>;
}
