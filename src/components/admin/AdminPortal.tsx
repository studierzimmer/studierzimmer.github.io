import React from "react";
import { supabase } from "@/lib/supabase";
import { useAdminSession } from "@/hooks/useAdminSession";
import AdminBookManager from "@/components/admin/AdminBookManager";
import AdminLogin from "@/components/admin/AdminLogin";

interface AdminPortalProps {
  onBack: () => void;
  embedded?: boolean;
  surfaceReady?: boolean;
}

export default function AdminPortal({
  onBack,
  embedded = false,
  surfaceReady = false,
}: AdminPortalProps) {
  const { loading, user, isAdmin, error, refresh } = useAdminSession();

  const screenPosition = embedded ? "absolute" : "fixed";

  if (loading) {
    return (
      <div
        className={`${screenPosition} inset-0 z-[100] flex items-center justify-center bg-white text-black`}
      >
        <div className="animate-pulse">...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <AdminLogin
        onBack={onBack}
        onSuccess={refresh}
        embedded={embedded}
        active={!embedded || surfaceReady}
      />
    );
  }

  if (!isAdmin) {
    return (
      <div
        className={`${screenPosition} inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-white px-8 text-black`}
      >
        <div className="w-full max-w-md border border-black/20 p-6 text-center">
          <p className="mb-4">
            This account is signed in but is not an administrator.
          </p>

          {error && (
            <p className="mb-4 text-[14px] text-red-700">{error}</p>
          )}

          <div className="flex justify-center gap-5">
            {!embedded && (
              <button type="button" onClick={onBack} className="underline">
                BACK
              </button>
            )}

            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                await refresh();
              }}
              className="underline"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminBookManager
      userEmail={user.email ?? "admin"}
      onBack={onBack}
      embedded={embedded}
      accountControlsReady={!embedded || surfaceReady}
      onSignOut={async () => {
        await supabase.auth.signOut();
        await refresh();
      }}
    />
  );
}
