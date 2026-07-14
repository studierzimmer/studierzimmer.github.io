import React, { KeyboardEvent, PointerEvent, useEffect, useRef, useState } from "react";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface HsvColor {
  h: number;
  s: number;
  v: number;
}

interface BookBackgroundColorPickerProps {
  value: RgbColor;
  onChange: (color: RgbColor) => void;
  legend?: string;
  ariaLabel?: string;
}

const pickerStyles = `
.book-hue-slider {
  appearance: none;
  height: 12px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
}

.book-hue-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-radius: 999px;
  background: transparent;
  box-shadow: 0 0 0 1px black;
}

.book-hue-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-radius: 999px;
  background: transparent;
  box-shadow: 0 0 0 1px black;
}
`;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeRgb(color: RgbColor): RgbColor {
  return {
    r: Math.round(clamp(color.r, 0, 255)),
    g: Math.round(clamp(color.g, 0, 255)),
    b: Math.round(clamp(color.b, 0, 255)),
  };
}

function rgbToHsv(color: RgbColor): HsvColor {
  const normalized = normalizeRgb(color);
  const red = normalized.r / 255;
  const green = normalized.g / 255;
  const blue = normalized.b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  let hue = 0;

  if (delta !== 0) {
    if (maximum === red) {
      hue = 60 * (((green - blue) / delta) % 6);
    } else if (maximum === green) {
      hue = 60 * ((blue - red) / delta + 2);
    } else {
      hue = 60 * ((red - green) / delta + 4);
    }
  }

  if (hue < 0) hue += 360;

  return {
    h: hue,
    s: maximum === 0 ? 0 : (delta / maximum) * 100,
    v: maximum * 100,
  };
}

function hsvToRgb(color: HsvColor): RgbColor {
  const hue = ((color.h % 360) + 360) % 360;
  const saturation = clamp(color.s, 0, 100) / 100;
  const value = clamp(color.v, 0, 100) / 100;
  const chroma = value * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = value - chroma;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue < 60) {
    red = chroma;
    green = secondary;
  } else if (hue < 120) {
    red = secondary;
    green = chroma;
  } else if (hue < 180) {
    green = chroma;
    blue = secondary;
  } else if (hue < 240) {
    green = secondary;
    blue = chroma;
  } else if (hue < 300) {
    red = secondary;
    blue = chroma;
  } else {
    red = chroma;
    blue = secondary;
  }

  return normalizeRgb({
    r: (red + match) * 255,
    g: (green + match) * 255,
    b: (blue + match) * 255,
  });
}

