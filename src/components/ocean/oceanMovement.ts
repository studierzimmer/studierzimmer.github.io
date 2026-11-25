export const OCEAN_SPRINT_MULTIPLIER = 3;
export type OceanMovementKind = "avatar" | "aircraft" | "ship";

export function oceanMovementKind(character: string | { id?: string; bundled_path?: string | null; file_name?: string | null; public_url?: string | null }): OceanMovementKind {
  // Published bundled figures have database UUIDs. Their stable asset identity,
  // unlike an editable display title or row id, survives backend registration.
  const identity = typeof character === "string" ? character : [character.bundled_path, character.file_name, character.public_url, character.id].filter(Boolean).join("/");
  if (identity.includes("cessna-aircraft")) return "aircraft";
  if (identity.includes("pirate-sailing-ship")) return "ship";
  return "avatar";
}

/** Avatar: 1→3×. Vehicles: 3→6× their original profile, never 18×. */
export function oceanMovementSpeed(kind: OceanMovementKind, sprint: number, vertical = false): number {
  const blend = Number.isFinite(sprint) ? Math.min(1, Math.max(0, sprint)) : 0;
  const aircraft = kind === "aircraft";
  const base = vertical ? (aircraft ? 72 : 58) : (aircraft ? 125 : 100);
  const cruise = kind === "avatar" ? 1 : 3;
  const boost = kind === "avatar" ? OCEAN_SPRINT_MULTIPLIER : 6;
  return base * (cruise + blend * (boost - cruise));
}

const movementCodes: Record<string, string> = {
  KeyW: "w", KeyA: "a", KeyS: "s", KeyD: "d", KeyQ: "q", KeyE: "e",
  ArrowUp: "arrowup", ArrowDown: "arrowdown", ArrowLeft: "arrowleft", ArrowRight: "arrowright",
  ShiftLeft: "shift", ShiftRight: "shift",
};
const movementNames = new Set(Object.values(movementCodes));

/** Physical key codes survive Shift/case/layout changes; releases always clear. */
export function bindOceanMovementKeys(
  keys: Record<string, boolean>,
  isActive: () => boolean,
  surface: { window: Window; document: Document } = { window, document }
): () => void {
  const { window: windowSurface, document: documentSurface } = surface;
  const pressed = new Map<string, string>();
  const editable = (target: EventTarget | null) => Boolean(
    target && "closest" in target && typeof target.closest === "function" &&
    target.closest("input,textarea,select,[contenteditable=true],[role=textbox]")
  );
  const sync = () => {
    movementNames.forEach((name) => { keys[name] = false; });
    pressed.forEach((name) => { keys[name] = true; });
  };
  const clear = () => { pressed.clear(); Object.keys(keys).forEach((key) => { keys[key] = false; }); };
  const keyName = (event: KeyboardEvent) => movementCodes[event.code] || event.key?.toLowerCase();
  const keyDown = (event: KeyboardEvent) => {
    if (!isActive() || documentSurface.hidden || editable(event.target) || event.isComposing || event.ctrlKey || event.metaKey || event.altKey) { clear(); return; }
    // State is already held after the first keydown. A synthetic release for
    // hidden controls must not be undone by the OS repeating that old contact.
    if (event.repeat) return;
    const name = keyName(event);
    if (!movementNames.has(name)) return;
    if (name !== "shift" && typeof event.shiftKey === "boolean") {
      if (event.shiftKey) pressed.set("modifier:shift", "shift");
      else for (const [code, value] of pressed) if (value === "shift") pressed.delete(code);
    }
    pressed.set(event.code || name, name);
    sync();
    if (name.startsWith("arrow")) event.preventDefault();
  };
  const keyUp = (event: KeyboardEvent) => {
    const name = keyName(event);
    if (event.code) pressed.delete(event.code);
    else for (const [code, value] of pressed) if (value === name) pressed.delete(code);
    if (name === "shift") pressed.delete("modifier:shift");
    if (event.shiftKey === false) for (const [code, value] of pressed) if (value === "shift") pressed.delete(code);
    sync();
  };
  const focus = (event: FocusEvent) => { if (editable(event.target)) clear(); };
  const visibility = () => { if (documentSurface.hidden || !isActive()) clear(); };
  const mode = (event: Event) => { if (!(event as CustomEvent<{ enabled?: boolean }>).detail?.enabled) clear(); };
  windowSurface.addEventListener("keydown", keyDown);
  windowSurface.addEventListener("keyup", keyUp);
  windowSurface.addEventListener("blur", clear);
  windowSurface.addEventListener("ocean-controls-release", clear);
  windowSurface.addEventListener("explore-mode", mode);
  windowSurface.addEventListener("skyocean-activity", visibility);
  documentSurface.addEventListener("visibilitychange", visibility);
  documentSurface.addEventListener("focusin", focus);
  return () => {
    windowSurface.removeEventListener("keydown", keyDown);
    windowSurface.removeEventListener("keyup", keyUp);
    windowSurface.removeEventListener("blur", clear);
    windowSurface.removeEventListener("ocean-controls-release", clear);
    windowSurface.removeEventListener("explore-mode", mode);
    windowSurface.removeEventListener("skyocean-activity", visibility);
    documentSurface.removeEventListener("visibilitychange", visibility);
    documentSurface.removeEventListener("focusin", focus);
    clear();
  };
}

