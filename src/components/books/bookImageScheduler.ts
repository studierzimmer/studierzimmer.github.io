/** Original URLs only. Never removes an activated page src (mobile fold safety). */
export class BookImageScheduler {
  private readonly listeners = new Set<() => void>();
  private readonly activated = new Set<string>();
  private readonly waiters = new Map<string, Set<() => void>>();
  private readonly entries = new Map<string, { image: HTMLImageElement; resolve: () => void; promise: Promise<void>; priority: number; loaded: boolean; decoding: boolean; idle: number | null; idleNative: boolean }>();
  private queue: Array<{ url: string; priority: number }> = [];
  private desired = new Set<string>();
  private busy = false;
  private disposed = false;
  private readonly spreads: number[][];
  constructor(private readonly urls: string[], private readonly makeImage: () => HTMLImageElement = () => new Image()) {
    this.spreads = urls.length ? [[0]] : [];
    for (let index = 1; index < urls.length; index += 2) this.spreads.push([index, index + 1].filter((page) => page < urls.length));
  }
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  isActive = (url: string) => this.activated.has(url);
  start(page: number) { this.disposed = false; this.setPage(page); }
  private spreadIndex(page: number) { return Math.max(0, this.spreads.findIndex((spread) => spread.includes(page))); }
  private pagesAt(page: number) { return this.spreads[this.spreadIndex(page)] ?? []; }
  setPage(page: number) {
    if (this.disposed) return;
    const index = this.spreadIndex(page);
    const ordered = [index, index + 1, index - 1].filter((spread) => spread >= 0 && spread < this.spreads.length);
    this.desired = new Set(ordered.flatMap((spread) => this.spreads[spread].map((item) => this.urls[item])));
    this.queue = [];
    ordered.forEach((spread, priority) => this.spreads[spread].forEach((item) => this.enqueue(this.urls[item], priority)));
    this.entries.forEach((entry, url) => {
      if (!this.desired.has(url)) this.cancelEntry(url);
      else if (entry.loaded && entry.priority === 0) this.decode(url);
    });
    this.pump();
  }
  setBusy(value: boolean) {
    this.busy = value;
    if (!value) this.entries.forEach((entry, url) => { if (entry.loaded) this.decode(url); });
  }
  isReadyForPage(page: number) { return this.pagesAt(page).every((index) => this.activated.has(this.urls[index])); }
  preparePage(page: number): Promise<boolean> {
    if (this.disposed) return Promise.resolve(false);
    this.pagesAt(page).forEach((index) => { this.desired.add(this.urls[index]); this.enqueue(this.urls[index], 0); });
    this.pump();
    const urls = this.pagesAt(page).map((index) => this.urls[index]);
    if (urls.every((url) => this.activated.has(url))) return Promise.resolve(true);
    return new Promise<boolean>((resolve) => {
      let finished = false;
      let timeout: number | null = null;
      const settled = new Set<string>();
      const registered: Array<{ url: string; callback: () => void }> = [];
      const finish = (prepared: boolean) => {
        if (finished) return;
        finished = true;
        if (timeout !== null) window.clearTimeout(timeout);
        registered.forEach(({ url, callback }) => {
          const pending = this.waiters.get(url);
          pending?.delete(callback);
          if (!pending?.size) this.waiters.delete(url);
        });
        resolve(prepared);
      };
      urls.forEach((url) => {
        if (this.activated.has(url)) { settled.add(url); return; }
        const callback = () => { settled.add(url); if (settled.size === urls.length) finish(urls.every((item) => this.activated.has(item))); };
        const pending = this.waiters.get(url) ?? new Set();
        pending.add(callback); this.waiters.set(url, pending);
        registered.push({ url, callback });
      });
      // A tap may expire, but a healthy full-resolution transfer must continue.
      // Later intent joins the same loader; expired intent cannot replay later.
      timeout = window.setTimeout(() => finish(false), 12000);
    });
  }
  private enqueue(url: string, priority: number) {
    if (!url || this.activated.has(url)) return;
    const entry = this.entries.get(url);
    if (entry) { entry.priority = priority; if (entry.loaded && priority === 0) this.decode(url); return; }
    const queued = this.queue.find((item) => item.url === url);
    if (queued) queued.priority = Math.min(queued.priority, priority);
    else this.queue.push({ url, priority });
  }
  private pump() {
    if (this.disposed) return;
    this.queue.sort((a, b) => a.priority - b.priority);
    while (this.entries.size < 2 && this.queue.length) {
      const next = this.queue.shift()!;
      if (!this.desired.has(next.url) || this.activated.has(next.url)) continue;
      const image = this.makeImage();
      let resolve = () => undefined;
      const promise = new Promise<void>((done) => { resolve = done; });
      const entry = { image, promise, resolve, priority: next.priority, loaded: false, decoding: false, idle: null as number | null, idleNative: false };
      this.entries.set(next.url, entry);
      image.decoding = "async";
      image.onload = () => { entry.loaded = true; this.decode(next.url); };
      // Settle failed attempts without granting decoded readiness. A later
      // explicit prepare/setPage can retry the exact same original URL.
      image.onerror = () => this.fail(next.url);
      image.src = next.url;
    }
  }
  private decode(url: string) {
    const entry = this.entries.get(url);
    if (!entry || entry.decoding || !entry.loaded || this.disposed) return;
    if (entry.priority > 0 && this.busy) return;
    if (entry.idle !== null) {
      if (entry.idleNative) window.cancelIdleCallback(entry.idle);
      else window.clearTimeout(entry.idle);
      entry.idle = null;
    }
    const run = () => {
      entry.idle = null;
      if (this.disposed || this.entries.get(url) !== entry || (entry.priority > 0 && this.busy)) return;
      entry.decoding = true;
      const decoded = typeof entry.image.decode === "function" ? entry.image.decode() : Promise.resolve();
      void decoded.then(() => { if (this.entries.get(url) === entry) this.finish(url); }).catch(() => { if (this.entries.get(url) === entry) this.fail(url); });
    };
    if (entry.priority === 0) run();
    else if (typeof window.requestIdleCallback === "function") { entry.idleNative = true; entry.idle = window.requestIdleCallback(run, { timeout: 800 }); }
    else { entry.idleNative = false; entry.idle = window.setTimeout(run, 50); }
  }
  private clear(url: string) {
    const entry = this.entries.get(url);
    if (!entry) return;
    if (entry.idle !== null) {
      if (entry.idleNative) window.cancelIdleCallback(entry.idle);
      else window.clearTimeout(entry.idle);
    }
    entry.image.onload = null; entry.image.onerror = null;
    this.entries.delete(url);
    entry.resolve();
    return entry;
  }
  private finish(url: string) {
    if (!this.entries.has(url)) return;
    this.clear(url);
    this.activated.add(url);
    this.waiters.get(url)?.forEach((resolve) => resolve()); this.waiters.delete(url);
    this.listeners.forEach((listener) => listener());
    this.pump();
  }
  private fail(url: string) {
    this.cancelEntry(url);
    this.pump();
  }
  private cancelEntry(url: string) {
    const entry = this.clear(url);
    if (entry) entry.image.src = "";
    this.waiters.get(url)?.forEach((resolve) => resolve()); this.waiters.delete(url);
  }
  dispose() {
    this.disposed = true;
    [...this.entries.keys()].forEach((url) => this.cancelEntry(url));
    this.queue = [];
    this.waiters.forEach((pending) => pending.forEach((resolve) => resolve())); this.waiters.clear();
    this.listeners.clear();
  }
}
