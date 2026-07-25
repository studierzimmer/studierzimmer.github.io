import React, { useCallback, useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  speed?: number;
  revealSpeed?: number;
}

const SCRAMBLE_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";

export default function ScrambleText({
  text,
  speed = 100,
  revealSpeed = 55,
}: ScrambleTextProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const revealIndexRef = useRef(0);
  const hoveringRef = useRef(false);

  const clearAnimation = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const randomCharacter = useCallback(() => {
    return SCRAMBLE_CHARACTERS[
      Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
    ];
  }, []);

  const createScrambledText = useCallback(
    (revealedCharacters = 0) =>
      text
        .split("")
        .map((character, index) => {
          if (character === " ") return " ";
          if (index < revealedCharacters) return character;
          return randomCharacter();
        })
        .join(""),
    [randomCharacter, text]
  );

  const startScrambling = useCallback(() => {
    clearAnimation();
    hoveringRef.current = false;
    if (!textRef.current) return;

    intervalRef.current = window.setInterval(() => {
      if (!textRef.current || hoveringRef.current) return;
      textRef.current.textContent = createScrambledText();
    }, speed);
  }, [clearAnimation, createScrambledText, speed]);

  const revealText = useCallback(() => {
    clearAnimation();
    hoveringRef.current = true;
    revealIndexRef.current = 0;
    if (!textRef.current) return;

    intervalRef.current = window.setInterval(() => {
      revealIndexRef.current += 1;

      if (textRef.current) {
        textRef.current.textContent = createScrambledText(
          revealIndexRef.current
        );
      }

      if (revealIndexRef.current >= text.length) {
        clearAnimation();
        if (textRef.current) textRef.current.textContent = text;
      }
    }, revealSpeed);
  }, [clearAnimation, createScrambledText, revealSpeed, text]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      if (textRef.current) textRef.current.textContent = text;
      return clearAnimation;
    }

    startScrambling();
    return clearAnimation;
  }, [clearAnimation, startScrambling, text]);

  return (
    <span
      className="public-login-scramble"
      onMouseEnter={revealText}
      onMouseLeave={startScrambling}
      aria-label={text}
    >
      <span ref={textRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

