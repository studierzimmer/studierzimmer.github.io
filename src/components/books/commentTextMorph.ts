/** Measure the two stable layouts once. The animation moves the original words
 * between these positions rather than rewrapping a paragraph on every frame. */
export interface CommentMorphWord {
  key: string;
  text: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  letterSpacing: string;
  fontSize: number;
}

interface Point { left: number; top: number }

const Segmenter = (Intl as unknown as { Segmenter?: new (locale?: string, options?: { granularity: "grapheme" }) => { segment: (text: string) => Iterable<{ segment: string }> } }).Segmenter;
const segmenter = Segmenter ? new Segmenter(undefined, { granularity: "grapheme" }) : null;
export function commentMorphGraphemes(text: string): string[] {
  // Older browsers keep a whole word rather than tearing apart an accent,
  // variation selector or ZWJ emoji into differently rendered glyphs.
  return segmenter ? [...segmenter.segment(text)].map((part) => part.segment) : [text];
}

export function commentMorphPosition(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function textNodes(root: Element | null): Text[] {
  if (!root) return [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  return nodes;
}

function rangeFor(node: Text, start: number, end: number) {
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, end);
  return range;
}

export function measureCommentWords(source: HTMLElement, target: HTMLElement, sourceOrigin: Point, targetOrigin: Point): CommentMorphWord[] {
  const result: CommentMorphWord[] = [];
  const metrics = new Map<string, number>();
  // A one-time baseline probe makes the absolutely positioned words coincide
  // with the browser's real font metrics, including custom/italic fonts.
  const baselineOffset = (style: CSSStyleDeclaration) => {
    const key = [style.fontFamily, style.fontWeight, style.fontStyle, style.fontSize, style.letterSpacing].join("|");
    if (metrics.has(key)) return metrics.get(key)!;
    const probe = document.createElement("span");
    Object.assign(probe.style, { position: "fixed", left: "-20000px", top: "0", visibility: "hidden", display: "block", whiteSpace: "pre", fontFamily: style.fontFamily, fontWeight: style.fontWeight, fontStyle: style.fontStyle, fontSize: style.fontSize, letterSpacing: style.letterSpacing, lineHeight: "1" });
    probe.textContent = "Mg";
    document.body.appendChild(probe);
    const range = document.createRange();
    range.selectNodeContents(probe);
    const offset = range.getBoundingClientRect().top - probe.getBoundingClientRect().top;
    probe.remove();
    metrics.set(key, offset);
    return offset;
  };
  const parts = [
    [source.querySelector("h2, h3"), target.querySelector("h2, h3")],
    [source.querySelector(".book-rich-text"), target.querySelector(".book-rich-text")],
  ];
  parts.forEach(([fromRoot, toRoot], part) => {
    const fromNodes = textNodes(fromRoot), toNodes = textNodes(toRoot);
    fromNodes.forEach((node, index) => {
      const destination = toNodes[index];
      if (!destination || node.data !== destination.data || !node.parentElement) return;
      const style = getComputedStyle(destination.parentElement!);
      const baseline = baselineOffset(style);
      for (const match of node.data.matchAll(/\S+/gu)) {
        const start = match.index!, end = start + match[0].length;
        const fromRange = rangeFor(node, start, end), toRange = rangeFor(destination, start, end);
        // Short words and words broken by narrow balloons travel as individual
        // glyphs; intact longer words retain browser kerning/ligatures.
        const glyphs = commentMorphGraphemes(match[0]);
        const split = glyphs.length <= 3 || fromRange.getClientRects().length > 1 || toRange.getClientRects().length > 1;
        const pieces = split ? glyphs : [match[0]];
        let offset = start;
        pieces.forEach((text) => {
          const from = rangeFor(node, offset, offset + text.length).getBoundingClientRect();
          const to = rangeFor(destination, offset, offset + text.length).getBoundingClientRect();
          if (from.width && to.width) result.push({ key: `${part}:${index}:${offset}`, text, fromX: from.left - sourceOrigin.left, fromY: from.top - sourceOrigin.top - baseline, toX: to.left - targetOrigin.left, toY: to.top - targetOrigin.top - baseline, fontFamily: style.fontFamily, fontWeight: style.fontWeight, fontStyle: style.fontStyle, fontSize: parseFloat(style.fontSize), letterSpacing: style.letterSpacing });
          offset += text.length;
        });
      }
    });
  });
  return result;
}
