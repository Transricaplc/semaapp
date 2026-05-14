import type { ReactNode } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldAlert, Loader2 } from "lucide-react";

/**
 * Server-validated admin gate. Renders children only if the current
 * authenticated user has the 'admin' role in public.user_roles.
 */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading } = useUserRole();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" aria-label="Inapakia" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-sm text-center space-y-3">
          <ShieldAlert className="w-10 h-10 mx-auto text-destructive" aria-hidden="true" />
          <h1 className="font-heading text-h2 text-foreground">Hauruhusiwi</h1>
          <p className="text-meta font-body text-muted-foreground">
            Ukurasa huu ni wa wasimamizi tu. Wasiliana na msimamizi mkuu wa Sema kupata ufikiaji.
            <br />
            <span className="opacity-70">This page is restricted to administrators.</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