/** A held joystick contact + another finger on empty water means sprint. */
export function bindOceanTouchSprint(
  isActive: () => boolean,
  surface: { window: Window; document: Document } = { window, document }
): () => void {
  const { window: windowSurface, document: documentSurface } = surface;
  let joystickPointer: number | null = null;
  const sprintPointers = new Set<number>();
  let sprinting = false;
  const publish = () => {
    const next = joystickPointer !== null && sprintPointers.size > 0 && isActive() && !documentSurface.hidden;
    if (next === sprinting) return;
    sprinting = next;
    windowSurface.dispatchEvent(new CustomEvent("explore-sprint", { detail: { active: next } }));
  };
  const clear = () => { joystickPointer = null; sprintPointers.clear(); publish(); };
  const contact = (event: Event) => {
    const detail = (event as CustomEvent<{ active: boolean; pointerId?: number }>).detail;
    if (!detail?.active || !isActive() || documentSurface.hidden || !Number.isFinite(detail.pointerId)) { clear(); return; }
    if (joystickPointer !== detail.pointerId) sprintPointers.clear();
    joystickPointer = detail.pointerId;
    publish();
  };
  const down = (event: PointerEvent) => {
    if (event.pointerType !== "touch" || joystickPointer === null || event.pointerId === joystickPointer || !isActive() || documentSurface.hidden || event.defaultPrevented) return;
    const target = event.target;
    if (target && "closest" in target && typeof target.closest === "function" && target.closest("button,input,textarea,select,a,[role=button],[role=textbox],[contenteditable=true],[data-ocean-control],[data-inline-edit-ui],[data-ocean-panel]")) return;
    // Consume the second contact before the canvas can interpret it as orbit,
    // pan or a pinch. It belongs to sprint until that same finger is released.
    event.preventDefault();
    event.stopPropagation();
    sprintPointers.add(event.pointerId);
    publish();
  };
  const end = (event: PointerEvent) => {
    if (event.pointerId === joystickPointer) clear();
    else if (sprintPointers.delete(event.pointerId)) publish();
  };
  const visibility = () => { if (documentSurface.hidden || !isActive()) clear(); };
  const mode = (event: Event) => { if (!(event as CustomEvent<{ enabled: boolean }>).detail?.enabled) clear(); };
  windowSurface.addEventListener("explore-joystick-contact", contact);
  windowSurface.addEventListener("pointerdown", down, { capture: true, passive: false });
  windowSurface.addEventListener("pointerup", end, true);
  windowSurface.addEventListener("pointercancel", end, true);
  windowSurface.addEventListener("lostpointercapture", end, true);
  windowSurface.addEventListener("blur", clear);
  windowSurface.addEventListener("ocean-controls-release", clear);
  windowSurface.addEventListener("explore-mode", mode);
  windowSurface.addEventListener("skyocean-activity", visibility);
  documentSurface.addEventListener("visibilitychange", visibility);
  return () => {
    clear();
    windowSurface.removeEventListener("explore-joystick-contact", contact);
    windowSurface.removeEventListener("pointerdown", down, true);
    windowSurface.removeEventListener("pointerup", end, true);
    windowSurface.removeEventListener("pointercancel", end, true);
    windowSurface.removeEventListener("lostpointercapture", end, true);
    windowSurface.removeEventListener("blur", clear);
    windowSurface.removeEventListener("ocean-controls-release", clear);
    windowSurface.removeEventListener("explore-mode", mode);
    windowSurface.removeEventListener("skyocean-activity", visibility);
    documentSurface.removeEventListener("visibilitychange", visibility);
  };
}
