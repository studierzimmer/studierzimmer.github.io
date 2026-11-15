/** One cancellable frame per active book, asleep while the book is at rest. */
export function createBookFrameScheduler(options: {
  request: (callback: FrameRequestCallback) => number;
  cancel: (id: number) => void;
  draw: (time: number) => void;
  busy: () => boolean;
  connected: () => boolean;
}) {
  let frame: number | null = null;
  let disposed = false;
  let paused = false;
  const wake = () => {
    if (disposed || paused || frame !== null || !options.connected()) return;
    frame = options.request((time) => {
      frame = null;
      if (disposed || paused || !options.connected()) return;
      options.draw(time);
      if (options.busy()) wake();
    });
  };
  return {
    wake,
    pause(value: boolean) {
      paused = value;
      if (paused && frame !== null) { options.cancel(frame); frame = null; }
      if (!paused) wake();
    },
    dispose() {
      disposed = true;
      if (frame !== null) options.cancel(frame);
      frame = null;
    },
  };
}