export function rgbToHex(color: RgbColor): string {
  const normalized = normalizeRgb(color);
  return `#${[normalized.r, normalized.g, normalized.b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

export function hexToRgb(value: string): RgbColor | null {
  const compact = value.trim().replace(/^#/, "");
  const expanded =
    compact.length === 3
      ? compact
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : compact;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return null;

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

export default function BookBackgroundColorPicker({
  value,
  onChange,
  legend = "BOOK BACKGROUND — HSV",
  ariaLabel = "Background",
}: BookBackgroundColorPickerProps) {
  const squareRef = useRef<HTMLDivElement | null>(null);
  const [hsv, setHsv] = useState(() => rgbToHsv(value));
  const [hexValue, setHexValue] = useState(() => rgbToHex(value));

  useEffect(() => {
    const normalizedValue = normalizeRgb(value);
    const renderedValue = hsvToRgb(hsv);

    if (rgbToHex(normalizedValue) !== rgbToHex(renderedValue)) {
      setHsv(rgbToHsv(normalizedValue));
    }

    setHexValue(rgbToHex(normalizedValue));
  }, [hsv, value]);

  const commitHsv = (nextHsv: HsvColor) => {
    const normalizedHsv = {
      h: ((nextHsv.h % 360) + 360) % 360,
      s: clamp(nextHsv.s, 0, 100),
      v: clamp(nextHsv.v, 0, 100),
    };
    const nextRgb = hsvToRgb(normalizedHsv);
    setHsv(normalizedHsv);
    setHexValue(rgbToHex(nextRgb));
    onChange(nextRgb);
  };

  const updateSaturationAndValue = (clientX: number, clientY: number) => {
    const square = squareRef.current;
    if (!square) return;

    const bounds = square.getBoundingClientRect();
    commitHsv({
      ...hsv,
      s: ((clientX - bounds.left) / bounds.width) * 100,
      v: 100 - ((clientY - bounds.top) / bounds.height) * 100,
    });
  };

  const handleSquarePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSaturationAndValue(event.clientX, event.clientY);
  };

  const handleSquarePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    updateSaturationAndValue(event.clientX, event.clientY);
  };

  const handleSquareKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const movement = event.shiftKey ? 5 : 1;
    let nextHsv: HsvColor | null = null;

    if (event.key === "ArrowLeft") nextHsv = { ...hsv, s: hsv.s - movement };
    if (event.key === "ArrowRight") nextHsv = { ...hsv, s: hsv.s + movement };
    if (event.key === "ArrowUp") nextHsv = { ...hsv, v: hsv.v + movement };
    if (event.key === "ArrowDown") nextHsv = { ...hsv, v: hsv.v - movement };

    if (nextHsv) {
      event.preventDefault();
      commitHsv(nextHsv);
    }
  };

  const previewRgb = hsvToRgb(hsv);

  return (
    <fieldset className="border border-black/20 p-4">
      <style>{pickerStyles}</style>
      <legend className="px-1 text-[12px]">{legend}</legend>

      <div
        ref={squareRef}
        role="slider"
        tabIndex={0}
        aria-label={`${ariaLabel} saturation and value`}
        aria-valuetext={`Saturation ${Math.round(hsv.s)}%, value ${Math.round(hsv.v)}%`}
        onPointerDown={handleSquarePointerDown}
        onPointerMove={handleSquarePointerMove}
        onKeyDown={handleSquareKeyDown}
        className="relative mb-4 aspect-square w-full max-w-[320px] cursor-crosshair touch-none overflow-hidden border border-black/25 outline-none focus:ring-1 focus:ring-black"
        style={{
          backgroundColor: `hsl(${hsv.h} 100% 50%)`,
          backgroundImage:
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
        }}
      >
        <span
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_black]"
          style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }}
        />
      </div>

      <label className="grid grid-cols-[42px_minmax(0,1fr)_50px] items-center gap-3 text-[12px]">
        <span>HUE</span>
        <input
          type="range"
          min="0"
          max="359"
          step="1"
          value={Math.round(hsv.h)}
          onChange={(event) =>
            commitHsv({ ...hsv, h: Number(event.target.value) })
          }
          aria-label={`${ariaLabel} hue`}
          className="book-hue-slider w-full"
        />
        <output className="font-mono text-right">{Math.round(hsv.h)}°</output>
      </label>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_76px] gap-3">
        <label className="text-[12px]">
          HEX
          <input
            value={hexValue}
            onChange={(event) => {
              const nextHex = event.target.value;
              setHexValue(nextHex);
              const parsed = hexToRgb(nextHex);
              if (!parsed) return;
              setHsv(rgbToHsv(parsed));
              onChange(parsed);
            }}
            onBlur={() => setHexValue(rgbToHex(previewRgb))}
            inputMode="text"
            spellCheck={false}
            maxLength={7}
            className="mt-1 w-full border border-black/25 bg-transparent px-3 py-2 font-mono text-[13px] uppercase outline-none focus:border-black"
            aria-label={`${ariaLabel} hex color`}
          />
        </label>

        <div
          className="mt-[19px] border border-black/25 transition-colors duration-300"
          style={{ backgroundColor: rgbToHex(previewRgb) }}
          aria-label={`${ariaLabel} preview ${rgbToHex(previewRgb)}`}
        />
      </div>

      <p className="mt-3 font-mono text-[11px] text-black/50">
        H {Math.round(hsv.h)} · S {Math.round(hsv.s)}% · V {Math.round(hsv.v)}%
      </p>
    </fieldset>
  );
}
