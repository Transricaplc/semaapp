import { supabase } from "@/integrations/supabase/client";

/**
 * Best-effort audit log writer. Never throws — failures are swallowed
 * so admin actions don't break if logging fails.
 */
export async function logAudit(
  action: string,
  target?: string | null,
  details?: Record<string, unknown> | null,
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action,
      target: target ?? null,
      details: (details ?? null) as never,
    });
  } catch {
    /* noop */
  }
}
