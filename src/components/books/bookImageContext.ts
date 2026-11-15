import { createContext } from "react";
import type { BookImageScheduler } from "./bookImageScheduler";
export const BookImageContext = createContext<BookImageScheduler | null>(null);
