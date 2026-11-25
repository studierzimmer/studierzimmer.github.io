export interface ShipSurfaceStep {
  height: number;
  velocity: number;
  active: boolean;
  contact: boolean;
}

/** Vertical-only motion; callers retain all horizontal movement and heading. */
export function createShipSurfaceMotion() {
  let active = false, elapsed = 0, from = 0, target = 0, previous = 0, contactHeight = 0;
  let sounded = false;
  return {
    start(kind: string, height: number, waterline: number, hullContact = waterline): boolean {
      if (kind !== "ship" || active || !Number.isFinite(height) || !Number.isFinite(waterline) || Math.abs(height - waterline) < .01) return false;
      active = true; elapsed = 0; from = previous = height; target = waterline; sounded = false;
      // From above, use the first hull-water contact if it is still ahead.
      // Already intersecting/underwater hulls surface at their floating line.
      contactHeight = height > hullContact && hullContact > waterline ? hullContact : waterline;
      return true;
    },
    step(delta: number): ShipSurfaceStep | null {
      if (!active) return null;
      const dt = Math.min(.05, Math.max(0, Number.isFinite(delta) ? delta : 0));
      elapsed += dt;
      const phase = elapsed * 5.5, damping = .82, frequency = Math.sqrt(1 - damping * damping);
      const spring = Math.exp(-damping * phase) * (Math.cos(frequency * phase) + damping / frequency * Math.sin(frequency * phase));
      const overshoot = Math.min(6, Math.abs(from - target) * .06);
      let height = target + (from - target) * spring;
      height = from > target ? Math.max(target - overshoot, height) : Math.min(target + overshoot, height);
      let velocity = dt > 0 ? (height - previous) / dt : 0;
      const contact = !sounded && (from > target ? previous > contactHeight && height <= contactHeight : previous < contactHeight && height >= contactHeight);
      if (contact) sounded = true;
      if (elapsed >= 2.8) { height = target; velocity = 0; active = false; }
      previous = height;
      return { height, velocity, active, contact };
    },
    isActive: () => active,
    cancel() { active = false; },
  };
}
