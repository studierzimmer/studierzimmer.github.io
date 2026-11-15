import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useInlineSiteEditing } from "@/components/SiteEditControl";

const bookRoute = (pathname: string) => pathname === "/sketches" || pathname === "/books" || pathname.startsWith("/book/");

/** Keep the old route mounted until all of its visible pieces have folded away.
 * Also handles browser Back/Forward, not only our own navigation buttons. */
export default function RouteChoreography({ children }: { children: (location: Location) => ReactNode }) {
  const nextLocation = useLocation();
  const navigate = useNavigate();
  const inline = useInlineSiteEditing();
  const editing = useRef(inline);
  editing.current = inline;
  const [displayLocation, setDisplayLocation] = useState(nextLocation);
  const stage = useRef<HTMLDivElement>(null);
  const requestedLocation = useRef(nextLocation);
  requestedLocation.current = nextLocation;
  const [leaving, setLeaving] = useState(false);
  const [oceanSurface, setOceanSurface] = useState(nextLocation.pathname === "/navigate");
  useEffect(() => {
    if (displayLocation.pathname === "/navigate") { setOceanSurface(true); return; }
    if (!oceanSurface) return;
    // The closed aperture and the next page have the same solid colour. Keep
    // that hand-off opaque; interpolating alpha here would flash the white body.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(() => setOceanSurface(false)); });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [displayLocation.pathname, oceanSurface]);
  const content = inline.editing ? inline.draft : inline.settings;
  const palette = (pathname: string) => pathname === "/"
    ? { background: content.menu_background_color ?? "#ffffff", color: content.menu_color }
    : pathname === "/bio"
      ? { background: content.bio_background_color ?? "#ffffff", color: content.bio_color }
      : { background: "#ffffff", color: "#171717" };
  const targetPalette = palette(nextLocation.pathname);
  const displayedPalette = palette(displayLocation.pathname);
  // The ocean's opaque aperture owns its reveal. A solid route surface above
  // the WebGL host would hide that geometry, including the reverse animation.
  const background = displayLocation.pathname === "/navigate" ? "transparent"
    : nextLocation.pathname === "/navigate" ? displayedPalette.background : targetPalette.background;
  const foreground = displayLocation.pathname === "/navigate"
    ? content.ocean_text_color ?? content.menu_color : targetPalette.color;
  useEffect(() => {
    if (nextLocation.key === displayLocation.key) {
      setLeaving(false);
      return;
    }
    if (nextLocation.pathname === displayLocation.pathname || (bookRoute(nextLocation.pathname) && bookRoute(displayLocation.pathname))) {
      setLeaving(false);
      setDisplayLocation(nextLocation);
      return;
    }
    const discardDraft = editing.current.editing && editing.current.dirty;
    if (discardDraft && !window.confirm("Hai modifiche non salvate. Vuoi uscire e annullarle?")) {
      setLeaving(false);
      navigate({ pathname: displayLocation.pathname, search: displayLocation.search, hash: displayLocation.hash }, { replace: true, state: displayLocation.state });
      return;
    }
    let canceled = false;
    let completed = false;
    setLeaving(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pending: Promise<unknown>[] = [];
    const animations: Animation[] = [];
    const root = stage.current;
    const selectedMenu = displayLocation.pathname === "/" ? root?.querySelector<HTMLElement>(".portfolio-menu[data-selected-menu]") : null;
    const exitFrames: Keyframe[] = [
      { scale: "1", offset: 0 }, { scale: ".994", offset: .09 }, { scale: "1.018", offset: .2 },
      { scale: ".97", offset: .34 }, { scale: "1.075", offset: .52 }, { scale: "0", offset: 1 },
    ];
    const fold = (element: HTMLElement, duration: number, delay = 0) => {
      if (reduced || !element.animate) return;
      const animation = element.animate(exitFrames, { duration, delay, easing: "cubic-bezier(.22,.88,.3,1)", fill: "forwards" });
      animations.push(animation);
      pending.push(animation.finished.catch(() => undefined));
    };
    const runExit = () => {
    if (canceled) return;
    if (selectedMenu) {
      const entries = [...selectedMenu.querySelectorAll<HTMLElement>("[data-menu-entry]")];
      const selected = entries.find((entry) => entry.dataset.menuEntry === selectedMenu.dataset.selectedMenu);
      const others = entries.filter((entry) => entry !== selected);
      others.forEach((entry, index) => fold(entry, 620, index * 18));
      if (selected) fold(selected, 650, 620 + Math.max(0, others.length - 1) * 18);
    }
    // The book already animates its own index button. Browser Back/Forward does
    // not call that handler, so only fold a still-visible book here as a fallback.
    const candidates = root ? [...root.querySelectorAll<HTMLElement>("[data-blossom], .public-book-stage:not(.is-leaving):not(.is-outside), .public-book-meta:not(.is-leaving):not(.is-outside)")] : [];
    const visible = candidates.filter((element) => {
      const rect = element.getBoundingClientRect();
      return !selectedMenu?.contains(element) && rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && !element.closest('[aria-hidden="true"], [inert]');
    });
    visible.forEach((element, index) => {
      fold(element, 760, Math.min(280, (visible.length - index - 1) * 36));
    });
    if (displayLocation.pathname === "/navigate") {
      // The ocean owns its aperture; wait for its reverse reveal as well.
      window.dispatchEvent(new CustomEvent("portfolio:ocean-exit", { detail: { waitUntil: (promise: Promise<unknown>) => pending.push(promise) } }));
    }
    Promise.all(pending).then(() => {
      if (!canceled) {
        completed = true;
        if (discardDraft) editing.current.cancel();
        setDisplayLocation(nextLocation);
        setLeaving(false);
      }
    });
    };
    // A zoomed 3D camera must return before any viewport/canvas is folded.
    // Listeners register promises synchronously; routes without one retain
    // their existing entry/exit timing and never import the 3D implementation.
    const preparation: Promise<unknown>[] = [];
    window.dispatchEvent(new CustomEvent("portfolio:before-exit", { detail: {
      pathname: displayLocation.pathname,
      waitUntil: (promise: Promise<unknown>) => preparation.push(promise),
    } }));
    if (preparation.length) void Promise.allSettled(preparation).then(runExit);
    else runExit();
    return () => {
      canceled = true;
      animations.forEach((animation) => animation.cancel());
      if (!completed && requestedLocation.current.pathname === displayLocation.pathname) {
        window.dispatchEvent(new CustomEvent("portfolio:before-exit-cancel"));
      }
      // Retargeting another destination must keep closing the ocean. Only a
      // return to the displayed ocean restores its interrupted reveal.
      if (!completed && displayLocation.pathname === "/navigate" && requestedLocation.current.pathname === "/navigate") {
        window.dispatchEvent(new CustomEvent("portfolio:ocean-exit-cancel"));
      }
    };
  }, [displayLocation, nextLocation, navigate]);
  return <div ref={stage} className={`route-stage ${leaving ? "is-route-leaving" : ""} ${oceanSurface || nextLocation.pathname === "/navigate" ? "is-ocean-surface" : ""}`} style={{ backgroundColor: background, color: foreground }} aria-busy={leaving}>{children(displayLocation)}</div>;
}
