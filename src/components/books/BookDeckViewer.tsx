import { useCallback, type ComponentProps } from "react";
import FoldingBookViewer from "./FoldingBookViewer";

type Props = Omit<ComponentProps<typeof FoldingBookViewer>, "onPageChange"> & {
  autoOpenOnActivate?: boolean;
  onBookPageChange: (bookId: string, page: number) => void;
};

/** Keeps each book's callbacks and page DOM stable when an incoming pane is
 * promoted to the active pane after the deck translation finishes. */
export default function BookDeckViewer({ onBookPageChange, ...props }: Props) {
  const onPageChange = useCallback((page: number) => onBookPageChange(props.book.id, page), [onBookPageChange, props.book.id]);
  return <FoldingBookViewer {...props} onPageChange={onPageChange} />;
}
