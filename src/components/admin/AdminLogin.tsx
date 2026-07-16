import React, { FormEvent, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";

interface AdminLoginProps {
  onBack: () => void;
  onSuccess: () => Promise<void>;
  embedded?: boolean;
  active?: boolean;
}

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : "Unable to sign in.";
}

export default function AdminLogin({
  onBack,
  onSuccess,
  embedded = false,
  active = true,
}: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const backTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setEntered(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (backTimerRef.current) {
        window.clearTimeout(backTimerRef.current);
      }
    };
  }, []);

  const handleBack = () => {
    if (leaving) {
      return;
    }

    setLeaving(true);
    setEntered(false);

    backTimerRef.current = window.setTimeout(() => {
      onBack();
    }, 650);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        throw signInError;
      }

      await onSuccess();
    } catch (signInError) {
      setError(messageFrom(signInError));
    } finally {
      setSubmitting(false);
    }
  };

  const piecesVisible = embedded ? active : entered && !leaving;
  const pieceMotion = (index: number, total = 7) => ({
    initial: false as const,
    animate: piecesVisible
      ? { scale: 1, opacity: 1, filter: "blur(0px)" }
      : { scale: 0, opacity: 0, filter: "blur(8px)" },
    transition: {
      type: "spring" as const,
      stiffness: 390,
      damping: 22,
      mass: 0.72,
      delay: piecesVisible ? index * 0.07 : Math.max(0, total - index) * 0.035,
    },
    style: { transformOrigin: "50% 50%" },
  });

  return (
    <div
      className={`${
        embedded ? "absolute" : "fixed"
      } inset-0 z-[100] overflow-y-auto bg-white text-black`}
    >
      <div className="mx-auto flex min-h-full w-full max-w-md flex-col px-8 py-8">
        {!embedded && (
          <div className="mb-16 flex items-center justify-between text-[16px]">
            <motion.button
              {...pieceMotion(0)}
              type="button"
              onClick={handleBack}
              className="transition-transform hover:scale-110 active:scale-110"
            >
              ← BACK
            </motion.button>

            <motion.span {...pieceMotion(1)}>ADMIN LOGIN</motion.span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="my-auto flex flex-col gap-5 bg-white px-1 py-6"
        >
          <div className="mb-1 text-center">
            <motion.p
              {...pieceMotion(0)}
              className="text-[12px] tracking-[0.18em] text-black/45"
            >
              PRIVATE AREA
            </motion.p>
            <motion.h1
              {...pieceMotion(1)}
              className="mt-2 text-[22px] font-light"
            >
              ADMIN LOGIN
            </motion.h1>
          </div>

          <motion.label
            {...pieceMotion(2)}
            className="flex flex-col gap-2 text-[14px]"
          >
            EMAIL

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
              className="border border-black/30 bg-transparent px-3 py-2 text-[16px] outline-none transition-colors focus:border-black"
            />
          </motion.label>

          <motion.label
            {...pieceMotion(3)}
            className="flex flex-col gap-2 text-[14px]"
          >
            PASSWORD

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="border border-black/30 bg-transparent px-3 py-2 text-[16px] outline-none transition-colors focus:border-black"
            />
          </motion.label>

          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                key="login-error"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 390, damping: 22 }}
                role="alert"
                className="text-[14px] leading-relaxed text-red-700"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            {...pieceMotion(4)}
            type="submit"
            disabled={submitting}
            className="border border-black px-4 py-2 text-[16px] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-50"
          >
            {submitting ? "SIGNING IN…" : "LOGIN"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
