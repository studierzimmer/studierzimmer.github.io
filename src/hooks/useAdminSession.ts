import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { isCurrentUserAdmin } from "@/services/bookRepository";

interface AdminSessionState {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAdminSession(): AdminSessionState {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: userError } =
      await supabase.auth.getUser();

    if (userError) {
      setUser(null);
      setIsAdmin(false);
      setError(userError.message);
      setLoading(false);
      return;
    }

    const nextUser = data.user ?? null;

    setUser(nextUser);

    if (!nextUser) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      const nextIsAdmin = await isCurrentUserAdmin();
      setIsAdmin(nextIsAdmin);
    } catch (adminError) {
      setIsAdmin(false);

      setError(
        adminError instanceof Error
          ? adminError.message
          : "Unable to verify administrator access."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const { data } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => {
        void refresh();
      }, 0);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [refresh]);

  return {
    loading,
    user,
    isAdmin,
    error,
    refresh,
  };
}